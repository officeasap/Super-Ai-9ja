-- SUPER-AI 9ja: align checkout prices with the official course catalogue.
insert into public.sai9ja_course_prices (course_slug, amount, currency, active)
values
  ('sai-python-programming', 35.00, 'USD', true),
  ('sai-ai-video-editing-content-creation', 35.00, 'USD', true),
  ('sai-cybersecurity-ai-safety', 35.00, 'USD', true),
  ('sai-ai-agents-workflow-automation', 35.00, 'USD', true)
on conflict (course_slug) do update
set amount = excluded.amount,
    currency = excluded.currency,
    active = excluded.active,
    updated_at = now();
