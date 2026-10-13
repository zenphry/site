import http from "node:http";
import { URLSearchParams } from "node:url";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const bodyLimit = 64 * 1024;
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaximum = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function required(value, name) {
  if (!value) throw new Error(`${name} is required`);
  return value;
}

export function loadConfig(environment = process.env) {
  const allowedOrigins = required(
    environment.CONTACT_ALLOWED_ORIGINS,
    "CONTACT_ALLOWED_ORIGINS",
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => new URL(value).origin);

  if (!allowedOrigins.length)
    throw new Error("CONTACT_ALLOWED_ORIGINS is required");

  return {
    allowedOrigins: new Set(allowedOrigins),
    from: required(environment.CONTACT_FROM, "CONTACT_FROM"),
    recipient: required(environment.CONTACT_RECIPIENT, "CONTACT_RECIPIENT"),
    smtp: {
      host: required(environment.CONTACT_SMTP_HOST, "CONTACT_SMTP_HOST"),
      port: Number(environment.CONTACT_SMTP_PORT || 587),
      secure: environment.CONTACT_SMTP_SECURE === "true",
      requireTLS: environment.CONTACT_SMTP_REQUIRE_TLS !== "false",
      auth: environment.CONTACT_SMTP_USER
        ? {
            user: environment.CONTACT_SMTP_USER,
            pass: required(
              environment.CONTACT_SMTP_PASSWORD,
              "CONTACT_SMTP_PASSWORD",
            ),
          }
        : undefined,
    },
  };
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[character];
  });
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(values) {
  const contact = {
    name: clean(values.name),
    email: clean(values.email),
    company: clean(values.company),
    phone: clean(values.phone),
    message: clean(values.message),
    website: clean(values.website),
  };
  const errors = {};

  if (contact.name.length < 2 || contact.name.length > 120)
    errors.name = "Enter a name of up to 120 characters.";
  if (!emailPattern.test(contact.email) || contact.email.length > 254)
    errors.email = "Enter a valid work email.";
  if (contact.company.length > 160)
    errors.company = "Use up to 160 characters.";
  if (contact.phone.length > 40) errors.phone = "Use up to 40 characters.";
  if (contact.message.length < 10 || contact.message.length > 6000)
    errors.message =
      "Tell us a little more about your enquiry, up to 6,000 characters.";
  if (contact.website.length > 200) errors.website = "Invalid submission.";

  return { contact, errors };
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    const declaredLength = Number(request.headers["content-length"] || 0);
    if (declaredLength > bodyLimit) {
      const error = new Error("Body too large");
      error.status = 413;
      reject(error);
      return;
    }
    let total = 0;
    let tooLarge = false;
    const chunks = [];
    request.on("data", (chunk) => {
      total += chunk.length;
      if (total > bodyLimit) {
        tooLarge = true;
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      if (tooLarge) {
        const error = new Error("Body too large");
        error.status = 413;
        reject(error);
        return;
      }
      const raw = Buffer.concat(chunks).toString("utf8");
      const contentType = request.headers["content-type"] || "";
      if (contentType.includes("application/json")) {
        try {
          const parsed = JSON.parse(raw);
          if (!parsed || Array.isArray(parsed) || typeof parsed !== "object")
            throw new Error("Invalid JSON");
          resolve(parsed);
        } catch {
          reject(new Error("Invalid JSON"));
        }
        return;
      }
      resolve(Object.fromEntries(new URLSearchParams(raw)));
    });
    request.on("error", reject);
  });
}

function acceptsJson(request) {
  return (request.headers.accept || "").includes("application/json");
}

function sendHtml(response, status, title, message) {
  response.writeHead(status, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | Zenphry</title><style>:root{color-scheme:light dark;--paper:#f8f5ed;--surface:#fffdf8;--ink:#27241f;--muted:#69645b;--gold:#a5863c;--rule:#d9d2c2}@media(prefers-color-scheme:dark){:root{--paper:#191916;--surface:#25241f;--ink:#f8f3e8;--muted:#c9c1b2;--gold:#d8ba69;--rule:#4c493f}}body{max-width:680px;margin:0 auto;padding:clamp(2rem,8vw,5rem) 1.25rem;background:var(--paper);color:var(--ink);font:18px/1.6 Inter,system-ui,sans-serif}main{padding:2rem;border:1px solid var(--rule);border-radius:.5rem;background:var(--surface)}h1{line-height:1.1}a{color:var(--gold);font-weight:700}</style></head><body><main><h1>${title}</h1><p>${message}</p><p><a href="/contact/">Back to contact</a></p></main></body></html>`,
  );
}

function sendResult(request, response, status, result) {
  if (acceptsJson(request)) {
    response.writeHead(status, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    });
    response.end(JSON.stringify(result));
    return;
  }
  if (status < 400) {
    response.writeHead(303, {
      location: "/thank-you/",
      "cache-control": "no-store",
    });
    response.end();
    return;
  }
  sendHtml(
    response,
    status,
    status < 400 ? "Message sent" : "Message not sent",
    result.message,
  );
}

function createRateLimiter(now = () => Date.now()) {
  const visitors = new Map();
  return (address) => {
    const current = now();
    if (visitors.size >= 10000) {
      for (const [key, times] of visitors) {
        if (!times.some((time) => current - time < rateLimitWindowMs))
          visitors.delete(key);
      }
      if (visitors.size >= 10000) visitors.delete(visitors.keys().next().value);
    }
    const previous = (visitors.get(address) || []).filter(
      (time) => current - time < rateLimitWindowMs,
    );
    if (previous.length >= rateLimitMaximum) return false;
    previous.push(current);
    visitors.set(address, previous);
    return true;
  };
}

export function createContactServer({
  config,
  sendMail,
  allowRequest = createRateLimiter(),
}) {
  return http.createServer(async (request, response) => {
    if (request.method === "GET" && request.url === "/health") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end('{"ok":true}');
      return;
    }
    if (request.method !== "POST" || request.url !== "/contact/submit") {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const origin = request.headers.origin;
    if (!origin || !config.allowedOrigins.has(origin)) {
      sendResult(request, response, 403, {
        ok: false,
        message: "This form must be submitted from the Zenphry website.",
      });
      return;
    }

    const address = (
      request.headers["x-forwarded-for"] ||
      request.socket.remoteAddress ||
      "unknown"
    )
      .split(",")[0]
      .trim();
    if (!allowRequest(address)) {
      sendResult(request, response, 429, {
        ok: false,
        message: "Please wait before sending another enquiry.",
      });
      return;
    }

    let values;
    try {
      values = await parseBody(request);
    } catch (error) {
      sendResult(request, response, error.status || 400, {
        ok: false,
        message: "We could not read your enquiry. Please try again.",
      });
      return;
    }

    const { contact, errors } = validateContact(values);
    if (contact.website || Object.keys(errors).length) {
      sendResult(request, response, 400, {
        ok: false,
        message: "Please review the highlighted fields and try again.",
        errors,
      });
      return;
    }

    const details = [
      `Name: ${contact.name}`,
      `Work email: ${contact.email}`,
      contact.company ? `Company: ${contact.company}` : null,
      contact.phone ? `Phone: ${contact.phone}` : null,
      "",
      contact.message,
    ]
      .filter((value) => value !== null)
      .join("\n");
    const html = `<p><strong>Name:</strong> ${escapeHtml(contact.name)}</p><p><strong>Work email:</strong> ${escapeHtml(contact.email)}</p>${contact.company ? `<p><strong>Company:</strong> ${escapeHtml(contact.company)}</p>` : ""}${contact.phone ? `<p><strong>Phone:</strong> ${escapeHtml(contact.phone)}</p>` : ""}<p><strong>Message:</strong></p><p>${escapeHtml(contact.message).replace(/\n/g, "<br>")}</p>`;

    try {
      await sendMail({
        from: config.from,
        to: config.recipient,
        replyTo: contact.email,
        subject: "New Zenphry contact enquiry",
        text: details,
        html,
      });
      sendResult(request, response, 202, {
        ok: true,
        message: "Thanks. Your message has been sent.",
      });
    } catch {
      console.error("Contact message delivery failed");
      sendResult(request, response, 502, {
        ok: false,
        message: "We could not send your enquiry. Please try again shortly.",
      });
    }
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const config = loadConfig();
  const transporter = nodemailer.createTransport({
    ...config.smtp,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  const server = createContactServer({
    config,
    sendMail: (message) => transporter.sendMail(message),
  });
  server.listen(3000, "0.0.0.0");
}
