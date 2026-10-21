

import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const languages = [
  { value: "en", label: "English" },
  { value: "pcm", label: "Nigerian Pidgin" },
  { value: "yo", label: "Yorùbá" },
  { value: "ha", label: "Hausa" },
  { value: "ig", label: "Igbo" },
];

const tracks = [
  "AI Literacy & Enterprise Upskilling",
  "Python Programming",
  "Cybersecurity & AI Safety",
  "Deep Learning",
  "AI Agents & Workflow Automation",
  "Large Language Models & Generative AI",
  "Generative AI & LLM Applications",
  "Applied Machine Learning & MLOps",
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function TutorPage() {
  const [track, setTrack] = useState(tracks[0]);
  const [language, setLanguage] = useState("en");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage() {
    const prompt = question.trim();

    if (!prompt || busy) return;

    if (prompt.length > 4000) {
      setError("Your question must be 4,000 characters or fewer.");
      return;
    }

    if (!supabase) {
      setError(
        "The learning service is not configured. Please try again later.",
      );
      return;
    }

    const history: Message[] = [
      ...messages,
      { role: "user", content: prompt },
    ];

    setError("");
    setQuestion("");
    setMessages(history);
    setBusy(true);

    try {
      const { data, error: invokeError } =
        await supabase.functions.invoke("tutor-chat", {
          body: {
            message: prompt,
            history: history.slice(-8),
            subject: track,
            track,
            language,
          },
        });

      if (invokeError) {
        throw invokeError;
      }

      const answer: unknown =
        data?.reply ??
        data?.response ??
        data?.message ??
        data?.answer;

      if (typeof answer !== "string" || !answer.trim()) {
        throw new Error(
          "The tutor returned no answer. Please try again.",
        );
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: answer.trim() },
      ]);
    } catch (caught: unknown) {
      // Preserve the learner's question in the composer so it can be retried.
      setQuestion(prompt);

      setError(
        caught instanceof Error && caught.message.trim()
          ? caught.message
          : "The tutor is temporarily unavailable. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="sa9-page">
      <section className="sa9-hero">
        <p className="sa9-eyebrow">
          SUPER-AI 9ja · PERSONAL LEARNING
        </p>

        <h1>Your AI learning companion.</h1>

        <p>
          Ask questions, unpack difficult concepts, practise your skills,
          and learn at your pace in your preferred language.
        </p>
      </section>

      <section className="sa9-panel">
        <div className="sa9-controls">
          <label>
            Learning track
            <select
              value={track}
              onChange={(event) => setTrack(event.target.value)}
            >
              {tracks.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Language
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {languages.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="sa9-chat" aria-live="polite">
          {messages.length === 0 ? (
            <div className="sa9-empty">
              <span aria-hidden="true">✳</span>

              <h2>What are we learning today?</h2>

              <p>
                Ask for an explanation, a worked example, a practice
                exercise, or feedback on your understanding.
              </p>

              <div className="sa9-suggestions">
                {[
                  "Explain AI in simple terms.",
                  "Give me a practical Python exercise.",
                  "How do large language models work?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      setQuestion(suggestion);
                      setError("");
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <article
                className="sa9-message"
                key={`${index}-${message.role}`}
              >
                <strong>
                  {message.role === "user"
                    ? "You"
                    : "SUPER-AI Tutor"}
                </strong>

                <p style={{ whiteSpace: "pre-wrap" }}>
                  {message.content}
                </p>
              </article>
            ))
          )}

          {busy && (
            <p role="status">Your tutor is thinking…</p>
          )}
        </div>

        {error && <p role="alert">{error}</p>}

        <form
          className="sa9-composer"
          onSubmit={(event) => {
            event.preventDefault();
            void sendMessage();
          }}
        >
          <label htmlFor="tutor-question">
            Your question
          </label>

          <textarea
            id="tutor-question"
            value={question}
            onChange={(event) => {
              setQuestion(event.target.value);
              if (error) setError("");
            }}
            placeholder="Ask a question or describe what you want to understand…"
            rows={4}
            maxLength={4000}
            required
            disabled={busy}
          />

          <div className="sa9-composer-footer">
            <span>{question.length}/4000</span>

            <button
              type="submit"
              disabled={busy || !question.trim()}
            >
              {busy ? "Thinking…" : "Ask your tutor →"}
            </button>
          </div>
        </form>
      </section>

      <p className="sa9-footnote">
        Your tutor supports learning; verify important technical and
        safety decisions.{" "}
        <Link to="/learning">Explore courses</Link>
      </p>
    </main>
  );
}
