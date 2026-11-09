-- kaç saat? — Supabase şeması
-- Supabase Dashboard > SQL Editor içinde çalıştırın.

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Profil / ayarlar
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  monthly_income numeric,
  weekly_hours numeric,
  commute_minutes numeric,
  work_days numeric,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- ------------------------------------------------------------
-- Kararlar
-- ------------------------------------------------------------
create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  price numeric not null,
  hours numeric not null,
  status text not null default 'waiting'
    check (status in ('waiting', 'bought', 'skipped')),
  created_at timestamptz not null default now(),
  decide_at timestamptz not null
);

create index if not exists decisions_user_created_idx
  on public.decisions (user_id, created_at desc);

alter table public.decisions enable row level security;

drop policy if exists "decisions_select_own" on public.decisions;
create policy "decisions_select_own"
  on public.decisions for select
  using (auth.uid() = user_id);

drop policy if exists "decisions_insert_own" on public.decisions;
create policy "decisions_insert_own"
  on public.decisions for insert
  with check (auth.uid() = user_id);

drop policy if exists "decisions_update_own" on public.decisions;
create policy "decisions_update_own"
  on public.decisions for update
  using (auth.uid() = user_id);

drop policy if exists "decisions_delete_own" on public.decisions;
create policy "decisions_delete_own"
  on public.decisions for delete
  using (auth.uid() = user_id);
