"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getProduct, formatRand } from "@/lib/products";

export default function CartPage() {
  const { lines, subtotal, setQty, remove } = useCart();

  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Your haul
        </p>
        <h1 className="font-display text-5xl leading-[0.9] tracking-brand text-navy sm:text-7xl">
          Cart
        </h1>

        {lines.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 rounded-sm border border-navy/14 py-16 text-center">
            <p className="font-body text-base text-navy/60">
              Your cart is empty.
            </p>
            <Link
              href="/shop"
              className="rounded-sm bg-navy px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <ul className="flex flex-col gap-6 lg:col-span-2">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                return (
                  <li
                    key={line.slug}
                    className="flex gap-4 border-b border-navy/14 pb-6"
                  >
                    <Link href={`/product/${product.slug}`} className="shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={128}
                        height={128}
                        className="h-32 w-32 border border-navy/10 bg-tan/30 object-contain"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                            {product.brand}
                          </p>
                          <Link
                            href={`/product/${product.slug}`}
                            className="font-display text-2xl leading-tight tracking-brand text-navy hover:text-gold"
                          >
                            {product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => remove(line.slug)}
                          className="font-body text-xs text-navy/40 transition-colors hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="flex items-center border border-navy/20">
                          <button
                            onClick={() => setQty(line.slug, line.qty - 1)}
                            aria-label="Decrease quantity"
                            className="px-3 py-1.5 font-body text-sm text-navy/70 hover:text-navy"
                          >
                            -
                          </button>
                          <span className="min-w-7 text-center font-body text-sm text-navy">
                            {line.qty}
                          </span>
                          <button
                            onClick={() => setQty(line.slug, line.qty + 1)}
                            aria-label="Increase quantity"
                            className="px-3 py-1.5 font-body text-sm text-navy/70 hover:text-navy"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-body text-base font-semibold text-navy">
                          {formatRand(product.price * line.qty)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-sm border border-navy/14 p-6">
                <h2 className="font-display text-3xl tracking-brand text-navy">
                  Summary
                </h2>
                <div className="mt-4 flex items-center justify-between border-t border-navy/14 pt-4">
                  <span className="font-body text-sm text-navy/60">
                    Subtotal
                  </span>
                  <span className="font-body text-sm font-semibold text-navy">
                    {formatRand(subtotal)}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-body text-sm text-navy/60">
                    Shipping
                  </span>
                  <span className="font-body text-sm text-navy/60">
                    Calculated at checkout
                  </span>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 block rounded-sm bg-navy px-5 py-3 text-center font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
                >
                  Proceed to checkout
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
