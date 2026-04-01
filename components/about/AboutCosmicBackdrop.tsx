"use client";

import { SectionTwinkles } from "@/components/ui/SectionTwinkles";

/** Extra dense star positions: [vertical, horizontal %, size] */
const ABOUT_STAR_SEEDS: [string, number, number][] = [
  ["4%", 6, 10],
  ["8%", 22, 8],
  ["12%", 78, 9],
  ["18%", 12, 11],
  ["22%", 88, 8],
  ["30%", 5, 9],
  ["34%", 40, 10],
  ["38%", 62, 8],
  ["44%", 18, 7],
  ["48%", 52, 12],
  ["52%", 92, 9],
  ["58%", 28, 8],
  ["64%", 72, 10],
  ["70%", 8, 9],
  ["76%", 45, 8],
  ["82%", 85, 11],
  ["88%", 35, 9],
  ["94%", 65, 8],
];

const ABOUT_SPOTS = (() => {
  type S = {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    size: number;
  };
  return ABOUT_STAR_SEEDS.flatMap(([v, h, size]): S[] => {
    const isBottom = String(v).startsWith("bottom:");
    const top = isBottom ? undefined : v;
    const bottom = isBottom ? (v as string).replace("bottom:", "").trim() : undefined;
    const left: S = { top, bottom, left: `${h}%`, size };
    const right: S = { top, bottom, right: `${h}%`, size };
    return h === 48 ? [left] : [left, right];
  });
})();

const PARTICLES = [
  { top: "15%", left: "25%", w: 3, delay: "0s" },
  { top: "40%", left: "70%", w: 2, delay: "1.2s" },
  { top: "55%", left: "15%", w: 2, delay: "2.1s" },
  { top: "72%", left: "82%", w: 3, delay: "0.8s" },
  { top: "88%", left: "44%", w: 2, delay: "1.6s" },
  { top: "28%", left: "92%", w: 2, delay: "2.8s" },
];

export function AboutCosmicBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0c1228] via-35% to-[#1a1033]" />
      {/* Deep indigo / violet mist orbs */}
      <div className="about-mist about-mist-a absolute -left-[20%] top-[10%] h-[min(42rem,70vh)] w-[min(48rem,90vw)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(67,56,202,0.35)_0%,rgba(49,46,129,0.12)_45%,transparent_72%)] blur-2xl" />
      <div className="about-mist about-mist-b absolute -right-[15%] bottom-[5%] h-[min(38rem,60vh)] w-[min(44rem,85vw)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.28)_0%,rgba(76,29,149,0.1)_50%,transparent_70%)] blur-3xl" />
      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 h-[min(28rem,50vh)] w-[min(40rem,95vw)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(126,58,237,0.12)_0%,transparent_65%)] blur-2xl opacity-80" />
      {/* Fine floating particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="about-particle absolute rounded-full bg-violet-200/30 shadow-[0_0_12px_rgba(196,181,253,0.45)] motion-reduce:animate-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.w,
            height: p.w,
            animationDelay: p.delay,
          }}
        />
      ))}
      <SectionTwinkles spots={ABOUT_SPOTS} />
    </div>
  );
}
