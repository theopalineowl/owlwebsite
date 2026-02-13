import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DividerOrnament } from "@/components/ui/DividerOrnament";

const cards = [
  {
    title: "Balance Within",
    description:
      "Calm the nervous system. Find your energetic center.",
    icon: "☽",
    href: "/blog",
  },
  {
    title: "Nature as Teacher",
    description:
      "Connect with the earth and seasonal rhythms for grounding and clarity.",
    icon: "✦",
    href: "/blog",
  },
  {
    title: "Inner Wisdom",
    description:
      "Trust your intuition. Practices that meet you where you are.",
    icon: "◉",
    href: "/blog",
  },
];

export function FeatureGrid() {
  return (
    <>
      <DividerOrnament />
      <Section>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] text-center mb-12">
          A Natural Path to Spiritual Connection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {cards.map((card) => (
            <Card key={card.title}>
              <Link href={card.href} className="block -m-6 p-6 rounded-lg">
                <div className="text-2xl text-[var(--accent-gold-muted)] mb-4">
                  {card.icon}
                </div>
                <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {card.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {card.description}{" "}
                  <span className="text-[var(--accent-gold)]">→</span>
                </p>
              </Link>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button href="/blog">Visit the Blog →</Button>
        </div>
      </Section>
    </>
  );
}
