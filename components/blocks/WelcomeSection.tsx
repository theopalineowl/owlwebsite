import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import Link from "next/link";

const bodyCopy = `vibrates. Nothing is ever truly still. Here, spirituality is both mystical and grounded: rooted in balance, awareness, and practices that meet you where you are.`;

export function WelcomeSection() {
  return (
    <>
      <DividerOrnament />
      <Section className="relative">
        <SectionTwinkles />
        <div className="max-w-2xl ml-auto text-right flex flex-col md:flex-row md:items-center md:justify-end gap-10 md:gap-12">
          <div className="md:max-w-[min(100%,20rem)]">
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-6">
              Welcome to The Opaline Owl
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
              {bodyCopy}
            </p>
            <Link
              href="/about"
              className="inline-block mt-4 text-[var(--accent-gold)] hover:underline font-medium"
            >
              Read more →
            </Link>
          </div>
          <div className="flex justify-center md:flex-shrink-0">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-[#f5f0e6] shadow-[var(--shadow-lift)] ring-2 ring-[var(--accent-gold-muted)]/30">
              <Image
                src="/images/logo.png"
                alt="The Opaline Owl"
                fill
                sizes="(max-width: 768px) 192px, 224px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
