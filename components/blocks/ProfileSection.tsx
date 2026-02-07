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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto items-start">
          <div className="order-2 md:order-1">
            <div className="relative aspect-square max-w-sm rounded-lg overflow-hidden shadow-[var(--shadow-soft)]">
              <Image
                src="/images/jennyheadshot.jpg"
                alt="Jenny"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] text-right mb-8">
              Meet Jenny
            </h2>
            <div className="flex flex-col gap-4">
              {reviews.slice(0, 3).map((review) => (
                <Link
                  key={review._id}
                  href={`/book-reviews/${review.slug}`}
                  className="flex gap-4 p-4 rounded-lg bg-white/80 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-shadow"
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
                  <div className="min-w-0 flex-1">
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
            <div className="flex justify-center md:justify-end mt-8">
              <Button href="/book-reviews">Browse Book Reviews →</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
