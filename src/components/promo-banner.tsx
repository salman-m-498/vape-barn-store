"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { promoBannersConfig, resolveAssetSrc } from "@/lib/promo-banners";

const INTERVAL_MS = 5000;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

export function PromoBanner() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const { background, canvas, midground, banners } = promoBannersConfig;

  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || banners.length <= 1) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % banners.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [reduced, paused, banners.length]);

  const insetX =
    ((canvas.width - midground.width) / 2 / canvas.width) * 100;
  const insetY =
    ((canvas.height - midground.height) / 2 / canvas.height) * 100;

  return (
    <section
      aria-label="Promotions"
      className="relative w-full overflow-hidden border-b border-cream/10 bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative w-full" style={{ aspectRatio: `${canvas.width} / ${canvas.height}` }}>
        {background && (
          <Image
            src={resolveAssetSrc(base, background)}
            alt=""
            aria-hidden
            fill
            priority
            className="object-cover"
          />
        )}

        {banners.map((banner, i) => (
          <div
            key={banner.id}
            aria-hidden={i !== active}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {banner.midground && (
              <div
                className="absolute"
                style={{
                  left: `${insetX}%`,
                  right: `${insetX}%`,
                  top: `${insetY}%`,
                  bottom: `${insetY}%`,
                }}
              >
                <Image
                  src={resolveAssetSrc(base, banner.midground)}
                  alt=""
                  aria-hidden
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {banner.foreground && (
              <Image
                src={resolveAssetSrc(base, banner.foreground)}
                alt=""
                aria-hidden
                fill
                className="object-contain"
              />
            )}
          </div>
        ))}

        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setActive((i) => (i - 1 + banners.length) % banners.length)
              }
              aria-label="Previous promotion"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 bg-navy/30 text-cream/70 backdrop-blur-sm transition-colors hover:border-cream/60 hover:bg-navy/50 hover:text-cream"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setActive((i) => (i + 1) % banners.length)}
              aria-label="Next promotion"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 bg-navy/30 text-cream/70 backdrop-blur-sm transition-colors hover:border-cream/60 hover:bg-navy/50 hover:text-cream"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}

        {banners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {banners.map((banner, i) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${banner.title}`}
                aria-current={i === active}
                className="h-2.5 w-2.5 rounded-full border border-cream/40 transition-colors hover:border-cream"
                style={{
                  backgroundColor:
                    i === active ? "var(--color-gold-bright)" : "transparent",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
