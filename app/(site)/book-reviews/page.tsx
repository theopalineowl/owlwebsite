import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { reviewsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatDate } from "@/lib/sanity/format";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";

const intro =
  "My take on witchy fiction and mystical texts. Join in the discussion by leaving your own comments and send me recommendations of what to read next.";

export default async function BookReviewsListPage() {
  let reviews: {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    bookAuthor?: string;
    bookCover?: unknown;
    rating: number;
    excerpt?: string;
  }[] = [];
  try {
    reviews = await client.fetch(reviewsQuery);
  } catch {
    // No Sanity
  }

  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold text-[var(--text-primary)] mb-4">
          Book Reviews
        </h1>
        <p className="text-[var(--text-muted)] mb-12">{intro}</p>
        <div className="space-y-8">
          {reviews.length === 0 ? (
            <p className="text-[var(--text-muted)]">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <Card key={review._id} href={`/book-reviews/${review.slug}`}>
                <div className="flex gap-6">
                  {review.bookCover ? (
                    <div className="relative w-24 h-36 shrink-0 rounded overflow-hidden shadow-[var(--shadow-soft)]">
                      <Image
                        src={urlFor(review.bookCover).width(96).height(144).url()}
                        alt={review.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-36 shrink-0 rounded bg-[var(--text-muted)]/10" />
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
            ))
          )}
        </div>
      </div>
    </Section>
  );
}
