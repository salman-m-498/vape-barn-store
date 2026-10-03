import Image from "next/image";
import Link from "next/link";
import { STORE, whatsappUrl } from "@/lib/store";

export function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={(process.env.NEXT_PUBLIC_BASE_PATH || "") + "/brand/barn_icon.png"}
                alt=""
                aria-hidden
                width={40}
                height={40}
                className="h-10 w-10 shrink-0"
              />
              <span className="font-display text-2xl leading-none tracking-brand text-cream">
                Vape&nbsp;Barn
              </span>
            </div>
            <p className="mt-2 font-script text-xl text-gold-soft">
              Vape Properly
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-8 gap-y-3"
            aria-label="Footer"
          >
            <Link
              href="/shop"
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
            >
              Catalogue
            </Link>
            <Link
              href="/flavour-finder"
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
            >
              Flavour Finder
            </Link>
            <Link
              href="/#about"
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
            >
              About
            </Link>
            <Link
              href="/#find-us"
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
            >
              Find us
            </Link>
            <a
              href={STORE.mrdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
            >
              Mr D
            </a>
            <a
              href={whatsappUrl("Hi Vape Barn, I'd like to enquire about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
            >
              WhatsApp
            </a>
            <a
              href={STORE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
            >
              Instagram
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/14 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-cream/50">
            © {new Date().getFullYear()} Vape Barn. Vape Properly.
          </p>
          <p className="font-body text-xs text-cream/50">
            Products intended for adults. Not for sale to persons under 18.
          </p>
        </div>
      </div>
    </footer>
  );
}
