import { useState } from "react";
import { TASTES } from "./ShishaHearing";
import { FLAVORS, RATINGS, TYPES, getPair, getFlavor, ratioHint, bridgeCandidates } from "./pairingData";
import "./ShishaHearing.css";
import "./ShishaPairing.css";

const TABS = [
  { id: "search", label: "フレーバーから探す" },
  { id: "matrix", label: "対応表" },
  { id: "guide", label: "型の説明" },
];

function catIcon(cat) {
  return TASTES.find((t) => t.id === cat).icon;
}

function CategoryFilter({ value, onChange }) {
  return (
    <div className="sp-filter">
      <button className={`sp-chip ${value === "all" ? "selected" : ""}`} onClick={() => onChange("all")}>
        すべて
      </button>
      {TASTES.map((t) => (
        <button
          key={t.id}
          className={`sp-chip ${value === t.id ? "selected" : ""}`}
          onClick={() => onChange(t.id)}
        >
          {t.icon} {t.label}
        </button>
      ))}
    </div>
  );
}

function RatingMark({ rating }) {
  if (rating === undefined) return <span className="sp-mark none">—</span>;
  return <span className={`sp-mark r${rating}`}>{RATINGS[rating].mark}</span>;
}

function PairDetail({ a, b }) {
  const pair = getPair(a, b);
  const fa = getFlavor(a);
  const fb = getFlavor(b);
  return (
    <div className="sp-detail">
      <div className="sp-detail-head">
        <span className="sp-detail-names">
          {catIcon(fa.cat)} {fa.label} × {catIcon(fb.cat)} {fb.label}
        </span>
        {pair && (
          <span className={`sp-rating r${pair.rating}`}>
            {RATINGS[pair.rating].mark} {RATINGS[pair.rating].label}
          </span>
        )}
      </div>
      {pair ? (
        <>
          <p className="sp-detail-reason">
            <span className={`sp-type t-${pair.type}`}>{TYPES[pair.type].label}</span>
            {pair.reason}
          </p>
          {pair.rating > 0 && <p className="sp-detail-ratio">配合の目安：{ratioHint(a, b)}</p>}
        </>
      ) : (
        <p className="sp-detail-reason muted">まだ登録されていない組み合わせです</p>
      )}
    </div>
  );
}

function PartnerList({ id }) {
  const rows = FLAVORS.filter((f) => f.id !== id)
    .map((f) => ({ flavor: f, pair: getPair(id, f.id) }))
    .filter((r) => r.pair);
  const unregistered = FLAVORS.length - 1 - rows.length;

  return (
    <div className="sp-partners">
      {[3, 2, 1, 0].map((rating) => {
        const group = rows.filter((r) => r.pair.rating === rating);
        if (group.length === 0) return null;
        return (
          <section key={rating} className="sp-group">
            <h3 className={`sp-group-title r${rating}`}>
              {RATINGS[rating].mark} {RATINGS[rating].label}
            </h3>
            {group.map(({ flavor, pair }) => (
              <div key={flavor.id} className="sp-partner">
                <div className="sp-partner-head">
                  <span className="sp-partner-name">{catIcon(flavor.cat)} {flavor.label}</span>
                  <span className={`sp-type t-${pair.type}`}>{TYPES[pair.type].label}</span>
                </div>
                <p className="sp-partner-reason">{pair.reason}</p>
                {rating > 0 && <p className="sp-partner-ratio">配合の目安：{ratioHint(id, flavor.id)}</p>}
              </div>
            ))}
          </section>
        );
      })}
      {unregistered > 0 && <p className="sp-note">未登録の組み合わせ：{unregistered}件</p>}
    </div>
  );
}

function BridgeList({ a, b }) {
  const candidates = bridgeCandidates(a, b);
  return (
    <section className="sp-group">
      <h3 className="sp-group-title">つなぎ役の候補</h3>
      <p className="sp-hint-small">両方と「合う」以上のフレーバー。少しだけ足すと2つがまとまりやすい</p>
      {candidates.length === 0 ? (
        <p className="sp-note">候補が見つかりませんでした</p>
      ) : (
        candidates.map(({ flavor, pa, pb }) => (
          <div key={flavor.id} className="sp-partner">
            <div className="sp-partner-head">
              <span className="sp-partner-name">{catIcon(flavor.cat)} {flavor.label}</span>
              <span className="sp-bridge-marks">
                {getFlavor(a).label}<RatingMark rating={pa.rating} />
                {getFlavor(b).label}<RatingMark rating={pb.rating} />
              </span>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

function SearchView() {
  const [cat, setCat] = useState("all");
  const [selected, setSelected] = useState([]);
  const flavors = FLAVORS.filter((f) => cat === "all" || f.cat === cat);

  // 2つまで選べる。3つ目を選ぶと古い方を外す
  function toggle(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id].slice(-2)));
  }

  return (
    <>
      <CategoryFilter value={cat} onChange={setCat} />
      <p className="sp-hint-small">1つ選ぶと相性のいい相手、2つ選ぶと2つの相性とつなぎ役が出ます</p>
      <div className="sp-flavors">
        {flavors.map((f) => (
          <button
            key={f.id}
            className={`sp-flavor ${selected.includes(f.id) ? "selected" : ""}`}
            onClick={() => toggle(f.id)}
          >
            {catIcon(f.cat)} {f.label}
          </button>
        ))}
      </div>

      {selected.length === 1 && <PartnerList id={selected[0]} />}
      {selected.length === 2 && (
        <div className="sp-partners">
          <PairDetail a={selected[0]} b={selected[1]} />
          <BridgeList a={selected[0]} b={selected[1]} />
        </div>
      )}
    </>
  );
}

function MatrixView() {
  const [cat, setCat] = useState("all");
  const [cell, setCell] = useState(null);
  const rows = FLAVORS.filter((f) => cat === "all" || f.cat === cat);

  return (
    <>
      <CategoryFilter value={cat} onChange={setCat} />
      <p className="sp-hint-small">縦が絞り込んだフレーバー、横が全フレーバー。マスをタップすると理由が出ます</p>
      <div className="sp-legend">
        {[3, 2, 1, 0].map((r) => (
          <span key={r}><RatingMark rating={r} /> {RATINGS[r].label}</span>
        ))}
        <span><RatingMark /> 未登録</span>
      </div>

      {cell && <PairDetail a={cell[0]} b={cell[1]} />}

      <div className="sp-matrix-wrap">
        <table className="sp-matrix">
          <thead>
            <tr>
              <th className="sp-corner" />
              {FLAVORS.map((f) => (
                <th key={f.id} className="sp-col-head">
                  <span>{f.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <th className="sp-row-head">{catIcon(r.cat)} {r.label}</th>
                {FLAVORS.map((c) => {
                  if (c.id === r.id) return <td key={c.id} className="sp-self" />;
                  const pair = getPair(r.id, c.id);
                  const active = cell && cell[0] === r.id && cell[1] === c.id;
                  return (
                    <td key={c.id} className={active ? "active" : ""}>
                      <button className="sp-cell" onClick={() => setCell([r.id, c.id])}>
                        <RatingMark rating={pair?.rating} />
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function GuideView() {
  return (
    <div className="sp-guide">
      <section className="sp-group">
        <h3 className="sp-group-title">組み合わせの型</h3>
        {["same", "contrast", "classic"].map((t) => (
          <div key={t} className="sp-partner">
            <span className={`sp-type t-${t}`}>{TYPES[t].label}</span>
            <p className="sp-partner-reason">{TYPES[t].desc}</p>
          </div>
        ))}
        <div className="sp-partner">
          <span className="sp-type t-bridge">ブリッジ</span>
          <p className="sp-partner-reason">
            遠い2つの間に、両方と相性のいいものを少しだけ足してつなぐ。「フレーバーから探す」で2つ選ぶと候補が出ます
          </p>
        </div>
        <div className="sp-partner">
          <span className={`sp-type t-clash`}>{TYPES.clash.label}</span>
          <p className="sp-partner-reason">{TYPES.clash.desc}</p>
        </div>
      </section>

      <section className="sp-group">
        <h3 className="sp-group-title">配合の目安</h3>
        <p className="sp-partner-reason">
          香りの主張が強いフレーバー（ミント・ローズ・スパイス系など）は少なめにして、控えめな方を多めにします。
          3種類で組むなら「メイン6：サブ3：アクセント1」が基本です。
        </p>
      </section>
    </div>
  );
}

export default function ShishaPairing({ onBack }) {
  const [tab, setTab] = useState("search");

  return (
    <div className="app sh-page sp-page">
      <header className="app-header">
        <button className="back-btn" onClick={onBack}>← ホームへ</button>
        <h1>フレーバー相性表</h1>
        <p>食材ペアリングの考え方で整理した組み合わせ</p>
      </header>

      <div className="sp-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={`sp-tab ${tab === t.id ? "selected" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="sh-card sp-card">
        {tab === "search" && <SearchView />}
        {tab === "matrix" && <MatrixView />}
        {tab === "guide" && <GuideView />}
      </div>
    </div>
  );
}
