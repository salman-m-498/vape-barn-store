import { Hero } from "@/components/hero";
import { BrandsTicker } from "@/components/brands-ticker";
import { Announcement } from "@/components/announcement";
import { ProductTeaser } from "@/components/product-teaser";
import { BrandStatement } from "@/components/brand-statement";
import { Reviews } from "@/components/reviews";
import { CloudeMoment } from "@/components/cloude-moment";
import { FindUs } from "@/components/find-us";
import { Signup } from "@/components/signup";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandsTicker />
      <Announcement />
      <ProductTeaser />
      <BrandStatement />
      <Reviews />
      <CloudeMoment />
      <FindUs />
      <Signup />
    </main>
  );
}
