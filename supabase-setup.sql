-- Supabase の SQL Editor でこれを実行してください

create table if not exists patterns (
  id          uuid        default gen_random_uuid() primary key,
  sign_id     text        unique not null,
  label       text        not null,
  sub         text        default '',
  color       text        default '#c084fc',
  accent      text        default '#7c3aed',
  experiences text[]      default '{}',
  worldview   text[]      default '{}',
  behaviors   text[]      default '{}',
  lack        text        default '',
  category    text        default 'sign',
  created_at  timestamptz default now()
);

-- 既存テーブルにカテゴリ列が無い場合に追加
alter table patterns add column if not exists category text default 'sign';

-- 誰でも読み書きできるポリシー（個人利用・小規模向け）
alter table patterns enable row level security;

drop policy if exists "Public read"   on patterns;
drop policy if exists "Public insert" on patterns;
drop policy if exists "Public update" on patterns;
drop policy if exists "Public delete" on patterns;

create policy "Public read"   on patterns for select using (true);
create policy "Public insert" on patterns for insert with check (true);
create policy "Public update" on patterns for update using (true) with check (true);
create policy "Public delete" on patterns for delete using (true);

-- 携帯アプリ・別タブとのリアルタイム同期を有効化
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'patterns'
  ) then
    alter publication supabase_realtime add table patterns;
  end if;
end $$;
