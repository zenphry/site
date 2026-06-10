import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

const LEAD_ONION_SCRIPTS =
  '<script>var t_code = "DS-16725-4230-982";</script>' +
  '<script src="//ds360.co/track/script.js"></script>' +
  '<script id="zym-pixel-src" src="https://cdn.pixel.zymplify.com/pixels/39e8fff7-f079-4c31-a8df-5f3317682b4d/p.js" async=""></script>';

function injectLeadOnion(stream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  let injected = false;
  return stream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        if (injected) {
          controller.enqueue(chunk);
          return;
        }
        const text = dec.decode(chunk, { stream: true });
        if (text.includes("</head>")) {
          injected = true;
          controller.enqueue(enc.encode(text.replace("</head>", LEAD_ONION_SCRIPTS + "</head>")));
        } else {
          controller.enqueue(chunk);
        }
      },
    }),
  );
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError(error: unknown) {
        responseStatusCode = 500;
        // Log streaming rendering errors from inside the shell. Don't log
        // errors encountered during initial shell rendering since they'll
        // reject and get logged in handleDocumentRequest.
        if (shellRendered) {
          console.error(error);
        }
      },
    },
  );
  shellRendered = true;

  // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
  // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(injectLeadOnion(body), {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
