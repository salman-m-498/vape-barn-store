"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, formatRand } from "@/lib/products";

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <main>
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-24 text-center sm:px-8">
          <p className="mb-6 font-script text-4xl text-gold">Vape Properly</p>
          <h1 className="font-display text-5xl tracking-brand text-navy sm:text-6xl">
            Order received
          </h1>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-navy/70">
            This is a frontend demo, so no order was actually placed and no
            payment was taken. When the real store goes live, this is where your
            order confirmation will land.
          </p>
          <Link
            href="/shop"
            className="mt-8 rounded-sm bg-navy px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
          >
            Back to the shop
          </Link>
        </div>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main>
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-24 text-center sm:px-8">
          <h1 className="font-display text-5xl tracking-brand text-navy sm:text-6xl">
            Checkout
          </h1>
          <p className="mt-6 font-body text-base text-navy/60">
            Your cart is empty. Add something before heading to checkout.
          </p>
          <Link
            href="/shop"
            className="mt-8 rounded-sm bg-navy px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
          >
            Browse the shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Almost there
        </p>
        <h1 className="font-display text-5xl leading-[0.9] tracking-brand text-navy sm:text-7xl">
          Checkout
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <form onSubmit={onSubmit} className="flex flex-col gap-8 lg:col-span-2">
            <fieldset className="flex flex-col gap-4">
              <legend className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy">
                Contact
              </legend>
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-4">
              <legend className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy">
                Delivery
              </legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="First name"
                  className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                />
                <input
                  required
                  placeholder="Last name"
                  className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                />
              </div>
              <input
                placeholder="Address"
                className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <input
                  placeholder="City"
                  className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                />
                <input
                  placeholder="Province"
                  className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                />
                <input
                  placeholder="Postcode"
                  className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-4">
              <legend className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy">
                Payment
              </legend>
              <input
                required
                placeholder="Card number"
                inputMode="numeric"
                className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="MM / YY"
                  className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                />
                <input
                  required
                  placeholder="CVC"
                  inputMode="numeric"
                  className="w-full rounded-sm border border-navy/20 bg-wool px-4 py-3 font-body text-base text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                />
              </div>
            </fieldset>

            <button
              type="submit"
              className="rounded-sm bg-navy px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
            >
              Place order
            </button>
          </form>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-sm border border-navy/14 p-6">
              <h2 className="font-display text-3xl tracking-brand text-navy">
                Your haul
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {lines.map((line) => {
                  const product = getProduct(line.slug);
                  if (!product) return null;
                  return (
                    <li
                      key={line.slug}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="font-body text-navy/70">
                        {line.qty} × {product.name}
                      </span>
                      <span className="font-body font-semibold text-navy">
                        {formatRand(product.price * line.qty)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-navy/14 pt-4">
                <span className="font-body text-sm text-navy/60">Total</span>
                <span className="font-display text-2xl tracking-brand text-navy">
                  {formatRand(subtotal)}
                </span>
              </div>
              <p className="mt-4 font-body text-xs text-navy/50">
                Demo checkout. Nothing is charged and no order is placed.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
