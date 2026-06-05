"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { motionViewportOnce } from "@/lib/motion/viewport";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 22 },
  },
};

export function ThreeStepsSection() {
  return (
    <>
      <DividerOrnament />
      <Section tight className="relative overflow-visible">
        <SectionTwinkles />
        <motion.h2
          className="font-[var(--font-display)] text-4xl md:text-6xl font-semibold text-[var(--text-primary)] text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={motionViewportOnce}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Three Steps to Connect with Source Energy
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={motionViewportOnce}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 0 0 1px rgba(196,181,253,0.35), 0 0 40px rgba(126,58,237,0.25), 0 24px 48px rgba(0,0,0,0.35)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative text-center px-6 py-8 md:px-7 md:py-9 rounded-xl backdrop-blur-md shadow-[var(--shadow-soft)] border border-white/10 step-card-shimmer-bg"
            >
              <span
                className="step-icon-levitate absolute -top-4 left-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-violet-900/80 to-slate-800/90 shadow-[0_0_24px_rgba(126,58,237,0.35)] flex items-center justify-center p-1.5 ring-1 ring-white/15"
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
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
}
