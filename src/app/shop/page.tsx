"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products, CATEGORIES, formatRand, type Category } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function ShopPage() {
  const [active, setActive] = useState<Category | "All">("All");
  const { add } = useCart();

  const visible =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <main>
      <section className="border-b border-navy/14">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            The online Barn, open now
          </p>
          <h1 className="font-display text-5xl leading-[0.9] tracking-brand text-navy sm:text-7xl">
            The Shop
          </h1>
          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-navy/70">
            Proper flavour, proper gear. Browse the range and add to your haul.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {(["All", ...CATEGORIES] as const).map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(cat)}
                  className={`rounded-sm border px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? "border-navy bg-navy text-cream"
                      : "border-navy/20 text-navy/70 hover:border-navy"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <div className="grid grid-cols-1 gap-px bg-navy/14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <article
                key={product.slug}
                className="group flex flex-col bg-cream p-6"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="mb-6 grid aspect-square place-items-center overflow-hidden bg-tan/30"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </Link>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                      {product.brand}
                    </p>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-display text-2xl leading-tight tracking-brand text-navy transition-colors hover:text-gold"
                    >
                      {product.name}
                    </Link>
                    {product.puffCount && (
                      <p className="mt-1 font-body text-xs text-navy/50">
                        {product.puffCount}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-5">
                  <p className="flex items-baseline gap-2">
                    <span className="font-display text-2xl tracking-brand text-navy">
                      {formatRand(product.price)}
                    </span>
                    {product.compareAt && (
                      <span className="font-body text-sm text-navy/40 line-through">
                        {formatRand(product.compareAt)}
                      </span>
                    )}
                  </p>

                  {product.inStock ? (
                    <button
                      onClick={() => add(product.slug)}
                      className="rounded-sm bg-navy px-4 py-2 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-navy-soft"
                    >
                      Add
                    </button>
                  ) : (
                    <span className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/40">
                      Sold out
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
