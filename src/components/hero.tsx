import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-navy/14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:col-span-7 lg:py-24">
          <p className="mb-10 flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden />
            Opening online soon
          </p>

          <h1 className="font-display text-[5rem] leading-[0.84] tracking-brand text-navy sm:text-[8.5rem] lg:text-[9.5rem]">
            Vape
            <br />
            Properly<span className="text-gold">.</span>
          </h1>

          <div className="mt-10 flex flex-col gap-8 border-t border-navy/14 pt-10 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md font-body text-base leading-relaxed text-navy/75">
              Your favourite Barn is opening its doors online. Proper flavour,
              proper products, proper service. All from the one spot that gets
              it.
            </p>

            <div className="flex shrink-0 flex-col items-start gap-4">
              <a
                href="#find-us"
                className="rounded-sm border border-navy/25 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-tan/50"
              >
                In the meantime, visit us in store
              </a>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#keepme"
                  className="rounded-sm bg-navy px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
                >
                  Keep me posted
                </a>
                <a
                  href="#shop"
                  className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold"
                >
                  A peek at the range
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-end justify-center lg:col-span-5">
          <div className="pointer-events-none absolute bottom-0 right-0 h-3/4 w-px bg-navy/10 lg:h-full" />
          <Image
            src="/brand/logo.png"
            alt=""
            aria-hidden
            width={200}
            height={200}
            className="pointer-events-none absolute left-1/2 top-6 z-0 h-28 w-28 -translate-x-1/2 opacity-90 sm:h-36 sm:w-36 lg:h-44 lg:w-44"
          />
          <Image
            src="/brand/cloude_standing.png"
            alt="Cloude McPuff"
            width={512}
            height={512}
            priority
            className="relative z-10 w-auto max-w-[280px] object-contain sm:max-w-[360px] lg:max-w-[440px]"
          />
        </div>
      </div>
    </section>
  );
}
