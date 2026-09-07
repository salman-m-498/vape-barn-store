"use client";

import { useState } from "react";
import { submitSignup } from "@/lib/signup";

type State = "idle" | "loading" | "success" | "error";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function Signup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setState("error");
      setMessage("Please enter your email address.");
      return;
    }
    if (!isValidEmail(value)) {
      setState("error");
      setMessage("That email doesn&rsquo;t look right. Check it and try again.");
      return;
    }

    setState("loading");
    const result = await submitSignup(value);
    if (result.ok) {
      setState("success");
      setMessage("You&rsquo;re on the list. We&rsquo;ll shout when the doors open.");
    } else {
      setState("error");
      setMessage(result.message ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="keepme" className="border-b border-navy/14">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Be first through the doors
          </p>
          <h2 className="font-display text-4xl leading-[1.02] tracking-brand text-navy sm:text-6xl">
            Keep me posted
          </h2>
          <p className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-navy/70">
            Drop your email and you&rsquo;ll be the first to know when the online
            Barn opens. No spam, just the good stuff.
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-10">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="signup-email" className="sr-only">
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state !== "idle") {
                    setState("idle");
                    setMessage("");
                  }
                }}
                className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="shrink-0 rounded-sm bg-navy px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft disabled:opacity-60"
              >
                {state === "loading" ? "Signing you up…" : "Keep me posted"}
              </button>
            </div>

            {state === "success" && (
              <p role="status" className="mt-4 font-body text-sm text-navy/80">
                {message}
              </p>
            )}
            {state === "error" && (
              <p role="alert" className="mt-4 font-body text-sm text-red-700">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
