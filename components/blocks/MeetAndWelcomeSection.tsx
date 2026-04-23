"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { urlFor } from "@/lib/sanity/image";
import { formatDate } from "@/lib/sanity/format";
import type { ReviewListItem } from "@/lib/sanity/types";

const welcomeBodyCopy = `Here, spirituality is both mystical and grounded: rooted in balance, awareness, and practices that meet you where you are.`;

const MotionLink = motion.create(Link);

const springIntro = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { type: "spring" as const, stiffness: 120, damping: 22 },
};

export function MeetAndWelcomeSection({
  reviews,
}: {
  reviews: ReviewListItem[];
}) {
  return (
    <>
      <DividerOrnament />
      <Section tight className="relative">
        <SectionTwinkles />
        {/* Vertical stack: Welcome → subtext → Logo → Meet Jenny (text left, headshot right) */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-5xl mx-auto text-center">
          <div className="flex flex-col gap-3 md:gap-4">
            <motion.div {...springIntro}>
              <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-3 md:mb-4">
                Welcome to The Opaline Owl
              </h2>
              <p className="text-[130%] text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                {welcomeBodyCopy}
              </p>
            </motion.div>

            {/* Logo — 2× prior 14rem / 16rem footprint */}
            <motion.div
              className="flex justify-center px-1"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="relative aspect-square w-[min(20rem,85vw)] shrink-0 md:w-[min(24rem,42vw)] lg:w-[26rem]">
                <div
                  className="meet-logo-aura pointer-events-none absolute left-1/2 top-1/2 w-[85%] h-[85%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(126,58,237,0.45)_0%,rgba(250,204,21,0.12)_45%,transparent_72%)] blur-3xl motion-reduce:blur-none"
                  aria-hidden
                />
                <Image
                  src="/images/logohero.png"
                  alt="The Opaline Owl"
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 42vw, 416px"
                  className="object-contain object-center drop-shadow-[0_8px_28px_rgba(30,41,59,0.14)] relative z-[1]"
                />
              </div>
            </motion.div>
          </div>

          {/* Meet Jenny: heading + subtext (+ reviews) left, headshot right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-start text-left pt-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 110, damping: 24 }}
            >
              <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-4">
                Meet Jenny
              </h2>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-4">
                Jenny Nunez is the founder of The Opaline Owl, where
                spirituality meets grounded practice. She guides others toward
                balance and awareness through meditation, self-inquiry, and
                rituals rooted in tradition yet tailored to each seeker.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-gold)] hover:underline mb-5 group"
              >
                Learn more
                <span
                  className="learn-more-arrow inline-block transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </Link>
              <motion.div
                className="flex flex-col gap-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-30px" }}
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {reviews.slice(0, 3).map((review) => (
                  <motion.div
                    key={review._id}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: { type: "spring", stiffness: 300, damping: 28 },
                      },
                    }}
                  >
                    <MotionLink
                      href={`/book-reviews/${review.slug}`}
                      className="flex gap-4 p-4 rounded-lg bg-white/10 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-shadow w-full max-w-md backdrop-blur-sm ring-1 ring-white/10"
                      whileHover={{ scale: 1.01, x: 4 }}
                    >
                      {review.localCoverSrc ? (
                        <div className="relative w-14 h-20 shrink-0 rounded overflow-hidden">
                          <Image
                            src={review.localCoverSrc}
                            alt={review.title}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                      ) : review.bookCover ? (
                        <div className="relative w-14 h-20 shrink-0 rounded overflow-hidden">
                          <Image
                            src={urlFor(review.bookCover)
                              .width(112)
                              .height(168)
                              .url()}
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
                    </MotionLink>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              className="relative aspect-[3/4] mx-auto w-full max-w-[16.0625rem] md:mx-0 md:ml-auto md:mr-0 md:max-w-none md:w-[67%] rounded-xl overflow-hidden bg-[#374151] shadow-[var(--shadow-lift)]"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 95, damping: 22 }}
            >
              <Image
                src="/images/sitting.jpg"
                alt="Jenny Nunez"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 268px, (max-width: 1024px) 30vw, 320px"
              />
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
