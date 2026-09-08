import Link from "next/link";
import { REVIEWS, REVIEW_SUMMARY, GOOGLE_LINK } from "@/lib/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-0.5 text-gold"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden
          className={i < Math.round(rating) ? "fill-gold" : "fill-navy/15"}
        >
          <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="border-b border-navy/14 bg-wool">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              What people say
            </p>
            <h2 className="font-display text-4xl leading-[1.02] tracking-brand text-navy sm:text-6xl">
              Straight from the Barn
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-display text-5xl tracking-brand text-navy">
              {REVIEW_SUMMARY.rating.toFixed(1)}
            </span>
            <div>
              <Stars rating={REVIEW_SUMMARY.rating} />
              <p className="mt-1 font-body text-xs text-navy/60">
                {REVIEW_SUMMARY.count > 0
                  ? `${REVIEW_SUMMARY.count} Google reviews`
                  : "On Google"}
              </p>
            </div>
          </div>
        </div>

        {REVIEWS.length === 0 ? (
          <div className="rounded-sm border border-navy/14 p-10 text-center">
            <p className="font-body text-base text-navy/60">
              Reviews are on the way. Check back once the Barn opens.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-px bg-navy/14 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <blockquote key={review.name} className="flex flex-col bg-cream p-7">
                <Stars rating={review.rating} />
                <p className="mt-4 flex-1 font-body text-base leading-relaxed text-navy/80">
                  &ldquo;{review.text}&rdquo;
                </p>
                <footer className="mt-5 flex items-center justify-between border-t border-navy/10 pt-4">
                  <span className="font-body text-sm font-semibold text-navy">
                    {review.name}
                  </span>
                  {review.when && (
                    <span className="font-body text-xs text-navy/50">
                      {review.when}
                    </span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href={GOOGLE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold"
          >
            See all on Google
          </Link>
        </div>
      </div>
    </section>
  );
}
