import Image from "next/image";
import { client } from "@/lib/sanity/client";
import { reviewsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatDate } from "@/lib/sanity/format";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { STATIC_BOOK_REVIEWS } from "@/lib/book-reviews/static-reviews";

const intro =
  "My take on witchy fiction and mystical texts. Join in the discussion by leaving your own comments and send me recommendations of what to read next.";

type ListReview = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  bookAuthor?: string;
  bookCover?: unknown;
  rating: number;
  excerpt?: string;
  localCoverSrc?: string;
};

export default async function BookReviewsListPage() {
  let sanityReviews: ListReview[] = [];
  try {
    sanityReviews = await client.fetch(reviewsQuery);
  } catch {
    // No Sanity
  }

  const staticRows: ListReview[] = STATIC_BOOK_REVIEWS.map((r) => ({
    _id: r._id,
    title: r.title,
    slug: r.slug,
    publishedAt: r.publishedAt,
    bookAuthor: r.bookAuthor,
    rating: r.rating,
    excerpt: r.excerpt,
    localCoverSrc: r.coverSrc,
  }));

  const sanitySlugs = new Set(sanityReviews.map((r) => r.slug));
  const staticOnly = staticRows.filter((r) => !sanitySlugs.has(r.slug));

  const reviews = [...staticOnly, ...sanityReviews].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <Section className="relative">
      <SectionTwinkles />
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 lg:px-10">
        <FadeInSection delay={0}>
          <div className="relative mb-10 md:mb-12">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[min(18rem,80vw)] w-[min(42rem,100%)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(126,58,237,0.18)_0%,transparent_68%)] opacity-90"
              aria-hidden
            />
            <h1
              className="relative font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] text-center text-balance leading-tight"
              style={{ textShadow: "0 0 28px rgba(126, 58, 237, 0.28)" }}
            >
              Book Reviews
            </h1>
          </div>
        </FadeInSection>

        <div
          className="border-t border-white/10 mb-10 md:mb-12 max-w-3xl mx-auto"
          aria-hidden
        />

        <FadeInSection delay={80}>
          <div className="max-w-3xl lg:max-w-4xl mx-auto">
            <p className="text-[var(--text-muted)] leading-relaxed mb-10 md:mb-12">
              {intro}
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-6 md:space-y-8">
          {reviews.length === 0 ? (
            <p className="text-[var(--text-muted)]">No reviews yet.</p>
          ) : (
            reviews.map((review, i) =>
              review.localCoverSrc ? (
                <FadeInSection key={review._id} delay={100 + i * 50}>
                  <Card
                    href={`/book-reviews/${review.slug}`}
                    variant="dark"
                    className="flex flex-row items-start gap-4 sm:gap-5 md:gap-6 p-4 sm:p-5 md:p-6"
                  >
                    <div className="relative shrink-0 w-[5.25rem] sm:w-24 md:w-28 aspect-[2/3] rounded-lg overflow-hidden bg-white/10 border border-white/10">
                      <Image
                        src={review.localCoverSrc}
                        alt={review.title}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 640px) 84px, (max-width: 1024px) 96px, 112px"
                        priority={
                          review.slug === "listening-to-the-wild-weyward"
                        }
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-2 text-pretty leading-snug">
                        {review.title}
                      </h2>
                      {review.bookAuthor && (
                        <p className="text-sm text-[var(--text-muted)] mb-2">
                          by {review.bookAuthor}
                        </p>
                      )}
                      <p className="text-sm text-[var(--text-muted)] mb-3">
                        {formatDate(review.publishedAt)} · {review.rating}/5
                      </p>
                      {review.excerpt && (
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                          {review.excerpt}
                        </p>
                      )}
                    </div>
                  </Card>
                </FadeInSection>
              ) : (
                <FadeInSection key={review._id} delay={100 + i * 50}>
                  <Card
                    href={`/book-reviews/${review.slug}`}
                    variant="dark"
                    className="block p-5 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {review.bookCover ? (
                        <div className="relative w-[6.5rem] sm:w-24 h-[9.75rem] sm:h-36 shrink-0 rounded-lg overflow-hidden border border-white/10">
                          <Image
                            src={urlFor(review.bookCover)
                              .width(192)
                              .height(288)
                              .url()}
                            alt={review.title}
                            fill
                            className="object-cover"
                            sizes="104px"
                          />
                        </div>
                      ) : (
                        <div className="w-[6.5rem] sm:w-24 h-[9.75rem] sm:h-36 shrink-0 rounded-lg border border-white/10 bg-white/10" />
                      )}
                      <div className="min-w-0 flex-1">
                        <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--text-primary)] mb-1">
                          {review.title}
                        </h2>
                        {review.bookAuthor && (
                          <p className="text-sm text-[var(--text-muted)] mb-2">
                            by {review.bookAuthor}
                          </p>
                        )}
                        <p className="text-sm text-[var(--text-muted)] mb-2">
                          {formatDate(review.publishedAt)} · {review.rating}/5
                        </p>
                        {review.excerpt && (
                          <p className="text-[var(--text-muted)] text-sm leading-relaxed line-clamp-2">
                            {review.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </FadeInSection>
              )
            )
          )}
        </div>
      </div>
    </Section>
  );
}
