import Image from "next/image";

export function CloudeMoment() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <section className="border-b border-navy/14 bg-wool">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12">
        <div className="relative flex items-center justify-center px-5 pt-14 sm:px-8 lg:col-span-5 lg:py-24">
          <Image
            src={base + "/brand/cloude_sitting.png"}
            alt="Cloude McPuff, chilling while the store gets ready"
            width={512}
            height={512}
            className="w-auto max-w-[260px] object-contain sm:max-w-[320px] lg:max-w-[360px]"
          />
        </div>

        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 lg:col-span-7 lg:py-24 lg:pl-6">
          <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            The keeper of the Barn
          </p>
          <h2 className="font-display text-4xl leading-[1.02] tracking-brand text-navy sm:text-6xl">
            Cloude McPuffin
          </h2>
          <p className="mt-6 max-w-md font-script text-3xl leading-snug text-gold sm:text-4xl">
            Always unbothered. Holding it down while the online store gets ready.
          </p>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-navy/70">
            Cloud-chasing, good-flavour-enjoying, properly chilled. Cloude
            isn&rsquo;t the whole story. He&rsquo;s the keeper of the Barn, and he&rsquo;s here to make sure
            everything is ready for you to enjoy. He&rsquo;s the one who makes sure
            the store is always stocked with the best flavours, and he&rsquo;s the
            one who makes sure you have a good time while you&rsquo;re here.
          </p>
        </div>
      </div>
    </section>
  );
}
