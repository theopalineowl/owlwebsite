import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";

/* Theme yellow #fef9c3 (--text-muted in .home-dark) */
const BENEFIT_ICON_YELLOW_FILTER =
  "brightness(0) saturate(100%) invert(92%) sepia(45%) saturate(1492%) hue-rotate(330deg)";

const benefits: { label: string; icon: string }[] = [
  { label: "Guidance", icon: "/images/Crystal Ball.svg" },
  { label: "Strength & Healing", icon: "/images/Magic Potion.svg" },
  { label: "Protection", icon: "/images/022-hamsa.svg" },
  { label: "Support", icon: "/images/025-fire.svg" },
];

export function BenefitsSection() {
  return (
    <>
      <DividerOrnament />
      <Section className="relative">
        <SectionTwinkles />
        <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-[var(--text-primary)] text-center mb-10">
          Benefits Of Connecting With Source Energy
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {benefits.map(({ label, icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-gold-muted)]/25 px-6 py-3 text-base md:text-lg text-[var(--text-primary)] font-medium border border-[var(--accent-gold-muted)]/40"
            >
              <Image
                src={icon}
                alt=""
                width={24}
                height={24}
                className="size-6 shrink-0 object-contain"
                style={{ filter: BENEFIT_ICON_YELLOW_FILTER }}
              />
              {label}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
