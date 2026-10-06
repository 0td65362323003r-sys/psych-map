// Googleに届いた口コミへの、店舗からの返信文案を作る
const { handle, clip } = require("./_claude");

module.exports = (req, res) =>
  handle(req, res, (b) => {
    const ng = (Array.isArray(b.ngWords) ? b.ngWords : []).slice(0, 50).map((w) => clip(w, 30));
    const rating = Math.min(5, Math.max(1, Number(b.rating) || 5));

    const system = [
      "あなたは店舗オーナーに代わって、Googleマップの口コミへの返信文案を書くアシスタントです。",
      "口コミと同じ言語で返信してください。",
      "口コミの具体的な内容に一言触れ、テンプレート感を減らしてください。",
      "低評価には言い訳や反論をせず、謝意・お詫び・具体的な改善姿勢を示し、必要なら直接の連絡を促してください。",
      "個人情報・来店日時など口コミに書かれていない事実は書かないでください。",
      "200文字前後、返信本文のみを出力し、最後に店名の署名を入れてください。",
      ng.length ? `次の語句は使用禁止です: ${ng.join("、")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const user = [
      `店名: ${clip(b.storeName, 60)}`,
      `業種: ${clip(b.industry, 30)}`,
      `評価: ★${rating}`,
      `口コミ本文:\n${clip(b.review, 2000) || "（本文なし・星のみ）"}`,
    ].join("\n");

    return { system, user };
  });
