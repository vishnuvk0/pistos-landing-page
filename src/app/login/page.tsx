"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-white">Check your email</h1>
          <p className="mt-3 text-sm text-text-secondary">
            We sent a login link to <span className="text-white">{email}</span>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white">Log in to Pistos</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Enter your email to receive a login link.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-secondary"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-describedby={error ? "email-error" : undefined}
              aria-invalid={error ? true : undefined}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-white placeholder-text-tertiary focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
            {error && (
              <p id="email-error" role="alert" className="mt-1 text-sm text-red-400">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-gray-200"
          >
            Continue with email
          </button>
        </form>
      </div>
    </main>
  );
}
