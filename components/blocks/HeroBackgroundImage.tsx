"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

const IMAGE_SRC = "/images/mysticalforest.png";

export function HeroBackgroundImage({
  scrollTargetRef,
}: {
  scrollTargetRef: RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background image — fades in on load + parallax on scroll */}
      <motion.div className="absolute inset-0 animate-hero-bg" style={{ y }}>
        <Image
          src={IMAGE_SRC}
          alt=""
          fill
          className="object-cover object-center scale-[1.12]"
          priority
          sizes="100vw"
        />
      </motion.div>
      {/* Cinematic gradient: left 55% → center ~10%, soft and natural */}
      <div
        className="absolute inset-0 animate-hero-bg"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.08) 55%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      {/* Subtle haze / depth: very soft gradient on right for atmospheric feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(255,255,255,0.03) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
