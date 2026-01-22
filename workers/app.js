import { createRequestHandler } from '@react-router/server';
import * as build from '../build/server/index.js';

export default {
  async fetch(request, env, ctx) {
    const handler = createRequestHandler(build, 'production');
    return await handler(request, {
      cloudflare: { env, ctx },
    });
  },
};
