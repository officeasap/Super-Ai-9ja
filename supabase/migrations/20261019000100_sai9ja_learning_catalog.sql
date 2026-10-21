
-- SUPER-AI 9ja
-- Isolated course catalogue; does not alter existing application tables.

create table if not exists public.sai9ja_courses (
  id text primary key,
  title text not null,
  price_usd numeric(10, 2) not null default 0
    check (price_usd >= 0),
  is_free boolean not null default true,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sai9ja_courses enable row level security;

drop policy if exists "Published courses are publicly readable"
  on public.sai9ja_courses;

create policy "Published courses are publicly readable"
  on public.sai9ja_courses
  for select
  to anon, authenticated
  using (is_published = true);

-- Seed the official catalogue without overwriting existing edits.
insert into public.sai9ja_courses
  (id, title, price_usd, is_free, is_published)
values
  ('sai-ai-literacy-enterprise-upskilling',
   'AI Literacy & Enterprise Upskilling', 0, true, false),
  ('sai-python-programming',
   'Python Programming', 35, false, false),
  ('sai-ai-video-editing-content-creation',
   'AI Video Editing & Content Creation', 35, false, false),
  ('sai-cybersecurity-ai-safety',
   'Cybersecurity & AI Safety', 35, false, false),
  ('sai-deep-learning',
   'Deep Learning', 0, true, false),
  ('sai-ai-agents-workflow-automation',
   'AI Agents & Workflow Automation', 35, false, false),
  ('sai-hugging-face-llms-generative-ai',
   'Large Language Models & Generative AI', 0, true, false),
  ('sai-nvidia-generative-ai-llms',
   'Generative AI & LLM Applications', 0, true, false),
  ('sai-applied-machine-learning-mlops',
   'Applied Machine Learning & MLOps', 0, true, false)
on conflict (id) do nothing;

grant select on public.sai9ja_courses to anon, authenticated;
