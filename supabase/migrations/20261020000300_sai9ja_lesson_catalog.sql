-- SUPER-AI 9ja: real lesson catalog and separately protected lesson content.
-- This migration uses isolated sai9ja_* tables.

alter table public.sai9ja_courses
  add column if not exists slug text,
  add column if not exists description text,
  add column if not exists content_language text not null default 'en',
  add column if not exists level text not null default 'Beginner',
  add column if not exists estimated_minutes integer,
  add column if not exists published_at timestamptz;

-- The public route slug is stable and matches the existing course IDs.
update public.sai9ja_courses set slug = id where slug is null;
create unique index if not exists sai9ja_courses_slug_key
  on public.sai9ja_courses (slug);

create table if not exists public.sai9ja_lessons (
  id text primary key,
  course_id text not null references public.sai9ja_courses(id) on delete cascade,
  title text not null,
  description text not null default '',
  display_order integer not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  unique (course_id, display_order)
);

create table if not exists public.sai9ja_lesson_content (
  lesson_id text primary key references public.sai9ja_lessons(id) on delete cascade,
  content text not null default '',
  video_url text,
  updated_at timestamptz not null default now()
);

alter table public.sai9ja_lessons enable row level security;
alter table public.sai9ja_lesson_content enable row level security;

drop policy if exists "Published SUPER-AI 9ja lessons are readable"
  on public.sai9ja_lessons;

create policy "Published SUPER-AI 9ja lessons are readable"
  on public.sai9ja_lessons for select to anon, authenticated
  using (
    is_published = true
    and exists (
      select 1 from public.sai9ja_courses c
      where c.id = course_id and c.is_published = true
    )
  );

drop policy if exists "Free first lesson or entitled course content"
  on public.sai9ja_lesson_content;

create policy "Free first lesson or entitled course content"
  on public.sai9ja_lesson_content for select to anon, authenticated
  using (
    exists (
      select 1
      from public.sai9ja_lessons l
      join public.sai9ja_courses c on c.id = l.course_id
      where l.id = lesson_id
        and l.is_published = true
        and c.is_published = true
        and (
          l.display_order = (
            select min(first_lesson.display_order)
            from public.sai9ja_lessons first_lesson
            where first_lesson.course_id = l.course_id
              and first_lesson.is_published = true
          )
          or exists (
            select 1
            from public.sai9ja_course_entitlements e
            where e.course_slug = l.course_id
              and e.status = 'active'
              and e.user_id = (select auth.uid())
          )
        )
    )
  );

-- Anonymous users can read published lesson metadata and the free first lesson only.
grant select on public.sai9ja_lessons to anon, authenticated;
grant select on public.sai9ja_lesson_content to anon, authenticated;

-- Publish the existing official catalogue without changing its prices.
update public.sai9ja_courses
set is_published = true,
    published_at = coalesce(published_at, now()),
    updated_at = now()
where id in (
  'sai-ai-literacy-enterprise-upskilling',
  'sai-python-programming',
  'sai-ai-video-editing-content-creation',
  'sai-cybersecurity-ai-safety',
  'sai-deep-learning',
  'sai-ai-agents-workflow-automation',
  'sai-hugging-face-llms-generative-ai',
  'sai-nvidia-generative-ai-llms',
  'sai-applied-machine-learning-mlops'
);

update public.sai9ja_courses
set description = 'Learn a practical workflow for planning, editing, and publishing AI-assisted video content.',
    estimated_minutes = 300
where id = 'sai-ai-video-editing-content-creation';

-- Real authored study lessons: no invented video URLs.
insert into public.sai9ja_lessons
  (id, course_id, title, description, display_order, is_published)
values
  ('sai-video-editing-01', 'sai-ai-video-editing-content-creation',
   'Your First AI Video Project',
   'Understand the workflow and plan a short video before opening an editor.',
   1, true),
  ('sai-video-editing-02', 'sai-ai-video-editing-content-creation',
   'Write a Strong Video Brief and Script',
   'Define the audience, message, hook, structure, and call to action.',
   2, true),
  ('sai-video-editing-03', 'sai-ai-video-editing-content-creation',
   'Generate and Organise Visual Assets',
   'Plan visuals, create a consistent asset list, and check usage rights.',
   3, true),
  ('sai-video-editing-04', 'sai-ai-video-editing-content-creation',
   'Edit the Story: Cuts, Pacing, and Continuity',
   'Build a coherent timeline and remove distractions.',
   4, true),
  ('sai-video-editing-05', 'sai-ai-video-editing-content-creation',
   'Voice, Music, Captions, and Accessibility',
   'Balance audio, caption speech, and make the video easier to follow.',
   5, true),
  ('sai-video-editing-06', 'sai-ai-video-editing-content-creation',
   'Export, Publish, and Measure Results',
   'Choose an output format, quality-check the final video, and review performance.',
   6, true)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  display_order = excluded.display_order,
  is_published = excluded.is_published;

insert into public.sai9ja_lesson_content (lesson_id, content, video_url)
values
('sai-video-editing-01',
'## Learning objectives

By the end of this lesson, you can describe a basic AI-assisted video workflow and plan a short video.

## The workflow

1. **Purpose:** Write one sentence explaining what the viewer should learn, feel, or do.
2. **Audience:** Identify who the video is for and what they already know.
3. **Brief:** Specify the topic, format, length, tone, and delivery platform.
4. **Script:** Draft a hook, three main points, and a closing action.
5. **Assets:** List footage, generated visuals, voice, music, and captions.
6. **Edit:** Arrange clips, refine timing, balance sound, and review continuity.
7. **Quality check:** Verify facts, permissions, captions, audio, and export settings.

AI can help brainstorm, draft scripts, generate assets, and speed up repetitive editing. It does not remove your responsibility to verify facts, respect people’s likeness and rights, and check the final output.

## Practical activity

Plan a 30–45 second video teaching one useful skill. Write its audience, goal, opening hook, three beats, closing action, and required assets.

## Knowledge check

1. Why define the audience before generating assets?
2. Name three checks you should complete before publishing.
3. Which decisions should remain under your review even when AI tools are used?

## Completion evidence

Save your one-page video brief. You will reuse it in the next lessons.',
null),
('sai-video-editing-02',
'## Learning objectives

Write a focused brief and a script that can be edited into a short video.

## Build the brief

Record the audience, viewer problem, one key message, platform, target duration, visual style, and desired action. Avoid trying to teach several unrelated ideas in one short video.

## Script structure

- **Hook:** Give viewers a clear reason to keep watching.
- **Context:** Explain the problem or situation.
- **Main beats:** Present a small number of ordered points.
- **Demonstration:** Show an example when possible.
- **Close:** Summarise the value and state the next action.

Use AI to draft alternatives, then check every claim and rewrite the script in a natural voice. Do not treat generated facts as verified facts.

## Practical activity

Write a 100-word maximum script for your project. Mark each sentence with the visual or demonstration that should accompany it.

## Knowledge check

1. What makes a hook relevant rather than merely sensational?
2. Why should each script beat have a corresponding visual?
3. What must be checked before using AI-generated claims?',
null),
('sai-video-editing-03',
'## Learning objectives

Prepare the visual and audio assets required for a coherent edit.

## Asset plan

Create a checklist for footage, generated images or clips, narration, music, sound effects, and captions. Give each asset a clear filename and note its source and usage permissions.

## Consistency and responsible use

Keep the visual style, subject details, lighting, and aspect ratio consistent where appropriate. Review generated assets for visual errors, misleading depictions, stereotypes, and accidental imitation of protected work. Obtain permission for real people’s likenesses and voices where required.

## Practical activity

Build an asset list for your script. Mark each item as recorded, generated, licensed, or still needed.

## Knowledge check

1. Why keep a source record for each asset?
2. What should you inspect in generated footage?
3. Why is a consistent asset naming system useful?',
null),
('sai-video-editing-04',
'## Learning objectives

Assemble a clear timeline using cuts, pacing, and continuity.

## Editing principles

Put clips in story order before polishing effects. Remove pauses that do not serve the message, but preserve enough time for viewers to understand each idea. Use transitions only when they help communicate a change. Keep text readable and avoid visual effects that compete with the subject.

Check continuity between shots: subject position, screen direction, audio ambience, and the logic of actions. Review the edit once for story and again for technical problems.

## Practical activity

Assemble a rough cut from your planned assets. Watch it without sound, then listen without looking at the screen. Record three changes that would improve clarity.

## Knowledge check

1. When is a cut better than a transition?
2. What is continuity?
3. Why review the picture and audio separately?',
null),
('sai-video-editing-05',
'## Learning objectives

Make audio understandable and provide accessible captions.

## Audio workflow

Keep narration clear and consistent. Lower music beneath speech, remove distracting noise when practical, and listen on more than one device. Avoid clipping and abrupt changes in loudness.

## Captions and accessibility

Check captions against the spoken words, names, numbers, and punctuation. Use readable contrast and timing. Do not place captions over important visual information. Ensure meaning is not communicated through sound alone.

AI transcription and voice tools can save time, but review pronunciation, consent, language accuracy, and any disclosure requirements that apply.

## Practical activity

Add narration, background audio where appropriate, and captions to your rough cut. Correct at least five caption or timing issues if you find them.

## Knowledge check

1. Why should music sit below narration?
2. What errors commonly appear in automatic captions?
3. How do captions improve access?',
null),
('sai-video-editing-06',
'## Learning objectives

Prepare a reliable export and evaluate the published result.

## Export checklist

Confirm the destination platform’s aspect ratio, resolution, frame rate, file format, and size limits. Watch the exported file from beginning to end. Check spelling, framing, audio, captions, transitions, and the final frame.

Keep an editable project and a clearly named final export. Confirm you have permission for all included media and disclose synthetic content where appropriate or required.

## Measure and improve

Choose a metric tied to the goal: completion rate, watch time, click-through, saves, or a meaningful audience response. Use the results to improve the next version rather than relying only on views.

## Final practical activity

Export your 30–45 second video. Submit the brief, script, asset list, final file, and a short reflection naming one successful choice and one improvement.

## Knowledge check

1. Why review the exported file instead of only the editor timeline?
2. Which metric best reflects whether viewers watched to the end?
3. What evidence should accompany your final project?',
null)
on conflict (lesson_id) do nothing;

