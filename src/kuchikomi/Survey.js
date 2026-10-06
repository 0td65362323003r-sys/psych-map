// 顧客向けアンケート画面（QRコードの遷移先 /r/:storeId）
import { useEffect, useMemo, useState } from "react";
import { getStore, addResponse, updateResponse } from "./storage";
import { generateReview, findNgWords } from "./reviewGen";
import { LANGS, T } from "./presets";

export function googleReviewUrl(value) {
  const v = (value || "").trim();
  if (!v) return "";
  if (/^https?:\/\//.test(v)) return v;
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(v)}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

function Stars({ value, onChange }) {
  return (
    <div className="kk-stars" role="radiogroup">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n}`}
          className={`kk-star ${n <= value ? "on" : ""}`}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function Survey({ storeId }) {
  const [store, setStore] = useState(undefined);
  const [lang, setLang] = useState(() => {
    const nav = (navigator.language || "ja").slice(0, 2);
    return T[nav] ? nav : "ja";
  });
  const [step, setStep] = useState("rate"); // rate | points | generating | draft | low | done
  const [rating, setRating] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [comment, setComment] = useState("");
  const [draft, setDraft] = useState("");
  const [feedback, setFeedback] = useState("");
  const [record, setRecord] = useState(null);
  const [copied, setCopied] = useState(false);
  const [lotteryWon, setLotteryWon] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getStore(storeId)
      .then((s) => setStore(s))
      .catch(() => setStore(null));
  }, [storeId]);

  const t = T[lang];
  const selected = useMemo(
    () => (store ? store.options.filter((o) => selectedIds.includes(o.id)) : []),
    [store, selectedIds]
  );
  const ngHits = useMemo(() => findNgWords(draft, store?.ngWords), [draft, store]);

  if (store === undefined) return <div className="kk-survey"><p className="kk-muted">Loading…</p></div>;
  if (store === null)
    return (
      <div className="kk-survey">
        <p>ページが見つかりません / Page not found</p>
      </div>
    );

  const languages = store.languages?.length ? store.languages : ["ja"];
  const optLabel = (o) => (lang === "ja" ? o.label : o.en || o.label);

  function toggle(id) {
    setSelectedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  async function makeDraft() {
    setStep("generating");
    const { text, source } = await generateReview({ store, rating, purpose, selected, comment, lang });
    setDraft(text);
    const base = {
      storeId: store.id,
      rating,
      purpose,
      selectedIds,
      categories: [...new Set(selected.map((o) => o.cat))],
      comment,
      lang,
      review: text,
      reviewSource: source,
      action: "drafted",
    };
    try {
      setRecord(record ? await updateResponse({ ...record, ...base }) : await addResponse(base));
    } catch {
      // 保存に失敗しても顧客の操作は止めない
    }
    setStep("draft");
  }

  async function regenerate() {
    setStep("generating");
    const { text } = await generateReview({ store, rating, purpose, selected, comment, lang });
    setDraft(text);
    setStep("draft");
  }

  function goNextFromPoints() {
    if (rating <= 2) {
      setStep("low");
    } else {
      makeDraft();
    }
  }

  async function finish(action, extra = {}) {
    const base = record || {
      storeId: store.id,
      rating,
      purpose,
      selectedIds,
      categories: [...new Set(selected.map((o) => o.cat))],
      comment,
      lang,
    };
    try {
      const row = { ...base, ...extra, action, review: draft || base.review || "" };
      setRecord(record ? await updateResponse(row) : await addResponse(row));
    } catch {
      // 保存失敗は無視
    }
    if (store.coupon?.enabled && store.coupon.mode === "lottery" && lotteryWon === null) {
      setLotteryWon(Math.random() * 100 < Number(store.coupon.winRate || 0));
    }
    setStep("done");
  }

  async function copyAndPost() {
    if (ngHits.length) return;
    const url = googleReviewUrl(store.googleReviewUrl);
    const p = copyText(draft);
    if (url) window.open(url, "_blank", "noopener");
    await p;
    setCopied(true);
    finish("google");
  }

  async function sendFeedback() {
    if (!feedback.trim()) {
      setError(t.q4);
      return;
    }
    setError("");
    finish("feedback", { feedback: feedback.trim() });
  }

  return (
    <div className="kk-survey">
      <header className="kk-survey-head">
        <div className="kk-survey-store">{store.name}</div>
        {languages.length > 1 && (
          <select className="kk-lang" value={lang} onChange={(e) => setLang(e.target.value)}>
            {languages.map((l) => (
              <option key={l} value={l}>
                {LANGS[l]}
              </option>
            ))}
          </select>
        )}
      </header>

      {step === "rate" && (
        <section className="kk-card">
          <h1 className="kk-hello">{t.hello}</h1>
          <p className="kk-muted">{t.lead}</p>
          <h2 className="kk-q">{t.q1}</h2>
          <Stars value={rating} onChange={setRating} />
          {store.visitPurpose?.length > 0 && (
            <>
              <h2 className="kk-q">{t.q2}</h2>
              <div className="kk-chips">
                {store.visitPurpose.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`kk-chip ${purpose === p ? "on" : ""}`}
                    onClick={() => setPurpose(purpose === p ? "" : p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </>
          )}
          {error && <p className="kk-error">{error}</p>}
          <button
            className="kk-btn kk-btn-primary kk-btn-block"
            onClick={() => {
              if (!rating) return setError(t.rateFirst);
              setError("");
              setStep("points");
            }}
          >
            {t.next}
          </button>
        </section>
      )}

      {step === "points" && (
        <section className="kk-card">
          <h2 className="kk-q">{t.q3}</h2>
          <div className="kk-chips">
            {store.options.map((o) => (
              <button
                key={o.id}
                type="button"
                className={`kk-chip ${selectedIds.includes(o.id) ? "on" : ""}`}
                onClick={() => toggle(o.id)}
              >
                {optLabel(o)}
              </button>
            ))}
          </div>
          <h2 className="kk-q">{t.q4}</h2>
          <textarea
            className="kk-textarea"
            rows={3}
            maxLength={300}
            value={comment}
            placeholder={t.placeholder}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="kk-row">
            <button className="kk-btn" onClick={() => setStep("rate")}>
              {t.back}
            </button>
            <button className="kk-btn kk-btn-primary" onClick={goNextFromPoints}>
              {t.next}
            </button>
          </div>
        </section>
      )}

      {step === "generating" && (
        <section className="kk-card kk-center">
          <div className="kk-spinner" />
          <p>{t.generating}</p>
        </section>
      )}

      {step === "draft" && (
        <section className="kk-card">
          <h2 className="kk-q">{t.draftTitle}</h2>
          <p className="kk-muted">{t.draftNote}</p>
          <div className="kk-stars-static">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</div>
          <textarea
            className="kk-textarea kk-draft"
            rows={7}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          {ngHits.length > 0 && (
            <p className="kk-error">
              {t.ngWarn}: {ngHits.join(", ")}
            </p>
          )}
          <button
            className="kk-btn kk-btn-google kk-btn-block"
            disabled={!draft.trim() || ngHits.length > 0}
            onClick={copyAndPost}
          >
            {t.copyAndPost}
          </button>
          {copied && <p className="kk-ok">{t.copied}</p>}
          <div className="kk-row">
            <button className="kk-btn kk-btn-ghost" onClick={regenerate}>
              {t.regenerate}
            </button>
            <button className="kk-btn kk-btn-ghost" onClick={() => finish("skip")}>
              {t.skipGoogle}
            </button>
          </div>
        </section>
      )}

      {step === "low" && (
        <section className="kk-card">
          <h2 className="kk-q">{t.lowTitle}</h2>
          <p className="kk-muted">{t.lowLead}</p>
          <textarea
            className="kk-textarea"
            rows={5}
            maxLength={1000}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          {error && <p className="kk-error">{error}</p>}
          <button className="kk-btn kk-btn-primary kk-btn-block" onClick={sendFeedback}>
            {t.sendToStore}
          </button>
          {/* 低評価でもGoogleへの導線は必ず残す（レビューゲーティング禁止のため） */}
          <button className="kk-btn kk-btn-ghost kk-btn-block" onClick={makeDraft}>
            {t.alsoGoogle}
          </button>
        </section>
      )}

      {step === "done" && (
        <section className="kk-card kk-center">
          <div className="kk-done-icon">🙏</div>
          <h2 className="kk-q">{t.thanks}</h2>
          {copied && <p className="kk-ok">{t.copied}</p>}
          {store.coupon?.enabled && (
            <div className="kk-coupon">
              <div className="kk-coupon-label">{t.couponTitle}</div>
              {store.coupon.mode === "lottery" ? (
                lotteryWon ? (
                  <>
                    <p className="kk-coupon-win">{t.lotteryWin}</p>
                    <div className="kk-coupon-title">{store.coupon.title}</div>
                    {store.coupon.body && <p>{store.coupon.body}</p>}
                    {store.coupon.code && <div className="kk-coupon-code">{store.coupon.code}</div>}
                    <p className="kk-muted">{t.showStaff}</p>
                  </>
                ) : (
                  <p>{t.lotteryLose}</p>
                )
              ) : (
                <>
                  <div className="kk-coupon-title">{store.coupon.title}</div>
                  {store.coupon.body && <p>{store.coupon.body}</p>}
                  {store.coupon.code && <div className="kk-coupon-code">{store.coupon.code}</div>}
                  <p className="kk-muted">{t.showStaff}</p>
                </>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
