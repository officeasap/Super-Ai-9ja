create table if not exists public.sai9ja_course_payment_intents (
  transaction_reference text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null references public.sai9ja_course_prices(course_slug),
  amount numeric(12,2) not null check (amount > 0),
  currency text not null,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed')),
  transaction_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sai9ja_course_payment_intents
  enable row level security;

revoke all on public.sai9ja_course_payment_intents
  from anon, authenticated;

comment on table public.sai9ja_course_payment_intents is
  'Server-controlled payment attempts; grant course entitlements only after provider verification.';
