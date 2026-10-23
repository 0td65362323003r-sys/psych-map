// フレーバー相性表のデータ
// cat はヒアリングフォームの TASTES の id と同じ分類
// power は香りの主張の強さ（1:控えめ 〜 3:強い）。配合比の目安に使う
export const FLAVORS = [
  { id: "peach", label: "ピーチ", cat: "sweet", power: 1 },
  { id: "mango", label: "マンゴー", cat: "sweet", power: 1 },
  { id: "apple", label: "アップル", cat: "sweet", power: 1 },
  { id: "grape", label: "グレープ", cat: "sweet", power: 2 },
  { id: "lychee", label: "ライチ", cat: "sweet", power: 1 },
  { id: "berry", label: "ベリー", cat: "sweet", power: 1 },
  { id: "pineapple", label: "パイン", cat: "sweet", power: 1 },
  { id: "coconut", label: "ココナッツ", cat: "sweet", power: 2 },
  { id: "vanilla", label: "バニラ", cat: "sweet", power: 2 },
  { id: "chocolate", label: "チョコ", cat: "sweet", power: 2 },
  { id: "caramel", label: "キャラメル", cat: "sweet", power: 2 },
  { id: "mint", label: "ミント", cat: "fresh", power: 3 },
  { id: "lemon", label: "レモン", cat: "fresh", power: 2 },
  { id: "lime", label: "ライム", cat: "fresh", power: 2 },
  { id: "grapefruit", label: "グレープフルーツ", cat: "fresh", power: 2 },
  { id: "orange", label: "オレンジ", cat: "fresh", power: 1 },
  { id: "chai", label: "チャイ", cat: "spice", power: 2 },
  { id: "cinnamon", label: "シナモン", cat: "spice", power: 3 },
  { id: "cardamom", label: "カルダモン", cat: "spice", power: 3 },
  { id: "ginger", label: "ジンジャー", cat: "spice", power: 2 },
  { id: "rose", label: "ローズ", cat: "flower", power: 3 },
  { id: "jasmine", label: "ジャスミン", cat: "flower", power: 3 },
  { id: "lavender", label: "ラベンダー", cat: "flower", power: 3 },
  { id: "musk", label: "ムスク", cat: "perfume", power: 2 },
  { id: "bergamot", label: "ベルガモット", cat: "perfume", power: 2 },
  { id: "whitetea", label: "ホワイトティー", cat: "perfume", power: 1 },
];

export const RATINGS = {
  3: { mark: "◎", label: "鉄板" },
  2: { mark: "○", label: "合う" },
  1: { mark: "△", label: "要調整" },
  0: { mark: "×", label: "ぶつかる" },
};

export const TYPES = {
  same: { label: "同調", desc: "香り成分が共通する同士。自然に馴染んで、香りに厚みが出る" },
  contrast: { label: "対比", desc: "違う味をぶつけてお互いを引き立てる。甘さの輪郭がはっきりする" },
  classic: { label: "定番", desc: "料理・飲み物・香水で定番の組み合わせ。初めての人でも想像しやすい" },
  clash: { label: "衝突", desc: "片方が潰れたり、濁ったりしやすい組み合わせ" },
};

// [フレーバーA, フレーバーB, 相性(0〜3), 型, 理由]
// 載っていない組み合わせは「未登録」として扱う
export const PAIRS = [
  // ピーチ
  ["peach", "jasmine", 3, "same", "ラクトン系の甘い香りが共通。ジャスミンピーチティーの組み合わせ"],
  ["peach", "whitetea", 3, "classic", "ピーチティーの定番。お茶の渋みが桃の甘さを上品にまとめる"],
  ["peach", "berry", 3, "classic", "ピーチメルバ（桃×ラズベリー）の組み合わせ"],
  ["peach", "mango", 2, "same", "どちらもラクトン系の甘さで、南国寄りにまとまる"],
  ["peach", "coconut", 2, "same", "ラクトン（ココナッツや桃の甘い香りの成分）が共通"],
  ["peach", "rose", 2, "same", "どちらもバラ科。花の香りが桃の甘さに馴染む"],
  ["peach", "vanilla", 2, "classic", "ピーチ×バニラアイスのデザート系"],
  ["peach", "lemon", 2, "contrast", "レモンの酸味で桃の甘さの輪郭が出る"],
  ["peach", "grapefruit", 2, "contrast", "ほろ苦さが甘さを締めて、大人っぽくなる"],
  ["peach", "mint", 2, "contrast", "冷感が甘さを引き締める"],
  ["peach", "musk", 2, "classic", "香水でよくある組み合わせ。甘く柔らかい香り寄り"],
  ["peach", "cinnamon", 1, "contrast", "温かみが出るが、シナモンが勝ちやすい。ごく少量で"],
  ["peach", "ginger", 1, "contrast", "ピリッと締まるが、桃の繊細さが消えやすい"],
  ["peach", "chocolate", 1, "contrast", "チョコの重さで桃が埋もれやすい"],

  // マンゴー
  ["mango", "mint", 3, "contrast", "甘さを冷感で切る、シーシャの定番"],
  ["mango", "pineapple", 3, "same", "南国系の甘い果実香が共通。トロピカルにまとまる"],
  ["mango", "coconut", 3, "classic", "マンゴー×ココナッツ。タイのマンゴースティッキーライスの組み合わせ"],
  ["mango", "cardamom", 3, "classic", "マンゴーラッシーにカルダモンはインドの定番"],
  ["mango", "lime", 2, "contrast", "酸味で甘さが軽くなる"],
  ["mango", "orange", 2, "same", "どちらも柑橘系の香り成分（テルペン）を含む"],
  ["mango", "ginger", 2, "contrast", "スパイシーさが濃い甘さを締める"],
  ["mango", "vanilla", 2, "classic", "マンゴークリームのデザート系"],

  // アップル
  ["apple", "cinnamon", 3, "classic", "アップルパイの組み合わせ"],
  ["apple", "caramel", 3, "classic", "キャラメルアップルの組み合わせ"],
  ["apple", "rose", 2, "same", "どちらもバラ科で、ダマセノン（甘い果実と花の香り成分）が共通"],
  ["apple", "vanilla", 2, "classic", "焼きりんご×バニラのデザート系"],
  ["apple", "mint", 2, "contrast", "シャキッとした爽やかさが増す"],
  ["apple", "lemon", 2, "contrast", "酸味で青りんご寄りの爽やかさになる"],
  ["apple", "ginger", 2, "contrast", "ピリッとしたアクセントでりんごが締まる"],
  ["apple", "cardamom", 2, "contrast", "清涼感のあるスパイスで甘さが軽くなる"],
  ["apple", "chai", 2, "classic", "アップルチャイ。りんごの甘さとスパイスがよく合う"],
  ["apple", "grape", 2, "same", "果実同士で自然に馴染む"],
  ["apple", "berry", 2, "same", "果実同士で甘酸っぱくまとまる"],

  // グレープ
  ["grape", "mint", 3, "contrast", "グレープミント。シーシャの定番"],
  ["grape", "berry", 3, "same", "ベリー系の甘酸っぱい果実香が共通"],
  ["grape", "jasmine", 2, "same", "アントラニル酸メチル（ぶどうらしい香りの成分）がジャスミンにも含まれる"],
  ["grape", "rose", 2, "same", "マスカット系のゲラニオール（バラの香り成分）が共通"],
  ["grape", "lychee", 2, "same", "ゲラニオールが共通で、華やかな果実香になる"],
  ["grape", "lemon", 2, "contrast", "酸味で後味が軽くなる"],
  ["grape", "vanilla", 1, "contrast", "甘さが重なってくどくなりやすい"],

  // ライチ
  ["lychee", "rose", 3, "same", "ローズオキサイドやゲラニオールなど、ローズと同じ香り成分を含む"],
  ["lychee", "jasmine", 2, "same", "花の香りの成分が共通。華やかにまとまる"],
  ["lychee", "whitetea", 2, "classic", "ライチ紅茶の組み合わせ"],
  ["lychee", "berry", 2, "classic", "イスパハン（ローズ×ライチ×ラズベリー）の組み合わせ"],
  ["lychee", "peach", 2, "same", "どちらも繊細な甘い果実香"],
  ["lychee", "lemon", 2, "contrast", "酸味で甘さがすっきりする"],
  ["lychee", "grapefruit", 2, "contrast", "ほろ苦さで甘さが締まる"],
  ["lychee", "mint", 2, "contrast", "冷感で甘さが軽くなる"],
  ["lychee", "cinnamon", 0, "clash", "繊細な花の香りがスパイスに潰される"],
  ["lychee", "chocolate", 0, "clash", "チョコの重さでライチの香りが消える"],

  // ベリー
  ["berry", "vanilla", 3, "classic", "ベリー×バニラのデザート系"],
  ["berry", "chocolate", 3, "classic", "ベリー×チョコのデザート系"],
  ["berry", "rose", 3, "classic", "イスパハン（ローズ×ライチ×ラズベリー）の組み合わせ"],
  ["berry", "caramel", 2, "same", "フラネオール（甘く焦げたような香り成分）が共通"],
  ["berry", "lavender", 2, "classic", "ブルーベリー×ラベンダーは製菓の定番"],
  ["berry", "mint", 2, "contrast", "冷感で甘酸っぱさが際立つ"],
  ["berry", "lemon", 2, "contrast", "酸味が重なって、フレッシュさが増す"],
  ["berry", "cinnamon", 1, "contrast", "温かみが出るが、果実感が弱まる"],

  // パイン
  ["pineapple", "coconut", 3, "classic", "ピニャコラーダの組み合わせ"],
  ["pineapple", "caramel", 2, "same", "フラネオール（パインの甘い香り成分）が共通。焼きパインの方向"],
  ["pineapple", "vanilla", 2, "classic", "パイン×バニラのデザート系"],
  ["pineapple", "cinnamon", 2, "classic", "焼きパイン×シナモン"],
  ["pineapple", "mint", 2, "contrast", "冷感で南国の甘さが軽くなる"],
  ["pineapple", "lime", 2, "contrast", "酸味が重なって、ジューシーさが増す"],
  ["pineapple", "ginger", 2, "contrast", "ピリッとしたアクセントで甘さが締まる"],

  // ココナッツ
  ["coconut", "vanilla", 3, "same", "どちらもクリーミーな甘い香り（ラクトン、バニリン）"],
  ["coconut", "chocolate", 2, "classic", "ココナッツチョコのお菓子の組み合わせ"],
  ["coconut", "lime", 2, "contrast", "酸味で乳っぽさが軽くなる"],
  ["coconut", "chai", 2, "classic", "ココナッツミルクチャイ"],
  ["coconut", "caramel", 2, "same", "甘くまろやかな香り同士"],
  ["coconut", "mint", 1, "contrast", "冷感とクリーミーさが分離しがち。ミントはごく少量で"],
  ["coconut", "lemon", 1, "contrast", "酸味で乳っぽさが分離しやすい"],

  // バニラ
  ["vanilla", "caramel", 3, "same", "甘くまろやかな香り同士。王道のデザート系"],
  ["vanilla", "chocolate", 3, "classic", "チョコ×バニラのデザート系"],
  ["vanilla", "cinnamon", 3, "classic", "シナモンロールの組み合わせ"],
  ["vanilla", "chai", 3, "classic", "バニラチャイ。スパイスの角が丸くなる"],
  ["vanilla", "musk", 2, "classic", "香水のラストノートの定番"],
  ["vanilla", "lavender", 2, "classic", "ラベンダー×バニラは香水でも製菓でも定番"],
  ["vanilla", "rose", 2, "classic", "ローズ×バニラは香水の定番"],
  ["vanilla", "cardamom", 2, "contrast", "清涼感のあるスパイスで甘さが軽くなる"],
  ["vanilla", "mint", 2, "contrast", "冷感が甘さを引き締める"],
  ["vanilla", "orange", 2, "classic", "オレンジクリームの組み合わせ"],
  ["vanilla", "lemon", 1, "contrast", "酸味とクリーミーさが分離しやすい"],

  // チョコ
  ["chocolate", "mint", 3, "classic", "チョコミントの組み合わせ"],
  ["chocolate", "orange", 3, "classic", "オランジェット（オレンジピール×チョコ）の組み合わせ"],
  ["chocolate", "caramel", 3, "classic", "チョコ×キャラメルのお菓子の組み合わせ"],
  ["chocolate", "cinnamon", 2, "classic", "メキシカンチョコの組み合わせ"],
  ["chocolate", "cardamom", 2, "contrast", "清涼感のあるスパイスで重さが抜ける"],
  ["chocolate", "chai", 2, "classic", "チョコチャイ"],
  ["chocolate", "ginger", 1, "contrast", "ピリッとするが、チョコの重さと噛み合いにくい"],
  ["chocolate", "rose", 1, "contrast", "ローズの主張が強く、チョコと分離しやすい"],
  ["chocolate", "lemon", 0, "clash", "酸味とカカオの苦味がぶつかる"],
  ["chocolate", "grapefruit", 0, "clash", "苦味同士が重なって渋くなる"],
  ["chocolate", "jasmine", 0, "clash", "花の香りがカカオに埋もれて濁る"],

  // キャラメル
  ["caramel", "cinnamon", 2, "classic", "キャラメル×シナモンのお菓子の組み合わせ"],
  ["caramel", "chai", 2, "classic", "キャラメルチャイ"],
  ["caramel", "mint", 1, "contrast", "冷感とこってりした甘さが分離しやすい"],
  ["caramel", "rose", 0, "clash", "花の香りとキャラメルの重さが噛み合いにくい"],

  // ミント
  ["mint", "lime", 3, "classic", "モヒートの組み合わせ"],
  ["mint", "lemon", 3, "classic", "レモンミント。清涼感が最大になる"],
  ["mint", "grapefruit", 2, "contrast", "ほろ苦さと冷感で、キレのある味になる"],
  ["mint", "orange", 2, "contrast", "甘い柑橘を冷感で引き締める"],
  ["mint", "ginger", 2, "contrast", "冷感とピリッとした刺激が重なる"],
  ["mint", "cardamom", 2, "same", "シネオール（スーッとする香り成分）が共通"],
  ["mint", "whitetea", 2, "classic", "ミントティーの組み合わせ"],
  ["mint", "chai", 1, "contrast", "冷感でスパイスの温かみが消えやすい"],
  ["mint", "rose", 1, "contrast", "どちらも強く、ミントが勝ちやすい。ごく少量で"],
  ["mint", "lavender", 1, "same", "ハーブ同士で強く、草っぽくなりやすい"],
  ["mint", "cinnamon", 1, "contrast", "冷感と温感が打ち消し合いやすい"],
  ["mint", "musk", 1, "contrast", "冷感がムスクの柔らかさを消しやすい"],

  // レモン
  ["lemon", "ginger", 3, "same", "シトラール（レモンらしい香り成分）がジンジャーにも含まれる"],
  ["lemon", "whitetea", 3, "classic", "レモンティーの組み合わせ"],
  ["lemon", "lime", 2, "same", "柑橘同士。リモネン（柑橘の香り成分）が共通"],
  ["lemon", "grapefruit", 2, "same", "柑橘同士。リモネンが共通"],
  ["lemon", "orange", 2, "same", "柑橘同士。リモネンが共通"],
  ["lemon", "bergamot", 2, "same", "柑橘同士。リモネンが共通"],
  ["lemon", "lavender", 2, "classic", "レモン×ラベンダーは製菓の定番"],
  ["lemon", "chai", 0, "clash", "酸味でミルクっぽいスパイス感が分離する"],

  // ライム
  ["lime", "ginger", 3, "classic", "モスコミュールの組み合わせ"],
  ["lime", "grapefruit", 2, "same", "柑橘同士。リモネンが共通"],

  // グレープフルーツ
  ["grapefruit", "orange", 2, "same", "柑橘同士。リモネンが共通"],
  ["grapefruit", "ginger", 2, "contrast", "ほろ苦さとピリッとした刺激で、キレが出る"],
  ["grapefruit", "bergamot", 2, "same", "柑橘同士。リモネンが共通"],
  ["grapefruit", "rose", 2, "classic", "香水でよくある組み合わせ。苦味が花を軽くする"],
  ["grapefruit", "whitetea", 2, "contrast", "ほろ苦い柑橘とお茶で、すっきりまとまる"],

  // オレンジ
  ["orange", "cinnamon", 3, "classic", "ホットワインやオレンジ×シナモンのお菓子の組み合わせ"],
  ["orange", "cardamom", 2, "same", "カルダモンの柑橘っぽい香りが馴染む"],
  ["orange", "ginger", 2, "contrast", "ピリッとした刺激で甘い柑橘が締まる"],
  ["orange", "bergamot", 2, "same", "柑橘同士。リモネンが共通"],
  ["orange", "lavender", 2, "same", "リナロール（花のような香り成分）が共通"],
  ["orange", "chai", 2, "classic", "オレンジチャイ"],

  // チャイ
  ["chai", "cinnamon", 3, "same", "チャイを作るスパイスの1つ。シナモン感が強まる"],
  ["chai", "cardamom", 3, "same", "チャイを作るスパイスの1つ。香りが立つ"],
  ["chai", "ginger", 3, "same", "チャイを作るスパイスの1つ。ピリッと締まる"],

  // シナモン
  ["cinnamon", "cardamom", 2, "same", "温かいスパイス同士。どちらも強いので少なめに"],
  ["cinnamon", "ginger", 2, "same", "温かいスパイス同士"],
  ["cinnamon", "rose", 1, "contrast", "スパイスの主張で花の香りが潰れやすい"],

  // カルダモン
  ["cardamom", "ginger", 2, "same", "スパイス同士。清涼感と刺激が重なる"],
  ["cardamom", "rose", 2, "classic", "中東のお菓子ではローズ×カルダモンが定番"],

  // ローズ
  ["rose", "musk", 3, "classic", "香水の定番。ムスクがローズを柔らかく包む"],
  ["rose", "jasmine", 2, "same", "花同士で華やか。ただし重くなりやすい"],
  ["rose", "whitetea", 2, "classic", "ローズティーの組み合わせ"],
  ["rose", "bergamot", 2, "classic", "香水でよくある組み合わせ。柑橘が花を軽くする"],
  ["rose", "lavender", 1, "same", "花同士で強く、石鹸っぽくなりやすい"],

  // ジャスミン
  ["jasmine", "whitetea", 3, "classic", "ジャスミン茶の組み合わせ"],
  ["jasmine", "bergamot", 2, "same", "リナロール（花のような香り成分）が共通"],
  ["jasmine", "musk", 2, "classic", "香水でよくある組み合わせ"],
  ["jasmine", "vanilla", 2, "classic", "香水でよくある組み合わせ。甘く柔らかくなる"],

  // ラベンダー
  ["lavender", "bergamot", 3, "same", "リナロール、酢酸リナリルが共通。香りがよく馴染む"],
  ["lavender", "whitetea", 2, "classic", "ハーブティーのような穏やかな組み合わせ"],
  ["lavender", "musk", 2, "classic", "香水でよくある組み合わせ"],

  // ムスク
  ["musk", "whitetea", 3, "classic", "ホワイトムスク×ホワイトティーは香水の定番"],
  ["musk", "bergamot", 2, "classic", "香水の定番。トップとラストの組み合わせ"],

  // ベルガモット
  ["bergamot", "whitetea", 3, "same", "リナロールが共通。要はアールグレイ"],
  ["bergamot", "vanilla", 2, "classic", "アールグレイ×バニラのお菓子の組み合わせ"],
];

function pairKey(a, b) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

const PAIR_MAP = new Map(
  PAIRS.map(([a, b, rating, type, reason]) => [pairKey(a, b), { a, b, rating, type, reason }])
);

export function getPair(a, b) {
  return PAIR_MAP.get(pairKey(a, b)) || null;
}

export function getFlavor(id) {
  return FLAVORS.find((f) => f.id === id);
}

// 主張の強さの差から配合比の目安を出す。弱い方を多めにする
export function ratioHint(a, b) {
  const fa = getFlavor(a);
  const fb = getFlavor(b);
  const diff = Math.abs(fa.power - fb.power);
  if (diff === 0) return "5：5";
  const [weak, strong] = fa.power < fb.power ? [fa, fb] : [fb, fa];
  const ratio = diff === 1 ? "6：4" : "7：3";
  return `${weak.label}${ratio.split("：")[0]}：${strong.label}${ratio.split("：")[1]}`;
}

// 2つのフレーバーの両方と「合う」以上のフレーバー（つなぎ役の候補）
export function bridgeCandidates(a, b) {
  return FLAVORS.filter((f) => f.id !== a && f.id !== b)
    .map((f) => ({ flavor: f, pa: getPair(a, f.id), pb: getPair(b, f.id) }))
    .filter(({ pa, pb }) => pa && pb && pa.rating >= 2 && pb.rating >= 2)
    .sort((x, y) => y.pa.rating + y.pb.rating - (x.pa.rating + x.pb.rating));
}
