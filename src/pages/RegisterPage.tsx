
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const { data, error: authError } = await client.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: `${window.location.origin}/learning`,
        },
      });

      if (authError) throw authError;

      if (data.session) {
        navigate("/learning");
      } else {
        setNotice(
          "Your registration was submitted. Check your email to confirm your account before signing in.",
        );
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="sa9-page sa9-auth-page">
      <section className="sa9-auth-card">
        <p className="sa9-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h1>Build skills that move you forward.</h1>
        <p>Create your account and begin learning practical AI skills.</p>

        <form onSubmit={submit}>
          <label htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            autoComplete="name"
            required
            maxLength={100}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p className="sa9-footnote">Use at least 8 characters.</p>

          {error && <p role="alert">{error}</p>}
          {notice && <p role="status">{notice}</p>}

          <button type="submit" disabled={busy}>
            {busy ? "Creating account…" : "Create my account →"}
          </button>
        </form>

        <p>
          Already registered? <Link to="/login">Sign in</Link>
        </p>
        <Link to="/learning">Explore courses first</Link>
      </section>
    </main>
  );
}
