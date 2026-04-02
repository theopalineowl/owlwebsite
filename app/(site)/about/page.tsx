"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { AboutCosmicBackdrop } from "@/components/about/AboutCosmicBackdrop";
import { CelestialDivider } from "@/components/about/CelestialDivider";
import {
  TarotPillarCard,
  type TarotPillar,
} from "@/components/about/TarotPillarCard";
import {
  aboutClosing,
  aboutHeroTitle,
  aboutPillarsHeading,
  aboutStoryParagraphs,
} from "./about-copy";

const MOON_SVG = "/images/Crescent%20Moon%20and%20Star.svg";

const pillars: TarotPillar[] = [
  {
    index: 0,
    title: "Nervous system balance",
    description:
      "Grounding awareness so intuition and clarity can emerge in daily life.",
    iconSrc: MOON_SVG,
  },
  {
    index: 1,
    title: "Personalized ritual",
    description:
      "Designing practices that fit your values, culture, and spiritual lens.",
    iconSrc: "/images/037-candles.svg",
  },
  {
    index: 2,
    title: "Decoding signs and synchronicities",
    description:
      "Noticing meaningful patterns as you deepen your connection to Source.",
    iconSrc: "/images/Third%20Eye%20copy.svg",
  },
];

const owlClass =
  "journey-owl-float h-24 w-auto md:h-32 lg:h-36 object-contain shrink-0 select-none transition-transform duration-300 ease-out motion-reduce:transition-none hover:scale-[1.03] motion-reduce:hover:scale-100";

const portraitClass =
  "relative z-[1] w-full max-w-[min(280px,85vw)] md:max-w-[min(320px,28vw)] h-auto object-contain object-top drop-shadow-[0_0_52px_rgba(196,181,253,0.42)] motion-reduce:drop-shadow-none transition-transform duration-500 motion-reduce:transition-none md:group-hover:scale-[1.01]";

/** Visual style per story block — keep in sync with `aboutStoryParagraphs` length. */
const STORY_P_CLASS = [
  "font-[var(--font-body)] text-lg leading-[1.75] text-stone-100 md:text-xl [text-shadow:0_1px_24px_rgba(0,0,0,0.45)]",
  "font-[var(--font-body)] text-base leading-[1.8] text-violet-100/95 md:text-lg",
  "font-[var(--font-body)] text-base leading-[1.8] text-stone-200/95 md:text-lg",
  "font-[var(--font-body)] text-base leading-[1.8] text-violet-100/95 md:text-lg",
  "font-[var(--font-display)] text-xl leading-snug text-amber-50 md:text-2xl [text-shadow:0_0_20px_rgba(126,58,237,0.35)]",
  "font-[var(--font-display)] text-xl font-semibold leading-snug text-stone-50 md:text-2xl",
  "font-[var(--font-body)] text-base leading-[1.8] text-violet-100/95 md:text-lg",
  "font-[var(--font-body)] text-base leading-[1.8] text-stone-200/95 md:text-lg",
] as const;

const STORY_DELAYS_MS = [60, 100, 140, 180, 220, 260, 300, 340] as const;

function StarFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 text-amber-200/70 ${className}`}
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 1.5l2.2 6.8h7.1l-5.7 4.1 2.2 6.8L12 15.1l-5.8 4.1 2.2-6.8L2.7 8.3h7.1L12 1.5z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div
      data-about="mystical"
      className="about-mystical relative min-h-screen overflow-hidden bg-[#050816] text-stone-100"
    >
      <AboutCosmicBackdrop />

      <Section className="relative z-10 border-0 bg-transparent px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl xl:max-w-7xl">
          {/* Hero */}
          <section
            id="about-hero"
            className="relative mb-4 md:mb-6"
            aria-labelledby="about-hero-heading"
          >
            <div
              className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 h-[min(22rem,70vw)] w-[min(48rem,100%)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(126,58,237,0.22)_0%,transparent_68%)] opacity-95"
              aria-hidden
            />
            <FadeInSection delay={0}>
              <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5">
                <div className="flex w-full flex-col items-center gap-5 md:flex-row md:items-center md:justify-center md:gap-5 lg:gap-10">
                  <Image
                    src="/images/Magiciantarot.png"
                    alt=""
                    width={560}
                    height={280}
                    className={`${owlClass} hidden shrink-0 md:block`}
                    aria-hidden
                  />
                  <div className="group flex w-full min-w-0 flex-1 flex-col items-center gap-5">
                    <h1
                      id="about-hero-heading"
                      className="font-[var(--font-display)] text-3xl font-semibold text-center text-balance leading-tight text-stone-50 px-1 md:text-4xl lg:text-5xl"
                      style={{
                        textShadow: "0 0 36px rgba(126, 58, 237, 0.45)",
                      }}
                    >
                      {aboutHeroTitle}
                    </h1>
                    <div className="relative">
                      <div
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[115%] w-[95%] max-w-[min(320px,88vw)] md:max-w-[min(320px,30vw)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.38)_0%,rgba(91,33,182,0.12)_55%,transparent_72%)] blur-3xl motion-reduce:blur-none"
                        aria-hidden
                      />
                      <Image
                        src="/images/framejenny3.png"
                        alt="Jenny N"
                        width={640}
                        height={800}
                        className={portraitClass}
                        priority
                      />
                    </div>
                  </div>
                  <span
                    className="hidden shrink-0 md:inline-block md:-scale-x-100"
                    aria-hidden
                  >
                    <Image
                      src="/images/Magiciantarot.png"
                      alt=""
                      width={560}
                      height={280}
                      className={owlClass}
                      aria-hidden
                    />
                  </span>
                </div>
                <Image
                  src="/images/Magiciantarot.png"
                  alt=""
                  width={560}
                  height={280}
                  className={`${owlClass} md:hidden`}
                  aria-hidden
                />
              </div>
            </FadeInSection>
          </section>

          <CelestialDivider />

          {/* Poetic story */}
          <section
            id="about-story"
            className="mx-auto w-full max-w-5xl lg:max-w-6xl space-y-12 text-center text-pretty md:space-y-16 lg:space-y-20 mb-4 md:mb-6"
            aria-labelledby="about-story-h2"
          >
            <h2 id="about-story-h2" className="sr-only">
              Jenny&apos;s path
            </h2>
            {aboutStoryParagraphs.map((text, i) => (
              <FadeInSection key={i} delay={STORY_DELAYS_MS[i] ?? 60}>
                <p className={STORY_P_CLASS[i] ?? STORY_P_CLASS[0]}>{text}</p>
              </FadeInSection>
            ))}
          </section>

          <CelestialDivider />

          {/* Pillars */}
          <section
            id="about-pillars"
            className="mb-4 md:mb-8"
            aria-labelledby="about-pillars-heading"
          >
            <FadeInSection delay={120}>
              <div className="mb-10 flex flex-col items-center justify-center gap-3 md:mb-14 md:gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <StarFlourish className="opacity-80 shrink-0" />
                  <h2
                    id="about-pillars-heading"
                    className="font-[var(--font-display)] max-w-xl text-center text-xl font-semibold leading-snug tracking-tight text-amber-50 sm:text-2xl md:text-3xl [text-shadow:0_0_24px_rgba(126,58,237,0.35)] text-pretty"
                  >
                    {aboutPillarsHeading}
                  </h2>
                  <StarFlourish className="opacity-80 shrink-0" />
                </div>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
              {pillars.map((pillar, i) => (
                <FadeInSection key={pillar.title} delay={160 + i * 70}>
                  <TarotPillarCard {...pillar} />
                </FadeInSection>
              ))}
            </div>
          </section>

          <CelestialDivider />

          {/* Closing */}
          <section
            id="about-closing"
            className="relative pb-8 md:pb-12"
            aria-labelledby="about-closing-h2"
          >
            <h2 id="about-closing-h2" className="sr-only">
              The Opaline Owl
            </h2>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#03050f]/90" />
            <FadeInSection delay={200}>
              <p className="relative mx-auto w-full max-w-5xl lg:max-w-6xl text-center text-pretty font-[var(--font-body)] text-base leading-relaxed text-violet-100/95 md:text-lg whitespace-pre-line [text-shadow:0_1px_16px_rgba(0,0,0,0.35)]">
                {aboutClosing}
              </p>
            </FadeInSection>
          </section>
        </div>
      </Section>
    </div>
  );
}
