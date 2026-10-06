// 店舗オーナー向け管理画面（/kuchikomi）
import { useCallback, useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import {
  listStores,
  saveStore,
  deleteStore,
  listResponses,
  addResponse,
  storageMode,
} from "./storage";
import { summarize, neededFiveStars, toCsv } from "./analytics";
import { generateReply } from "./reviewGen";
import { googleReviewUrl } from "./Survey";
import { CATEGORIES, INDUSTRIES, LANGS, categoryLabel, newStore } from "./presets";

const TABS = [
  { id: "dashboard", label: "ダッシュボード" },
  { id: "settings", label: "アンケート設定" },
  { id: "qr", label: "QRコード・POP" },
  { id: "responses", label: "回答一覧" },
  { id: "reply", label: "AI返信" },
  { id: "simulator", label: "評価シミュレーター" },
];

export function surveyUrl(storeId) {
  return `${window.location.origin}/r/${storeId}`;
}

// ─── 共通パーツ ─────────────────────────────────────────
function Bar({ value, max, color, label, suffix = "" }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className="kk-bar-row">
      <span className="kk-bar-label">{label}</span>
      <span className="kk-bar-track">
        <span className="kk-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </span>
      <span className="kk-bar-value">
        {value}
        {suffix}
      </span>
    </div>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div className="kk-stat">
      <div className="kk-stat-label">{label}</div>
      <div className="kk-stat-value">{value}</div>
      {sub && <div className="kk-stat-sub">{sub}</div>}
    </div>
  );
}

// ─── ダッシュボード ─────────────────────────────────────
function Dashboard({ store, responses, onSeed }) {
  const s = useMemo(() => summarize(responses, store), [responses, store]);
  const maxRating = Math.max(1, ...s.ratingDist);
  const maxCat = Math.max(1, ...s.byCategory.map((c) => c.count));
  const maxDay = Math.max(1, ...s.days.map((d) => d.count));

  if (!s.n) {
    return (
      <div className="kk-panel kk-empty">
        <p>まだ回答がありません。</p>
        <p className="kk-muted">「QRコード・POP」タブからQRコードを発行して店頭に設置しましょう。</p>
        <button className="kk-btn" onClick={onSeed}>
          サンプルデータで画面を試す
        </button>
      </div>
    );
  }

  return (
    <div className="kk-grid">
      <div className="kk-stats">
        <Stat label="アンケート回答数" value={s.n} />
        <Stat label="平均満足度" value={`★${s.avg.toFixed(2)}`} />
        <Stat label="Google投稿へ進んだ数" value={s.google} sub={`投稿率 ${(s.googleRate * 100).toFixed(0)}%`} />
        <Stat label="お店への改善要望" value={s.feedback} sub="回答一覧で確認" />
      </div>

      <div className="kk-panel">
        <h3>満足度の分布</h3>
        {[5, 4, 3, 2, 1].map((r) => (
          <Bar
            key={r}
            label={`★${r}`}
            value={s.ratingDist[r - 1]}
            max={maxRating}
            color={r >= 4 ? "#16a34a" : r === 3 ? "#d97706" : "#dc2626"}
          />
        ))}
      </div>

      <div className="kk-panel">
        <h3>評価されているポイント（カテゴリ別）</h3>
        {s.byCategory.map((c) => (
          <Bar key={c.id} label={c.label} value={c.count} max={maxCat} color={c.color} />
        ))}
      </div>

      <div className="kk-panel">
        <h3>よく選ばれた項目 TOP5</h3>
        <ol className="kk-rank">
          {s.topOptions.slice(0, 5).map((o) => (
            <li key={o.id}>
              <span>{o.label}</span>
              <span className="kk-tag">{categoryLabel(o.cat)}</span>
              <b>{o.count}</b>
            </li>
          ))}
        </ol>
      </div>

      <div className="kk-panel">
        <h3>直近14日の回答数</h3>
        <div className="kk-columns">
          {s.days.map((d) => (
            <div key={d.key} className="kk-col" title={`${d.label}: ${d.count}件`}>
              <span className="kk-col-fill" style={{ height: `${(d.count / maxDay) * 100}%` }} />
              <span className="kk-col-label">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── アンケート設定 ─────────────────────────────────────
function Settings({ store, onSave, onDelete }) {
  const [form, setForm] = useState(store);
  const [saved, setSaved] = useState(false);
  useEffect(() => setForm(store), [store]);

  const set = (k, v) => {
    setSaved(false);
    setForm((f) => ({ ...f, [k]: v }));
  };
  const setOption = (id, k, v) =>
    set(
      "options",
      form.options.map((o) => (o.id === id ? { ...o, [k]: v } : o))
    );
  const setCoupon = (k, v) => set("coupon", { ...form.coupon, [k]: v });

  function addOption() {
    set("options", [
      ...form.options,
      { id: Math.random().toString(36).slice(2, 10), cat: "quality", label: "", phrase: "", en: "", phraseEn: "" },
    ]);
  }

  function resetOptions(industry) {
    if (!window.confirm(`「${INDUSTRIES[industry].label}」の初期項目で置き換えますか？`)) return;
    setSaved(false);
    setForm((f) => ({
      ...f,
      industry,
      options: INDUSTRIES[industry].options(),
      visitPurpose: [...INDUSTRIES[industry].visitPurpose],
    }));
  }

  async function save() {
    const cleaned = {
      ...form,
      name: form.name.trim(),
      options: form.options.filter((o) => o.label.trim()).map((o) => ({ ...o, phrase: o.phrase.trim() || o.label.trim() })),
    };
    await onSave(cleaned);
    setSaved(true);
  }

  return (
    <div className="kk-panel kk-form">
      <h3>基本情報</h3>
      <label>
        店舗名
        <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="例：カフェ365 渋谷店" />
      </label>
      <label>
        業種
        <div className="kk-row">
          <select value={form.industry} onChange={(e) => resetOptions(e.target.value)}>
            {Object.entries(INDUSTRIES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </label>
      <label>
        Google口コミ投稿URL または Place ID
        <input
          value={form.googleReviewUrl}
          onChange={(e) => set("googleReviewUrl", e.target.value)}
          placeholder="ChIJ... または https://g.page/r/.../review"
        />
        <small className="kk-muted">
          Googleビジネスプロフィール管理画面の「クチコミを依頼」で取得できるURL、または Place ID を入力してください。
          {form.googleReviewUrl && (
            <>
              {" "}
              <a href={googleReviewUrl(form.googleReviewUrl)} target="_blank" rel="noreferrer">
                投稿画面を確認 ↗
              </a>
            </>
          )}
        </small>
      </label>
      <label>
        口コミ文のトーン
        <select value={form.tone} onChange={(e) => set("tone", e.target.value)}>
          <option value="friendly">親しみやすい</option>
          <option value="polite">丁寧</option>
          <option value="casual">カジュアル</option>
        </select>
      </label>

      <h3>アンケート項目（良かった点）</h3>
      <p className="kk-muted">
        「表示名」はお客様が選ぶボタン、「口コミでの言い回し」はAI/テンプレートが文章を作るときの材料になります。カテゴリは分析の分類に使われます。
      </p>
      <div className="kk-options">
        {form.options.map((o) => (
          <div key={o.id} className="kk-option">
            <input value={o.label} placeholder="表示名" onChange={(e) => setOption(o.id, "label", e.target.value)} />
            <input value={o.phrase} placeholder="口コミでの言い回し" onChange={(e) => setOption(o.id, "phrase", e.target.value)} />
            <select value={o.cat} onChange={(e) => setOption(o.id, "cat", e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <input value={o.en || ""} placeholder="英語表示（任意）" onChange={(e) => setOption(o.id, "en", e.target.value)} />
            <button
              className="kk-btn kk-btn-ghost"
              aria-label="削除"
              onClick={() => set("options", form.options.filter((x) => x.id !== o.id))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button className="kk-btn" onClick={addOption}>
        ＋ 項目を追加
      </button>

      <label>
        利用シーンの選択肢（カンマ区切り）
        <input
          value={form.visitPurpose.join(",")}
          onChange={(e) => set("visitPurpose", e.target.value.split(/[,、]/).map((s) => s.trim()).filter(Boolean))}
        />
      </label>
      <label>
        NGワード（カンマ区切り。口コミ文・返信文に含めない語句）
        <input
          value={form.ngWords.join(",")}
          onChange={(e) => set("ngWords", e.target.value.split(/[,、]/).map((s) => s.trim()).filter(Boolean))}
          placeholder="例：激安,最安,No.1"
        />
      </label>

      <h3>対応言語</h3>
      <div className="kk-row kk-wrap">
        {Object.entries(LANGS).map(([k, v]) => (
          <label key={k} className="kk-check">
            <input
              type="checkbox"
              checked={form.languages.includes(k)}
              disabled={k === "ja"}
              onChange={(e) =>
                set("languages", e.target.checked ? [...form.languages, k] : form.languages.filter((x) => x !== k))
              }
            />
            {v}
          </label>
        ))}
      </div>

      <h3>回答特典（クーポン・抽選）</h3>
      <p className="kk-muted">
        特典は「アンケート回答」へのお礼として、Googleに投稿したかどうかに関係なく全員に表示されます（口コミ投稿の見返りにするとGoogleのポリシー違反になるため）。
      </p>
      <label className="kk-check">
        <input type="checkbox" checked={form.coupon.enabled} onChange={(e) => setCoupon("enabled", e.target.checked)} />
        特典を表示する
      </label>
      {form.coupon.enabled && (
        <>
          <label>
            形式
            <select value={form.coupon.mode} onChange={(e) => setCoupon("mode", e.target.value)}>
              <option value="coupon">全員にクーポン</option>
              <option value="lottery">抽選</option>
            </select>
          </label>
          {form.coupon.mode === "lottery" && (
            <label>
              当選確率（%）
              <input
                type="number"
                min="0"
                max="100"
                value={form.coupon.winRate}
                onChange={(e) => setCoupon("winRate", e.target.value)}
              />
            </label>
          )}
          <label>
            特典タイトル
            <input value={form.coupon.title} onChange={(e) => setCoupon("title", e.target.value)} placeholder="次回ドリンク1杯無料" />
          </label>
          <label>
            説明
            <input value={form.coupon.body} onChange={(e) => setCoupon("body", e.target.value)} placeholder="次回ご来店時に有効" />
          </label>
          <label>
            クーポンコード（任意）
            <input value={form.coupon.code} onChange={(e) => setCoupon("code", e.target.value)} />
          </label>
        </>
      )}

      <div className="kk-row kk-sticky">
        <button className="kk-btn kk-btn-primary" onClick={save} disabled={!form.name.trim()}>
          保存する
        </button>
        {saved && <span className="kk-ok">保存しました</span>}
        <span className="kk-spacer" />
        <button className="kk-btn kk-btn-danger" onClick={onDelete}>
          店舗を削除
        </button>
      </div>
    </div>
  );
}

// ─── QRコード・POP ──────────────────────────────────────
function QrPanel({ store }) {
  const url = surveyUrl(store.id);
  const [dataUrl, setDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(url, { width: 600, margin: 2, errorCorrectionLevel: "M" })
      .then(setDataUrl)
      .catch(() => setDataUrl(""));
  }, [url]);

  return (
    <div className="kk-grid">
      <div className="kk-panel">
        <h3>アンケートURL</h3>
        <div className="kk-url">
          <code>{url}</code>
          <button
            className="kk-btn"
            onClick={async () => {
              await navigator.clipboard?.writeText(url);
              setCopied(true);
            }}
          >
            {copied ? "コピー済み" : "コピー"}
          </button>
          <a className="kk-btn" href={url} target="_blank" rel="noreferrer">
            開く ↗
          </a>
        </div>
        <p className="kk-muted">LINE公式アカウントのあいさつメッセージ、レシート、予約完了メールなどに貼り付けて使えます。</p>
        {storageMode === "local" && (
          <p className="kk-warn">
            現在はお試しモード（ブラウザ内保存）です。お客様のスマホから回答を集めるには Supabase の設定が必要です（README参照）。
          </p>
        )}
      </div>

      <div className="kk-panel kk-center">
        <h3>店頭POP</h3>
        <div className="kk-pop" id="kk-pop">
          <div className="kk-pop-store">{store.name}</div>
          <div className="kk-pop-catch">ご感想をお聞かせください</div>
          <div className="kk-pop-sub">30秒のアンケートにご協力ください</div>
          {dataUrl && <img src={dataUrl} alt="QRコード" className="kk-pop-qr" />}
          {store.coupon?.enabled && store.coupon.title && (
            <div className="kk-pop-coupon">
              回答特典：{store.coupon.title}
              {store.coupon.mode === "lottery" ? "（抽選）" : ""}
            </div>
          )}
          <div className="kk-pop-lang">English / 中文 / 한국어 OK</div>
        </div>
        <div className="kk-row kk-center-row">
          {dataUrl && (
            <a className="kk-btn" href={dataUrl} download={`qr-${store.id}.png`}>
              QR画像をダウンロード
            </a>
          )}
          <button className="kk-btn kk-btn-primary" onClick={() => window.print()}>
            POPを印刷
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 回答一覧 ───────────────────────────────────────────
function Responses({ store, responses }) {
  const [filter, setFilter] = useState("all");
  const optionName = (id) => store.options.find((o) => o.id === id)?.label;
  const list = responses.filter((r) =>
    filter === "low" ? r.rating <= 2 : filter === "google" ? r.action === "google" : true
  );

  function downloadCsv() {
    const blob = new Blob([toCsv(responses, store)], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${store.name || "responses"}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const ACTION = { google: "Google投稿へ", skip: "投稿せず", feedback: "改善要望", drafted: "下書きのみ" };

  return (
    <div className="kk-panel">
      <div className="kk-row kk-wrap">
        {[
          ["all", "すべて"],
          ["low", "低評価（★1〜2）"],
          ["google", "Google投稿へ進んだ"],
        ].map(([k, v]) => (
          <button key={k} className={`kk-chip ${filter === k ? "on" : ""}`} onClick={() => setFilter(k)}>
            {v}
          </button>
        ))}
        <span className="kk-spacer" />
        <button className="kk-btn" onClick={downloadCsv} disabled={!responses.length}>
          CSV出力
        </button>
      </div>
      {list.length === 0 && <p className="kk-muted">該当する回答はありません。</p>}
      <ul className="kk-list">
        {list.map((r) => (
          <li key={r.id} className={`kk-item ${r.rating <= 2 ? "low" : ""}`}>
            <div className="kk-item-head">
              <span className="kk-stars-static">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
              <span className="kk-tag">{ACTION[r.action] || r.action}</span>
              {r.purpose && <span className="kk-tag">{r.purpose}</span>}
              {r.lang && r.lang !== "ja" && <span className="kk-tag">{LANGS[r.lang]}</span>}
              <span className="kk-spacer" />
              <time className="kk-muted">{new Date(r.createdAt).toLocaleString("ja-JP")}</time>
            </div>
            {r.selectedIds?.length > 0 && (
              <div className="kk-chips small">
                {r.selectedIds.map((id) => optionName(id) && <span key={id} className="kk-chip static">{optionName(id)}</span>)}
              </div>
            )}
            {r.feedback && (
              <p className="kk-feedback">
                <b>改善要望：</b>
                {r.feedback}
              </p>
            )}
            {r.review && <p className="kk-review">{r.review}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── AI返信 ─────────────────────────────────────────────
function ReplyPanel({ store }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [reply, setReply] = useState("");
  const [source, setSource] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    const r = await generateReply({ store, rating, review });
    setReply(r.text);
    setSource(r.source);
    setBusy(false);
  }

  const ng = store.ngWords.filter((w) => reply.includes(w));

  return (
    <div className="kk-panel kk-form">
      <h3>口コミへの返信文を作成</h3>
      <p className="kk-muted">Googleに届いた口コミを貼り付けると、返信文の案を作成します。内容を確認してからGoogleビジネスプロフィールで返信してください。</p>
      <label>
        口コミの評価
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              ★{n}
            </option>
          ))}
        </select>
      </label>
      <label>
        口コミ本文
        <textarea className="kk-textarea" rows={5} value={review} onChange={(e) => setReview(e.target.value)} />
      </label>
      <button className="kk-btn kk-btn-primary" onClick={run} disabled={busy}>
        {busy ? "作成中…" : "返信文を作成"}
      </button>
      {reply && (
        <>
          <label>
            返信文{source === "template" && <span className="kk-tag">テンプレート</span>}
            <textarea className="kk-textarea" rows={7} value={reply} onChange={(e) => setReply(e.target.value)} />
          </label>
          {ng.length > 0 && <p className="kk-error">NGワードが含まれています：{ng.join(", ")}</p>}
          <button className="kk-btn" onClick={() => navigator.clipboard?.writeText(reply)}>
            コピー
          </button>
        </>
      )}
    </div>
  );
}

// ─── 評価シミュレーター ─────────────────────────────────
function Simulator({ store, responses, onSave }) {
  const [rating, setRating] = useState(store.googleStats?.rating || "");
  const [count, setCount] = useState(store.googleStats?.count || "");
  const [target, setTarget] = useState("");
  useEffect(() => {
    setRating(store.googleStats?.rating || "");
    setCount(store.googleStats?.count || "");
  }, [store]);

  const avg = Number(rating);
  const cnt = Number(count);
  const valid = avg > 0 && avg <= 5 && cnt >= 0 && count !== "";
  const rows = valid
    ? [0.1, 0.2, 0.3, 0.5]
        .map((d) => Math.round((avg + d) * 10) / 10)
        .filter((t) => t < 5)
        .map((t) => ({ t, need: neededFiveStars(avg, cnt, t) }))
    : [];
  const custom = valid && target ? neededFiveStars(avg, cnt, target) : null;

  // 1ヶ月あたりのGoogle投稿ペースから、到達までの目安期間を出す
  const monthAgo = Date.now() - 30 * 24 * 3600 * 1000;
  const perMonth = responses.filter((r) => r.action === "google" && r.rating === 5 && new Date(r.createdAt) > monthAgo).length;

  return (
    <div className="kk-panel kk-form">
      <h3>Google評価シミュレーター</h3>
      <p className="kk-muted">現在のGoogleマップ上の評価と件数を入れると、目標評価までに必要な★5口コミの件数を計算します。</p>
      <div className="kk-row kk-wrap">
        <label>
          現在の評価
          <input type="number" step="0.1" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="4.2" />
        </label>
        <label>
          現在の件数
          <input type="number" min="0" value={count} onChange={(e) => setCount(e.target.value)} placeholder="120" />
        </label>
        <button className="kk-btn" onClick={() => onSave({ ...store, googleStats: { rating, count } })}>
          この数値を保存
        </button>
      </div>
      {valid && (
        <>
          <table className="kk-table">
            <thead>
              <tr>
                <th>目標</th>
                <th>必要な★5の件数</th>
                <th>到達目安</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ t, need }) => (
                <tr key={t}>
                  <td>★{t.toFixed(1)}</td>
                  <td>
                    <b>{need}</b> 件
                  </td>
                  <td>{perMonth ? `約${Math.ceil(need / perMonth)}ヶ月` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <label>
            任意の目標評価
            <input type="number" step="0.01" min="1" max="4.99" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="4.5" />
          </label>
          {custom !== null && (
            <p className="kk-big">
              ★{Number(target).toFixed(2)} まであと <b>{custom}</b> 件の★5口コミが必要です
            </p>
          )}
          <p className="kk-muted">
            直近30日で★5の回答からGoogle投稿へ進んだ件数：{perMonth}件。Googleの表示評価は小数第2位以下の扱いや投稿の反映状況により実際と多少ずれることがあります。
          </p>
        </>
      )}
    </div>
  );
}

// ─── サンプルデータ ─────────────────────────────────────
async function seedResponses(store) {
  const purposes = store.visitPurpose;
  for (let i = 0; i < 40; i++) {
    const rating = [5, 5, 5, 5, 4, 4, 4, 3, 2, 1][Math.floor(Math.random() * 10)];
    const picks = store.options.filter(() => Math.random() < (rating >= 4 ? 0.35 : 0.1));
    const d = new Date();
    d.setDate(d.getDate() - Math.floor(Math.random() * 14));
    const action = rating <= 2 ? "feedback" : Math.random() < 0.7 ? "google" : "skip";
    await addResponse({
      storeId: store.id,
      rating,
      purpose: purposes[Math.floor(Math.random() * purposes.length)] || "",
      selectedIds: picks.map((o) => o.id),
      categories: [...new Set(picks.map((o) => o.cat))],
      comment: "",
      lang: Math.random() < 0.15 ? "en" : "ja",
      review: rating >= 3 ? picks.map((o) => o.phrase).join("。") + (picks.length ? "。" : "") : "",
      feedback: rating <= 2 ? "（サンプル）提供までの待ち時間が長かったです" : "",
      action,
      createdAt: d.toISOString(),
      sample: true,
    });
  }
}

// ─── 画面全体 ───────────────────────────────────────────
export default function Admin() {
  const [stores, setStores] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [responses, setResponses] = useState([]);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIndustry, setNewIndustry] = useState("restaurant");
  const [error, setError] = useState("");

  const current = stores?.find((s) => s.id === currentId) || null;

  const reloadStores = useCallback(async () => {
    try {
      const list = await listStores();
      setStores(list);
      setCurrentId((id) => (list.some((s) => s.id === id) ? id : list[0]?.id || null));
    } catch (e) {
      setError(`店舗の読み込みに失敗しました: ${e.message}`);
      setStores([]);
    }
  }, []);

  const reloadResponses = useCallback(async () => {
    if (!currentId) return setResponses([]);
    try {
      setResponses(await listResponses(currentId));
    } catch (e) {
      setError(`回答の読み込みに失敗しました: ${e.message}`);
    }
  }, [currentId]);

  useEffect(() => {
    reloadStores();
  }, [reloadStores]);
  useEffect(() => {
    reloadResponses();
  }, [reloadResponses]);

  async function handleSave(store) {
    try {
      await saveStore(store);
      await reloadStores();
    } catch (e) {
      setError(`保存に失敗しました: ${e.message}`);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    const s = { ...newStore(newIndustry), name: newName.trim() };
    await handleSave(s);
    setCurrentId(s.id);
    setCreating(false);
    setNewName("");
    setTab("settings");
  }

  async function handleDelete() {
    if (!current || !window.confirm(`「${current.name}」と回答データをすべて削除しますか？`)) return;
    await deleteStore(current.id);
    setCurrentId(null);
    await reloadStores();
  }

  if (stores === null) return <div className="kk-admin"><p className="kk-muted">読み込み中…</p></div>;

  return (
    <div className="kk-admin">
      <header className="kk-admin-head">
        <a href="/kuchikomi" className="kk-logo">
          口コミアシスト
        </a>
        {stores.length > 0 && (
          <select className="kk-store-select" value={currentId || ""} onChange={(e) => setCurrentId(e.target.value)}>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name || "(名称未設定)"}
              </option>
            ))}
          </select>
        )}
        <button className="kk-btn kk-btn-primary" onClick={() => setCreating(true)}>
          ＋ 店舗を追加
        </button>
      </header>

      {error && (
        <p className="kk-error" onClick={() => setError("")}>
          {error}
        </p>
      )}

      {creating && (
        <form className="kk-panel kk-form" onSubmit={handleCreate}>
          <h3>店舗を追加</h3>
          <label>
            店舗名
            <input autoFocus value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="例：カフェ365 渋谷店" />
          </label>
          <label>
            業種（アンケート項目の初期テンプレート）
            <select value={newIndustry} onChange={(e) => setNewIndustry(e.target.value)}>
              {Object.entries(INDUSTRIES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <div className="kk-row">
            <button type="button" className="kk-btn" onClick={() => setCreating(false)}>
              キャンセル
            </button>
            <button className="kk-btn kk-btn-primary" disabled={!newName.trim()}>
              作成する
            </button>
          </div>
        </form>
      )}

      {!current && !creating && (
        <div className="kk-panel kk-empty">
          <h2>Googleの口コミを、お客様の「良かった」から増やす</h2>
          <p>
            店頭QRコードから30秒のアンケートに答えてもらい、選んだ内容をもとに口コミ文の下書きを作成。
            お客様は自分で内容を確認・編集してGoogleマップに投稿できます。
          </p>
          <button className="kk-btn kk-btn-primary" onClick={() => setCreating(true)}>
            最初の店舗を登録する
          </button>
        </div>
      )}

      {current && (
        <>
          <nav className="kk-tabs">
            {TABS.map((t) => (
              <button key={t.id} className={`kk-tab ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </nav>
          {tab === "dashboard" && (
            <Dashboard
              store={current}
              responses={responses}
              onSeed={async () => {
                await seedResponses(current);
                reloadResponses();
              }}
            />
          )}
          {tab === "settings" && <Settings store={current} onSave={handleSave} onDelete={handleDelete} />}
          {tab === "qr" && <QrPanel store={current} />}
          {tab === "responses" && <Responses store={current} responses={responses} />}
          {tab === "reply" && <ReplyPanel store={current} />}
          {tab === "simulator" && <Simulator store={current} responses={responses} onSave={handleSave} />}
        </>
      )}
    </div>
  );
}
