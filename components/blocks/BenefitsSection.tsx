"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { motionViewportOnce } from "@/lib/motion/viewport";

const benefits: { label: string; icon: string }[] = [
  { label: "Guidance", icon: "/images/Crystal Ball.svg" },
  { label: "Strength & Healing", icon: "/images/Magic Potion.svg" },
  { label: "Protection", icon: "/images/022-hamsa.svg" },
  { label: "Support", icon: "/images/025-fire.svg" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const pill = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 24 },
  },
};

export function BenefitsSection() {
  return (
    <>
      <DividerOrnament />
      <Section tight className="relative">
        <SectionTwinkles />
        <motion.h2
          className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-[var(--text-primary)] text-center mb-5 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={motionViewportOnce}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Benefits Of Connecting With Source Energy
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={motionViewportOnce}
        >
          {benefits.map(({ label, icon }) => (
            <motion.span
              key={label}
              variants={pill}
              whileHover={{
                scale: 1.04,
                boxShadow:
                  "0 0 28px rgba(126,58,237,0.35), 0 0 48px rgba(167,139,250,0.15)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#3f3f57]/90 px-6 py-3 text-base md:text-lg text-[var(--text-primary)] font-medium ring-1 ring-white/10 backdrop-blur-sm cursor-default"
            >
              <Image
                src={icon}
                alt=""
                width={24}
                height={24}
                className="size-6 shrink-0 object-contain step-icon-violet benefits-icon-pulse"
              />
              {label}
            </motion.span>
          ))}
        </motion.div>
      </Section>
    </>
  );
}
