// 回答データの集計と、Google評価シミュレーション
import { CATEGORIES } from "./presets";

export function summarize(responses, store) {
  const n = responses.length;
  const ratingDist = [1, 2, 3, 4, 5].map((r) => responses.filter((x) => x.rating === r).length);
  const avg = n ? responses.reduce((s, x) => s + (x.rating || 0), 0) / n : 0;
  const google = responses.filter((x) => x.action === "google").length;
  const feedback = responses.filter((x) => x.action === "feedback" || x.feedback).length;

  const optionCount = {};
  for (const r of responses) for (const id of r.selectedIds || []) optionCount[id] = (optionCount[id] || 0) + 1;

  const options = store?.options || [];
  const byCategory = CATEGORIES.map((c) => ({
    ...c,
    count: options.filter((o) => o.cat === c.id).reduce((s, o) => s + (optionCount[o.id] || 0), 0),
  }));
  const topOptions = options
    .map((o) => ({ ...o, count: optionCount[o.id] || 0 }))
    .sort((a, b) => b.count - a.count);

  // 直近14日の日別回答数
  const days = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ key, label: `${d.getMonth() + 1}/${d.getDate()}`, count: 0 });
  }
  for (const r of responses) {
    const day = days.find((d) => d.key === (r.createdAt || "").slice(0, 10));
    if (day) day.count++;
  }

  return {
    n,
    avg,
    ratingDist,
    google,
    googleRate: n ? google / n : 0,
    feedback,
    byCategory,
    topOptions,
    days,
  };
}

// 現在の平均 avg・件数 count から、目標 target に届くまでに必要な★5の件数
export function neededFiveStars(avg, count, target) {
  avg = Number(avg);
  count = Number(count);
  target = Number(target);
  if (!(target > 0) || target >= 5) return null;
  if (!(count >= 0) || !(avg >= 0)) return null;
  if (avg >= target) return 0;
  // (avg*count + 5x) / (count + x) >= target
  return Math.max(0, Math.ceil((target * count - avg * count) / (5 - target) - 1e-9));
}

export function toCsv(responses, store) {
  const name = (id) => store.options.find((o) => o.id === id)?.label || "";
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = ["日時", "満足度", "利用シーン", "良かった点", "コメント", "口コミ下書き", "改善要望", "行動", "言語"];
  const rows = responses.map((r) => [
    r.createdAt,
    r.rating,
    r.purpose,
    (r.selectedIds || []).map(name).join(" / "),
    r.comment,
    r.review,
    r.feedback,
    r.action,
    r.lang,
  ]);
  return "﻿" + [head, ...rows].map((row) => row.map(esc).join(",")).join("\n");
}
