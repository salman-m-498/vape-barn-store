"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { products as initialProducts, CATEGORIES, type Category, type Product } from "@/lib/products";
import { ADMIN_PASSCODE } from "@/lib/store";
import {
  productsToCsv,
  parseCsv,
  csvToProducts,
  downloadFile,
  type CsvRow,
} from "@/lib/csv";

function newProduct(): Product {
  return {
    slug: "",
    name: "",
    brand: "",
    category: "Disposables",
    price: 0,
    image: "",
    inStock: true,
  };
}

const inputClass =
  "w-full rounded-sm border border-navy/20 bg-wool px-2 py-1.5 font-body text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState(false);

  const [items, setItems] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");

  const [importText, setImportText] = useState("");
  const [importOpen, setImportOpen] = useState(false);
  const [parsed, setParsed] = useState<{ products: Product[]; errors: string[] } | null>(null);

  function unlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setUnlocked(true);
    } else {
      setPassError(true);
    }
  }

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.flavour?.toLowerCase().includes(q),
    );
  }, [items, search]);

  function update(slug: string, patch: Partial<Product>) {
    setItems((prev) => prev.map((p) => (p.slug === slug ? { ...p, ...patch } : p)));
  }

  function remove(slug: string) {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }

  function addProduct() {
    setItems((prev) => [
      ...prev,
      { ...newProduct(), slug: `new-${Date.now()}` },
    ]);
  }

  function downloadCsv() {
    downloadFile("vape-barn-catalogue.csv", productsToCsv(items), "text/csv;charset=utf-8");
  }

  function downloadJson() {
    downloadFile(
      "products.json",
      JSON.stringify(items, null, 2) + "\n",
      "application/json",
    );
  }

  function handleImportText(text: string) {
    const rows: CsvRow[] = parseCsv(text);
    const result = csvToProducts(rows);
    setParsed(result);
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => handleImportText(String(reader.result ?? ""));
    reader.readAsText(file);
    e.target.value = "";
  }

  function applyImport(mode: "replace" | "merge") {
    if (!parsed) return;
    if (mode === "replace") {
      setItems(parsed.products);
    } else {
      setItems((prev) => {
        const map = new Map(prev.map((p) => [p.slug, p]));
        for (const p of parsed.products) map.set(p.slug, p);
        return Array.from(map.values());
      });
    }
    setImportOpen(false);
    setImportText("");
    setParsed(null);
  }

  if (!unlocked) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-5 py-20">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Admin
        </p>
        <h1 className="font-display text-5xl tracking-brand text-navy">
          Catalogue access
        </h1>
        <p className="mt-4 font-body text-sm leading-relaxed text-navy/70">
          Enter the passcode to edit the catalogue.
        </p>
        <form onSubmit={unlock} className="mt-8">
          <input
            type="password"
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value);
              setPassError(false);
            }}
            placeholder="Passcode"
            autoFocus
            className={inputClass + " px-4 py-3 text-base"}
          />
          {passError && (
            <p role="alert" className="mt-3 font-body text-sm text-red-700">
              That passcode isn&rsquo;t right. Try again.
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-sm bg-navy px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
          >
            Unlock
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Admin
          </p>
          <h1 className="font-display text-5xl leading-[0.9] tracking-brand text-navy">
            Edit the catalogue
          </h1>
          <p className="mt-3 font-body text-sm text-navy/60">
            {items.length} products. Changes are only published once you
            download the JSON and commit it to the repo.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={downloadCsv}
            className="rounded-sm border border-navy/25 px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-tan/50"
          >
            Download CSV
          </button>
          <button
            onClick={downloadJson}
            className="rounded-sm border border-navy/25 px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-tan/50"
          >
            Download JSON
          </button>
          <button
            onClick={() => setImportOpen((v) => !v)}
            className="rounded-sm bg-navy px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-navy-soft"
          >
            Import CSV
          </button>
          <button
            onClick={addProduct}
            className="rounded-sm bg-gold px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-tan/50"
          >
            Add product
          </button>
        </div>
      </div>

      {importOpen && (
        <section className="mb-8 rounded-sm border border-navy/14 bg-wool p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl tracking-brand text-navy">
              Import from CSV
            </h2>
            <button
              onClick={() => setImportOpen(false)}
              className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy/60 hover:text-navy"
            >
              Close
            </button>
          </div>
          <p className="mb-4 font-body text-xs text-navy/60">
            Columns: slug, name, brand, category, price, compareAt, puffCount,
            flavour, image, inStock.
          </p>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={6}
            placeholder="Paste CSV here…"
            className="w-full rounded-sm border border-navy/20 bg-cream px-3 py-2 font-mono text-xs text-navy focus:border-gold focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="cursor-pointer rounded-sm border border-navy/25 px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-tan/50">
              Upload .csv
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={onFile}
                className="hidden"
              />
            </label>
            <button
              onClick={() => handleImportText(importText)}
              className="rounded-sm bg-navy px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-navy-soft"
            >
              Parse
            </button>
          </div>

          {parsed && (
            <div className="mt-5 border-t border-navy/10 pt-5">
              <p className="font-body text-sm text-navy/70">
                {parsed.products.length} valid rows
                {parsed.errors.length > 0 && (
                  <span className="text-red-700">
                    {" "}
                    · {parsed.errors.length} error{parsed.errors.length === 1 ? "" : "s"}
                  </span>
                )}
              </p>
              {parsed.errors.length > 0 && (
                <ul className="mt-2 max-h-40 overflow-y-auto font-body text-xs text-red-700">
                  {parsed.errors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  disabled={parsed.products.length === 0}
                  onClick={() => applyImport("replace")}
                  className="rounded-sm bg-navy px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-navy-soft disabled:opacity-50"
                >
                  Replace all
                </button>
                <button
                  disabled={parsed.products.length === 0}
                  onClick={() => applyImport("merge")}
                  className="rounded-sm border border-navy/25 px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-tan/50 disabled:opacity-50"
                >
                  Merge by slug
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      <div className="mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, brand, flavour…"
          className="w-full max-w-sm rounded-sm border border-navy/20 bg-wool px-4 py-2.5 font-body text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto border border-navy/14">
        <table className="w-full min-w-[900px] border-collapse bg-cream text-left">
          <thead>
            <tr className="border-b border-navy/14 bg-tan/40">
              <th className="px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/70">Product</th>
              <th className="px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/70">Brand</th>
              <th className="px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/70">Category</th>
              <th className="px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/70">Price</th>
              <th className="px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/70">Compare</th>
              <th className="px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/70">Flavour</th>
              <th className="px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/70">Puffs</th>
              <th className="px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/70">Stock</th>
              <th className="px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/70">Slug</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.slug || p.name} className="border-b border-navy/10 align-top">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 border border-navy/10 object-contain"
                      />
                    ) : (
                      <span className="h-10 w-10 shrink-0 border border-dashed border-navy/20 bg-tan/30" />
                    )}
                    <input
                      value={p.name}
                      onChange={(e) => update(p.slug, { name: e.target.value })}
                      className={inputClass}
                      aria-label="Name"
                    />
                  </div>
                </td>
                <td className="px-3 py-2">
                  <input
                    value={p.brand}
                    onChange={(e) => update(p.slug, { brand: e.target.value })}
                    className={inputClass}
                    aria-label="Brand"
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    value={p.category}
                    onChange={(e) => update(p.slug, { category: e.target.value as Category })}
                    className={inputClass}
                    aria-label="Category"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={p.price}
                    onChange={(e) => update(p.slug, { price: Number(e.target.value) })}
                    className={inputClass + " w-20"}
                    aria-label="Price"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={p.compareAt ?? ""}
                    onChange={(e) =>
                      update(p.slug, {
                        compareAt: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className={inputClass + " w-20"}
                    aria-label="Compare at"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={p.flavour ?? ""}
                    onChange={(e) =>
                      update(p.slug, { flavour: e.target.value || undefined })
                    }
                    className={inputClass + " w-28"}
                    aria-label="Flavour"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={p.puffCount ?? ""}
                    onChange={(e) =>
                      update(p.slug, { puffCount: e.target.value || undefined })
                    }
                    className={inputClass + " w-24"}
                    aria-label="Puff count"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={p.inStock}
                    onChange={(e) => update(p.slug, { inStock: e.target.checked })}
                    aria-label="In stock"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={p.slug}
                    onChange={(e) => update(p.slug, { slug: e.target.value })}
                    className={inputClass + " w-40 font-mono text-xs"}
                    aria-label="Slug"
                  />
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => remove(p.slug)}
                    className="font-body text-xs text-navy/40 transition-colors hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={10} className="px-3 py-10 text-center font-body text-sm text-navy/50">
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
