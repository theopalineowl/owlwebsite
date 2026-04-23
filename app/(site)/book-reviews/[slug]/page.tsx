import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FlipBook } from "@/components/book-reviews/FlipBook";
import { formatDate } from "@/lib/sanity/format";
import { paginateReviewContent } from "@/lib/book-reviews/paginate";
import { Section } from "@/components/layout/Section";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import {
  STATIC_BOOK_REVIEWS,
  getStaticReviewBySlug,
} from "@/lib/book-reviews/static-reviews";
import { CommentsSection } from "@/components/comments/CommentsSection";

export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return STATIC_BOOK_REVIEWS.map((r) => ({ slug: r.slug }));
}

/** Detail hero cover: static files + Sanity use the same frame (max ~384px wide). */
const REVIEW_DETAIL_COVER_FRAME =
  "relative w-full max-w-xs sm:max-w-sm mx-auto aspect-[2/3] rounded-xl overflow-hidden mb-10 border border-white/10 bg-white/[0.06] shadow-[0_0_40px_rgba(126,58,237,0.12)]";

const REVIEW_DETAIL_COVER_SIZES =
  "(max-width: 640px) min(calc(100vw - 3rem), 20rem), 24rem";

/** ~2× display width for retina (max-w-sm = 24rem ≈ 384px). */
const SANITY_DETAIL_COVER_WIDTH = 768;

export default async function BookReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const staticReview = getStaticReviewBySlug(slug);
  if (staticReview) {
    const pages = paginateReviewContent(staticReview.bodyPlaceholder);
    return (
      <Section className="relative">
        <SectionTwinkles />
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 lg:px-10">
          <FadeInSection delay={0}>
            <Link
              href="/book-reviews"
              className="text-sm text-[var(--accent-gold)] hover:underline mb-8 inline-block"
            >
              ← Back to Book Reviews
            </Link>
          </FadeInSection>

          <FadeInSection delay={60}>
            <div className={REVIEW_DETAIL_COVER_FRAME}>
              <Image
                src={staticReview.coverSrc}
                alt={staticReview.title}
                fill
                className="object-cover object-top"
                sizes={REVIEW_DETAIL_COVER_SIZES}
                priority
              />
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <article className="max-w-5xl mx-auto w-full">
              <FlipBook
                header={
                  <>
                    <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1a140c] mb-3 text-pretty leading-tight text-center">
                      {staticReview.title}
                    </h1>
                    {staticReview.bookAuthor && (
                      <p className="text-[#1a140c]/85 text-center text-sm mb-1">
                        Book by {staticReview.bookAuthor}
                      </p>
                    )}
                    <p className="text-[#1a140c]/75 text-center text-xs sm:text-sm mb-6">
                      {formatDate(staticReview.publishedAt)} ·{" "}
                      {staticReview.rating}/5
                    </p>
                    <p className="text-center text-xs text-[#1a140c]/60">
                      Turn pages with the corner curls or the buttons below.
                      On desktop, scroll inside the pages or use the center
                      slider when the spread overflows.
                    </p>
                  </>
                }
                pages={pages}
              />

              <CommentsSection targetType="bookReview" slug={slug} />
            </article>
          </FadeInSection>
        </div>
      </Section>
    );
  }

  const { fetchSanityReviewBySlug, urlFor } = await import(
    "@/lib/book-reviews/fetch-sanity-review"
  );
  const review = await fetchSanityReviewBySlug(slug);
  if (!review) notFound();

  const hasBody =
    review.body && Array.isArray(review.body) && review.body.length > 0;

  const pages = hasBody
    ? paginateReviewContent(review.body)
    : [{ kind: "text" as const, text: "No content yet." }];

  return (
    <Section className="relative">
      <SectionTwinkles />
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 lg:px-10">
        <FadeInSection delay={0}>
          <Link
            href="/book-reviews"
            className="text-sm text-[var(--accent-gold)] hover:underline mb-8 inline-block"
          >
            ← Back to Book Reviews
          </Link>
        </FadeInSection>

        <FadeInSection delay={80}>
          <article className="max-w-5xl mx-auto w-full">
            {review.bookCover ? (
              <div className={REVIEW_DETAIL_COVER_FRAME}>
                <Image
                  src={urlFor(review.bookCover)
                    .width(SANITY_DETAIL_COVER_WIDTH)
                    .height(Math.round(SANITY_DETAIL_COVER_WIDTH * 1.5))
                    .url()}
                  alt={review.title}
                  fill
                  className="object-cover object-top"
                  sizes={REVIEW_DETAIL_COVER_SIZES}
                  priority
                />
              </div>
            ) : null}

            <FlipBook
              header={
                <>
                  <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1a140c] mb-2 text-pretty leading-tight text-center">
                    {review.title}
                  </h1>
                  {review.bookAuthor && (
                    <p className="text-[#1a140c]/85 text-center text-sm mb-2">
                      by {review.bookAuthor}
                    </p>
                  )}
                  <p className="text-[#1a140c]/75 text-center text-xs sm:text-sm mb-4">
                    {formatDate(review.publishedAt)} · {review.rating}/5
                  </p>
                  {review.excerpt && (
                    <p className="text-[#1a140c]/80 leading-relaxed italic text-sm mb-6 text-center">
                      {review.excerpt}
                    </p>
                  )}
                  <p className="text-center text-xs text-[#1a140c]/60">
                    Turn pages with the corner curls or the buttons below. On
                    desktop, scroll inside the pages or use the center slider
                    when the spread overflows.
                  </p>
                </>
              }
              pages={pages}
            />

            <CommentsSection targetType="bookReview" slug={slug} />
          </article>
        </FadeInSection>
      </div>
    </Section>
  );
}
