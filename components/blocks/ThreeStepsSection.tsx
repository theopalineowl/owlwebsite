import { Section } from "@/components/layout/Section";
import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";

const steps = [
  {
    title: "Achieve a Balanced State",
    description:
      "Through mindful meditation and mindful living practices",
    num: "1",
  },
  {
    title: "Cultivate Personal Practices",
    description: "Through a deep understanding of the self",
    num: "2",
  },
  {
    title: "Connect With Source",
    description:
      "Through rituals and correspondences rooted in tradition, but tailored to the individual seeker",
    num: "3",
  },
];

export function ThreeStepsSection() {
  return (
    <>
      <DividerOrnament />
      <Section className="relative">
        <SectionTwinkles />
        <h2 className="font-[var(--font-display)] text-4xl md:text-6xl font-semibold text-[var(--text-primary)] text-center mb-16">
          Three Steps to Enhanced Spiritual Connection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative text-center px-8 py-10 rounded-xl bg-white/60 shadow-[var(--shadow-soft)] border border-[var(--accent-gold-muted)]/20"
            >
              <span
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[var(--accent-gold-muted)]/30 flex items-center justify-center text-base font-semibold text-[var(--text-primary)]"
                aria-hidden
              >
                {step.num}
              </span>
              <h3 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--text-primary)] mt-3 mb-4">
                {step.title}
              </h3>
              <p className="text-[var(--text-muted)] text-base leading-relaxed italic">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
