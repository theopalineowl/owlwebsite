import { Section } from "@/components/layout/Section";
import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";

const benefits = [
  "Guidance",
  "Strength & Healing",
  "Protection",
  "Support",
];

export function BenefitsSection() {
  return (
    <>
      <DividerOrnament />
      <Section className="relative">
        <SectionTwinkles />
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] text-center mb-10">
          Benefits Of Connecting With Source Energy
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl mx-auto">
          {benefits.map((benefit) => (
            <span
              key={benefit}
              className="inline-flex items-center rounded-full bg-[var(--accent-gold-muted)]/25 px-6 py-3 text-[var(--text-primary)] font-medium border border-[var(--accent-gold-muted)]/40"
            >
              {benefit}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
