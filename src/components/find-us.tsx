import Image from "next/image";
import { STORE, MAPS_EMBED_URL, MAPS_DIRECTIONS_URL } from "@/lib/store";

export function FindUs() {
  const [hero, ...rest] = STORE.photos;

  return (
    <section id="find-us" className="border-b border-navy/14">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Where to find us
            </p>
            <h2 className="font-display text-4xl leading-[1.02] tracking-brand text-navy sm:text-6xl">
              Come visit the Barn
            </h2>
          </div>
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold sm:block"
          >
            Get directions
          </a>
        </div>

        <Image
          src={`/store/${hero.src}`}
          alt={`${STORE.name} store: ${hero.caption}`}
          width={1186}
          height={808}
          priority
          className="mb-2 aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
        />

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
          <div className="flex flex-col bg-navy p-7 text-cream lg:col-span-5">
            <h3 className="font-display text-3xl tracking-brand text-cream">
              {STORE.name}
            </h3>
            <address className="mt-3 not-italic font-body text-sm leading-relaxed text-cream/70">
              {STORE.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm">
              <a
                href={`tel:${STORE.phone.replace(/\s/g, "")}`}
                className="text-cream/80 transition-colors hover:text-gold-soft"
              >
                {STORE.phone}
              </a>
              <a
                href={`mailto:${STORE.email}`}
                className="text-cream/80 transition-colors hover:text-gold-soft"
              >
                {STORE.email}
              </a>
            </div>

            <div className="mt-7 border-t border-cream/10 pt-5">
              <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-soft">
                Opening hours
              </p>
              <div className="grid grid-cols-1 gap-1.5 font-body text-sm">
                {STORE.hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex justify-between gap-4 border-b border-cream/10 pb-1.5"
                  >
                    <span className="text-cream/60">{h.days}</span>
                    <span className="text-right font-semibold text-cream">
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block self-start rounded-sm bg-cream px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-gold-soft"
            >
              Get directions
            </a>
          </div>

          <div className="flex flex-col lg:col-span-7">
            <iframe
              title={`Map of ${STORE.name}`}
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-56 w-full border border-navy/14 sm:h-72"
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              {rest.map((photo) => (
                <figure key={photo.src} className="overflow-hidden">
                  <Image
                    src={`/store/${photo.src}`}
                    alt={`${STORE.name} store: ${photo.caption}`}
                    width={771}
                    height={1020}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
