// 作品データ。Milan GX Fashion Week 2026 で発表した10着（ドレス6、ジャケット・スーツ3、コート1）
// 作品名・生地・ひとことは胡桃さんの回答（LINE【11】）が届いたら埋める
import type { ImageMetadata } from 'astro';

const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/works/*.jpg', { eager: true });

function photo(n: string): ImageMetadata {
  return photos[`../assets/works/${n}.jpg`].default;
}

export type Category = 'dress' | 'jacket' | 'suit' | 'coat';

export interface Work {
  id: string;
  category: Category;
  // 作品名が届くまでは見た目の説明を仮の名前にしている（素材名は確認できるまで入れない）
  name: { ja: string; en: string };
  materials: { ja: string; en: string } | null;
  note: { ja: string; en: string } | null;
  images: ImageMetadata[];
  // 種類が確認できるまで参考価格を出さず「お見積もり」にする
  quote?: boolean;
}

export const works: Work[] = [
  {
    id: 'look-01',
    category: 'dress',
    name: { ja: '黒のホルターネックドレス', en: 'Black Halter Dress' },
    materials: null,
    note: null,
    images: [photo('01'), photo('02')],
  },
  {
    id: 'look-02',
    category: 'coat',
    name: { ja: '和柄のロングコート', en: 'Japanese-Pattern Long Coat' },
    materials: null,
    note: null,
    images: [photo('03'), photo('04')],
  },
  {
    id: 'look-03',
    category: 'suit',
    name: { ja: '紫×金のスーツ', en: 'Purple and Gold Suit' },
    materials: null,
    note: null,
    images: [photo('05'), photo('06')],
  },
  {
    id: 'look-04',
    category: 'jacket',
    name: { ja: '深緑のダブルジャケット', en: 'Green Double-Breasted Jacket' },
    materials: null,
    note: null,
    images: [photo('08'), photo('07'), photo('09')],
  },
  {
    id: 'look-05',
    category: 'suit',
    name: { ja: '左右で柄を切り替えたスーツ', en: 'Two-Pattern Suit' },
    materials: null,
    note: null,
    images: [photo('10'), photo('11')],
  },
  {
    id: 'look-06',
    category: 'dress',
    name: { ja: '金と赤のマーメイドドレス', en: 'Gold and Red Mermaid Dress' },
    materials: null,
    note: null,
    images: [photo('12'), photo('13')],
  },
  {
    id: 'look-07',
    category: 'dress',
    name: { ja: '青の和柄ドレス', en: 'Blue Patterned Dress' },
    materials: null,
    note: null,
    images: [photo('14'), photo('15'), photo('17')],
  },
  {
    id: 'look-08',
    category: 'dress',
    // イタリア国旗の色（赤・白・緑）で表現した紅型のドレス（2026年11月 胡桃さんに確認）
    name: { ja: '紅型のロングドレス', en: 'Bingata Long Dress' },
    materials: { ja: '紅型', en: 'Ryukyu bingata' },
    note: {
      ja: 'イタリア国旗の赤・白・緑で表現した紅型のドレスです。Milan GX Fashion Week 2026で発表しました。',
      en: 'A bingata dress in the red, white and green of the Italian flag, shown at Milan GX Fashion Week 2026.',
    },
    images: [photo('18'), photo('16'), photo('23')],
  },
  {
    id: 'look-09',
    category: 'dress',
    name: { ja: '黒と赤のドレス', en: 'Black and Red Dress' },
    materials: null,
    note: null,
    images: [photo('21'), photo('19')],
  },
  {
    id: 'look-10',
    category: 'dress',
    name: { ja: '花柄とフリルのドレス', en: 'Floral Ruffled Dress' },
    materials: null,
    note: null,
    images: [photo('20'), photo('22'), photo('25')],
  },
];

// TOPの写真。服が画面いっぱいに写っているものを使う
export const heroImage = photo('13');
export const storyImage = photo('23');
// デザイナーのページのプロフィール写真（2026年11月 胡桃さんから指定）
export const profileImage = photo('26');
