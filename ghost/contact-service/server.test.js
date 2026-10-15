import assert from "node:assert/strict";
import test from "node:test";
import { createContactServer, loadConfig, validateContact } from "./server.js";

const config = {
  allowedOrigins: new Set(["http://127.0.0.1:2368"]),
  from: "contact@zenphry.test",
  recipient: "contact@zenphry.com",
};

async function withServer(options, run) {
  const server = createContactServer(options);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("validates the configured mail transport", () => {
  assert.throws(() => loadConfig({}), /CONTACT_ALLOWED_ORIGINS/);
  const transport = loadConfig({
    CONTACT_ALLOWED_ORIGINS: "https://zenphry.com",
    CONTACT_FROM: "contact@zenphry.com",
    CONTACT_RECIPIENT: "contact@zenphry.com",
    CONTACT_SMTP_HOST: "smtp.example.test",
  });
  assert.equal(transport.smtp.requireTLS, true);
  assert.deepEqual(
    validateContact({
      name: "Ada",
      email: "ada@example.test",
      message: "Please contact me about restructuring.",
    }).errors,
    {},
  );
});

test("sends a validated same-origin enquiry without logging its fields", async () => {
  let sent;
  await withServer(
    {
      config,
      sendMail: async (message) => (sent = message),
      allowRequest: () => true,
    },
    async (origin) => {
      const response = await fetch(`${origin}/contact/submit`, {
        method: "POST",
        headers: {
          origin: "http://127.0.0.1:2368",
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: "Ada Lovelace",
          email: "ada@example.test",
          company: "Analytical Engines",
          message: "Please contact me about restructuring.",
        }),
      });
      assert.equal(response.status, 202);
      assert.deepEqual(await response.json(), {
        ok: true,
        message: "Thanks. Your message has been sent.",
      });
    },
  );
  assert.equal(sent.to, "contact@zenphry.com");
  assert.equal(sent.replyTo, "ada@example.test");
  assert.match(sent.text, /Ada Lovelace/);
});

test("accepts an allowed URL-encoded Unicode message and redirects no-JS submissions", async () => {
  await withServer(
    { config, sendMail: async () => undefined, allowRequest: () => true },
    async (origin) => {
      const values = new URLSearchParams({
        name: "Ada Lovelace",
        email: "ada@example.test",
        message: "経".repeat(2000),
      });
      const response = await fetch(`${origin}/contact/submit`, {
        method: "POST",
        redirect: "manual",
        headers: {
          origin: "http://127.0.0.1:2368",
          "content-type": "application/x-www-form-urlencoded",
        },
        body: values,
      });
      assert.equal(response.status, 303);
      assert.equal(response.headers.get("location"), "/thank-you/");
    },
  );
});

test("returns a stable error when SMTP rejects delivery", async () => {
  await withServer(
    {
      config,
      sendMail: async () => {
        throw new Error("SMTP unavailable");
      },
      allowRequest: () => true,
    },
    async (origin) => {
      const response = await fetch(`${origin}/contact/submit`, {
        method: "POST",
        headers: {
          origin: "http://127.0.0.1:2368",
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: "Ada Lovelace",
          email: "ada@example.test",
          message: "Please contact me about restructuring.",
        }),
      });
      assert.equal(response.status, 502);
      assert.deepEqual(await response.json(), {
        ok: false,
        message: "We could not send your enquiry. Please try again shortly.",
      });
    },
  );
});

test("rejects cross-origin, invalid and honeypot submissions before delivery", async () => {
  let deliveries = 0;
  await withServer(
    {
      config,
      sendMail: async () => (deliveries += 1),
      allowRequest: () => true,
    },
    async (origin) => {
      const invalidOrigin = await fetch(`${origin}/contact/submit`, {
        method: "POST",
        headers: { origin: "https://example.test", accept: "application/json" },
        body: "",
      });
      assert.equal(invalidOrigin.status, 403);
      const invalid = await fetch(`${origin}/contact/submit`, {
        method: "POST",
        headers: {
          origin: "http://127.0.0.1:2368",
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: "A",
          email: "bad",
          message: "short",
          website: "https://spam.test",
        }),
      });
      assert.equal(invalid.status, 400);
      const malformed = await fetch(`${origin}/contact/submit`, {
        method: "POST",
        headers: {
          origin: "http://127.0.0.1:2368",
          accept: "application/json",
          "content-type": "application/json",
        },
        body: "null",
      });
      assert.equal(malformed.status, 400);
    },
  );
  assert.equal(deliveries, 0);
});
