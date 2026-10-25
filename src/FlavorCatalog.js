import { useState } from "react";
import { FLAVORS, CATEGORIES, NOTE_TO_FLAVOR } from "./pairingData";
import { CATALOG } from "./catalogData";

const COOLING = { none: null, light: "清涼感 弱", strong: "清涼感 強" };

// 風味タグの日本語名。相性表のフレーバーは FLAVORS の名前を使う
const NOTE_LABELS = {
  ...Object.fromEntries(FLAVORS.map((f) => [f.id, f.label])),
  strawberry: "イチゴ", blueberry: "ブルーベリー", raspberry: "ラズベリー", blackcurrant: "カシス",
  cranberry: "クランベリー", cherry: "チェリー", watermelon: "スイカ", melon: "メロン", banana: "バナナ",
  kiwi: "キウイ", passionfruit: "パッションフルーツ", guava: "グァバ", pear: "洋ナシ", plum: "プラム",
  pomegranate: "ザクロ", apricot: "アプリコット", fig: "イチジク", cucumber: "キュウリ", tangerine: "みかん",
  yuzu: "ゆず", cactus: "サボテン", rhubarb: "ルバーブ", anise: "アニス", licorice: "リコリス",
  honey: "ハチミツ", cream: "クリーム", milk: "ミルク", yogurt: "ヨーグルト", coffee: "コーヒー",
  blacktea: "紅茶", greentea: "緑茶", cola: "コーラ", energydrink: "エナジードリンク", bubblegum: "ガム",
  candy: "キャンディ", pistachio: "ピスタチオ", nut: "ナッツ", cookie: "クッキー", cake: "ケーキ",
  pastry: "焼き菓子", basil: "バジル", pine: "松", ice: "アイス（冷感）", betel: "キンマ（パーン）",
  sandalwood: "サンダルウッド", saffron: "サフラン", herbal: "ハーブ", spice: "スパイス",
  fruit: "フルーツ", flower: "花", sage: "セージ",
  papaya: "パパイヤ", jackfruit: "ジャックフルーツ", mangosteen: "マンゴスチン", thyme: "タイム", herb: "ハーブ",
};

const BRANDS = [...new Set(CATALOG.map((c) => c[0]))];

export default function FlavorCatalog({ onOpenFlavor }) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [cat, setCat] = useState("all");

  const q = query.trim().toLowerCase();
  const items = CATALOG.filter(([b, name, desc, notes, , category]) => {
    if (brand !== "all" && b !== brand) return false;
    if (cat !== "all" && category !== cat) return false;
    if (!q) return true;
    const text = [name, desc, ...notes, ...notes.map((n) => NOTE_LABELS[n] || "")].join(" ").toLowerCase();
    return text.includes(q);
  });

  return (
    <>
      <input
        className="sp-search"
        type="search"
        placeholder="名前・風味で検索（例：ピーチ、mint）"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="sp-filter">
        <button className={`sp-chip ${brand === "all" ? "selected" : ""}`} onClick={() => setBrand("all")}>
          全ブランド
        </button>
        {BRANDS.map((b) => (
          <button key={b} className={`sp-chip ${brand === b ? "selected" : ""}`} onClick={() => setBrand(b)}>
            {b}
          </button>
        ))}
      </div>
      <div className="sp-filter">
        <button className={`sp-chip ${cat === "all" ? "selected" : ""}`} onClick={() => setCat("all")}>
          すべて
        </button>
        {CATEGORIES.map((t) => (
          <button key={t.id} className={`sp-chip ${cat === t.id ? "selected" : ""}`} onClick={() => setCat(t.id)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <p className="sp-hint-small">
        {items.length}件 / 全{CATALOG.length}件。色つきの風味タグをタップすると相性表に移ります
      </p>

      <div className="sp-catalog">
        {items.map(([b, name, desc, notes, cooling, category, source, url]) => (
          <div key={`${b}|${name}`} className="sp-partner">
            <div className="sp-partner-head">
              <span className="sp-partner-name">{name}</span>
              <span className="sp-brand">{b}</span>
            </div>
            <p className="sp-partner-reason">{desc}</p>
            <div className="sp-notes">
              <span className="sp-cat">{CATEGORIES.find((c) => c.id === category).icon}</span>
              {notes.map((n) =>
                NOTE_TO_FLAVOR[n] ? (
                  <button key={n} className="sp-note-tag linked" onClick={() => onOpenFlavor(NOTE_TO_FLAVOR[n])}>
                    {NOTE_LABELS[n] || n}
                  </button>
                ) : (
                  <span key={n} className="sp-note-tag">{NOTE_LABELS[n] || n}</span>
                )
              )}
              {COOLING[cooling] && <span className={`sp-note-tag cool-${cooling}`}>{COOLING[cooling]}</span>}
            </div>
            <a className="sp-source-link" href={url} target="_blank" rel="noreferrer">
              {source === "maker" ? "メーカー公式" : "販売店"}のページ
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
