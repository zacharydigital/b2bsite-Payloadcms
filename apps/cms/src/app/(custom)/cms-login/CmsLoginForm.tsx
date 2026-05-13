"use client";

import { FormEvent, useMemo, useState } from "react";

type Props = {
  redirectTo: string;
};

type LoginState = "idle" | "submitting" | "error";

const demoEmail = "admin@titanlaser.local";
const demoPassword = "TitanLaserDemo123!";

function normalizeRedirect(value: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin";
  }

  return value;
}

export default function CmsLoginForm({ redirectTo }: Props) {
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [state, setState] = useState<LoginState>("idle");
  const [message, setMessage] = useState("");
  const safeRedirect = useMemo(() => normalizeRedirect(redirectTo), [redirectTo]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/users/login", {
        body: JSON.stringify({ email, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      if (!response.ok) {
        setState("error");
        setMessage("Login failed. Check the email and password, then try again.");
        return;
      }

      window.location.assign(safeRedirect);
    } catch {
      setState("error");
      setMessage("The CMS login service is unavailable. Please try again.");
    }
  }

  return (
    <main className="cms-login-shell">
      <section className="cms-login-panel" aria-label="TitanLaser CMS login">
        <div className="cms-login-logo" aria-label="TitanLaser Content OS">
          <span>TL</span>
          <div>
            <strong>TitanLaser</strong>
            <em>Content OS</em>
          </div>
        </div>

        <header className="cms-login-header">
          <h1>Welcome back!</h1>
          <p>Enter your credentials to access your TitanLaser content workspace.</p>
        </header>

        <form className="cms-login-form" onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              autoComplete="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              type="email"
              value={email}
            />
          </label>

          <label>
            <span className="cms-login-row">
              Password
              <a href="/admin/forgot" tabIndex={-1}>
                forgot password
              </a>
            </span>
            <input
              autoComplete="current-password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              type="password"
              value={password}
            />
          </label>

          <label className="cms-login-check">
            <input type="checkbox" defaultChecked />
            <span>Remember for 30 days</span>
          </label>

          {message ? <p className="cms-login-error">{message}</p> : null}

          <button disabled={state === "submitting"} type="submit">
            {state === "submitting" ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="cms-login-divider">
          <span>Or</span>
        </div>

        <div className="cms-login-providers" aria-label="Demo provider slots">
          <button type="button">Sign in with Google</button>
          <button type="button">Sign in with Apple</button>
        </div>

        <aside className="cms-login-demo" aria-label="Demo login credentials">
          <span>Demo access</span>
          <code>
            {demoEmail} / {demoPassword}
          </code>
        </aside>
      </section>

      <section className="cms-login-media" aria-hidden="true" />
    </main>
  );
}
