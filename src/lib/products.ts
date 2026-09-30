import rawProducts from "@/data/products.json";

export type Category = "Coils & Pods" | "Devices" | "Disposables" | "E-liquids" | "Nic Pouches";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  compareAt?: number;
  puffCount?: string;
  flavour?: string;
  image: string;
  inStock: boolean;
};

export const CATEGORIES: Category[] = [
  "Coils & Pods",
  "Devices",
  "Disposables",
  "E-liquids",
  "Nic Pouches",
];

export const products: Product[] = rawProducts as Product[];

export const CATEGORY_SLUGS: Record<Category, string> = {
  "Coils & Pods": "coils-pods",
  Devices: "devices",
  Disposables: "disposables",
  "E-liquids": "e-liquids",
  "Nic Pouches": "nic-pouches",
};

export function categoryToSlug(category: Category) {
  return CATEGORY_SLUGS[category];
}

export function slugToCategory(slug: string | null | undefined): Category | null {
  if (!slug) return null;
  const entry = CATEGORIES.find((c) => CATEGORY_SLUGS[c] === slug);
  return entry ?? null;
}

export type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export function sortProducts(items: Product[], sort: SortKey): Product[] {
  const list = [...items];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return list.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return list;
  }
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatRand(value: number) {
  return `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;
}
