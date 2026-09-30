import Image from "next/image";

export function BrandStatement() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <section id="about" className="barn-planks border-b border-cream/10 bg-navy">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:col-span-7 lg:py-24">
          <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
            What we&rsquo;re about
          </p>
          <h2 className="font-display text-4xl leading-[1.02] tracking-brand text-cream sm:text-6xl">
            Good flavour.
            <br />
            No nonsense.
          </h2>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-cream/85">
            Vape Barn started as a simple idea: people should be able to vape
            properly without the pretension. Good products, honest advice, and
            a place that doesn&rsquo;t overcomplicate a good thing.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 px-5 pb-16 sm:px-8 lg:col-span-5 lg:py-24 lg:pl-6">
          <Image
            src={base + "/brand/cloude_sitting.png"}
            alt="Cloude McPuff, the keeper of the Barn"
            width={512}
            height={512}
            className="w-auto max-w-[240px] object-contain sm:max-w-[300px]"
          />
          <p className="font-script text-3xl text-gold-bright">Vape Properly</p>
          <p className="mt-2 max-w-xs text-center font-body text-sm leading-relaxed text-cream/70">
            Cloude McPuff, keeper of the Barn. Always unbothered, always
            stocked.
          </p>
        </div>
      </div>
    </section>
  );
}
