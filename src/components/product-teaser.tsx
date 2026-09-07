import Image from "next/image";
import Link from "next/link";

const RANGE = [
  {
    category: "Disposables",
    blurb: "No fuss, big flavour.",
    image: "banners/Category-Banner-Disposables.png",
  },
  {
    category: "E-liquids",
    blurb: "Proper flavour, mixed right.",
    image: "banners/banner-flvaors.png",
    wide: true,
  },
  {
    category: "Pod Devices",
    blurb: "Compact, pocket-ready kits.",
    image: "banners/Category-Banner-PodDevices.png",
  },
  {
    category: "Mod Devices",
    blurb: "Gear that keeps up.",
    image: "banners/Category-Banner-moddevice.png",
  },
  {
    category: "Accessories",
    blurb: "The bits that keep it running.",
    image: "banners/Category-Banner-Accessories.png",
  },
];

export function ProductTeaser() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
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
            shop to start your haul.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RANGE.map((item) => (
            <Link
              key={item.category}
              href="/shop"
              className={`group relative overflow-hidden ${
                item.wide ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <Image
                src={base + "/" + item.image}
                alt={item.category}
                width={item.wide ? 930 : 470}
                height={280}
                className="aspect-[5/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              {/* navy tint overlay to match the brand palette */}
              <span
                aria-hidden
                className="absolute inset-0 bg-navy/45 mix-blend-multiply transition-colors duration-300 group-hover:bg-navy/30"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent"
              />

              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span>
                  <span className="block font-display text-3xl leading-none tracking-brand text-cream">
                    {item.category}
                  </span>
                  <span className="mt-1.5 block font-body text-xs leading-relaxed text-cream/80">
                    {item.blurb}
                  </span>
                </span>
                <span className="shrink-0 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-soft">
                  Browse
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
