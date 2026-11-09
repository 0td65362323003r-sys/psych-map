// 作品データ。作品名・生地・ひとことは胡桃さんの回答（LINE【11】）が届いたら埋める
import type { ImageMetadata } from 'astro';

const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/works/*.jpg', { eager: true });

function photo(n: string): ImageMetadata {
  return photos[`../assets/works/${n}.jpg`].default;
}

export type Category = 'dress' | 'jacket' | 'suit' | 'coat';

export interface Work {
  id: string;
  category: Category;
  // 作品名が届くまでは見た目の説明を仮の名前にしている
  name: { ja: string; en: string };
  materials: { ja: string; en: string } | null;
  note: { ja: string; en: string } | null;
  images: ImageMetadata[];
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
    name: { ja: '和柄のロングコート', en: 'Long Coat' },
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
    name: { ja: '青の和柄とオーガンジーのドレス', en: 'Blue Dress with Organza Cape' },
    materials: null,
    note: null,
    images: [photo('14'), photo('15'), photo('17')],
  },
  {
    id: 'look-08',
    category: 'dress',
    name: { ja: '花鳥柄のロングドレス', en: 'Floral Bird-Motif Gown' },
    materials: null,
    note: null,
    images: [photo('18'), photo('16'), photo('23'), photo('24')],
  },
  {
    id: 'look-09',
    category: 'dress',
    name: { ja: '黒レザーと赤のドレス', en: 'Black Leather and Red Dress' },
    materials: null,
    note: null,
    images: [photo('21'), photo('19')],
  },
  {
    id: 'look-10',
    category: 'dress',
    name: { ja: '花柄ジャケットとフリルスカート', en: 'Floral Jacket and Ruffled Skirt' },
    materials: null,
    note: null,
    images: [photo('20'), photo('22'), photo('25')],
  },
  {
    id: 'look-11',
    category: 'suit',
    name: { ja: '黒ジャケットと波柄のセットアップ', en: 'Black Jacket and Wave-Pattern Set' },
    materials: null,
    note: null,
    images: [photo('26')],
  },
];

export const heroImage = photo('23');
export const storyImage = photo('13');
