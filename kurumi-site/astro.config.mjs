import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 本番ドメインが決まったら SITE_URL を Cloudflare の環境変数で設定する
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://kurumi-site.pages.dev',
  trailingSlash: 'always',
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'ja', locales: { ja: 'ja-JP', en: 'en-US' } },
    }),
  ],
});
