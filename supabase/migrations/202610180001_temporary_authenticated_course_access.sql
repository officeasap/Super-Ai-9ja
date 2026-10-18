-- Temporary testing access policy for SUPER-AI 9ja.
-- Authenticated learners retain the existing published-content policies.
-- Anonymous users are additionally restricted by RESTRICTIVE RLS policies to
-- the first published lesson and its lesson-scoped objectives/resources.
-- This migration does not create payment records or imply a payment entitlement.

BEGIN;

CREATE OR REPLACE FUNCTION public.is_first_published_lesson(p_lesson_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.lessons AS target
    WHERE target.id::text = p_lesson_id
      AND target.status = 'published'
      AND target.published_at IS NOT NULL
      AND target.id::text = (
        SELECT first_lesson.id::text
        FROM public.lessons AS first_lesson
        WHERE first_lesson.course_id = target.course_id
          AND first_lesson.status = 'published'
          AND first_lesson.published_at IS NOT NULL
        ORDER BY first_lesson.display_order ASC, first_lesson.id ASC
        LIMIT 1
      )
  );
$function$;

REVOKE ALL ON FUNCTION public.is_first_published_lesson(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_first_published_lesson(text) TO anon, authenticated;

DROP POLICY IF EXISTS anon_first_published_lesson_only ON public.lessons;
CREATE POLICY anon_first_published_lesson_only
  ON public.lessons
  AS RESTRICTIVE
  FOR SELECT
  TO anon
  USING (public.is_first_published_lesson(id::text));

DROP POLICY IF EXISTS anon_first_lesson_objectives_only ON public.lesson_objectives;
CREATE POLICY anon_first_lesson_objectives_only
  ON public.lesson_objectives
  AS RESTRICTIVE
  FOR SELECT
  TO anon
  USING (public.is_first_published_lesson(lesson_id::text));

DROP POLICY IF EXISTS anon_first_lesson_resources_only ON public.lesson_resources;
CREATE POLICY anon_first_lesson_resources_only
  ON public.lesson_resources
  AS RESTRICTIVE
  FOR SELECT
  TO anon
  USING (public.is_first_published_lesson(lesson_id::text));

COMMIT;
