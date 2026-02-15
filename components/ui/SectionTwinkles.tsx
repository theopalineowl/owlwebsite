"use client";

import { Twinkle } from "./Twinkle";

/** Left-right symmetric seeds: [vertical, horizontal%, size]. Mirror to (left + right); center = single. */
const SECTION_SEEDS: [string, number, number][] = [
  ["6%", 10, 12],
  ["14%", 16, 10],
  ["28%", 48, 11], // center
  ["42%", 22, 9],
  ["bottom: 14%", 8, 10],
];
const DEFAULT_SPOTS = (() => {
  type S = { top?: string; bottom?: string; left?: string; right?: string; size: number };
  return SECTION_SEEDS.flatMap(([v, h, size]): S[] => {
    const isBottom = String(v).startsWith("bottom:");
    const top = isBottom ? undefined : v;
    const bottom = isBottom ? (v as string).replace("bottom:", "").trim() : undefined;
    const left: S = { top, bottom, left: `${h}%`, size };
    const right: S = { top, bottom, right: `${h}%`, size };
    return h === 48 ? [left] : [left, right];
  });
})();

type Spot = { top?: string; bottom?: string; left?: string; right?: string; size: number };

export function SectionTwinkles({ spots = DEFAULT_SPOTS }: { spots?: Spot[] }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {spots.map((spot, i) => (
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
          <Twinkle size={spot.size} />
        </span>
      ))}
    </div>
  );
}
