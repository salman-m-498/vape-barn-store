import Image from "next/image";
import Link from "next/link";
import { STORE, MAPS_DIRECTIONS_URL } from "@/lib/store";
import { REVIEW_SUMMARY, GOOGLE_LINK } from "@/lib/reviews";

export function Hero() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <section className="relative isolate overflow-hidden border-b border-cream/10 bg-navy">
      <Image
        src={base + "/store/store1.png"}
        alt=""
        aria-hidden
        fill
        priority
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70"
      />
      <div aria-hidden className="absolute inset-0 barn-xbrace" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        

        <h1 className="font-display text-[5rem] leading-[0.84] tracking-brand text-cream sm:text-[8.5rem] lg:text-[9.5rem]">
          Vape
          <br />
          Properly<span className="text-gold-bright">.</span>
        </h1>

        <p className="mt-8 flex items-center gap-0.5 font-body text-base font-bold uppercase tracking-[0.18em] text-red-500 sm:text-lg">
          Online store coming soon
          <span className="dot-animated">.</span>
          <span className="dot-animated" style={{ animationDelay: "0.2s" }}>
            .
          </span>
          <span className="dot-animated" style={{ animationDelay: "0.4s" }}>
            .
          </span>
        </p>

        <p className="mt-3 max-w-md font-body text-lg leading-relaxed text-cream/85">
          Welcome to Vape Barn! Your friendly neighbourhood vape shop.
          Disposables, e-liquids, pods and mods, all in stock. Our online store
          is coming soon. For now, visit us in store or check us out on Mr D.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="rounded-sm bg-cream px-7 py-3.5 font-body text-xs font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-white"
            >
              Browse the catalogue
            </Link>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-gold-bright px-7 py-3.5 font-body text-xs font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-gold"
            >
              Visit the Barn
            </a>
            <a
              href={STORE.mrdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-gold px-7 py-3.5 font-body text-xs font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-gold-bright"
            >
              Order on Mr D
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={STORE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/80 underline decoration-gold-bright decoration-2 underline-offset-4 transition-colors hover:text-gold-bright"
            >
              Follow us on Instagram
            </a>
            <a
              href={GOOGLE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-xs font-semibold text-cream/80 transition-colors hover:text-cream"
            >
              <span className="text-gold-bright" aria-hidden>
                ★★★★★
              </span>
              {REVIEW_SUMMARY.rating.toFixed(1)} on Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
