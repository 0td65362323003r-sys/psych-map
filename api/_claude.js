// Vercel Serverless Functions 共通: Claude API 呼び出し
const AnthropicModule = require("@anthropic-ai/sdk");

const Anthropic = AnthropicModule.default || AnthropicModule;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5-5";

async function complete({ system, user, maxTokens = 2000 }) {
  if (!process.env.ANTHROPIC_API_KEY) {
    const err = new Error("ANTHROPIC_API_KEY is not set");
    err.status = 503;
    throw err;
  }
  const client = new Anthropic();
  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    // 短文生成なので思考は浅くてよい
    output_config: { effort: "low" },
    // 安全分類で断られた場合はサーバー側で別モデルに切り替えて再実行
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system,
    messages: [{ role: "user", content: user }],
  });
  if (response.stop_reason === "refusal") {
    const err = new Error("refused");
    err.status = 422;
    throw err;
  }
  return response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();
}

// 簡易レート制限（同一インスタンス内・IP単位で1分20回まで）
const hits = new Map();
function rateLimited(req) {
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0] || "unknown";
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 20;
}

function clip(s, n) {
  return String(s || "").slice(0, n);
}

async function handle(req, res, build) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }
  if (rateLimited(req)) {
    res.status(429).json({ error: "too many requests" });
    return;
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const text = await complete(build(body));
    res.status(200).json({ text });
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
}

module.exports = { handle, clip };
