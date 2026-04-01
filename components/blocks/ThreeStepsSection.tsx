import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";

const STEP_ICONS = [
  "/images/016-meditation.svg",
  "/images/037-candles.svg",
  "/images/Tarot Card copy.svg",
] as const;

const steps = [
  {
    title: "Nervous System Regulation",
    description:
      "Achieving a balanced state through stillness and movement practices that resonate with our individual needs",
    icon: STEP_ICONS[0],
  },
  {
    title: "Personalized Ritual",
    description:
      "Cultivating needs-based, and everyday practices through a deep understanding of the self",
    icon: STEP_ICONS[1],
  },
  {
    title: "Interpretation of Correspondences",
    description:
      "Developing awareness of signs based on both collective understanding, and personal meaning",
    icon: STEP_ICONS[2],
  },
];

export function ThreeStepsSection() {
  return (
    <>
      <DividerOrnament />
      <Section className="relative">
        <SectionTwinkles />
        <h2 className="font-[var(--font-display)] text-4xl md:text-6xl font-semibold text-[var(--text-primary)] text-center mb-16">
          Three Steps to Connect with Source Energy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative text-center px-8 py-10 rounded-xl bg-white/60 shadow-[var(--shadow-soft)] border border-[var(--accent-gold-muted)]/20"
            >
              <span
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#4b5563] shadow-[var(--shadow-soft)] flex items-center justify-center p-1.5"
                aria-hidden
              >
                <Image
                  src={step.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="step-icon-violet w-full h-full object-contain"
                />
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
