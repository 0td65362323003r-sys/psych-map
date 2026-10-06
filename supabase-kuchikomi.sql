-- 口コミアシスト用テーブル。Supabase の SQL Editor で実行してください。

create table if not exists kk_stores (
  id          text        primary key,
  data        jsonb       not null,
  created_at  timestamptz default now()
);

create table if not exists kk_responses (
  id          text        primary key,
  store_id    text        not null references kk_stores(id) on delete cascade,
  data        jsonb       not null,
  created_at  timestamptz default now()
);

create index if not exists kk_responses_store_idx on kk_responses (store_id, created_at desc);

alter table kk_stores    enable row level security;
alter table kk_responses enable row level security;

-- お客様（未ログイン）はアンケート表示のための店舗読み取りと、回答の追加・更新ができる
create policy "kk public read stores"     on kk_stores    for select using (true);
create policy "kk public insert response" on kk_responses for insert with check (true);
create policy "kk public update response" on kk_responses for update using (true);

-- 店舗の作成・編集・削除と回答の閲覧（管理画面）
-- ※ 小規模・お試し向けに公開しています。本番運用では Supabase Auth を導入し、
--    auth.uid() と店舗のオーナーIDを照合するポリシーに置き換えてください。
create policy "kk admin write stores"   on kk_stores    for all    using (true) with check (true);
create policy "kk admin read responses" on kk_responses for select using (true);
create policy "kk admin delete response" on kk_responses for delete using (true);
