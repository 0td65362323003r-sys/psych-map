// くるみ ブランドサイト お問い合わせの受け口
// サイトのフォームから届いた内容を「問い合わせ」シートに1行追加し、通知メールを送る

const SHEET_NAME = '問い合わせ';
const NOTIFY_TO = 'kurumiandco@gmail.com';
const HEADERS = ['受付日時', '言語', 'お名前', 'メールアドレス', '希望アイテム', 'ご予算', '着用予定日', '着用シーン', '素材の持ち込み', '内容', '見ていた作品', '対応状況'];
const STATUSES = ['未対応', '返信済み', '成約'];

// 各欄の長さの上限。これを超える送信は受け付けない
const LIMITS = { name: 100, email: 200, item: 100, budget: 100, date: 20, scene: 400, fabric: 50, message: 3000, ref: 20, lang: 2 };

function doPost(e) {
  const p = (e && e.parameter) || {};
  // 人には見えない欄に入力がある送信は、迷惑送信として保存しない（相手には成功に見せる）
  if (p.hp_url) return json_({ ok: true });

  const v = {};
  for (const key in LIMITS) {
    const value = String(p[key] || '').trim();
    if (value.length > LIMITS[key]) return json_({ ok: false, error: 'too_long:' + key });
    v[key] = value;
  }
  if (!v.name || !v.item) return json_({ ok: false, error: 'missing' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return json_({ ok: false, error: 'email' });

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json_({ ok: false, error: 'busy' });
  try {
    const sheet = getSheet_();
    const now = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
    const row = [now, v.lang, v.name, v.email, v.item, v.budget, v.date, v.scene, v.fabric, v.message, v.ref].map(cell_);
    sheet.appendRow(row.concat([STATUSES[0]]));
  } finally {
    lock.releaseLock();
  }

  // 保存はできているので、メールが送れなくても成功として返す（シートに残っている）
  try {
    MailApp.sendEmail({
      to: NOTIFY_TO,
      replyTo: v.email,
      subject: '【KURUMI】お問い合わせが届きました（' + oneLine_(v.name) + '様）',
      body: [
        'サイトからお問い合わせが届きました。このメールに返信すると、お客様に届きます。',
        '',
        'お名前：' + v.name,
        'メールアドレス：' + v.email,
        '希望アイテム：' + v.item,
        'ご予算：' + (v.budget || '-'),
        '着用予定日：' + (v.date || '-'),
        '着用シーン：' + (v.scene || '-'),
        '素材の持ち込み：' + (v.fabric || '-'),
        '見ていた作品：' + (v.ref || '-'),
        '言語：' + (v.lang === 'en' ? '英語' : '日本語'),
        '',
        '内容：',
        v.message || '-',
      ].join('\n'),
    });
  } catch (err) {
    console.error(err);
  }

  return json_({ ok: true });
}

// 「=」「+」「-」「@」で始まる値は、シートで数式として動かないよう先頭に ' を付ける
function cell_(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function oneLine_(value) {
  return value.replace(/[\r\n]+/g, ' ').slice(0, 50);
}

// 最初に1回だけ実行する。シートの見出しと「対応状況」の選択肢を用意する
function setup() {
  const sheet = getSheet_();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
  sheet.setFrozenRows(1);
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
  sheet.getRange(2, HEADERS.length, 1000, 1).setDataValidation(rule);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

// サイトのフォームは、この返事の ok を見てからお礼を表示する
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
