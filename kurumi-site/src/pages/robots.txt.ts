// robots.txt。サイトマップの場所をドメインに合わせて書き出す
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const branch = process.env.CF_PAGES_BRANCH;
  // 確認用URL（main 以外のブランチ）はクロールさせない
  if (branch !== undefined && branch !== 'main') {
    return new Response('User-agent: *\nDisallow: /\n');
  }
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`);
};
