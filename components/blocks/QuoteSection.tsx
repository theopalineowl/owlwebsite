"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";

export function QuoteSection({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <Section tight className="relative overflow-hidden">
      <SectionTwinkles />
      <motion.blockquote
        className="max-w-2xl mx-auto text-center relative z-[1]"
        initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-[var(--font-display)] text-xl md:text-2xl text-[var(--text-primary)] italic leading-relaxed quote-ethereal-glow">
          &ldquo;{quote}&rdquo;
        </p>
        <motion.footer
          className="mt-2 md:mt-3 text-[var(--text-muted)] text-sm"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        >
          — {attribution}
        </motion.footer>
      </motion.blockquote>
    </Section>
  );
}
