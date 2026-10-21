import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Lesson = {
  id: string;
  title: string;
  description?: string | null;
  content?: string | null;
  video_url?: string | null;
  course_id: string;
  display_order: number;
};

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState(false);
  const [courseSlug, setCourseSlug] = useState("");

  useEffect(() => {
    let active = true;

    async function loadLesson() {
      setBusy(true);
      setError("");
      setLocked(false);
      setLesson(null);

      try {
        if (!supabase || !lessonId) {
          throw new Error("This lesson is unavailable.");
        }

        // Fetch lesson metadata first; do not fetch paid content yet.
        const { data: meta, error: metaError } = await supabase
          .from("lessons")
          .select("id,title,description,course_id,display_order")
          .eq("id", lessonId)
          .maybeSingle();

        if (metaError) throw metaError;
        if (!meta?.course_id) throw new Error("This lesson is unavailable.");

        const { data: course, error: courseError } = await supabase
          .from("courses")
          .select("slug")
          .eq("id", meta.course_id)
          .maybeSingle();

        if (courseError) throw courseError;
        const slug = course?.slug ?? "";
        if (active) {
          setCourseSlug(slug);
          setLesson(meta as Lesson);
        }

        const { data: firstLesson, error: firstError } = await supabase
          .from("lessons")
          .select("id")
          .eq("course_id", meta.course_id)
          .order("display_order", { ascending: true })
          .limit(1)
          .maybeSingle();

        if (firstError) throw firstError;

        const isFreeLesson = firstLesson?.id === meta.id;
        let entitled = false;

        if (!isFreeLesson && slug) {
          const { data: { user } } = await supabase.auth.getUser();

          if (user) {
            const { data: access, error: accessError } = await supabase
              .from("sai9ja_course_entitlements")
              .select("id")
              .eq("user_id", user.id)
              .eq("course_slug", slug)
              .eq("status", "active")
              .maybeSingle();

            if (accessError) throw accessError;
            entitled = Boolean(access);
          }
        }

        if (!isFreeLesson && !entitled) {
          if (active) setLocked(true);
          return;
        }

        // Only fetch lesson content and video after access is established.
        const { data: content, error: contentError } = await supabase
          .from("lessons")
          .select("content,video_url")
          .eq("id", lessonId)
          .maybeSingle();

        if (contentError) throw contentError;

        let videoUrl = content?.video_url ?? "";
        const { data: videoData } = await supabase
          .from("lesson_videos")
          .select("video_url")
          .eq("lesson_id", lessonId)
          .maybeSingle();

        if (videoData?.video_url) videoUrl = videoData.video_url;

        if (active) {
          setLesson({
            ...meta,
            content: content?.content ?? null,
            video_url: videoUrl || null,
          } as Lesson);
        }
      } catch (e) {
        if (active) {
          setError(e instanceof Error ? e.message : "Unable to load this lesson.");
        }
      } finally {
        if (active) setBusy(false);
      }
    }

    void loadLesson();
    return () => { active = false; };
  }, [lessonId]);

  const videoUrl = lesson?.video_url ?? "";
  const youtubeId = videoUrl.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  )?.[1];

  return (
    <main className="sa9-page">
      <p className="sa9-eyebrow">SUPER-AI 9ja · YOUR LEARNING SPACE</p>
      <p><Link to="/learning">← Back to courses</Link></p>

      {busy && <p role="status">Loading lesson…</p>}

      {error && (
        <section className="sa9-panel">
          <h1>Lesson unavailable</h1>
          <p role="alert">{error}</p>
          <Link to="/learning">Return to learning</Link>
        </section>
      )}

      {!busy && locked && lesson && (
        <section className="sa9-panel">
          <h1>{lesson.title}</h1>
          <p>This lesson is part of the paid learning path. Unlock the course to continue.</p>
          <Link to={`/learning/courses/${encodeURIComponent(courseSlug)}`}>
            View course and unlock access →
          </Link>
        </section>
      )}

      {!busy && !locked && !error && lesson && (
        <article className="sa9-panel">
          <h1>{lesson.title}</h1>
          {lesson.description && <p>{lesson.description}</p>}

          {youtubeId ? (
            <div className="sa9-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                title={lesson.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : videoUrl ? (
            <p><a href={videoUrl} target="_blank" rel="noreferrer">Open lesson video ↗</a></p>
          ) : (
            <p>This lesson does not have a video link yet.</p>
          )}

          {lesson.content && (
            <section>
              <h2>Lesson notes</h2>
              <div style={{ whiteSpace: "pre-wrap" }}>{lesson.content}</div>
            </section>
          )}
        </article>
      )}
    </main>
  );
}
