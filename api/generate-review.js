// 顧客のアンケート回答から、本人が投稿するための口コミ下書きを作る
const { handle, clip } = require("./_claude");

const LANG_NAME = { ja: "日本語", en: "English", zh: "简体中文", ko: "한국어" };
const TONE = {
  friendly: "親しみやすく自然な口調",
  polite: "丁寧で落ち着いた口調",
  casual: "くだけたカジュアルな口調",
};

module.exports = (req, res) =>
  handle(req, res, (b) => {
    const points = (Array.isArray(b.points) ? b.points : []).slice(0, 12).map((p) => clip(p, 80));
    const ng = (Array.isArray(b.ngWords) ? b.ngWords : []).slice(0, 50).map((w) => clip(w, 30));
    const lang = LANG_NAME[b.lang] ? b.lang : "ja";
    const rating = Math.min(5, Math.max(1, Number(b.rating) || 5));

    const system = [
      "あなたは来店客本人がGoogleマップに投稿する口コミの下書きを手伝うアシスタントです。",
      "必ず客が選んだ項目と客自身のコメントに書かれた事実だけを使い、体験していないこと・具体的なメニュー名・数字・人名などを創作しないでください。",
      "誇張した宣伝文句や不自然な絶賛は避け、一般のお客さんが書いたような自然な文章にしてください。",
      "満足度が低い場合は、その評価に見合った率直なトーンにし、無理に褒めないでください。",
      `出力は${LANG_NAME[lang]}で、口コミ本文のみ（前置き・見出し・引用符なし）。長さは${lang === "ja" ? "80〜180文字" : "40〜90 words"}程度。`,
      ng.length ? `次の語句は使用禁止です: ${ng.join("、")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const user = [
      `店名: ${clip(b.storeName, 60)}`,
      `業種: ${clip(b.industry, 30)}`,
      `文体: ${TONE[b.tone] || TONE.friendly}`,
      `満足度: ★${rating}`,
      b.purpose ? `利用シーン: ${clip(b.purpose, 30)}` : "",
      `良かった点: ${points.length ? points.join(" / ") : "（選択なし）"}`,
      b.comment ? `客のコメント: ${clip(b.comment, 300)}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return { system, user };
  });
