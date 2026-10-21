
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");

    const client = supabase;
    if (!client) {
      setError("Authentication is not configured. Please try again later.");
      setBusy(false);
      return;
    }

    try {
      if (mode === "magic") {
        const { error: authError } = await client.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/learning`,
          },
        });
        if (authError) throw authError;
        setNotice("Check your email for your secure sign-in link.");
      } else {
        const { error: authError } =
          await client.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        navigate("/learning");
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to sign in. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="sa9-page sa9-auth-page">
      <section className="sa9-auth-card">
        <p className="sa9-eyebrow">WELCOME BACK</p>
        <h1>Pick up where you left off.</h1>
        <p>Sign in to continue your AI learning journey.</p>

        <div className="sa9-controls">
          <button
            type="button"
            aria-pressed={mode === "password"}
            onClick={() => setMode("password")}
          >
            Password
          </button>
          <button
            type="button"
            aria-pressed={mode === "magic"}
            onClick={() => setMode("magic")}
          >
            Email link
          </button>
        </div>

        <form onSubmit={submit}>
          <label htmlFor="signin-email">Email address</label>
          <input
            id="signin-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          {mode === "password" && (
            <>
              <label htmlFor="signin-password">Password</label>
              <input
                id="signin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </>
          )}

          {error && <p role="alert">{error}</p>}
          {notice && <p role="status">{notice}</p>}

          <button type="submit" disabled={busy}>
            {busy
              ? "Please wait…"
              : mode === "magic"
                ? "Send secure sign-in link"
                : "Sign in →"}
          </button>
        </form>

        <p>
          New to SUPER-AI 9ja? <Link to="/register">Create an account</Link>
        </p>
        <Link to="/learning">Browse courses without signing in</Link>
      </section>
    </main>
  );
}
