"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { STORE } from "@/lib/store";

const NAV = [
  { label: "Catalogue", href: "/shop" },
  { label: "Find us", href: "/#find-us" },
  { label: "About", href: "/#about" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-navy">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={base + "/brand/logo.png"}
            alt="Vape Barn"
            width={44}
            height={44}
            priority
            className="h-11 w-11 shrink-0"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl leading-none tracking-brand text-cream">
              Vape&nbsp;Barn
            </span>
            <span className="mt-0.5 font-script text-base leading-none text-gold-bright">
              Vape Properly
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={STORE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vape Barn on Instagram"
            className="hidden h-9 w-9 items-center justify-center rounded-sm transition-colors hover:bg-navy-soft sm:flex"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="text-cream"
              aria-hidden
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href={STORE.mrdUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-sm bg-gold px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-gold-bright sm:block"
          >
            Order on Mr D
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-cream transition-colors hover:bg-navy-soft md:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-cream/10 bg-navy md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col px-5 py-3">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-cream/10 py-3 font-body text-sm font-semibold uppercase tracking-[0.14em] text-cream/80 transition-colors hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 py-4">
              <a
                href={STORE.mrdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-gold px-4 py-3 text-center font-body text-xs font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-gold-bright"
              >
                Order on Mr D
              </a>
              <a
                href={STORE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-cream/25 px-4 py-3 text-center font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
