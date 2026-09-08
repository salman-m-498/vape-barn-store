import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Info | Vape Barn",
  description: "How we take the Vape Barn front end live.",
};

const STEPS = [
  {
    title: "Domain — around R150/year",
    emoji: "🌐",
    body: [
      "Buy the website address (e.g. vapebarn.co.za). Register it through a registrar like Afrihost, domains.co.za or GoDaddy.",
      "This is an annual cost only. For a .co.za it's roughly R100–R200 a year. A .com is similar.",
    ],
  },
  {
    title: "Hosting — Afrihost",
    emoji: "🖥️",
    body: [
      "The built front end is static (it can be exported to plain files). Afrihost offers cheap static/web hosting from roughly R99/month.",
      "We deploy the exported site there, and it becomes the live storefront. Fast, low cost, easy to point the domain.",
    ],
  },
  {
    title: "Shopify Headless",
    emoji: "🛒",
    body: [
      "Our site is 'headless' — the design is ours (Vape Barn), but the shop engine (products, cart, checkout, payments) runs on Shopify.",
      "This means we get a full backend: product management, stock, orders, payment processing (including card), without building it from scratch.",
      "We connect the front end to Shopify via its Storefront API. The shop, product pages, cart and checkout in this demo already map 1-to-1 to what Shopify provides.",
    ],
  },
  {
    title: "Yoco stock integration",
    emoji: "💳",
    body: [
      "Since we already take card payments in-store with Yoco, we aim to link it so online and in-store sales stay in sync where possible. (possible via Shopify or Yoco APIs).",
      "Note: online checkout typically runs through Shopify Payments (or Yoco if available as a gateway). The goal is one view of payments and stock from the counter to the website. According to Yoco, this is possible (using yoco for both stock and payments on the online store) but requires some custom integration.",
    ],
  },
  {
    title: "The Courier Guy — delivery",
    emoji: "📦",
    body: [
      "The Courier Guy provides shipping rates and tracking. We add their shipping integration at checkout so customers see delivery costs and get a tracking number automatically.",
      "This is the last piece: order placed → stock + payment confirmed → Courier Guy label + tracking → delivered.",
    ],
  },
];

const COST = [
  { item: "Domain (.co.za)", cost: "~R150 / year" },
  { item: "Afrihost hosting", cost: "~R99–R199 / month" },
  { item: "Shopify (plan + transaction fees)", cost: "from ~$25 / month + fees" },
  { item: "Yoco / card payments", cost: "per-transaction %" },
  { item: "Courier Guy", cost: "per-delivery rate" },
];

export default function DemoInfoPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        Internal / demo information
      </p>
      <h1 className="font-display text-5xl leading-[0.9] tracking-brand text-navy sm:text-7xl">
        Going live
      </h1>
      <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-navy/70">
        This page explains, in plain terms, what we still need to buy and
        connect so the Vape Barn website you&rsquo;re looking at now becomes a
        real online store. Below is the
        roadmap and cost estimate.
      </p>

      <section className="mt-14">
        <ol className="flex flex-col gap-px bg-navy/14">
          {STEPS.map((step, i) => (
            <li key={step.title} className="bg-cream p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="font-display text-3xl leading-none tracking-brand text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-2xl tracking-brand text-navy">
                    {step.title}
                  </h2>
                  <div className="mt-2 flex flex-col gap-2">
                    {step.body.map((p) => (
                      <p
                        key={p.slice(0, 24)}
                        className="font-body text-sm leading-relaxed text-navy/75"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl tracking-brand text-navy">
          Rough running costs
        </h2>
        <div className="mt-5 border border-navy/14">
          {COST.map((row) => (
            <div
              key={row.item}
              className="flex items-center justify-between border-b border-navy/10 px-5 py-3 last:border-b-0"
            >
              <span className="font-body text-sm text-navy/75">{row.item}</span>
              <span className="font-body text-sm font-semibold text-navy">
                {row.cost}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 font-body text-xs text-navy/50">
          Figures are indicative. Final pricing depends on plan and volume.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl tracking-brand text-navy">
          The short version
        </h2>
        <ol className="mt-5 flex flex-col gap-3 font-body text-sm leading-relaxed text-navy/80">
          <li>1. Buy the domain and hosting (Afrihost).</li>
          <li>2. Set up a Shopify store for products, orders and payments.</li>
          <li>3. Connect this front end to Shopify (headless) so it serves our design.</li>
          <li>4. Link Yoco payments and The Courier Guy shipping to checkout.</li>
          <li>5. Publish, and the site goes from demo to live store.</li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl tracking-brand text-navy">
          Cost vs. benefit
        </h2>
        <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-navy/70">
          The ongoing cost is small (domain + cheap hosting + Shopify plan),
          while the return comes from being found and trusted before we even
          open the online checkout.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-px bg-navy/14 sm:grid-cols-2">
          <div className="bg-white p-6 sm:p-7">
            <h3 className="font-display text-xl tracking-brand text-navy">
              SEO before launch
            </h3>
            <ul className="mt-3 flex flex-col gap-2 font-body text-sm leading-relaxed text-navy/75">
              <li>Google and search engines start indexing the site now, so we rank for &ldquo;vape shop&rdquo;, &ldquo;disposables&rdquo; and brand names before competitors who launch later.</li>
              <li>A live site builds domain age and authority early &mdash; these compound over time and are hard to buy later.</li>
              <li>Product pages, the store locator, and review content give search engines real pages to show, not an empty &ldquo;coming soon&rdquo;.</li>
            </ul>
          </div>

          <div className="bg-wool p-6 sm:p-7">
            <h3 className="font-display text-xl tracking-brand text-navy">
              Sales momentum
            </h3>
            <ul className="mt-3 flex flex-col gap-2 font-body text-sm leading-relaxed text-navy/75">
              <li>The shop and &ldquo;keep me posted&rdquo; list capture interest now, so we have a ready audience when the store opens.</li>
              <li>Showing the real range, real reviews and real store builds trust early &mdash; customers arrive ready to buy, not to be convinced.</li>
              <li>A polished site lifts the in-store brand too. People who find us online walk in expecting quality.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border border-navy/14">
          <div className="flex items-center justify-between border-b border-navy/10 px-5 py-3">
            <span className="font-body text-sm text-navy/75">What it costs</span>
            <span className="font-body text-sm font-semibold text-navy">
              Small, predictable monthly fees
            </span>
          </div>
          <div className="flex items-center justify-between px-5 py-3">
            <span className="font-body text-sm text-navy/75">What it returns</span>
            <span className="font-body text-sm font-semibold text-gold">
              Earlier rankings, more trust, a ready audience
            </span>
          </div>
          <p className="border-t border-navy/10 px-5 py-3 font-body text-xs leading-relaxed text-navy/50">
            The short version: the sooner the site is live, the cheaper the
            long-term marketing is &mdash; because search rankings and customer
            trust are earned over time, and they compound.
          </p>
        </div>
      </section>
    </main>
  );
}
