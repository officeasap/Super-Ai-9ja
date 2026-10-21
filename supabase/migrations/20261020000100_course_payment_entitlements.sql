create table if not exists public.sai9ja_course_prices (
  course_slug text primary key,
  amount numeric(12,2) not null check (amount > 0),
  currency text not null default 'USD',
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.sai9ja_course_prices
  (course_slug, amount, currency)
values
  ('sai-ai-agents-workflow-automation', 35.00, 'USD')
on conflict (course_slug) do update
set amount = excluded.amount,
    currency = excluded.currency,
    updated_at = now();

create table if not exists public.sai9ja_course_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null references public.sai9ja_course_prices(course_slug),
  payment_provider text not null default 'flutterwave',
  transaction_reference text not null unique,
  transaction_id text unique,
  amount numeric(12,2) not null,
  currency text not null,
  status text not null default 'active'
    check (status in ('active', 'revoked')),
  created_at timestamptz not null default now(),
  unique (user_id, course_slug)
);

alter table public.sai9ja_course_prices enable row level security;
alter table public.sai9ja_course_entitlements enable row level security;

drop policy if exists "Learners read their own course entitlements"
  on public.sai9ja_course_entitlements;

create policy "Learners read their own course entitlements"
  on public.sai9ja_course_entitlements
  for select to authenticated
  using (auth.uid() = user_id);

grant select on public.sai9ja_course_prices to anon, authenticated;
grant select on public.sai9ja_course_entitlements to authenticated;
