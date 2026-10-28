// くるみ ブランドサイト ヒアリングフォーム
// 1問ずつ回答 → 「送信」でスプレッドシートの「回答」シートに自動保存する

// スプレッドシートのIDを入れると、単体のスクリプトからでもそのシートに保存する
// 空のままなら、このスクリプトを開いたスプレッドシートに保存する
const SPREADSHEET_ID = '';
const SHEET_NAME = '回答';
const HEADERS = ['No', 'セクション', '質問', '回答', '状態', '最終更新', '入力データ'];
const COL = { no: 1, section: 2, question: 3, answer: 4, status: 5, updated: 6, raw: 7 };

const FILE_CHOICES = ['LINEで送りました', 'これから送ります', 'データがありません'];

// type: text（1行）/ textarea（複数行）/ choice（1つ選ぶ）/ multi（複数選ぶ）
// other: 「その他」を選ぶと自由記入欄が出る
// note: 選択肢の下に出す補足の記入欄（任意）
const QUESTIONS = [
  // 1. ブランドについて
  { section: 'ブランドについて', q: 'ブランド名「くるみ」の正式な表記を教えてください。', hint: 'ひらがな／ローマ字／ロゴ上の表記など', type: 'text', placeholder: '例：くるみ／KURUMI' },
  { section: 'ブランドについて', q: 'ブランドの立ち上げ時期と、最初の作品を発表した時期を教えてください。', type: 'textarea', placeholder: '例：2024年春に立ち上げ、同年秋に初めて発表' },
  { section: 'ブランドについて', q: 'ブランドを一言で表すと、どんな言葉になりますか？', hint: 'キャッチコピーの候補があれば複数でも大丈夫です', type: 'textarea' },
  { section: 'ブランドについて', q: '胡桃さんにとっての「新しい和」とは何ですか？従来の着物や和装と何が違うのかを、ご自身の言葉で教えてください。', type: 'textarea' },
  { section: 'ブランドについて', q: 'ブランドとして大切にしている価値観やこだわりを、3つほど挙げてください。', type: 'textarea' },
  { section: 'ブランドについて', q: '他の和素材ブランドや着物リメイクブランドと比べて、「くるみ」ならではの強み・違いはどこだと思いますか？', type: 'textarea' },

  // 2. 胡桃さんご自身について
  { section: '胡桃さんについて', q: 'サイトに載せるお名前の表記を教えてください。', hint: '漢字／ひらがな／ローマ字／肩書き', type: 'textarea', placeholder: '例：横山胡桃／Kurumi Yokoyama／デザイナー' },
  { section: '胡桃さんについて', q: 'これまでの経歴を、時系列で教えてください。', type: 'textarea', placeholder: '例：神奈川で誕生 → 中学生で沖縄へ移住 → タレント・モデル活動 → ブランド立ち上げ → ミラノ' },
  { section: '胡桃さんについて', q: 'タレント・モデル時代の主な出演作・実績のうち、サイトに掲載してよいものを教えてください。', type: 'textarea' },
  { section: '胡桃さんについて', q: '「人を笑顔にしたい」と思うようになった原体験で、特に印象に残っているエピソードを具体的に教えてください。', hint: 'ご家族との思い出、ファンの方からの言葉など', type: 'textarea' },
  { section: '胡桃さんについて', q: '沖縄で戦争について学んだ経験と「笑顔が広がれば争いは起きない」という思いを、サイトにどこまで載せたいですか？', type: 'choice', options: ['しっかり書きたい', 'さりげなく触れたい', '載せたくない'], note: '補足があれば（任意）' },
  { section: '胡桃さんについて', q: '大河ドラマや歴史上の女性・お姫様の中で、特に影響を受けた人物や作品はありますか？', type: 'textarea' },
  { section: '胡桃さんについて', q: 'ミラノでの活動内容を教えてください。', hint: 'イベント名、時期、どんなことをしたか、反響など', type: 'textarea' },

  // 3. 作品・商品について
  { section: '作品・商品について', q: '現在作っているアイテムの種類を教えてください。', hint: '当てはまるものをすべて選んでください', type: 'multi', options: ['ドレス', 'ジャケット'], other: true },
  { section: '作品・商品について', q: 'よく使う和素材（着物の種類、帯など）と、組み合わせる異素材（レザー、レースなど）を教えてください。', type: 'textarea' },
  { section: '作品・商品について', q: '作品集に載せたい代表作の写真を、5〜10点ほどLINEでお送りいただけますか？', type: 'choice', options: ['LINEで送りました', 'これから送ります'], note: 'それぞれの作品名・使った素材・コンセプト（わかる範囲で）' },
  { section: '作品・商品について', q: '参考価格の目安を教えてください。', type: 'textarea', placeholder: '例：ドレス 〇〇円〜、ジャケット 〇〇円〜' },
  { section: '作品・商品について', q: 'オーダーの流れを教えてください。', hint: '対面かオンラインか、納期の目安、お支払い方法も', type: 'textarea', placeholder: '例：問い合わせ → 打ち合わせ → 採寸 → 制作 → お渡し' },
  { section: '作品・商品について', q: 'お客様が素材（着物など）を持ち込んでオーダーすることはできますか？', type: 'choice', options: ['できる', 'できない', '内容によって相談'], note: '条件などがあれば（任意）' },

  // 4. お客様について
  { section: 'お客様について', q: '主にどんな方に着てほしいですか？', hint: '年代、ライフスタイル、着ていくシーンなど', type: 'textarea' },
  { section: 'お客様について', q: 'これまでにオーダーされたお客様はどんな方が多いですか？掲載してよい感想やお声があれば教えてください。', type: 'textarea' },
  { section: 'お客様について', q: '海外のお客様は、どの国・地域の方を特に意識していますか？', type: 'textarea' },

  // 5. 今後の展開・ビジョン
  { section: '今後の展開', q: '3年後・5年後に、ブランドとしてどうなっていたいですか？', type: 'textarea' },
  { section: '今後の展開', q: 'インバウンド向けの体験（和の文化体験＋試着・オーダー、職人さんとの生地作り体験など）は、サイトに載せたいですか？', type: 'choice', options: ['載せたい', 'まだ載せない', 'わからない'], note: '決まっていることがあれば（任意）' },
  { section: '今後の展開', q: '今後予定しているイベント・展示会・コラボなどがあれば教えてください。', type: 'textarea' },

  // 6. デザインについて
  { section: 'デザインについて', q: '「この雰囲気が好き」というWebサイトやブランドがあれば、URLや名前を教えてください。', hint: 'アパレル以外でも大丈夫です', type: 'textarea' },
  { section: 'デザインについて', q: '逆に「こういうのは避けたい」というデザインや雰囲気はありますか？', type: 'textarea' },
  { section: 'デザインについて', q: '色について、「黒金ベース＋虹色の差し色」の方向性はイメージに近いですか？', type: 'choice', options: ['イメージに近い', '少し違う', '全く違う'], note: '他に候補の色があれば（任意）' },
  { section: 'デザインについて', q: 'ロゴデータをLINEでお送りいただけますか？', hint: 'AI・PDF・PNGなど、お持ちの形式で大丈夫です', type: 'choice', options: FILE_CHOICES, note: '補足があれば（任意）' },

  // 7. 素材・掲載情報
  { section: '素材・掲載情報', q: 'サイトで使える写真・動画（ミラノの写真・動画、作品写真、プロフィール写真など）をLINEでお送りいただけますか？', type: 'choice', options: FILE_CHOICES, note: 'カメラマンのクレジット表記が必要なものがあれば' },
  { section: '素材・掲載情報', q: '会社情報として、サイトに載せてよいものを選んでください。', hint: '当てはまるものをすべて選んでください', type: 'multi', options: ['会社名', '法人番号', '所在地', '代表者名', '設立日', '事業内容'], note: '補足があれば（任意）' },
  { section: '素材・掲載情報', q: '連携・掲載したいSNSアカウントを教えてください。', hint: 'Instagram、TikTok、YouTubeなど。URLかアカウント名で', type: 'textarea' },

  // 8. 機能・運用について
  { section: '機能・運用について', q: 'お問い合わせフォームで、お客様に入力してほしい項目を選んでください。', hint: '当てはまるものをすべて選んでください', type: 'multi', options: ['お名前', '連絡先', '希望アイテム', 'ご予算', '着用予定日', '着用シーン', '素材の持ち込み有無'], other: true },
  { section: '機能・運用について', q: 'お問い合わせの通知を受け取るメールアドレスを教えてください。', type: 'text', placeholder: '例：info@example.com' },
  { section: '機能・運用について', q: '英語ページの文章は、こちらで翻訳してよいですか？', type: 'choice', options: ['お任せします', '確認してくれる人がいる'], note: '補足があれば（任意）' },
  { section: '機能・運用について', q: 'ブログ・お知らせは、どのくらいの頻度で更新したいですか？', type: 'choice', options: ['週1回以上', '月2〜3回', '月1回', '不定期'], note: 'どんな内容を発信したいか（任意）' },
  { section: '機能・運用について', q: '独自ドメイン（〇〇.comなど）はお持ちですか？', type: 'choice', options: ['持っている', '持っていない（希望の名前がある）', '持っていない（お任せ）'], note: 'ドメイン名・希望の名前' },
  { section: '機能・運用について', q: '公開希望日や、それに合わせたいイベントなどはありますか？', type: 'textarea' },
].map((item, i) => Object.assign({ no: i + 1 }, item));

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('くるみ ヒアリング')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// 最初に1回だけ実行する。「回答」シートを作って質問を並べる（既存の回答は消さない）
function setup() {
  const ss = spreadsheet_();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold').setBackground('#1a1a1a').setFontColor('#d4af37');

  QUESTIONS.forEach((item) => {
    const row = item.no + 1;
    sheet.getRange(row, COL.no, 1, 3).setValues([[item.no, item.section, item.q]]);
    if (!sheet.getRange(row, COL.status).getValue()) {
      sheet.getRange(row, COL.status).setValue('未回答');
    }
  });

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(COL.no, 50);
  sheet.setColumnWidth(COL.section, 140);
  sheet.setColumnWidth(COL.question, 360);
  sheet.setColumnWidth(COL.answer, 420);
  sheet.setColumnWidth(COL.status, 80);
  sheet.setColumnWidth(COL.updated, 140);
  sheet.getRange(2, COL.question, QUESTIONS.length, 2).setWrap(true).setVerticalAlignment('top');
  sheet.hideColumns(COL.raw);
}

// 画面を開いたときに、質問と保存済みの回答をまとめて返す
function getState() {
  const sheet = getSheet_();
  const rows = sheet.getRange(2, 1, QUESTIONS.length, HEADERS.length).getValues();
  const saved = {};
  rows.forEach((r, i) => {
    if (r[COL.raw - 1]) saved[i + 1] = JSON.parse(r[COL.raw - 1]);
  });
  return { questions: QUESTIONS, saved: saved };
}

// 「送信」で呼ばれる。その質問の行に回答を書き込む
function saveAnswer(no, data) {
  const item = QUESTIONS[no - 1];
  if (!item) throw new Error('質問が見つかりません: ' + no);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const row = no + 1;
    const sheet = getSheet_();
    sheet.getRange(row, COL.answer, 1, 4).setValues([[
      formatAnswer_(item, data),
      '回答済み',
      Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm'),
      JSON.stringify(data),
    ]]);
  } finally {
    lock.releaseLock();
  }
  return true;
}

function spreadsheet_() {
  return SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet_() {
  const sheet = spreadsheet_().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('「回答」シートがありません。先に setup を実行してください。');
  return sheet;
}

// スプレッドシートで読みやすい形にする
function formatAnswer_(item, data) {
  if (item.type === 'text' || item.type === 'textarea') return data.text;

  const picked = (data.choices || []).map((c) => (c === 'その他' ? 'その他：' + data.other : c));
  const lines = [picked.join('、')];
  if (data.note) lines.push('補足：' + data.note);
  return lines.join('\n');
}
