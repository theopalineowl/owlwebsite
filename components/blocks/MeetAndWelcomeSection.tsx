import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
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
        {/* Vertical stack: Welcome → subtext → Logo → Meet Jenny (text left, headshot right) */}
        <div className="flex flex-col gap-10 md:gap-12 max-w-3xl mx-auto text-center">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-6">
              Welcome to The Opaline Owl
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
              {welcomeBodyCopy}
            </p>
          </div>

          {/* Logo — inner padding so circle doesn't clip the logo */}
          <div className="flex justify-center">
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden bg-[#f5f0e6] shadow-[var(--shadow-lift)] ring-2 ring-[var(--accent-gold-muted)]/30 flex-shrink-0">
              <div className="absolute inset-4 md:inset-5">
                <Image
                  src="/images/logo.png"
                  alt="The Opaline Owl"
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Meet Jenny: heading + subtext (+ reviews) left, headshot right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start text-left">
            <div>
              <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-4">
                Meet Jenny
              </h2>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-4">
                Jenny Nunez is the founder of The Opaline Owl, where spirituality meets grounded practice. She guides others toward balance and awareness through meditation, self-inquiry, and rituals rooted in tradition yet tailored to each seeker.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-gold)] hover:underline mb-8 group"
              >
                Learn more
                <span className="learn-more-arrow inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </Link>
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
            </div>
            <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0 md:max-w-none rounded-xl overflow-hidden bg-[#374151] shadow-[var(--shadow-lift)]">
              <Image
                src="/images/jennyheadshot.jpg"
                alt="Jenny Nunez"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
