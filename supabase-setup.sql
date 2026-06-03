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
  created_at  timestamptz default now()
);

-- 誰でも読み書きできるポリシー（個人利用・小規模向け）
alter table patterns enable row level security;

create policy "Public read"   on patterns for select using (true);
create policy "Public insert" on patterns for insert with check (true);
