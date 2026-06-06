import { useState, useEffect, Fragment } from "react";
import { supabase } from "./supabaseClient";
import { defaultData, defaultJobData } from "./data";
import "./App.css";

const PRESET_COLORS = [
  { color: "#c084fc", accent: "#7c3aed", name: "パープル" },
  { color: "#67e8f9", accent: "#0891b2", name: "シアン" },
  { color: "#86efac", accent: "#16a34a", name: "グリーン" },
  { color: "#fda4af", accent: "#be123c", name: "ピンク" },
  { color: "#fcd34d", accent: "#b45309", name: "イエロー" },
  { color: "#a78bfa", accent: "#6d28d9", name: "バイオレット" },
];

function colorToIdx(color) {
  const idx = PRESET_COLORS.findIndex((c) => c.color === color);
  return idx >= 0 ? idx : 0;
}

// ─── ホームページ ───────────────────────────────────────
function HomePage({ onSelect }) {
  return (
    <div className="home-page">
      <header className="app-header">
        <h1>心理マップ</h1>
        <p>サインから心理を読み解くガイド</p>
      </header>
      <div className="category-grid">
        <button className="category-card" onClick={() => onSelect("sign")}>
          <span className="category-icon">💬</span>
          <span className="category-title">発言パターン</span>
          <span className="category-desc">口癖・発言から心理を読む</span>
        </button>
        <button className="category-card" onClick={() => onSelect("job")}>
          <span className="category-icon">💼</span>
          <span className="category-title">職業ジャンル</span>
          <span className="category-desc">職業・仕事から心理を読む</span>
        </button>
      </div>
    </div>
  );
}

// ─── 追加・編集モーダル ─────────────────────────────────
function AddPatternModal({ onClose, onSave, editPattern, category }) {
  const isEdit = !!editPattern;

  const [form, setForm] = useState({
    label: isEdit ? editPattern.label : "",
    sub: isEdit ? editPattern.sub || "" : "",
    colorIdx: isEdit ? colorToIdx(editPattern.color) : 0,
    experiences: isEdit ? (editPattern.experiences || []).join("\n") : "",
    worldview: isEdit ? (editPattern.worldview || []).join("\n") : "",
    behaviors: isEdit ? (editPattern.behaviors || []).join("\n") : "",
    lack: isEdit ? editPattern.lack || "" : "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState("");

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function loadFromJson() {
    setJsonError("");
    try {
      const parsed = JSON.parse(jsonInput);
      setForm((f) => ({
        ...f,
        label: parsed.label || "",
        sub: parsed.sub || "",
        experiences: Array.isArray(parsed.experiences) ? parsed.experiences.join("\n") : "",
        worldview: Array.isArray(parsed.worldview) ? parsed.worldview.join("\n") : "",
        behaviors: Array.isArray(parsed.behaviors) ? parsed.behaviors.join("\n") : "",
        lack: parsed.lack || "",
      }));
      setJsonInput("");
    } catch {
      setJsonError("JSONの形式が正しくありません");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.label.trim()) {
      setError("サインのラベルは必須です");
      return;
    }
    setSaving(true);
    setError("");

    const { color, accent } = PRESET_COLORS[form.colorIdx];
    const payload = {
      label: form.label.trim(),
      sub: form.sub.trim(),
      color,
      accent,
      experiences: form.experiences.split("\n").map((s) => s.trim()).filter(Boolean),
      worldview: form.worldview.split("\n").map((s) => s.trim()).filter(Boolean),
      behaviors: form.behaviors.split("\n").map((s) => s.trim()).filter(Boolean),
      lack: form.lack.trim(),
      category,
    };

    let dbError;
    if (isEdit) {
      ({ error: dbError } = await supabase
        .from("patterns")
        .update(payload)
        .eq("id", editPattern.id));
    } else {
      ({ error: dbError } = await supabase
        .from("patterns")
        .insert({ ...payload, sign_id: "custom_" + Date.now() }));
    }

    setSaving(false);
    if (dbError) {
      setError("保存できませんでした: " + dbError.message);
    } else {
      onSave();
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdit ? "✏️ パターンを編集" : "＋ パターンを追加"}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="閉じる">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="add-form">
          <div className="json-paste-section">
            <span className="field-label">📋 一括貼り付け（Claudeに作ってもらったJSONをここに貼る）</span>
            <textarea
              className="json-textarea"
              placeholder={'{\n  "label": "「〇〇だよね」",\n  "sub": "という〇〇",\n  "experiences": ["〇〇", "〇〇"],\n  "worldview": ["〇〇"],\n  "behaviors": ["〇〇", "〇〇"],\n  "lack": "〇〇"\n}'}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={5}
            />
            {jsonError && <p className="form-error">{jsonError}</p>}
            <button
              type="button"
              className="load-json-btn"
              onClick={loadFromJson}
              disabled={!jsonInput.trim()}
            >
              フォームに読み込む
            </button>
          </div>

          <div className="divider"><span>または手動で入力</span></div>

          <label>
            <span>{category === "job" ? "職業名（必須）" : "サイン（必須）"}</span>
            <input
              type="text"
              placeholder={category === "job" ? "例：〇〇職" : "例：「〇〇だよね」という発言"}
              value={form.label}
              onChange={(e) => set("label", e.target.value)}
            />
          </label>

          <label>
            <span>補足説明</span>
            <input
              type="text"
              placeholder="例：という口癖・態度"
              value={form.sub}
              onChange={(e) => set("sub", e.target.value)}
            />
          </label>

          <div className="color-field">
            <span className="field-label">カラー</span>
            <div className="color-picker">
              {PRESET_COLORS.map((c, i) => (
                <button
                  type="button"
                  key={i}
                  className={`color-swatch${form.colorIdx === i ? " selected" : ""}`}
                  style={{ background: c.color, outlineColor: c.accent }}
                  onClick={() => set("colorIdx", i)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <label>
            <span>きっかけになった経験（1行1項目）</span>
            <textarea
              placeholder={"親に否定され続けた\n信じていた人に裏切られた"}
              value={form.experiences}
              onChange={(e) => set("experiences", e.target.value)}
              rows={3}
            />
          </label>

          <label>
            <span>形成された世界観・信念（1行1項目）</span>
            <textarea
              placeholder={"「どうせうまくいかない」\n「自分には価値がない」"}
              value={form.worldview}
              onChange={(e) => set("worldview", e.target.value)}
              rows={2}
            />
          </label>

          <label>
            <span>表れる行動パターン（1行1項目）</span>
            <textarea
              placeholder={"消極的な態度をとる\n自ら距離を置いてしまう"}
              value={form.behaviors}
              onChange={(e) => set("behaviors", e.target.value)}
              rows={3}
            />
          </label>

          <label>
            <span>本当に求めているもの（欠乏感）</span>
            <textarea
              placeholder="例：「認められたい」という渇望。自信があるように見せているが内側は不安でいっぱい。"
              value={form.lack}
              onChange={(e) => set("lack", e.target.value)}
              rows={2}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            className="submit-btn"
            style={{ background: PRESET_COLORS[form.colorIdx].accent }}
            disabled={saving}
          >
            {saving ? "保存中..." : isEdit ? "更新する" : "保存する"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── 詳細パネル ─────────────────────────────────────────
function FlowDetail({ sign, flow, onClose }) {
  const [diagAnswer, setDiagAnswer] = useState(null);
  const diag = flow.counterexample?.diagnostic;
  const diagResult = diagAnswer && diag ? diag[diagAnswer] : null;

  function toggleDiag(key) {
    setDiagAnswer((prev) => (prev === key ? null : key));
  }

  return (
    <div className="flow-detail" style={{ "--accent": flow.accent, "--card-color": flow.color }}>
      <div className="flow-detail-header">
        <div>
          <h2 className="flow-title">{sign.label}</h2>
          {sign.sub && <p className="flow-sub">{sign.sub}</p>}
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="閉じる">✕</button>
      </div>

      <div className="flow-sections">
        {flow.experiences?.length > 0 && (
          <section className="flow-section">
            <h3><span className="section-icon">💬</span>きっかけになった経験</h3>
            <ul>{flow.experiences.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </section>
        )}
        {flow.worldview?.length > 0 && (
          <section className="flow-section">
            <h3><span className="section-icon">🧠</span>形成された世界観</h3>
            <ul>{flow.worldview.map((w, i) => <li key={i}>{w}</li>)}</ul>
          </section>
        )}
        {flow.behaviors?.length > 0 && (
          <section className="flow-section">
            <h3><span className="section-icon">👁</span>表れる行動パターン</h3>
            <ul>{flow.behaviors.map((b, i) => <li key={i}>{b}</li>)}</ul>
          </section>
        )}
        {flow.lack && (
          <section className="flow-section lack-section">
            <h3><span className="section-icon">💎</span>本当に求めているもの</h3>
            <p className="lack-text">{flow.lack}</p>
          </section>
        )}
        {flow.counterexample?.text && (
          <section className="flow-section counter-section">
            <h3><span className="section-icon">⚠️</span>例外パターン・注意点</h3>
            <p>{flow.counterexample.text}</p>
            {diag && (
              <div className="diagnostic">
                <p className="diag-question">🔍 {diag.question}</p>
                <div className="diag-buttons">
                  <button className={`diag-btn${diagAnswer === "yes" ? " active" : ""}`} onClick={() => toggleDiag("yes")}>{diag.yes.label}</button>
                  <button className={`diag-btn${diagAnswer === "no" ? " active" : ""}`} onClick={() => toggleDiag("no")}>{diag.no.label}</button>
                </div>
                {diagResult && (
                  <div className="diag-result">
                    <p className="diag-insight">{diagResult.insight}</p>
                    <ul>{diagResult.actions.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
        {flow.actions?.map((group, gi) => (
          <section key={gi} className="flow-section action-section" style={{ background: flow.color + "18" }}>
            <h3><span className="section-icon">🎯</span>{group.label}</h3>
            <ol>{group.items.map((item, i) => <li key={i}>{item}</li>)}</ol>
          </section>
        ))}
      </div>
    </div>
  );
}

// ─── パターン一覧ページ ──────────────────────────────────
function PatternPage({ category, customPatterns, onBack, onRefetch }) {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPattern, setEditingPattern] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const baseData = category === "job" ? defaultJobData : defaultData;
  const filtered = customPatterns.filter((p) => p.category === category);

  const allSigns = [
    ...baseData.signs,
    ...filtered.map((p) => ({ id: p.sign_id, label: p.label, sub: p.sub })),
  ];

  const allFlows = {
    ...baseData.flows,
    ...Object.fromEntries(
      filtered.map((p) => [
        p.sign_id,
        {
          color: p.color,
          accent: p.accent,
          experiences: p.experiences || [],
          worldview: p.worldview || [],
          behaviors: p.behaviors || [],
          lack: p.lack || "",
          counterexample: { text: "", diagnostic: null },
          actions: [],
        },
      ])
    ),
  };

  const filteredSigns = searchQuery.trim()
    ? allSigns.filter((s) =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.sub || "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSigns;

  function openEdit(e, pattern) {
    e.stopPropagation();
    setEditingPattern(pattern);
  }

  async function handleDelete(e, pattern) {
    e.stopPropagation();
    if (!window.confirm(`「${pattern.label}」を削除しますか？`)) return;
    await supabase.from("patterns").delete().eq("id", pattern.id);
    onRefetch();
  }

  function closeModal() {
    setShowModal(false);
    setEditingPattern(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <button className="back-btn" onClick={onBack}>← 戻る</button>
        <h1>{category === "job" ? "職業ジャンル" : "発言パターン"}</h1>
        <p>{category === "job" ? "職業・仕事から心理を読む" : "サインから心理を読み解くガイド"}</p>
      </header>

      <main className="app-main">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="キーワードで絞り込む..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelected(null);
            }}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => { setSearchQuery(""); setSelected(null); }}>✕</button>
          )}
        </div>

        {filteredSigns.length === 0 && (
          <p className="no-results">「{searchQuery}」に一致するパターンはありません</p>
        )}

        <div className="sign-grid">
          {filteredSigns.map((sign) => {
            const flow = allFlows[sign.id];
            const isCustom = sign.id.startsWith("custom_");
            const rawPattern = isCustom ? filtered.find((p) => p.sign_id === sign.id) : null;
            const isSelected = selected === sign.id;

            return (
              <Fragment key={sign.id}>
                <div
                  className={`sign-card${isSelected ? " active" : ""}`}
                  style={{
                    "--card-color": flow?.color || "#c084fc",
                    "--card-accent": flow?.accent || "#7c3aed",
                  }}
                  onClick={() => setSelected((prev) => (prev === sign.id ? null : sign.id))}
                >
                  <span className="sign-label">{sign.label}</span>
                  {sign.sub && <span className="sign-sub">{sign.sub}</span>}
                  {isCustom && rawPattern && (
                    <div className="card-actions">
                      <button className="edit-btn" onClick={(e) => openEdit(e, rawPattern)} aria-label="編集" title="編集">✏️</button>
                      <button className="delete-btn" onClick={(e) => handleDelete(e, rawPattern)} aria-label="削除" title="削除">🗑️</button>
                    </div>
                  )}
                </div>
                {isSelected && flow && (
                  <div className="inline-detail">
                    <FlowDetail sign={sign} flow={flow} onClose={() => setSelected(null)} />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </main>

      <button className="fab" onClick={() => setShowModal(true)}>＋ パターン追加</button>

      {(showModal || editingPattern) && (
        <AddPatternModal
          onClose={closeModal}
          onSave={onRefetch}
          editPattern={editingPattern}
          category={category}
        />
      )}
    </div>
  );
}

// ─── メインApp ───────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [customPatterns, setCustomPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatterns();
  }, []);

  async function fetchPatterns() {
    const { data } = await supabase.from("patterns").select("*").order("created_at");
    if (data) setCustomPatterns(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">読み込み中...</div>
      </div>
    );
  }

  if (page === "home") {
    return <HomePage onSelect={setPage} />;
  }

  return (
    <PatternPage
      category={page}
      customPatterns={customPatterns}
      onBack={() => setPage("home")}
      onRefetch={fetchPatterns}
    />
  );
}
