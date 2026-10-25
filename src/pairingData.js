import { TASTES } from "./ShishaHearing";
import { CATALOG } from "./catalogData";

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
  { id: "watermelon", label: "スイカ", cat: "sweet", power: 1 },
  { id: "melon", label: "メロン", cat: "sweet", power: 1 },
  { id: "cherry", label: "チェリー", cat: "sweet", power: 2 },
  { id: "kiwi", label: "キウイ", cat: "sweet", power: 1 },
  { id: "passionfruit", label: "パッションフルーツ", cat: "sweet", power: 2 },
  { id: "pear", label: "洋ナシ", cat: "sweet", power: 1 },
  { id: "guava", label: "グァバ", cat: "sweet", power: 1 },
  { id: "banana", label: "バナナ", cat: "sweet", power: 2 },
  { id: "cactus", label: "サボテン", cat: "sweet", power: 1 },
  { id: "milk", label: "ミルク・クリーム", cat: "sweet", power: 1 },
  { id: "anise", label: "アニス", cat: "spice", power: 3 },
  { id: "blacktea", label: "紅茶", cat: "perfume", power: 1 },
  { id: "cola", label: "コーラ", cat: "other", power: 2 },
  { id: "candy", label: "キャンディ・ガム", cat: "other", power: 2 },
  { id: "coffee", label: "コーヒー", cat: "other", power: 3 },
];

// ヒアリングの5分類に、相性表とフレーバー一覧で使う「その他」を足したもの
export const CATEGORIES = [...TASTES, { id: "other", label: "その他", icon: "🥤" }];

export const RATINGS = {
  3: { mark: "◎", label: "鉄板" },
  2: { mark: "○", label: "合う" },
  1: { mark: "△", label: "要調整" },
  0: { mark: "×", label: "ぶつかる" },
};

export const TYPES = {
  same: { label: "同調", desc: "香りの方向が近い同士。自然に馴染んで、香りに厚みが出る。成分が共通するかは「根拠」で確認" },
  contrast: { label: "対比", desc: "違う味をぶつけてお互いを引き立てる。甘さの輪郭がはっきりする" },
  classic: { label: "定番", desc: "料理・飲み物・香水で定番の組み合わせ。初めての人でも想像しやすい" },
  clash: { label: "衝突", desc: "片方が潰れたり、濁ったりしやすい組み合わせ" },
};

// [フレーバーA, フレーバーB, 相性(0〜3), 型, 理由]
// 載っていない組み合わせは「未登録」として扱う
export const PAIRS = [
  // ピーチ
  ["peach", "jasmine", 2, "same", "ジャスミンラクトンが両方に含まれる。ただしジャスミンでは微量で、主役はリナロールなど"],
  ["peach", "whitetea", 3, "classic", "ピーチティーの定番。お茶の渋みが桃の甘さを上品にまとめる"],
  ["peach", "berry", 3, "classic", "ピーチメルバ（桃×ラズベリー）の組み合わせ"],
  ["peach", "mango", 2, "same", "どちらもラクトン系の甘さで、南国寄りにまとまる"],
  ["peach", "coconut", 2, "same", "ラクトン（ココナッツや桃の甘い香りの成分）が共通"],
  ["peach", "rose", 2, "same", "どちらもバラ科。ただし同じ科だからといって香り成分が共通するとは限らない"],
  ["peach", "vanilla", 2, "classic", "ピーチメルバ（桃×ラズベリーソース×バニラアイス）の組み合わせ"],
  ["peach", "lemon", 2, "contrast", "レモンの酸味で桃の甘さの輪郭が出る"],
  ["peach", "grapefruit", 2, "contrast", "ほろ苦さが甘さを締めて、大人っぽくなる"],
  ["peach", "mint", 2, "contrast", "冷感が甘さを引き締める"],
  ["peach", "musk", 2, "classic", "香水でよくある組み合わせ。甘く柔らかい香り寄り"],
  ["peach", "cinnamon", 1, "contrast", "温かみが出るが、シナモンが勝ちやすい。ごく少量で"],
  ["peach", "ginger", 1, "contrast", "ピリッと締まるが、桃の繊細さが消えやすい"],
  ["peach", "chocolate", 1, "contrast", "チョコの重さで桃が埋もれやすい"],

  // マンゴー
  ["mango", "mint", 3, "contrast", "甘さを冷感で切る、シーシャの定番"],
  ["mango", "pineapple", 3, "same", "エチル2-メチルブタノエート（フルーティーなエステル）が両方の鍵になる香り成分"],
  ["mango", "coconut", 3, "classic", "マンゴー×ココナッツ。タイのマンゴースティッキーライスの組み合わせ"],
  ["mango", "cardamom", 2, "classic", "甘いラッシーはカルダモンで香りづけされることがあり、マンゴーラッシーはその仲間"],
  ["mango", "lime", 2, "contrast", "酸味で甘さが軽くなる"],
  ["mango", "orange", 2, "same", "リモネンやミルセンなどのテルペンが共通（マンゴーは品種で差が大きい）"],
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
  ["grape", "jasmine", 2, "same", "アントラニル酸メチル（コンコード系ぶどうの香りの主役）がジャスミンにも含まれる"],
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
  ["berry", "caramel", 2, "same", "フラネオール（甘く焦げたような香り成分）が共通。特にイチゴ。ラズベリーでは主役ではない"],
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
  ["coconut", "vanilla", 2, "same", "共通する香り成分の裏付けは見つからなかった。甘くクリーミーな印象が近い"],
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
  ["chocolate", "caramel", 3, "classic", "フラネオール（カラメルのような香り）がココアの鍵になる香り成分の1つ。お菓子でも定番"],
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
  ["mint", "cardamom", 2, "same", "1,8-シネオール（スーッとする香り成分）が共通。ミント側では少量"],
  ["mint", "whitetea", 2, "classic", "ミントティーの組み合わせ"],
  ["mint", "chai", 1, "contrast", "冷感でスパイスの温かみが消えやすい"],
  ["mint", "rose", 1, "contrast", "どちらも強く、ミントが勝ちやすい。ごく少量で"],
  ["mint", "lavender", 1, "same", "1,8-シネオールとリナロールが共通するが、どちらも片方では微量。ハーブ同士で草っぽくなりやすい"],
  ["mint", "cinnamon", 1, "contrast", "冷感と温感が打ち消し合いやすい"],
  ["mint", "musk", 1, "contrast", "冷感がムスクの柔らかさを消しやすい"],

  // レモン
  ["lemon", "ginger", 3, "same", "シトラール（レモンらしい香り成分）が共通。ただしジンジャーのシトラール量は品種・産地で大きく違う"],
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
  ["orange", "cardamom", 2, "same", "リモネンとリナロールが共通。ただしカルダモンでは少量"],
  ["orange", "ginger", 2, "contrast", "ピリッとした刺激で甘い柑橘が締まる"],
  ["orange", "bergamot", 2, "same", "柑橘同士。リモネンが共通"],
  ["orange", "lavender", 2, "same", "リナロール（花のような香り成分）が共通"],
  ["orange", "chai", 2, "classic", "オレンジチャイ"],

  // チャイ
  ["chai", "cinnamon", 3, "same", "チャイを作るスパイスの1つ。シナモン感が強まる"],
  ["chai", "cardamom", 3, "same", "チャイを作るスパイスの1つ。香りが立つ"],
  ["chai", "ginger", 3, "same", "チャイを作るスパイスの1つ。ピリッと締まる"],

  // シナモン
  ["cinnamon", "cardamom", 2, "same", "共通する香り成分はシナモン側で1〜2%と少ない。温かいスパイス同士で、どちらも強いので少なめに"],
  ["cinnamon", "ginger", 2, "same", "共通する香り成分はシナモン側で1〜2%と少ない。温かいスパイス同士"],
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
  ["bergamot", "whitetea", 3, "same", "リナロールが共通（紅茶での研究）。アールグレイはベルガモットで香りづけした紅茶"],
  ["bergamot", "vanilla", 2, "classic", "アールグレイ×バニラのお菓子の組み合わせ"],

  // スイカ
  ["watermelon", "mint", 3, "contrast", "冷感で瑞々しさが際立つ。シーシャでよく売られている組み合わせ"],
  ["watermelon", "melon", 3, "same", "どちらもウリ科。スイカの青っぽい香り成分（C9アルデヒド）はメロンにもある。ただしメロンの主役はエステル"],
  ["watermelon", "berry", 2, "same", "甘酸っぱい赤い果実同士で馴染む"],
  ["watermelon", "lime", 2, "contrast", "酸味で瑞々しさがくっきりする"],
  ["watermelon", "lemon", 2, "contrast", "酸味で甘さが締まる"],
  ["watermelon", "candy", 2, "classic", "スイカ味のキャンディやガムの組み合わせ"],
  ["watermelon", "passionfruit", 2, "contrast", "パッションフルーツの酸味と香りで、薄い甘さに輪郭が出る"],
  ["watermelon", "peach", 2, "same", "瑞々しく柔らかい果実同士"],
  ["watermelon", "cactus", 2, "same", "どちらも淡く瑞々しい甘さ"],
  ["watermelon", "chocolate", 0, "clash", "瑞々しさがカカオの重さに埋もれる"],
  ["watermelon", "cinnamon", 0, "clash", "淡い甘さがスパイスに潰される"],

  // メロン
  ["melon", "mint", 2, "contrast", "冷感で甘さが軽くなる"],
  ["melon", "berry", 2, "same", "イチゴ×メロンのような甘い果実同士"],
  ["melon", "lime", 2, "contrast", "酸味で甘さが締まる"],
  ["melon", "milk", 2, "classic", "メロン×クリーム（クリームソーダ、メロンパフェ）の組み合わせ"],
  ["melon", "passionfruit", 2, "contrast", "酸味と南国の香りで、甘さに変化が出る"],
  ["melon", "mango", 2, "same", "甘く熟した果実同士"],
  ["melon", "chocolate", 0, "clash", "瑞々しさがカカオの重さに埋もれる"],
  ["melon", "cinnamon", 0, "clash", "淡い甘さがスパイスに潰される"],

  // チェリー
  ["cherry", "cola", 3, "classic", "チェリーコーラの組み合わせ"],
  ["cherry", "chocolate", 3, "classic", "黒い森のケーキ（チョコ×チェリー×クリーム）の組み合わせ"],
  ["cherry", "vanilla", 2, "classic", "チェリー×バニラのお菓子や飲み物の組み合わせ"],
  ["cherry", "berry", 2, "same", "赤い果実同士で甘酸っぱくまとまる"],
  ["cherry", "candy", 2, "classic", "チェリー味のキャンディやグミの組み合わせ"],
  ["cherry", "mint", 2, "contrast", "冷感で甘さが軽くなる"],
  ["cherry", "lime", 2, "contrast", "酸味で甘さがすっきりする"],
  ["cherry", "lemon", 2, "contrast", "酸味で甘さがすっきりする"],
  ["cherry", "cardamom", 2, "contrast", "清涼感のあるスパイスで甘さが締まる"],
  ["cherry", "cinnamon", 2, "classic", "チェリーパイ風の温かい甘さ"],

  // キウイ
  ["kiwi", "berry", 2, "classic", "キウイ×ストロベリーのジュースやスムージーの組み合わせ"],
  ["kiwi", "mint", 2, "contrast", "冷感で青っぽい酸味が際立つ"],
  ["kiwi", "apple", 2, "same", "(E)-2-ヘキセナールなど青っぽい香り成分が共通（品種で差がある）"],
  ["kiwi", "lime", 2, "same", "青い酸味同士で、すっきりまとまる"],
  ["kiwi", "banana", 2, "classic", "トロピカルスムージーでよくある組み合わせ"],
  ["kiwi", "pineapple", 2, "same", "酸味のある南国系の果実同士"],
  ["kiwi", "grapefruit", 2, "contrast", "ほろ苦さで酸味に深みが出る"],

  // パッションフルーツ
  ["passionfruit", "mango", 3, "same", "エチルブタノエートなどのフルーティーなエステルが両方の鍵になる香り成分（別々の研究から）"],
  ["passionfruit", "orange", 2, "classic", "POGジュース（パッションフルーツ×オレンジ×グァバ）の組み合わせ"],
  ["passionfruit", "pineapple", 2, "same", "酸味のある南国系の果実同士"],
  ["passionfruit", "mint", 2, "contrast", "冷感で酸味が際立つ"],
  ["passionfruit", "lime", 2, "contrast", "酸味が重なって、爽やかさが増す"],
  ["passionfruit", "peach", 2, "contrast", "酸味で桃の甘さが引き立つ"],
  ["passionfruit", "vanilla", 2, "classic", "ポルノスターマティーニ（バニラ×パッションフルーツ）の組み合わせ。元のレシピにライムは入らない"],
  ["passionfruit", "coconut", 2, "same", "南国系同士で、酸味とクリーミーさが補い合う"],

  // 洋ナシ
  ["pear", "vanilla", 2, "classic", "ポワール・ベル・エレーヌ（洋ナシ×バニラアイス×チョコ）の組み合わせ"],
  ["pear", "chocolate", 2, "classic", "ポワール・ベル・エレーヌ（洋ナシ×バニラアイス×チョコ）の組み合わせ"],
  ["pear", "apple", 2, "same", "どちらもバラ科の仁果類で、酢酸ヘキシルなどのエステルが共通。ただし洋ナシらしさの主役は別の成分"],
  ["pear", "cinnamon", 2, "classic", "洋ナシのコンポートにシナモンの組み合わせ"],
  ["pear", "caramel", 2, "classic", "洋ナシのキャラメリゼの組み合わせ"],
  ["pear", "ginger", 2, "contrast", "ピリッとした刺激で淡い甘さが締まる"],
  ["pear", "lemon", 2, "contrast", "酸味で淡い甘さに輪郭が出る"],

  // グァバ
  ["guava", "orange", 2, "classic", "POGジュース（パッションフルーツ×オレンジ×グァバ）の組み合わせ"],
  ["guava", "passionfruit", 2, "classic", "POGジュース（パッションフルーツ×オレンジ×グァバ）の組み合わせ"],
  ["guava", "mango", 2, "same", "南国系の甘い果実同士"],
  ["guava", "pineapple", 2, "same", "南国系の果実同士"],
  ["guava", "lime", 2, "contrast", "酸味で甘さがすっきりする"],

  // バナナ
  ["banana", "chocolate", 3, "classic", "チョコバナナの組み合わせ"],
  ["banana", "caramel", 3, "classic", "バナナフォスター（バナナ×キャラメル×シナモン×ラム）の組み合わせ"],
  ["banana", "milk", 3, "classic", "バナナミルク・バナナシェイクの組み合わせ"],
  ["banana", "vanilla", 2, "classic", "バナナプディングなど、バナナ×バニラのお菓子の組み合わせ"],
  ["banana", "berry", 2, "classic", "ストロベリーバナナ（スムージー）の組み合わせ"],
  ["banana", "cinnamon", 2, "classic", "バナナフォスター（バナナ×キャラメル×シナモン×ラム）の組み合わせ"],
  ["banana", "coconut", 2, "same", "南国系でまろやかな甘さ同士"],
  ["banana", "pineapple", 2, "same", "南国系の果実同士"],
  ["banana", "lime", 2, "classic", "バナナダイキリ（ラム×バナナ×ライム）の組み合わせ"],
  ["banana", "mint", 2, "contrast", "冷感でねっとりした甘さが軽くなる"],

  // サボテン
  ["cactus", "lime", 2, "contrast", "酸味で淡い甘さに輪郭が出る"],
  ["cactus", "berry", 2, "same", "赤い果実系の甘酸っぱさが馴染む"],
  ["cactus", "mint", 2, "contrast", "冷感で瑞々しさが際立つ"],
  ["cactus", "lemon", 2, "contrast", "酸味で淡い甘さに輪郭が出る"],

  // ミルク・クリーム
  ["milk", "chai", 3, "classic", "チャイは紅茶をミルクとスパイスで煮出す飲み物"],
  ["milk", "coffee", 3, "classic", "カフェラテ・カプチーノの組み合わせ"],
  ["milk", "vanilla", 3, "classic", "バニラアイスやミルクセーキの組み合わせ"],
  ["milk", "caramel", 3, "classic", "ドゥルセ・デ・レチェ（ミルクを煮詰めたキャラメル）の組み合わせ"],
  ["milk", "blacktea", 3, "classic", "ミルクティーの組み合わせ"],
  ["milk", "chocolate", 2, "classic", "ミルクチョコやココアの組み合わせ"],
  ["milk", "berry", 2, "classic", "ストロベリーミルクの組み合わせ"],
  ["milk", "mango", 2, "classic", "マンゴーラッシー（マンゴー×ヨーグルト）の組み合わせ"],
  ["milk", "orange", 2, "classic", "オレンジ×クリーム（クリームソーダ系）の組み合わせ"],
  ["milk", "cinnamon", 2, "classic", "オルチャータ（シナモン風味の米の飲み物）の組み合わせ"],
  ["milk", "rose", 2, "classic", "ファルーダ（ローズシロップ×ミルク）の組み合わせ"],
  ["milk", "coconut", 2, "same", "どちらもクリーミーでまろやか"],
  ["milk", "cardamom", 2, "classic", "チャイやラッシーでよく合わせる"],
  ["milk", "lemon", 0, "clash", "レモンの酸でミルク感が分離しやすい"],
  ["milk", "grapefruit", 0, "clash", "酸味と苦味でミルク感が分離しやすい"],

  // 紅茶
  ["blacktea", "bergamot", 3, "classic", "アールグレイ（ベルガモットで香りづけした紅茶）"],
  ["blacktea", "lemon", 3, "classic", "レモンティーの組み合わせ"],
  ["blacktea", "peach", 3, "classic", "ピーチティーの組み合わせ"],
  ["blacktea", "chai", 3, "same", "チャイは紅茶にスパイスとミルクを加えたもの"],
  ["blacktea", "apple", 2, "classic", "アップルティーの組み合わせ"],
  ["blacktea", "orange", 2, "classic", "オレンジティーの組み合わせ"],
  ["blacktea", "rose", 2, "classic", "ローズティーの組み合わせ"],
  ["blacktea", "lychee", 2, "classic", "ライチ紅茶の組み合わせ"],
  ["blacktea", "cardamom", 2, "classic", "チャイで使うスパイス"],
  ["blacktea", "cinnamon", 2, "classic", "シナモンティーの組み合わせ"],
  ["blacktea", "vanilla", 2, "classic", "バニラティーの組み合わせ"],
  ["blacktea", "lime", 2, "contrast", "酸味で渋みが軽くなる"],

  // コーヒー
  ["coffee", "chocolate", 3, "classic", "カフェモカの組み合わせ"],
  ["coffee", "caramel", 3, "classic", "キャラメルマキアートの組み合わせ"],
  ["coffee", "vanilla", 3, "classic", "バニララテの組み合わせ"],
  ["coffee", "cinnamon", 2, "classic", "シナモンコーヒー（カフェ・デ・オジャなど）の組み合わせ"],
  ["coffee", "cardamom", 2, "classic", "アラビアコーヒーはカルダモンで香りづけする"],
  ["coffee", "coconut", 2, "same", "ローストした香りとココナッツのまろやかさが合う"],

  // コーラ
  ["cola", "lime", 3, "classic", "クバ・リブレ（ラム×コーラ×ライム）の組み合わせ"],
  ["cola", "lemon", 2, "classic", "コーラにレモンを添える組み合わせ"],
  ["cola", "vanilla", 2, "classic", "バニラコーラの組み合わせ"],
  ["cola", "cinnamon", 2, "same", "コーラのレシピにはシナモンの仲間のカシアが使われることがある"],
  ["cola", "caramel", 2, "same", "コーラはカラメル色素で色づけされ、甘く焦げた印象が近い"],

  // キャンディ・ガム
  ["candy", "mint", 3, "classic", "ミントガムの組み合わせ。シーシャでも多い"],
  ["candy", "berry", 2, "classic", "ベリー味のキャンディやグミの組み合わせ"],
  ["candy", "pineapple", 2, "classic", "ホワイトグミベア系（パイン寄りのグミ味）の組み合わせ"],
  ["candy", "cinnamon", 2, "classic", "シナモンガムの組み合わせ"],
  ["candy", "grape", 2, "classic", "グレープ味のガムやキャンディの組み合わせ"],

  // アニス
  ["anise", "apple", 3, "classic", "ダブルアップル（2種類のリンゴ×アニス）はシーシャの定番"],
  ["anise", "mint", 2, "contrast", "アニスの甘い清涼感とミントの冷感が重なる"],
  ["anise", "cinnamon", 2, "same", "チャイやホットワインで一緒に使われるスパイス同士"],
  ["anise", "chai", 2, "same", "スターアニスはチャイのスパイスとしても使われる"],
  ["anise", "orange", 2, "classic", "ホットワインでよく合わせる組み合わせ"],

  // 市販品で2件以上組み合わされている組
  ["berry", "orange", 2, "contrast", "甘酸っぱいベリーに柑橘の明るさが加わる"],
  ["berry", "lime", 2, "contrast", "酸味が重なって、フレッシュさが増す"],
  ["berry", "grapefruit", 2, "contrast", "ほろ苦さで甘酸っぱさが締まる"],
  ["lemon", "pineapple", 2, "contrast", "酸味で南国の甘さがすっきりする"],
  ["lime", "orange", 2, "same", "柑橘同士。リモネンが共通"],
  ["mango", "grapefruit", 2, "contrast", "ほろ苦さで濃い甘さが締まる"],
  ["orange", "peach", 2, "contrast", "柑橘の明るさで桃の甘さが軽くなる"],
  ["orange", "pineapple", 2, "same", "明るい酸味のある果実同士。トロピカルジュースでもよくある"],
];

// 根拠の種類。ペアごとの根拠は EVIDENCE で上書きし、ないものは型から決める
export const BASIS = {
  compound: { label: "成分・文献あり", desc: "共通する香り成分を文献で確認した" },
  classic: { label: "定番・出典あり", desc: "料理や飲み物の定番であることを出典で確認した" },
  market: { label: "市販品あり", desc: "メーカーが1つの商品の中でこの2つを組み合わせて売っている（フレーバー一覧で確認）" },
  common: { label: "定番・出典未確認", desc: "一般によく知られる組み合わせだが、出典はまだつけていない" },
  opinion: { label: "主観・未検証", desc: "作成者の判断。実際に吸って確かめる必要がある" },
};

// [フレーバーA, フレーバーB, 根拠の種類, 文献確認の id（pairingSources.js の CLAIMS）]
const EVIDENCE = [
  ["peach", "jasmine", "compound", "c1"],
  ["peach", "coconut", "compound", "c2"],
  ["peach", "rose", "opinion", "c3"],
  ["apple", "rose", "compound", "c4"],
  ["grape", "jasmine", "compound", "c5"],
  ["grape", "rose", "compound", "c6"],
  ["grape", "lychee", "compound", "c7"],
  ["lychee", "rose", "compound", "c8"],
  ["lychee", "jasmine", "compound", "c9"],
  ["berry", "caramel", "compound", "c10"],
  ["pineapple", "caramel", "compound", "c11"],
  ["coconut", "vanilla", "opinion", "c12"],
  ["mango", "orange", "compound", "c13"],
  ["mango", "pineapple", "compound", "c14"],
  ["mint", "cardamom", "compound", "c15"],
  ["mint", "lavender", "compound", "c16"],
  ["lemon", "ginger", "compound", "c17"],
  ["lemon", "lime", "compound", "c18"],
  ["lemon", "grapefruit", "compound", "c18"],
  ["lemon", "orange", "compound", "c18"],
  ["lemon", "bergamot", "compound", "c18"],
  ["lime", "grapefruit", "compound", "c18"],
  ["grapefruit", "orange", "compound", "c18"],
  ["grapefruit", "bergamot", "compound", "c18"],
  ["orange", "bergamot", "compound", "c18"],
  ["lime", "orange", "compound", "c18"],
  ["orange", "lavender", "compound", "c19"],
  ["orange", "cardamom", "compound", "c20"],
  ["jasmine", "bergamot", "compound", "c21"],
  ["lavender", "bergamot", "compound", "c22"],
  ["bergamot", "whitetea", "compound", "c23"],
  ["cinnamon", "cardamom", "compound", "c24"],
  ["cinnamon", "ginger", "compound", "c24"],
  ["chocolate", "caramel", "compound", "c25"],
  ["lychee", "berry", "classic", "c26"],
  ["berry", "rose", "classic", "c26"],
  ["peach", "berry", "classic", "c27"],
  ["peach", "vanilla", "classic", "c27"],
  ["pineapple", "coconut", "classic", "c28"],
  ["mint", "lime", "classic", "c29"],
  ["lime", "ginger", "classic", "c29"],
  ["chocolate", "orange", "classic", "c30"],
  ["mango", "coconut", "classic", "c31"],
  ["mango", "cardamom", "classic", "c31"],
  ["chocolate", "cinnamon", "classic", "c32"],
  ["cardamom", "rose", "classic", "c33"],
  ["chai", "cinnamon", "classic", "c34"],
  ["chai", "cardamom", "classic", "c34"],
  ["chai", "ginger", "classic", "c34"],
  ["watermelon", "melon", "compound", "c35"],
  ["pear", "apple", "compound", "c36"],
  ["cherry", "chocolate", "classic", "c37"],
  ["cherry", "cola", "classic", "c38"],
  ["cola", "lime", "classic", "c39"],
  ["cola", "cinnamon", "classic", "c40"],
  ["pear", "vanilla", "classic", "c41"],
  ["pear", "chocolate", "classic", "c41"],
  ["banana", "caramel", "classic", "c42"],
  ["banana", "cinnamon", "classic", "c42"],
  ["banana", "lime", "classic", "c43"],
  ["guava", "orange", "classic", "c44"],
  ["guava", "passionfruit", "classic", "c44"],
  ["passionfruit", "orange", "classic", "c44"],
  ["milk", "caramel", "classic", "c45"],
  ["milk", "cinnamon", "classic", "c46"],
  ["milk", "rose", "classic", "c47"],
  ["coffee", "cardamom", "classic", "c48"],
  ["milk", "chai", "classic", "c49"],
  ["blacktea", "chai", "classic", "c49"],
  ["passionfruit", "vanilla", "classic", "c50"],
  ["passionfruit", "mango", "compound", "c51"],
  ["kiwi", "apple", "compound", "c53"],
  ["blacktea", "bergamot", "compound", "c23"],
];

function pairKey(a, b) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

// フレーバー一覧の風味タグを、相性表のフレーバーに寄せる
export const NOTE_TO_FLAVOR = {
  ...Object.fromEntries(FLAVORS.map((f) => [f.id, f.id])),
  strawberry: "berry", blueberry: "berry", raspberry: "berry", blackcurrant: "berry", cranberry: "berry",
  tangerine: "orange", cream: "milk", yogurt: "milk", bubblegum: "candy", licorice: "anise",
  greentea: "whitetea",
};

// 1つの商品の中で組み合わされているフレーバーの組（メーカーが実際に売っている組み合わせ）
const MARKET_MAP = new Map();
for (const [brand, name, , notes] of CATALOG) {
  const ids = [...new Set(notes.map((n) => NOTE_TO_FLAVOR[n]).filter(Boolean))];
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const key = pairKey(ids[i], ids[j]);
      if (!MARKET_MAP.has(key)) MARKET_MAP.set(key, []);
      MARKET_MAP.get(key).push({ brand, name });
    }
  }
}

export function marketProducts(a, b) {
  return MARKET_MAP.get(pairKey(a, b)) || [];
}

const EVIDENCE_MAP = new Map(EVIDENCE.map(([a, b, basis, claim]) => [pairKey(a, b), { basis, claim }]));

// 文献の根拠がなければ、市販品 → 定番（出典未確認）→ 主観の順で決める
function defaultBasis(a, b, type) {
  if (marketProducts(a, b).length > 0) return "market";
  return type === "classic" ? "common" : "opinion";
}

const PAIR_MAP = new Map(
  PAIRS.map(([a, b, rating, type, reason]) => {
    const evidence = EVIDENCE_MAP.get(pairKey(a, b)) || { basis: defaultBasis(a, b, type), claim: null };
    return [pairKey(a, b), { a, b, rating, type, reason, ...evidence }];
  })
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
