import { Section } from "@/components/layout/Section";

const copy = `My spiritual journey has been one of returning to balance and reconnecting with source. Through nature, ritual, and daily practice, I've found a path that is both mystical and grounded.

Here at The Opaline Owl, I share what I've learned—ideas, tools, and practices that meet you where you are. Whether you're new to spiritual exploration or deepening an existing practice, this space is for you.`;

export default function AboutPage() {
  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold text-[var(--text-primary)] mb-8">
          My Spiritual Journey
        </h1>
        <div className="space-y-6 text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
          {copy}
        </div>
      </div>
    </Section>
  );
}
