import { useState } from "react";
import { FLAVORS, CATEGORIES, RATINGS, TYPES, BASIS, getPair, marketProducts, getFlavor, ratioHint, bridgeCandidates } from "./pairingData";
import { CLAIMS, BACKGROUND } from "./pairingSources";
import FlavorCatalog from "./FlavorCatalog";
import "./ShishaHearing.css";
import "./ShishaPairing.css";

const TABS = [
  { id: "search", label: "フレーバーから探す" },
  { id: "matrix", label: "対応表" },
  { id: "catalog", label: "フレーバー一覧" },
  { id: "guide", label: "型の説明" },
];

function catIcon(cat) {
  return CATEGORIES.find((t) => t.id === cat).icon;
}

function CategoryFilter({ value, onChange }) {
  return (
    <div className="sp-filter">
      <button className={`sp-chip ${value === "all" ? "selected" : ""}`} onClick={() => onChange("all")}>
        すべて
      </button>
      {CATEGORIES.map((t) => (
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

const VERDICTS = {
  supported: "裏付けあり",
  partial: "条件つき",
  not_found: "裏付けなし",
};

function BasisTag({ basis }) {
  return <span className={`sp-basis b-${basis}`}>{BASIS[basis].label}</span>;
}

function SourceList({ sources }) {
  return (
    <ul className="sp-sources">
      {sources.map((s) => (
        <li key={s.url}>
          <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a>
          {(s.by || s.year) && <span className="sp-source-meta">{[s.by, s.year].filter(Boolean).join("・")}</span>}
        </li>
      ))}
    </ul>
  );
}

function Evidence({ claim }) {
  const c = CLAIMS[claim];
  return (
    <div className="sp-evidence">
      <p className="sp-evidence-head">文献の確認：<span className={`sp-verdict v-${c.verdict}`}>{VERDICTS[c.verdict]}</span></p>
      <p className="sp-evidence-summary">{c.summary}</p>
      <SourceList sources={c.sources} />
    </div>
  );
}

function MarketList({ a, b }) {
  const products = marketProducts(a, b);
  if (products.length === 0) return null;
  return (
    <div className="sp-evidence">
      <p className="sp-evidence-head">この2つを組み合わせた市販品：{products.length}件</p>
      <p className="sp-evidence-summary">
        {products.map((p) => `${p.brand} ${p.name}`).join("、")}
      </p>
    </div>
  );
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
          <p className="sp-detail-basis">根拠：<BasisTag basis={pair.basis} /></p>
          {pair.claim && <Evidence claim={pair.claim} />}
        </>
      ) : (
        <p className="sp-detail-reason muted">まだ評価していない組み合わせです</p>
      )}
      <MarketList a={a} b={b} />
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
                <p className="sp-partner-ratio">
                  <BasisTag basis={pair.basis} />
                  {rating > 0 && <>配合の目安：{ratioHint(id, flavor.id)}</>}
                </p>
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

function SearchView({ selected, setSelected }) {
  const [cat, setCat] = useState("all");
  const flavors = FLAVORS.filter((f) => cat === "all" || f.cat === cat);

  // 2つまで選べる。3つ目を選ぶと古い方を外す
  function toggle(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id].slice(-2)));
  }

  return (
    <>
      <CategoryFilter value={cat} onChange={setCat} />
      <p className="sp-hint-small">1つ選ぶと相性のいい相手、2つ選ぶと2つの相性・根拠・つなぎ役が出ます</p>
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
        <span><span className="sp-mark market">●</span> 未評価・市販品あり</span>
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
                        {!pair && marketProducts(r.id, c.id).length > 0 ? (
                          <span className="sp-mark market">●</span>
                        ) : (
                          <RatingMark rating={pair?.rating} />
                        )}
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
        <h3 className="sp-group-title">根拠の種類</h3>
        {Object.keys(BASIS).map((b) => (
          <div key={b} className="sp-partner">
            <BasisTag basis={b} />
            <p className="sp-partner-reason">{BASIS[b].desc}</p>
          </div>
        ))}
        <p className="sp-note">
          ◎○△×の評価そのものは、どの組み合わせも作成者の判断です。実際に吸って確かめたデータではありません
        </p>
      </section>

      <section className="sp-group">
        <h3 className="sp-group-title">食材ペアリングの研究とシーシャでの注意点</h3>
        {Object.entries(BACKGROUND).map(([id, bg]) => (
          <div key={id} className="sp-partner">
            <p className="sp-partner-reason">{bg.summary}</p>
            <SourceList sources={bg.sources} />
          </div>
        ))}
      </section>

      <section className="sp-group">
        <h3 className="sp-group-title">配合の目安</h3>
        <p className="sp-partner-reason">
          香りの主張が強いフレーバー（ミント・ローズ・スパイス系など）は少なめにして、控えめな方を多めにします。
          3種類で組むなら「メイン6：サブ3：アクセント1」が基本です。主張の強さと比率は作成者が仮に決めた目安です。
        </p>
      </section>
    </div>
  );
}

export default function ShishaPairing({ onBack }) {
  const [tab, setTab] = useState("search");
  const [selected, setSelected] = useState([]);

  // フレーバー一覧の風味タグから、相性表のそのフレーバーを開く
  function openFlavor(id) {
    setSelected([id]);
    setTab("search");
    window.scrollTo(0, 0);
  }

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
        {tab === "search" && <SearchView selected={selected} setSelected={setSelected} />}
        {tab === "matrix" && <MatrixView />}
        {tab === "catalog" && <FlavorCatalog onOpenFlavor={openFlavor} />}
        {tab === "guide" && <GuideView />}
      </div>
    </div>
  );
}
