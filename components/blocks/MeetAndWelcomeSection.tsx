import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { urlFor } from "@/lib/sanity/image";
import { formatDate } from "@/lib/sanity/format";
import type { ReviewListItem } from "@/lib/sanity/types";

const welcomeBodyCopy = `Everything vibrates. Nothing is ever truly still. Here, spirituality is both mystical and grounded: rooted in balance, awareness, and practices that meet you where you are.`;

export function MeetAndWelcomeSection({ reviews }: { reviews: ReviewListItem[] }) {
  return (
    <>
      <DividerOrnament />
      <Section className="relative">
        <SectionTwinkles />
        {/* One row: Welcome (left) | Logo (center) | Meet Jenny (right) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-12 items-center max-w-5xl mx-auto">
          {/* Left: Welcome to The Opaline Owl */}
          <div className="text-left order-2 md:order-1">
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-6">
              Welcome to The Opaline Owl
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
              {welcomeBodyCopy}
            </p>
            <Link
              href="/about"
              className="inline-block mt-4 text-[var(--accent-gold)] hover:underline font-medium"
            >
              Read more →
            </Link>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center order-1 md:order-2">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-[#f5f0e6] shadow-[var(--shadow-lift)] ring-2 ring-[var(--accent-gold-muted)]/30 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="The Opaline Owl"
                fill
                sizes="(max-width: 768px) 192px, 224px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Meet Jenny */}
          <div className="text-right order-3">
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-4">
              Meet Jenny
            </h2>
            <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-8">
              Jenny Nunez is the founder of The Opaline Owl, where spirituality meets grounded practice. She guides others toward balance and awareness through meditation, self-inquiry, and rituals rooted in tradition yet tailored to each seeker.
            </p>
            <div className="flex flex-col gap-4 items-end">
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
        </div>
      </Section>
    </>
  );
}
