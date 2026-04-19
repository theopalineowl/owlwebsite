import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/sanity/format";
import { PortableText } from "@/components/blocks/PortableText";
import { Section } from "@/components/layout/Section";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import {
  STATIC_BOOK_REVIEWS,
  getStaticReviewBySlug,
} from "@/lib/book-reviews/static-reviews";

export function generateStaticParams() {
  return STATIC_BOOK_REVIEWS.map((r) => ({ slug: r.slug }));
}

/** 9-slice scroll background; inner width keeps copy inside torn paper edges. */
function ReviewScrollBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="review-scroll-sheet">
      <div className="relative z-[1] mx-auto w-[86%] min-w-0 text-black">
        {children}
      </div>
    </div>
  );
}

function CommentPlaceholder() {
  return (
    <div className="border-t border-white/10 pt-8 mt-10 md:mt-12">
      <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--text-primary)] mb-3">
        Leave a comment
      </h3>
      <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md p-6">
        <textarea
          placeholder="Your comment..."
          rows={4}
          disabled
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/70 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,58,237,0.55)] resize-none"
        />
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Comments coming soon.
        </p>
      </div>
    </div>
  );
}

export default async function BookReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const staticReview = getStaticReviewBySlug(slug);
  if (staticReview) {
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
            <div className="relative w-full max-w-xs sm:max-w-sm mx-auto aspect-[2/3] rounded-xl overflow-hidden mb-10 border border-white/10 bg-white/[0.06] shadow-[0_0_40px_rgba(126,58,237,0.12)]">
              <Image
                src={staticReview.coverSrc}
                alt={staticReview.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 20rem"
                priority
              />
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <article className="max-w-3xl mx-auto">
              <ReviewScrollBody>
                <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-3 text-pretty leading-tight text-center">
                  {staticReview.title}
                </h1>
                {staticReview.bookAuthor && (
                  <p className="text-black/85 text-center text-sm mb-1">
                    Book by {staticReview.bookAuthor}
                  </p>
                )}
                <p className="text-black/75 text-center text-xs sm:text-sm mb-8">
                  {formatDate(staticReview.publishedAt)} · {staticReview.rating}
                  /5
                </p>
                <p className="text-black leading-relaxed whitespace-pre-wrap text-base sm:text-lg text-left">
                  {staticReview.bodyPlaceholder}
                </p>
              </ReviewScrollBody>

              <CommentPlaceholder />
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
          <article className="max-w-3xl mx-auto">
            {review.bookCover ? (
              <div className="relative w-40 h-60 mx-auto mb-10 rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(126,58,237,0.12)]">
                <Image
                  src={urlFor(review.bookCover).width(320).height(480).url()}
                  alt={review.title}
                  fill
                  className="object-cover"
                  sizes="160px"
                  priority
                />
              </div>
            ) : null}

            <ReviewScrollBody>
              <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-2 text-pretty leading-tight text-center">
                {review.title}
              </h1>
              {review.bookAuthor && (
                <p className="text-black/85 text-center text-sm mb-2">
                  by {review.bookAuthor}
                </p>
              )}
              <p className="text-black/75 text-center text-xs sm:text-sm mb-4">
                {formatDate(review.publishedAt)} · {review.rating}/5
              </p>
              {review.excerpt && (
                <p className="text-black/80 leading-relaxed italic text-sm mb-6 text-center">
                  {review.excerpt}
                </p>
              )}
              {hasBody && review.body ? (
                <div className="prose prose-lg max-w-none text-left">
                  <PortableText value={review.body} tone="onParchment" />
                </div>
              ) : (
                <p className="text-black/80 text-sm">No content yet.</p>
              )}
            </ReviewScrollBody>

            <CommentPlaceholder />
          </article>
        </FadeInSection>
      </div>
    </Section>
  );
}
