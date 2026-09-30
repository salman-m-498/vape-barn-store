import type { Category, Product } from "@/lib/products";
import { CATEGORIES } from "@/lib/products";

export const PRODUCT_CSV_HEADERS = [
  "slug",
  "name",
  "brand",
  "category",
  "price",
  "compareAt",
  "puffCount",
  "flavour",
  "image",
  "inStock",
] as const;

export type CsvRow = Record<string, string>;

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function cell(value: unknown): string {
  if (value === null || value === undefined) return "";
  return escapeCsv(String(value));
}

export function productsToCsv(products: Product[]): string {
  const header = PRODUCT_CSV_HEADERS.join(",");
  const rows = products.map((p) =>
    PRODUCT_CSV_HEADERS.map((key) => {
      const value = (p as unknown as Record<string, unknown>)[key];
      if (key === "inStock") return p.inStock ? "true" : "false";
      return cell(value);
    }).join(","),
  );
  return [header, ...rows].join("\n");
}

export function parseCsv(text: string): CsvRow[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      pushField();
    } else if (ch === "\n") {
      pushRow();
    } else if (ch === "\r") {
      // ignore; \n will follow
    } else {
      field += ch;
    }
  }

  if (field.length > 0 || row.length > 0) {
    pushRow();
  }

  return rows
    .filter((r) => r.some((c) => c.trim() !== ""))
    .map((r) => {
      const obj: CsvRow = {};
      PRODUCT_CSV_HEADERS.forEach((key, i) => {
        obj[key] = (r[i] ?? "").trim();
      });
      return obj;
    });
}

export function csvToProducts(rows: CsvRow[]): { products: Product[]; errors: string[] } {
  const products: Product[] = [];
  const errors: string[] = [];

  rows.forEach((row, i) => {
    const line = i + 1;
    const slug = (row.slug || "").trim();
    const name = (row.name || "").trim();
    const brand = (row.brand || "").trim();
    const category = (row.category || "").trim();
    const priceRaw = (row.price || "").trim();
    const compareAtRaw = (row.compareAt || "").trim();

    if (!slug || !name || !brand) {
      errors.push(`Row ${line}: slug, name and brand are required.`);
      return;
    }

    const price = Number(priceRaw);
    if (!priceRaw || Number.isNaN(price)) {
      errors.push(`Row ${line}: "${name}" has an invalid price.`);
      return;
    }

    if (!CATEGORIES.includes(category as Category)) {
      errors.push(
        `Row ${line}: "${name}" has an unknown category "${category}". Use one of: ${CATEGORIES.join(", ")}.`,
      );
      return;
    }

    const compareAt = compareAtRaw ? Number(compareAtRaw) : undefined;
    if (compareAt !== undefined && Number.isNaN(compareAt)) {
      errors.push(`Row ${line}: "${name}" has an invalid compareAt.`);
      return;
    }

    products.push({
      slug,
      name,
      brand,
      category: category as Category,
      price,
      compareAt,
      puffCount: row.puffCount || undefined,
      flavour: row.flavour || undefined,
      image: row.image || "",
      inStock: String(row.inStock).toLowerCase() !== "false",
    });
  });

  return { products, errors };
}

export function downloadFile(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
