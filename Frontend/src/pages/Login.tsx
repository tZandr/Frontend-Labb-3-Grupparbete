import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, login } from "../auth";
import "./Login.scss";

type LoginLocationState = { from?: string };

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated()) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      const state = location.state as LoginLocationState | null;
      navigate(state?.from ?? "/dashboard", { replace: true });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to log in. Please try again.");
    } finally { setIsSubmitting(false); }
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="login-form__eyebrow">Bloom</p>
        <h1>Welcome back</h1>
        <p className="login-form__intro">Log in to access your personal dashboard.</p>
        <label htmlFor="email">Email address
          <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label htmlFor="password">Password
          <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error && <p className="login-form__error" role="alert">{error}</p>}
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Logging in…" : "Log in"}</button>
      </form>
    </main>
  );
}
