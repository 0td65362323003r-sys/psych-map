// 口コミ文・返信文の生成。/api の AI 関数を優先し、使えない環境ではテンプレートで生成する。

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function findNgWords(text, ngWords = []) {
  return ngWords.filter((w) => w && text.includes(w));
}

// ─── テンプレート生成（APIキー無しでも動くフォールバック） ───
export function templateReview({ store, rating, purpose, selected, comment, lang }) {
  const en = lang !== "ja";
  const phrases = shuffle(selected).map((o) => (en ? o.phraseEn || o.en : o.phrase));

  if (en) {
    const open = rating >= 4
      ? pick([`I visited ${store.name}${purpose ? ` for ${purpose}` : ""}.`, `Had a great time at ${store.name}.`])
      : `I visited ${store.name}.`;
    const body = phrases.map((p) => `${p}.`).join(" ");
    const close = rating >= 4 ? pick(["I'd definitely come back!", "Highly recommended."]) : "";
    return [open, body, comment, close].filter(Boolean).join(" ");
  }

  const open =
    rating >= 5
      ? pick([`${purpose ? `${purpose}で` : ""}${store.name}さんを利用しました。`, `${store.name}さんに${purpose ? `${purpose}で` : ""}伺いました。`])
      : rating >= 4
      ? `${purpose ? `${purpose}で` : ""}${store.name}さんを利用しました。`
      : `${store.name}さんを利用しました。`;

  // 「〜でした。」が続きすぎないように、間に接続語を挟む
  const connectors = ["", "また、", "それに、", ""];
  const body = phrases
    .map((p, i) => `${i > 0 ? connectors[i % connectors.length] : ""}${p}。`)
    .join("");

  const close =
    rating >= 5
      ? pick(["また伺いたいと思います！", "ぜひまた利用したいです。", "友人にもおすすめしたいお店です。"])
      : rating >= 4
      ? pick(["また利用したいと思います。", "次回も楽しみにしています。"])
      : "";

  const userComment = comment ? (/[。！!？?]$/.test(comment) ? comment : `${comment}。`) : "";
  return [open, body, userComment, close].join("");
}

export function templateReply({ storeName, rating, review }) {
  const head = "この度はご来店いただき、また口コミをお寄せいただき誠にありがとうございます。";
  if (rating >= 4) {
    return `${head}${review ? "いただいたお言葉、スタッフ一同大変励みになります。" : ""}今後もご期待に沿えるよう努めてまいりますので、またのご来店を心よりお待ちしております。\n\n${storeName} スタッフ一同`;
  }
  if (rating === 3) {
    return `${head}至らない点があったことを真摯に受け止め、より満足いただけるよう改善してまいります。またの機会がございましたら、ぜひお声がけください。\n\n${storeName} スタッフ一同`;
  }
  return `口コミをお寄せいただき、誠にありがとうございます。この度はご期待に沿えず、大変申し訳ございませんでした。いただいたご指摘はスタッフ全員で共有し、改善に努めてまいります。もしよろしければ、お店まで直接お声をお聞かせいただけますと幸いです。\n\n${storeName} スタッフ一同`;
}

// ─── AI 生成（Vercel の /api 関数） ───────────────────────
async function callApi(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`api ${res.status}`);
  const json = await res.json();
  if (!json.text) throw new Error("empty");
  return json.text.trim();
}

export async function generateReview(input) {
  const { store, rating, purpose, selected, comment, lang } = input;
  try {
    const text = await callApi("/api/generate-review", {
      storeName: store.name,
      industry: store.industry,
      tone: store.tone,
      ngWords: store.ngWords,
      rating,
      purpose,
      points: selected.map((o) => o.phrase),
      comment,
      lang,
    });
    return { text, source: "ai" };
  } catch {
    return { text: templateReview(input), source: "template" };
  }
}

export async function generateReply({ store, rating, review }) {
  try {
    const text = await callApi("/api/generate-reply", {
      storeName: store.name,
      industry: store.industry,
      ngWords: store.ngWords,
      rating,
      review,
    });
    return { text, source: "ai" };
  } catch {
    return { text: templateReply({ storeName: store.name, rating, review }), source: "template" };
  }
}
