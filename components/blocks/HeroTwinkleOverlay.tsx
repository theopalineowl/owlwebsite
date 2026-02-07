"use client";

import { Twinkle } from "@/components/ui/Twinkle";

/** Left-right symmetric seeds: [vertical, horizontal%, size]. Mirror each to (left + right); center = single. */
const HERO_SEEDS: [string, number, number][] = [
  ["8%", 12, 16],
  ["14%", 18, 12],
  ["24%", 26, 11],
  ["32%", 44, 13],
  ["38%", 10, 14],
  ["48%", 28, 10],
  ["52%", 50, 11], // center
  ["bottom: 42%", 16, 12],
  ["bottom: 24%", 14, 15],
  ["bottom: 18%", 48, 11], // center
  ["bottom: 10%", 28, 11],
];
const SPOTS = [
  ...HERO_SEEDS.flatMap(([v, h, size]) => {
    const isBottom = String(v).startsWith("bottom:");
    const top = isBottom ? undefined : v;
    const bottom = isBottom ? (v as string).replace("bottom:", "").trim() : undefined;
    const left = { top, bottom, left: `${h}%`, size } as const;
    const right = { top, bottom, right: `${h}%`, size } as const;
    return h === 50 || h === 48 ? [left] : [left, right];
  }),
];

export function HeroTwinkleOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    >
      {SPOTS.map((spot, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: spot.top,
            bottom: spot.bottom,
            left: spot.left,
            right: spot.right,
          }}
        >
          <Twinkle size={spot.size} variant="ambient" />
        </span>
      ))}
    </div>
  );
}
