import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { urlFor } from "@/lib/sanity/image";
import { formatDate } from "@/lib/sanity/format";
import type { ReviewListItem } from "@/lib/sanity/types";

export function ProfileSection({ reviews }: { reviews: ReviewListItem[] }) {
  return (
    <>
      <DividerOrnament />
      <Section className="relative">
        <SectionTwinkles />
        <div className="max-w-2xl text-left">
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-4">
            Meet Jenny
          </h2>
          <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-8">
            Jenny Nunez is the founder of The Opaline Owl, where spirituality meets grounded practice. She guides others toward balance and awareness through meditation, self-inquiry, and rituals rooted in tradition yet tailored to each seeker.
          </p>
          <div className="flex flex-col gap-4">
            {reviews.slice(0, 3).map((review) => (
              <Link
                key={review._id}
                href={`/book-reviews/${review.slug}`}
                className="flex gap-4 p-4 rounded-lg bg-white/80 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-shadow w-full max-w-md"
              >
                {review.bookCover ? (
                  <div className="relative w-14 h-20 shrink-0 rounded overflow-hidden">
                    <Image
                      src={urlFor(review.bookCover).width(56).height(80).url()}
                      alt={review.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-20 shrink-0 rounded bg-[var(--text-muted)]/10" />
                )}
                <div className="min-w-0 flex-1 text-left">
                  <p className="font-[var(--font-display)] font-medium text-[var(--text-primary)] truncate">
                    {review.title}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {formatDate(review.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/book-reviews">Browse Book Reviews →</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
