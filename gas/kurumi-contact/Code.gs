// くるみ ブランドサイト お問い合わせの受け口
// サイトのフォームから届いた内容を「問い合わせ」シートに1行追加し、通知メールを送る

const SHEET_NAME = '問い合わせ';
const NOTIFY_TO = 'kurumiandco@gmail.com';
const HEADERS = ['受付日時', '言語', 'お名前', 'メールアドレス', '希望アイテム', 'ご予算', '着用予定日', '着用シーン', '素材の持ち込み', '内容', '見ていた作品', '対応状況'];
const STATUSES = ['未対応', '返信済み', '成約'];

function doPost(e) {
  const p = e.parameter;
  // 人には見えない欄に入力がある送信は、迷惑送信として保存しない
  if (p.website) return ok_();
  if (!p.name || !p.email || !p.item) return ok_();

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const now = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
    sheet.appendRow([now, p.lang, p.name, p.email, p.item, p.budget || '', p.date || '', p.scene || '', p.fabric || '', p.message || '', p.ref || '', STATUSES[0]]);
  } finally {
    lock.releaseLock();
  }

  MailApp.sendEmail({
    to: NOTIFY_TO,
    replyTo: p.email,
    subject: '【KURUMI】お問い合わせが届きました（' + p.name + '様）',
    body: [
      'サイトからお問い合わせが届きました。このメールに返信すると、お客様に届きます。',
      '',
      'お名前：' + p.name,
      'メールアドレス：' + p.email,
      '希望アイテム：' + p.item,
      'ご予算：' + (p.budget || '-'),
      '着用予定日：' + (p.date || '-'),
      '着用シーン：' + (p.scene || '-'),
      '素材の持ち込み：' + (p.fabric || '-'),
      '見ていた作品：' + (p.ref || '-'),
      '言語：' + (p.lang === 'en' ? '英語' : '日本語'),
      '',
      '内容：',
      p.message || '-',
    ].join('\n'),
  });

  return ok_();
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

function ok_() {
  return ContentService.createTextOutput('ok');
}
