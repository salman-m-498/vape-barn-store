"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, formatRand } from "@/lib/products";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lines, subtotal, setQty, remove } = useCart();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-navy/50 backdrop-blur-sm"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-navy/14 bg-cream">
        <div className="flex items-center justify-between border-b border-navy/14 px-6 py-5">
          <h2 className="font-display text-3xl tracking-brand text-navy">
            Your haul
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy/60 transition-colors hover:text-navy"
          >
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-body text-base text-navy/60">
              Your cart is empty.
            </p>
            <Link
              href="/shop"
              onClick={onClose}
              className="rounded-sm bg-navy px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="flex flex-col gap-5">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                return (
                  <li key={line.slug} className="flex gap-4">
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="shrink-0"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="h-24 w-24 border border-navy/10 object-contain"
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
                            onClick={onClose}
                            className="font-display text-xl leading-tight tracking-brand text-navy hover:text-gold"
                          >
                            {product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => remove(line.slug)}
                          aria-label={`Remove ${product.name}`}
                          className="font-body text-xs text-navy/40 transition-colors hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center border border-navy/20">
                          <button
                            onClick={() => setQty(line.slug, line.qty - 1)}
                            aria-label="Decrease quantity"
                            className="px-2.5 py-1 font-body text-sm text-navy/70 hover:text-navy"
                          >
                            -
                          </button>
                          <span className="min-w-6 text-center font-body text-sm text-navy">
                            {line.qty}
                          </span>
                          <button
                            onClick={() => setQty(line.slug, line.qty + 1)}
                            aria-label="Increase quantity"
                            className="px-2.5 py-1 font-body text-sm text-navy/70 hover:text-navy"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-body text-sm font-semibold text-navy">
                          {formatRand(product.price * line.qty)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {lines.length > 0 && (
          <div className="border-t border-navy/14 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy/60">
                Subtotal
              </span>
              <span className="font-display text-2xl tracking-brand text-navy">
                {formatRand(subtotal)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={onClose}
                className="rounded-sm bg-navy px-5 py-3 text-center font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="rounded-sm border border-navy/25 px-5 py-3 text-center font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-tan/50"
              >
                View cart
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
