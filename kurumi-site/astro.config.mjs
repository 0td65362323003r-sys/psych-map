import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 本番ドメインが決まったら SITE_URL を Cloudflare の環境変数で設定する
const site = process.env.SITE_URL ?? 'https://kurumi-site.pages.dev';
if (process.env.CF_PAGES_BRANCH === 'main' && !process.env.SITE_URL) {
  console.warn('[kurumi] SITE_URL が未設定です。canonical・OGP・サイトマップが仮のドメインになります。');
}

export default defineConfig({
  site,
  trailingSlash: 'always',
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // ページの hreflang（ja / en）とそろえる
      i18n: { defaultLocale: 'ja', locales: { ja: 'ja', en: 'en' } },
      // 記事がまだない間は、お知らせのページをサイトマップに入れない
      filter: (page) => !page.includes('/404') && (Boolean(process.env.MICROCMS_API_KEY) || !page.includes('/journal/')),
    }),
  ],
});
