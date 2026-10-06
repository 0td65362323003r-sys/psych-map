// データ保存層。Supabase の環境変数があれば Supabase、なければ localStorage を使う。
// localStorage モードは同じブラウザ内だけで完結するお試し用。
import { createClient } from "@supabase/supabase-js";

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;
const sb = url && key ? createClient(url, key) : null;

export const storageMode = sb ? "supabase" : "local";

const LS_STORES = "kuchikomi_stores";
const LS_RESPONSES = "kuchikomi_responses";

function lsRead(k) {
  try {
    return JSON.parse(localStorage.getItem(k) || "[]");
  } catch {
    return [];
  }
}
function lsWrite(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    // 容量超過などは無視（画面上の状態は保持される）
  }
}

// ─── 店舗 ───────────────────────────────────────────────
export async function listStores() {
  if (sb) {
    const { data, error } = await sb.from("kk_stores").select("id, data").order("created_at");
    if (error) throw error;
    return data.map((r) => ({ ...r.data, id: r.id }));
  }
  return lsRead(LS_STORES);
}

export async function getStore(id) {
  if (sb) {
    const { data, error } = await sb.from("kk_stores").select("id, data").eq("id", id).maybeSingle();
    if (error) throw error;
    return data ? { ...data.data, id: data.id } : null;
  }
  return lsRead(LS_STORES).find((s) => s.id === id) || null;
}

export async function saveStore(store) {
  if (sb) {
    const { error } = await sb.from("kk_stores").upsert({ id: store.id, data: store });
    if (error) throw error;
    return store;
  }
  const all = lsRead(LS_STORES);
  const i = all.findIndex((s) => s.id === store.id);
  if (i >= 0) all[i] = store;
  else all.push(store);
  lsWrite(LS_STORES, all);
  return store;
}

export async function deleteStore(id) {
  if (sb) {
    const { error } = await sb.from("kk_stores").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  lsWrite(LS_STORES, lsRead(LS_STORES).filter((s) => s.id !== id));
  lsWrite(LS_RESPONSES, lsRead(LS_RESPONSES).filter((r) => r.storeId !== id));
}

// ─── アンケート回答 ─────────────────────────────────────
export async function addResponse(resp) {
  const row = {
    id: Math.random().toString(36).slice(2, 12),
    createdAt: new Date().toISOString(),
    ...resp,
  };
  if (sb) {
    const { error } = await sb
      .from("kk_responses")
      .insert({ id: row.id, store_id: row.storeId, data: row });
    if (error) throw error;
    return row;
  }
  const all = lsRead(LS_RESPONSES);
  all.push(row);
  lsWrite(LS_RESPONSES, all);
  return row;
}

export async function updateResponse(row) {
  if (sb) {
    const { error } = await sb.from("kk_responses").update({ data: row }).eq("id", row.id);
    if (error) throw error;
    return row;
  }
  const all = lsRead(LS_RESPONSES);
  const i = all.findIndex((r) => r.id === row.id);
  if (i >= 0) all[i] = row;
  lsWrite(LS_RESPONSES, all);
  return row;
}

export async function listResponses(storeId) {
  if (sb) {
    const { data, error } = await sb
      .from("kk_responses")
      .select("data")
      .eq("store_id", storeId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data.map((r) => r.data);
  }
  return lsRead(LS_RESPONSES)
    .filter((r) => r.storeId === storeId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
