// ビルド時に、日本語ページのHTMLを文節ごとに区切る（src/lib/phrase.ts）
import { defineMiddleware } from 'astro:middleware';
import { phraseHTML } from './lib/phrase';

export const onRequest = defineMiddleware(async (_ctx, next) => {
  const res = await next();
  if (!(res.headers.get('content-type') ?? '').includes('text/html')) return res;
  const html = await res.text();
  return new Response(phraseHTML(html), { status: res.status, headers: res.headers });
});
