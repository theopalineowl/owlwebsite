import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { reviewBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatDate } from "@/lib/sanity/format";
import { PortableText } from "@/components/blocks/PortableText";
import { Section } from "@/components/layout/Section";

export default async function BookReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await client.fetch(reviewBySlugQuery, { slug });
  if (!review) notFound();

  const hasBody = review.body && Array.isArray(review.body) && review.body.length > 0;

  return (
    <Section>
      <article className="max-w-3xl mx-auto">
        <Link
          href="/book-reviews"
          className="text-sm text-[var(--accent-gold)] hover:underline mb-6 inline-block"
        >
          ← Back to Book Reviews
        </Link>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {review.bookCover && (
            <div className="relative w-40 h-60 shrink-0 rounded-lg overflow-hidden shadow-[var(--shadow-soft)]">
              <Image
                src={urlFor(review.bookCover).width(160).height(240).url()}
                alt={review.title}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          )}
          <div>
            <h1 className="font-[var(--font-display)] text-4xl font-semibold text-[var(--text-primary)] mb-2">
              {review.title}
            </h1>
            {review.bookAuthor && (
              <p className="text-[var(--text-muted)] mb-2">by {review.bookAuthor}</p>
            )}
            <p className="text-[var(--text-muted)] mb-4">
              {formatDate(review.publishedAt)} · {review.rating}/5
            </p>
            {review.excerpt && (
              <p className="text-[var(--text-muted)] leading-relaxed italic">
                {review.excerpt}
              </p>
            )}
          </div>
        </div>
        {hasBody ? (
          <div className="prose prose-lg max-w-none text-[var(--text-primary)] mb-12">
            <PortableText value={review.body} />
          </div>
        ) : (
          <p className="text-[var(--text-muted)] mb-12">No content yet.</p>
        )}

        <div className="border-t border-[var(--text-muted)]/20 pt-8">
          <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--text-primary)] mb-2">
            Leave a comment
          </h3>
          <div className="rounded-lg border border-[var(--text-muted)]/20 p-6 bg-white/50">
            <textarea
              placeholder="Your comment..."
              rows={4}
              className="w-full rounded-lg border border-[var(--text-muted)]/30 px-4 py-3 text-[var(--text-primary)] bg-white placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold-muted)]/50"
              disabled
            />
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Comments coming soon.
            </p>
          </div>
        </div>
      </article>
    </Section>
  );
}
