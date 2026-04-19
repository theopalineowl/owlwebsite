"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";

export function CTASection() {
  return (
    <Section tight className="relative overflow-hidden">
      <SectionTwinkles />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,28rem)] h-[min(50vw,16rem)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(126,58,237,0.22)_0%,rgba(250,204,21,0.06)_40%,transparent_70%)] blur-2xl motion-reduce:blur-none"
        aria-hidden
      />
      <div className="text-center relative z-[1]">
        <motion.p
          className="text-[var(--text-muted)] mb-4 font-[var(--font-body)]"
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Ready to begin?
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.1 }}
        >
          <span className="cta-button-glow inline-flex rounded-full">
            <Button
              href="/courses"
              className="!text-white !bg-[var(--accent-gold)]/90 hover:!bg-[var(--accent-gold)] relative z-[1]"
            >
              Join the Journey!
            </Button>
          </span>
        </motion.div>
      </div>
    </Section>
  );
}
