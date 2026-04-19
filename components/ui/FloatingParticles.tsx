"use client";

import { useMemo } from "react";

const COUNT = 28;

type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  floatDur: number;
  opacityDur: number;
  delay: number;
};

function buildParticles(): Particle[] {
  return Array.from({ length: COUNT }, (_, i) => {
    const a = (i * 9973) % 1000;
    const b = (i * 7919 + 401) % 1000;
    return {
      id: i,
      left: `${(a * 0.1) % 100}%`,
      top: `${(b * 0.1) % 100}%`,
      size: 2 + (i % 4),
      floatDur: 14 + (i % 9) * 1.4,
      opacityDur: 5 + (i % 5) * 0.85,
      delay: ((i * 2.3) % 11) * 0.45,
    };
  });
}

export function FloatingParticles() {
  const particles = useMemo(() => buildParticles(), []);

  return (
    <div className="home-dark-particles" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="home-firefly"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.floatDur}s, ${p.opacityDur}s`,
            animationDelay: `${p.delay}s, ${p.delay * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}
