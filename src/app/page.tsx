import { Hero } from "@/components/hero";
import { BrandsTicker } from "@/components/brands-ticker";
import { ProductTeaser } from "@/components/product-teaser";
import { BrandStatement } from "@/components/brand-statement";
import { Reviews } from "@/components/reviews";
import { FindUs } from "@/components/find-us";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandsTicker />
      <ProductTeaser />
      <BrandStatement />
      <Reviews />
      <FindUs />
    </main>
  );
}
