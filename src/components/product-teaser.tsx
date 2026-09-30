import Link from "next/link";

function Icon({ d }: { d: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold-bright"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

const RANGE = [
  {
    category: "Disposables",
    slug: "disposables",
    blurb: "No fuss, big flavour.",
    icon: "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 13h6M9 8h6",
  },
  {
    category: "E-liquids",
    slug: "e-liquids",
    blurb: "Proper flavour, mixed right.",
    icon: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z",
  },
  {
    category: "Devices",
    slug: "devices",
    blurb: "Kits, pods and mods.",
    icon: "M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 10h2",
  },
  {
    category: "Coils & Pods",
    slug: "coils-pods",
    blurb: "Keep it running.",
    icon: "M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 8v8",
  },
  {
    category: "Nic Pouches",
    slug: "nic-pouches",
    blurb: "Discreet and fresh.",
    icon: "M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM4 10h16",
  },
];

export function ProductTeaser() {
  return (
    <section id="shop" className="border-b border-navy/14">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              The range
            </p>
            <h2 className="font-display text-4xl leading-[1.02] tracking-brand text-navy sm:text-6xl">
              What&rsquo;s in
              <br />
              the Barn
            </h2>
          </div>
          <p className="hidden max-w-xs pb-2 text-right font-body text-sm leading-relaxed text-navy/60 sm:block">
            Disposables, e-liquids, devices and accessories. Browse the full
            catalogue with prices.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {RANGE.map((item) => (
            <Link
              key={item.category}
              href={`/shop?category=${item.slug}`}
              className="group flex flex-col rounded-sm bg-navy p-6 transition-colors hover:bg-navy-soft sm:p-7"
            >
              <Icon d={item.icon} />
              <span className="mt-6 font-display text-3xl leading-none tracking-brand text-cream">
                {item.category}
              </span>
              <span className="mt-2 font-body text-xs leading-relaxed text-cream/70">
                {item.blurb}
              </span>
              <span className="mt-auto pt-6 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-bright transition-colors group-hover:text-gold">
                Browse &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-block rounded-sm bg-navy px-8 py-3.5 font-body text-xs font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
          >
            Browse the full catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
