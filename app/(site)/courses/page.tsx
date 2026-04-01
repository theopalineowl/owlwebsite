"use client";

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

export default function CoursesPage() {
  return (
    <div className="home-dark min-h-screen">
      <Section className="relative">
        <SectionTwinkles />
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection delay={0}>
            <h1
              className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-6"
              style={{
                textShadow: "0 0 30px rgba(126, 58, 237, 0.3)",
              }}
            >
              The Journey: Connecting With Source Energy
            </h1>
          </FadeInSection>

          <FadeInSection delay={80}>
            <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line mb-10">
              {introCopy}
            </p>
          </FadeInSection>

          <FadeInSection delay={120}>
            <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line mb-12">
              {bodyCopy}
            </p>
          </FadeInSection>

          <p className="text-[var(--text-primary)] font-[var(--font-display)] text-lg font-medium mb-6">
            The course unfolds through three core pillars:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
            {pillars.map((pillar, i) => (
              <FadeInSection key={pillar.title} delay={160 + i * 60}>
                <div
                  className={`journey-card journey-glow rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-5 h-full transition-transform hover:border-[rgba(126,58,237,0.4)]`}
                >
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--text-primary)] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={400}>
            <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line mb-10">
              {closingCopy}
            </p>
          </FadeInSection>

          <FadeInSection delay={450}>
            <form
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/70 focus:outline-none focus:ring-2 focus:ring-[rgba(126,58,237,0.5)] focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="shrink-0 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-violet-500 shadow-[0_0_20px_rgba(126,58,237,0.3)] hover:shadow-[0_0_28px_rgba(126,58,237,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Notify me
              </button>
            </form>
            <p className="mt-6 text-sm text-[var(--text-muted)]">
              Join the Parliament!
            </p>
          </FadeInSection>
        </div>
      </Section>
    </div>
  );
}
