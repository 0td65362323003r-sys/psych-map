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

-- ─── シーシャの試飲記録（フレーバー相性表の「試飲記録」タブ） ───
create table if not exists tastings (
  id          uuid        default gen_random_uuid() primary key,
  flavor_a    text        not null,
  flavor_b    text        not null,
  score       smallint    not null check (score between 1 and 5),
  ratio       text        default '',
  products    text        default '',
  taster      text        default '',
  blind       boolean     default false,
  note        text        default '',
  created_at  timestamptz default now()
);

alter table tastings enable row level security;

create policy "Public read"   on tastings for select using (true);
create policy "Public insert" on tastings for insert with check (true);
create policy "Public delete" on tastings for delete using (true);
