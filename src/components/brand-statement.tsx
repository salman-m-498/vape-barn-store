export function BrandStatement() {
  return (
    <section id="about" className="border-b border-navy/14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12">
        <div className="px-5 py-16 sm:px-8 lg:col-span-5 lg:py-24">
          <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            What we&rsquo;re about
          </p>
          <h2 className="font-display text-4xl leading-[1.02] tracking-brand text-navy sm:text-5xl">
            Good flavour.
            <br />
            No nonsense.
          </h2>
        </div>

        <div className="flex flex-col justify-center gap-6 px-5 pb-16 sm:px-8 lg:col-span-7 lg:py-24 lg:pl-12">
          <p className="font-body text-lg leading-relaxed text-navy/80">
            Vape Barn started as a simple idea: people should be able to vape
            properly without the pretension. Good products, honest advice, and
            a place that doesn&rsquo;t overcomplicate a good thing.
          </p>
          <p className="font-body text-lg leading-relaxed text-navy/80">
            We pick what we&rsquo;d use ourselves, keep it properly stocked, and
            talk to you like a person, not a spec sheet. That&rsquo;s been the
            Barn way from day one, and it won&rsquo;t change when we open
            online.
          </p>
        </div>
      </div>
    </section>
  );
}
