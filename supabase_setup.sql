-- ============================================================
-- Run this entire script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/yivihomudmpnqkqmxnvn/sql
-- ============================================================

-- 1. COURSES table
create table if not exists public.courses (
  id          bigserial primary key,
  title       text        not null,
  instructor  text,
  duration    numeric,
  created_at  timestamptz default now()
);

-- 2. PROFILES table (stores role per user)
create table if not exists public.profiles (
  id    uuid primary key references auth.users(id) on delete cascade,
  role  text not null default 'user' check (role in ('user','admin'))
);

-- 3. Auto-create profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Enable Row Level Security
alter table public.courses  enable row level security;
alter table public.profiles enable row level security;

-- 5. COURSES policies
-- Anyone logged in can READ courses
drop policy if exists "courses_read"   on public.courses;
create policy "courses_read"
  on public.courses for select
  to authenticated
  using (true);

-- Only admins can INSERT / UPDATE / DELETE courses
drop policy if exists "courses_insert" on public.courses;
create policy "courses_insert"
  on public.courses for insert
  to authenticated
  with check (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

drop policy if exists "courses_update" on public.courses;
create policy "courses_update"
  on public.courses for update
  to authenticated
  using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

drop policy if exists "courses_delete" on public.courses;
create policy "courses_delete"
  on public.courses for delete
  to authenticated
  using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

-- 6. PROFILES policies
-- Users can only read their own profile
drop policy if exists "profiles_read_own" on public.profiles;
create policy "profiles_read_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

-- ============================================================
-- After running the above, promote a user to admin manually:
-- UPDATE public.profiles SET role = 'admin' WHERE id = '<user-uuid>';
--
-- To find a user's UUID go to:
-- Authentication > Users > click the user > copy their UUID
-- ============================================================
