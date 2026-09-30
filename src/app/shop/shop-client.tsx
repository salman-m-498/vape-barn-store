"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  products,
  CATEGORIES,
  formatRand,
  categoryToSlug,
  slugToCategory,
  sortProducts,
  SORT_OPTIONS,
  type Category,
  type SortKey,
} from "@/lib/products";
import { STORE, enquireForProduct } from "@/lib/store";

function validSort(value: string | null): SortKey {
  return SORT_OPTIONS.some((o) => o.value === value)
    ? (value as SortKey)
    : "featured";
}

export function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const active = slugToCategory(searchParams.get("category")) ?? "All";
  const sort = validSort(searchParams.get("sort"));

  const visible = useMemo(() => {
    const filtered =
      active === "All"
        ? products
        : products.filter((p) => p.category === active);
    return sortProducts(filtered, sort);
  }, [active, sort]);

  function tabHref(cat: Category | "All") {
    const params = new URLSearchParams();
    if (cat !== "All") params.set("category", categoryToSlug(cat));
    const s = searchParams.get("sort");
    if (s && s !== "featured") params.set("sort", s);
    const qs = params.toString();
    return qs ? `/shop?${qs}` : "/shop";
  }

  function onSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const params = new URLSearchParams();
    const c = searchParams.get("category");
    if (c) params.set("category", c);
    if (value && value !== "featured") params.set("sort", value);
    const qs = params.toString();
    router.replace(qs ? `/shop?${qs}` : "/shop");
  }

  return (
    <main>
      <section className="border-b border-navy/14">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Online store coming soon
          </p>
          <h1 className="font-display text-5xl leading-[0.9] tracking-brand text-navy sm:text-7xl">
            The Catalogue
          </h1>
          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-navy/70">
            Our full range, with prices. Order now on Mr D, or enquire on
            WhatsApp and we&rsquo;ll sort you out.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
              {(["All", ...CATEGORIES] as const).map((cat) => {
                const isActive = active === cat;
                return (
                  <Link
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    href={tabHref(cat)}
                    className={`rounded-sm border px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                      isActive
                        ? "border-navy bg-navy text-cream"
                        : "border-navy/20 text-navy/70 hover:border-navy"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>

            <label className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy/70">
              Sort
              <select
                value={sort}
                onChange={onSortChange}
                className="rounded-sm border border-navy/20 bg-wool px-3 py-2 font-body text-xs text-navy focus:border-gold focus:outline-none"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
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

                  <span
                    className={`font-body text-[11px] font-semibold uppercase tracking-[0.12em] ${
                      product.inStock ? "text-gold" : "text-navy/40"
                    }`}
                  >
                    {product.inStock ? "In stock" : "Sold out"}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={enquireForProduct(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm bg-navy px-4 py-2 text-center font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-navy-soft"
                  >
                    Enquire on WhatsApp
                  </a>
                  <a
                    href={STORE.mrdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm border border-navy/25 px-4 py-2 text-center font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-tan/50"
                  >
                    Order on Mr D
                  </a>
                </div>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="py-16 text-center font-body text-sm text-navy/50">
              Nothing here yet. Try another category.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
