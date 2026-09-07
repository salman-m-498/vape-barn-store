"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "vapebarn-age-verified";

function readVerified(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "yes";
  } catch {
    return false;
  }
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return readVerified();
}

export function AgeGate() {
  const verified = useSyncExternalStore(subscribe, getSnapshot, () => true);

  function confirm() {
    try {
      localStorage.setItem(STORAGE_KEY, "yes");
    } catch {}
    for (const l of listeners) l();
  }

  function deny() {
    window.location.href = "https://www.google.com";
  }

  if (verified) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="agegate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/85 p-5 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md overflow-hidden border border-cream/15 bg-cream">
        <div className="flex flex-col items-center px-8 pt-8 text-center">
          <Image
            src={(process.env.NEXT_PUBLIC_BASE_PATH || "") + "/brand/cloude_agecheck.png"}
            alt="Cloude McPuff holding a no under 18 sign"
            width={200}
            height={255}
            priority
            className="h-auto w-40 object-contain"
          />
          <h2
            id="agegate-title"
            className="mt-6 font-display text-4xl tracking-brand text-navy"
          >
            Are you in?
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-navy/70">
            The Barn is for adults only. By entering, you confirm you are 18
            years or older and of legal vaping age in your region.
          </p>
        </div>

        <div className="flex flex-col gap-3 px-8 pb-8 pt-6 sm:flex-row">
          <button
            onClick={confirm}
            className="flex-1 rounded-sm bg-navy px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
          >
            I&rsquo;m 18 or over
          </button>
          <button
            onClick={deny}
            className="flex-1 rounded-sm border border-navy/25 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-tan/50"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
