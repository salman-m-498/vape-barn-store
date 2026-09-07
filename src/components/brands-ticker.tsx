"use client";

const BRANDS = [
  "Geekvape",
  "Voopoo",
  "Elfbar",
  "Nasty",
  "Smok",
  "Vaporesso",
  "Caliburn",
  "Vuse",
  "Oxbar",
  "Yeti",
  "Bard",
  "PRIME",
  "Dispo Drops"
];

function Brand({ name }: { name: string }) {
  return (
    <span className="font-display text-2xl tracking-brand text-navy/90 uppercase">
      {name}
    </span>
  );
}

export function BrandsTicker() {
  const items = [...BRANDS, ...BRANDS];

  return (
    <section
      aria-label="Brands we stock"
      className="overflow-hidden border-b border-navy/14 bg-wool"
    >
      <div className="flex items-center border-b border-navy/10 py-3">
        <span className="shrink-0 px-5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-gold sm:px-8">
          Brands we stock
        </span>
        <div className="brands-ticker-mask relative flex-1 overflow-hidden">
          <div className="brands-ticker-track flex w-max items-center gap-14 py-4 pr-14">
            {items.map((name, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= BRANDS.length ? "true" : undefined}
                className="flex shrink-0 items-center"
              >
                <Brand name={name} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
