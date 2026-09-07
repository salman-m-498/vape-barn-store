"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

export function ProductBuy({
  slug,
  inStock,
}: {
  slug: string;
  inStock: boolean;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!inStock) {
    return (
      <span className="inline-block rounded-sm border border-navy/20 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy/40">
        Sold out
      </span>
    );
  }

  function handleAdd() {
    add(slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center border border-navy/20">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="px-4 py-3 font-body text-sm text-navy/70 hover:text-navy"
        >
          -
        </button>
        <span className="min-w-8 text-center font-body text-sm text-navy">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
          className="px-4 py-3 font-body text-sm text-navy/70 hover:text-navy"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        className="rounded-sm bg-navy px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
      >
        {added ? "Added" : "Add to cart"}
      </button>
    </div>
  );
}
