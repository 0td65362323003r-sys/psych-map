import { neededFiveStars, summarize } from "./analytics";
import { newStore } from "./presets";
import { templateReview, findNgWords } from "./reviewGen";

test("neededFiveStars", () => {
  expect(neededFiveStars(4.3, 100, 4.5)).toBe(40);
  expect(neededFiveStars(4.6, 10, 4.5)).toBe(0);
  expect(neededFiveStars(4.0, 0, 4.5)).toBe(0);
  expect(neededFiveStars(4.0, 20, 5)).toBeNull();
  // 結果を検算: 必要件数を足すと目標に届き、1件少ないと届かない
  const x = neededFiveStars(3.8, 57, 4.2);
  expect((3.8 * 57 + 5 * x) / (57 + x)).toBeGreaterThanOrEqual(4.2);
  expect((3.8 * 57 + 5 * (x - 1)) / (57 + x - 1)).toBeLessThan(4.2);
});

test("summarize counts categories and google actions", () => {
  const store = newStore("restaurant");
  const [a, b] = store.options;
  const s = summarize(
    [
      { rating: 5, selectedIds: [a.id, b.id], action: "google", createdAt: new Date().toISOString() },
      { rating: 2, selectedIds: [], action: "feedback", feedback: "遅い", createdAt: new Date().toISOString() },
    ],
    store
  );
  expect(s.n).toBe(2);
  expect(s.avg).toBe(3.5);
  expect(s.googleRate).toBe(0.5);
  expect(s.feedback).toBe(1);
  expect(s.byCategory.find((c) => c.id === "quality").count).toBe(2);
  expect(s.days[13].count).toBe(2);
});

test("templateReview uses only selected points", () => {
  const store = { ...newStore("restaurant"), name: "テスト食堂" };
  const sel = store.options.slice(0, 2);
  const text = templateReview({ store, rating: 5, purpose: "ランチ", selected: sel, comment: "また来ます", lang: "ja" });
  expect(text).toContain("テスト食堂");
  sel.forEach((o) => expect(text).toContain(o.phrase));
  expect(text).toContain("また来ます。");
  expect(findNgWords(text, ["テスト", "激安"])).toEqual(["テスト"]);
});
