import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { FLAVORS, CATEGORIES, RATINGS, getPair, getFlavor, ratioHint } from "./pairingData";

export const SCORES = [
  { n: 1, label: "合わない" },
  { n: 2, label: "いまいち" },
  { n: 3, label: "普通" },
  { n: 4, label: "おいしい" },
  { n: 5, label: "最高" },
];

const TASTER_KEY = "shisha-taster";

function sortPair(a, b) {
  return a < b ? [a, b] : [b, a];
}

function readTaster() {
  try {
    return localStorage.getItem(TASTER_KEY) || "";
  } catch {
    return "";
  }
}

function saveTaster(name) {
  try {
    localStorage.setItem(TASTER_KEY, name);
  } catch {
    // 保存できなくても記録自体は続ける
  }
}

// 試飲記録の読み込み。テーブルがまだない場合は status が "missing" になる
export function useTastings() {
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("loading");

  const reload = useCallback(async () => {
    const { data, error } = await supabase
      .from("tastings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);
    if (error) {
      setStatus(error.code === "42P01" || error.code === "PGRST205" ? "missing" : "error");
      return;
    }
    setRecords(data);
    setStatus("ready");
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { records, status, reload };
}

export const TastingContext = createContext({ records: [], status: "loading", startRecord: () => {} });

export function pairStats(records, a, b) {
  const [x, y] = sortPair(a, b);
  const hits = records.filter((r) => r.flavor_a === x && r.flavor_b === y);
  if (hits.length === 0) return null;
  const avg = hits.reduce((sum, r) => sum + r.score, 0) / hits.length;
  return { avg, count: hits.length };
}

// 相性の詳細に出す、お店の試飲評価の要約
export function TastingSummary({ a, b }) {
  const { records, status, startRecord } = useContext(TastingContext);
  if (status !== "ready") return null;
  const stats = pairStats(records, a, b);
  return (
    <div className="sp-evidence">
      <p className="sp-evidence-head">お店の試飲評価</p>
      <p className="sp-evidence-summary">
        {stats ? `平均 ${stats.avg.toFixed(1)} / 5（${stats.count}件）` : "まだ記録がありません"}
      </p>
      <button className="sp-record-btn" onClick={() => startRecord(a, b)}>
        この組み合わせを記録する
      </button>
    </div>
  );
}

function FlavorSelect({ value, onChange }) {
  return (
    <select className="sp-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">選んでください</option>
      {CATEGORIES.map((c) => (
        <optgroup key={c.id} label={`${c.icon} ${c.label}`}>
          {FLAVORS.filter((f) => f.cat === c.id).map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

function SetupNote({ status }) {
  if (status === "missing") {
    return (
      <div className="sp-detail">
        <p className="sp-detail-names">記録用のテーブルがまだありません</p>
        <p className="sp-detail-reason">
          Supabase の SQL Editor で、リポジトリの supabase-setup.sql にある「tastings」の部分を実行してください。実行後にこのページを開き直すと記録できるようになります。
        </p>
      </div>
    );
  }
  return (
    <div className="sp-detail">
      <p className="sp-detail-names">記録を読み込めませんでした</p>
      <p className="sp-detail-reason">通信状態を確認して、ページを開き直してください。</p>
    </div>
  );
}

function RecordForm({ draft, setDraft, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { a, b } = draft;
  const ready = a && b && a !== b && draft.score;

  function set(key, value) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError("");
    const [x, y] = sortPair(a, b);
    const { error: err } = await supabase.from("tastings").insert({
      flavor_a: x,
      flavor_b: y,
      score: draft.score,
      ratio: draft.ratio.trim(),
      products: draft.products.trim(),
      taster: draft.taster.trim(),
      blind: draft.blind,
      note: draft.note.trim(),
    });
    setSaving(false);
    if (err) {
      setError("保存できませんでした。もう一度試してください");
      return;
    }
    saveTaster(draft.taster.trim());
    setDraft((d) => ({ ...d, score: null, ratio: "", products: "", note: "", blind: false }));
    onSaved();
  }

  return (
    <div className="sp-form">
      <div className="sp-form-row">
        <label className="sp-label">フレーバー1</label>
        <FlavorSelect value={a} onChange={(v) => set("a", v)} />
      </div>
      <div className="sp-form-row">
        <label className="sp-label">フレーバー2</label>
        <FlavorSelect value={b} onChange={(v) => set("b", v)} />
      </div>
      {a && b && a === b && <p className="sp-note">違うフレーバーを選んでください</p>}

      <div className="sp-form-row">
        <label className="sp-label">評価</label>
        <div className="sp-scores">
          {SCORES.map((s) => (
            <button
              key={s.n}
              className={`sp-score ${draft.score === s.n ? "selected" : ""}`}
              onClick={() => set("score", s.n)}
            >
              <span className="sp-score-num">{s.n}</span>
              <span className="sp-score-label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sp-form-row">
        <label className="sp-label">配合比</label>
        <input
          className="sp-input"
          value={draft.ratio}
          placeholder={a && b && a !== b ? `例：${ratioHint(a, b)}` : "例：6：4"}
          onChange={(e) => set("ratio", e.target.value)}
        />
      </div>
      <div className="sp-form-row">
        <label className="sp-label">使った商品</label>
        <input
          className="sp-input"
          value={draft.products}
          placeholder="例：Al Fakher Mint、Adalya Lady Killer"
          onChange={(e) => set("products", e.target.value)}
        />
      </div>
      <div className="sp-form-row">
        <label className="sp-label">記録した人</label>
        <input
          className="sp-input"
          value={draft.taster}
          placeholder="名前やニックネーム"
          onChange={(e) => set("taster", e.target.value)}
        />
      </div>
      <label className="sp-check">
        <input type="checkbox" checked={draft.blind} onChange={(e) => set("blind", e.target.checked)} />
        何の組み合わせか伏せて吸ってもらった（ブラインド）
      </label>
      <div className="sp-form-row">
        <label className="sp-label">メモ</label>
        <textarea
          className="sh-textarea"
          rows={3}
          value={draft.note}
          placeholder="例：ミントが勝ちすぎた。次は7：3で"
          onChange={(e) => set("note", e.target.value)}
        />
      </div>

      {error && <p className="sp-error">{error}</p>}
      <div className="sh-actions">
        <button className="sh-btn primary" disabled={!ready || saving} onClick={save}>
          {saving ? "保存中…" : "記録する"}
        </button>
      </div>
    </div>
  );
}

function Ranking({ records }) {
  const groups = new Map();
  for (const r of records) {
    const key = `${r.flavor_a}|${r.flavor_b}`;
    if (!groups.has(key)) groups.set(key, { a: r.flavor_a, b: r.flavor_b, scores: [] });
    groups.get(key).scores.push(r.score);
  }
  const rows = [...groups.values()]
    .map((g) => ({ ...g, avg: g.scores.reduce((s, n) => s + n, 0) / g.scores.length }))
    .sort((x, y) => y.avg - x.avg || y.scores.length - x.scores.length);

  if (rows.length === 0) return <p className="sp-note">まだ記録がありません</p>;

  return rows.map(({ a, b, avg, scores }) => {
    const pair = getPair(a, b);
    return (
      <div key={`${a}|${b}`} className="sp-partner">
        <div className="sp-partner-head">
          <span className="sp-partner-name">{getFlavor(a).label} × {getFlavor(b).label}</span>
          <span className="sp-avg">{avg.toFixed(1)}<span className="sp-avg-count">（{scores.length}件）</span></span>
        </div>
        <p className="sp-partner-ratio">
          相性表の評価：{pair ? `${RATINGS[pair.rating].mark} ${RATINGS[pair.rating].label}` : "未評価"}
        </p>
      </div>
    );
  });
}

function RecentList({ records, onDeleted }) {
  async function remove(r) {
    if (!window.confirm("この記録を削除しますか？")) return;
    const { error } = await supabase.from("tastings").delete().eq("id", r.id);
    if (error) window.alert("削除できませんでした。もう一度試してください");
    onDeleted();
  }

  if (records.length === 0) return <p className="sp-note">まだ記録がありません</p>;

  return records.slice(0, 30).map((r) => (
    <div key={r.id} className="sp-partner">
      <div className="sp-partner-head">
        <span className="sp-partner-name">{getFlavor(r.flavor_a).label} × {getFlavor(r.flavor_b).label}</span>
        <span className="sp-avg">{r.score}<span className="sp-avg-count">／{SCORES[r.score - 1].label}</span></span>
      </div>
      <p className="sp-partner-ratio">
        {[
          new Date(r.created_at).toLocaleDateString("ja-JP"),
          r.taster,
          r.ratio && `配合 ${r.ratio}`,
          r.blind && "ブラインド",
        ].filter(Boolean).join("・")}
      </p>
      {r.products && <p className="sp-partner-reason">商品：{r.products}</p>}
      {r.note && <p className="sp-partner-reason">{r.note}</p>}
      <button className="sp-delete" onClick={() => remove(r)}>削除</button>
    </div>
  ));
}

export function emptyDraft(a = "", b = "") {
  return { a, b, score: null, ratio: "", products: "", taster: readTaster(), blind: false, note: "" };
}

export default function TastingLog({ draft, setDraft }) {
  const { records, status, reload } = useContext(TastingContext);

  if (status === "loading") return <p className="sp-note">読み込み中…</p>;
  if (status !== "ready") return <SetupNote status={status} />;

  return (
    <div className="sp-guide">
      <section className="sp-group">
        <h3 className="sp-group-title">試飲を記録する</h3>
        <p className="sp-hint-small">実際に吸った評価をためて、相性表の◎○△×と比べられるようにします</p>
        <RecordForm draft={draft} setDraft={setDraft} onSaved={reload} />
      </section>

      <section className="sp-group">
        <h3 className="sp-group-title">評価の高い組み合わせ</h3>
        <Ranking records={records} />
      </section>

      <section className="sp-group">
        <h3 className="sp-group-title">最近の記録</h3>
        <RecentList records={records} onDeleted={reload} />
      </section>
    </div>
  );
}
