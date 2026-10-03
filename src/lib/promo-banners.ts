import rawPromoBanners from "@/data/promo-banners.json";

export type PromoBanner = {
  id: string;
  title: string;
  midground: string;
  foreground: string;
};

export type PromoBannersConfig = {
  background: string;
  canvas: { width: number; height: number };
  midground: { width: number; height: number };
  banners: PromoBanner[];
};

export const promoBannersConfig = rawPromoBanners as PromoBannersConfig;

export const PROMO_BACKGROUND_DEFAULT = "/Promo Banner/banner-bg.png";

export function resolveAssetSrc(base: string, path: string | undefined | null): string {
  const trimmed = (path ?? "").trim();
  if (!trimmed) return "";
  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return base + withSlash.split("/").map(encodeURIComponent).join("/");
}
