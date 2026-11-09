// microCMS の「journal」API から記事を取得する（ビルド時のみ）
// 環境変数がなければ空のまま公開できるようにしておく
import type { Lang } from '../i18n/ui';

export interface Post {
  id: string;
  title: string;
  lang: Lang;
  category?: string;
  description?: string;
  body: string;
  eyecatch?: { url: string; width: number; height: number };
  publishedAt: string;
}

const domain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

let cache: Post[] | null = null;

async function fetchAll(): Promise<Post[]> {
  if (cache) return cache;
  if (!domain || !apiKey) return (cache = []);

  const res = await fetch(`https://${domain}.microcms.io/api/v1/journal?limit=100&orders=-publishedAt`, {
    headers: { 'X-MICROCMS-API-KEY': apiKey },
  });
  if (!res.ok) throw new Error(`microCMS: ${res.status} ${await res.text()}`);
  const data = await res.json();
  // セレクト項目は配列で返るので1つ目を使う
  cache = data.contents.map((c: Post & { lang: string[] | string }) => ({
    ...c,
    lang: Array.isArray(c.lang) ? c.lang[0] : c.lang,
  }));
  return cache!;
}

export async function getPosts(lang: Lang): Promise<Post[]> {
  return (await fetchAll()).filter((p) => p.lang === lang);
}

export function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: lang === 'ja' ? 'numeric' : 'short',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  });
}
