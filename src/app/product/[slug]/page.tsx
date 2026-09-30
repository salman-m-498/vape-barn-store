import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, formatRand } from "@/lib/products";
import { STORE, enquireForProduct } from "@/lib/store";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 font-body text-xs text-navy/50">
            <li>
              <Link href="/" className="transition-colors hover:text-navy">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/shop" className="transition-colors hover:text-navy">
                Shop
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-navy">{product.brand}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="grid aspect-square place-items-center overflow-hidden border border-navy/10 bg-tan/30">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              priority
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {product.category}
            </p>
            <h1 className="mt-3 font-display text-5xl leading-[0.92] tracking-brand text-navy sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-2 font-body text-lg text-navy/60">{product.brand}</p>

            {product.flavour && (
              <p className="mt-6 font-body text-base text-navy/70">
                <span className="font-semibold text-navy">Flavour:</span>{" "}
                {product.flavour}
              </p>
            )}
            {product.puffCount && (
              <p className="mt-1 font-body text-base text-navy/70">
                <span className="font-semibold text-navy">Capacity:</span>{" "}
                {product.puffCount}
              </p>
            )}

            <p className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-5xl tracking-brand text-navy">
                {formatRand(product.price)}
              </span>
              {product.compareAt && (
                <span className="font-body text-lg text-navy/40 line-through">
                  {formatRand(product.compareAt)}
                </span>
              )}
            </p>

            <p className="mt-6 font-body text-sm text-navy/60">
              {product.inStock ? (
                <span className="font-semibold text-gold">In stock</span>
              ) : (
                <span className="font-semibold text-navy/50">Sold out</span>
              )}{" "}
              &middot; Online store coming soon
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={enquireForProduct(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-navy px-6 py-3 text-center font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-navy-soft"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={STORE.mrdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-navy/25 px-6 py-3 text-center font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-tan/50"
              >
                Order on Mr D
              </a>
            </div>

            <p className="mt-6 font-body text-sm text-navy/50">
              Products intended for adults only. Not for sale to persons under
              18.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
