"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { FadeInSection } from "@/components/ui/FadeInSection";

const introCopy = `There comes a point in many lives when we begin to sense that there is more to our experience than the routines of daily living. A quiet pull toward deeper awareness. A curiosity about the unseen forces that shape our intuition, our sense of meaning, and our connection to the natural world.

The Journey: Connecting With Source Energy was created to guide seekers through that exploration in a grounded, thoughtful, and empowering way.`;

const bodyCopy = `This course is designed to help you cultivate heightened self-awareness and learn how to consciously work with the intelligent Source Energy that flows through all living things. Rather than asking you to adopt a single doctrine or belief system, The Journey introduces ideas and practices drawn from multiple spiritual traditions and wisdom schools. You will be invited to explore these perspectives and keep what resonates most authentically with you.

Throughout the course, you will be guided in developing personal practices and rituals that reflect who you truly are. Your background, belief system, culture, learning style, and life experiences are all honored as part of the process. The goal is not to imitate someone else's spiritual path, but to consciously shape your own.`;

const pillars = [
  {
    title: "Nervous System Balance",
    description:
      "Learn how to cultivate internal equilibrium so that awareness, intuition, and clarity can naturally arise. You will explore practical techniques rooted in both modern science and ancient contemplative practices.",
  },
  {
    title: "Personalized Ritual",
    description:
      "Discover how to design meaningful personal practices that align with your values, environment, and spiritual perspective, allowing you to consciously engage with Source Energy in your everyday life.",
  },
  {
    title: "Signs and Synchronicities",
    description:
      "Develop the awareness needed to recognize meaningful patterns, symbols, and intuitive signals that often appear when we begin living in deeper connection with the natural flow of life.",
  },
];

const closingCopy = `Alongside the video lessons, you will receive a downloadable reference guide and workbook designed to help you reflect, record insights, and build your own personalized system of practices as you move through the material.

The Journey is not about following someone else's path. It is about awakening your own awareness and learning to work with the deeper intelligence that already exists within you and around you.

Click below to learn more about the course, explore what each module includes, and discover how you can also connect with me live through our growing community.`;

const owlClass =
  "journey-owl-float h-24 w-auto md:h-32 lg:h-36 object-contain shrink-0 select-none transition-transform duration-300 ease-out motion-reduce:transition-none hover:scale-[1.03] motion-reduce:hover:scale-100";

export default function CoursesPage() {
  return (
    <div className="home-dark min-h-screen">
      <Section className="relative">
        <SectionTwinkles />
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          {/* Hero */}
          <div className="relative mb-12 md:mb-14">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[min(24rem,92vw)] w-[min(56rem,100%)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(126,58,237,0.2)_0%,transparent_68%)] opacity-90"
              aria-hidden
            />
            <FadeInSection delay={0}>
              <div className="relative flex flex-col items-center gap-5 md:hidden">
                <Image
                  src="/images/DeathTarot.png"
                  alt=""
                  width={560}
                  height={280}
                  className={owlClass}
                  aria-hidden
                />
                <h1
                  className="font-[var(--font-display)] text-3xl font-semibold text-[var(--text-primary)] text-center text-balance leading-tight px-1"
                  style={{
                    textShadow: "0 0 30px rgba(126, 58, 237, 0.3)",
                  }}
                >
                  The Journey: Connecting With Source Energy
                </h1>
              </div>
              <div className="relative hidden md:flex flex-row items-center justify-center gap-5 lg:gap-10 max-w-6xl mx-auto w-full">
                <Image
                  src="/images/DeathTarot.png"
                  alt=""
                  width={560}
                  height={280}
                  className={owlClass}
                  aria-hidden
                />
                <h1
                  className="font-[var(--font-display)] text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] min-w-0 flex-1 text-center text-balance leading-tight"
                  style={{
                    textShadow: "0 0 30px rgba(126, 58, 237, 0.3)",
                  }}
                >
                  The Journey: Connecting With Source Energy
                </h1>
                <Image
                  src="/images/DeathTarot.png"
                  alt=""
                  width={560}
                  height={280}
                  className={owlClass}
                  aria-hidden
                />
              </div>
            </FadeInSection>
          </div>

          <div
            className="border-t border-white/10 mb-12 md:mb-14"
            aria-hidden
          />

          {/* Story */}
          <div className="max-w-5xl mx-auto w-full text-left space-y-8 mb-12 md:mb-14">
            <FadeInSection delay={80}>
              <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                {introCopy}
              </p>
            </FadeInSection>
            <FadeInSection delay={120}>
              <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                {bodyCopy}
              </p>
            </FadeInSection>
          </div>

          <div
            className="border-t border-white/10 mb-10 md:mb-12"
            aria-hidden
          />

          {/* Pillars — shared max width so heading and cards share the same vertical edges */}
          <div className="max-w-5xl mx-auto w-full mb-12 space-y-8">
            <FadeInSection delay={140}>
              <p className="text-[var(--text-primary)] font-[var(--font-display)] text-xl sm:text-2xl md:text-3xl font-semibold text-left leading-snug tracking-tight">
                The course unfolds through three core pillars:
              </p>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
              {pillars.map((pillar, i) => (
                <FadeInSection key={pillar.title} delay={160 + i * 60}>
                  <div
                    className="journey-card journey-glow group rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-5 py-5 md:px-6 h-full transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-[0_0_24px_rgba(126,58,237,0.15)] motion-reduce:hover:translate-y-0"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300/80 mb-2">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--text-primary)] mb-3 group-hover:text-white transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>

          <div
            className="border-t border-white/10 mb-10 md:mb-12"
            aria-hidden
          />

          <FadeInSection delay={400}>
            <div className="max-w-5xl mx-auto w-full text-left mb-10">
              <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                {closingCopy}
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={450}>
            <div className="text-center">
              <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md p-6 max-w-xl mx-auto w-full">
                <form
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 min-w-0 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/70 outline-none transition-all focus-visible:ring-2 focus-visible:ring-[rgba(126,58,237,0.55)] focus-visible:border-transparent"
                  />
                  <button
                    type="submit"
                    className="shrink-0 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-violet-500 shadow-[0_0_20px_rgba(126,58,237,0.3)] hover:shadow-[0_0_28px_rgba(126,58,237,0.4)] hover:-translate-y-0.5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a] focus-visible:ring-violet-400 motion-reduce:hover:translate-y-0"
                  >
                    Notify me
                  </button>
                </form>
              </div>
              <p className="mt-6 text-sm text-[var(--text-muted)]">
                Join the Parliament!
              </p>
            </div>
          </FadeInSection>
        </div>
      </Section>
    </div>
  );
}
