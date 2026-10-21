-- SUPER-AI 9ja: free courses are fully readable without payment.
-- Paid courses keep the first-lesson preview plus active-entitlement access.

drop policy if exists "Free first lesson or entitled course content"
  on public.sai9ja_lesson_content;
drop policy if exists "Free courses, paid preview, or entitled content"
  on public.sai9ja_lesson_content;

create policy "Free courses, paid preview, or entitled content"
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
          c.is_free = true
          or l.display_order = (
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
