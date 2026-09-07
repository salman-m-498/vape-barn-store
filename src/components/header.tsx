"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "@/components/cart-drawer";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/#about" },
  { label: "Find Us", href: "/#find-us" },
];

export function Header() {
  const { count } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-navy/14 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt="Vape Barn"
              width={44}
              height={44}
              priority
              className="h-11 w-11 shrink-0"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl leading-none tracking-brand text-navy">
                Vape&nbsp;Barn
              </span>
              <span className="mt-0.5 font-script text-base leading-none text-gold">
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
                className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy/70 transition-colors hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label={`Open cart, ${count} items`}
              className="relative flex items-center gap-2 rounded-sm px-2 py-2 transition-colors hover:bg-tan/40"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="text-navy"
                aria-hidden
              >
                <path d="M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L20 8H6" />
                <circle cx="10" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
              </svg>
              <span className="font-body text-xs font-semibold text-navy">
                {count}
              </span>
            </button>
            <Link
              href="/#keepme"
              className="hidden rounded-sm bg-navy px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft sm:block"
            >
              Keep me posted
            </Link>
          </div>
        </div>
      </header>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
