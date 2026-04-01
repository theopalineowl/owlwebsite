"use client";

import { Section } from "@/components/layout/Section";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { FadeInSection } from "@/components/ui/FadeInSection";

const intro = `Jenny N is a modern witch, educator, and spiritual guide devoted to helping seekers cultivate a conscious relationship with Source Energy.

With a professional background as an English teacher and librarian, Jenny brings both intellectual depth and storytelling clarity to her work. As a certified mindfulness educator, yoga instructor, and Reiki practitioner, her path blends structured study with intuitive spiritual experience.`;

const journey = `Her own journey has not been linear. It has included clarity and confusion, epiphany and despair — a deeply human unfolding. Through stillness and devotion, she cultivated a connection to the intelligent force "behind the veil," a presence that offers guidance, healing, protection, and support.`;

const truth = `From this lived experience — an interweaving of global mystical traditions, philosophy, science, and nature-based spirituality — Jenny recognized a truth:

Spiritual growth is not one-size-fits-all. It is profoundly personal.`;

const personal = `Learning styles, cultural backgrounds, personality, temperament, and personal symbolism all matter. There is no universal ritual — only personalized pathways.`;

const pillars = [
  "Nervous system balance",
  "Personalized ritual",
  "Decoding of signs and synchronicities",
];

const closing = `Through The Opaline Owl, Jenny shares her journey and teachings to help others create their own sacred practices — rooted in nature, awareness, and individualized spiritual design. Her work exists at the intersection of mystical and naturalistic, inviting seekers to evolve with clarity, reverence, and intention.`;

export default function AboutPage() {
  return (
    <div className="home-dark min-h-screen">
      <Section className="relative">
        <SectionTwinkles />
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection delay={0}>
            <h1
              className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-10"
              style={{
                textShadow: "0 0 30px rgba(126, 58, 237, 0.3)",
              }}
            >
              Meet the Owl!
            </h1>
          </FadeInSection>

          <FadeInSection delay={80}>
            <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line mb-10">
              {intro}
            </p>
          </FadeInSection>

          <FadeInSection delay={120}>
            <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line mb-10">
              {journey}
            </p>
          </FadeInSection>

          <FadeInSection delay={160}>
            <p className="text-[var(--text-primary)] font-[var(--font-display)] text-lg leading-relaxed whitespace-pre-line mb-10">
              {truth}
            </p>
          </FadeInSection>

          <FadeInSection delay={200}>
            <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line mb-8">
              {personal}
            </p>
          </FadeInSection>

          <FadeInSection delay={240}>
            <p className="text-[var(--text-primary)] font-medium mb-4">
              Three essential pillars to consciously connect with Source Energy:
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {pillars.map((pillar, i) => (
                <span
                  key={pillar}
                  className={`journey-card journey-glow inline-block rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[rgba(126,58,237,0.4)]`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {pillar}
                </span>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay={320}>
            <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
              {closing}
            </p>
          </FadeInSection>
        </div>
      </Section>
    </div>
  );
}
