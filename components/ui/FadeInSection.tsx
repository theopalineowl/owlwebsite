"use client";

import { useRef, useEffect, useState, useSyncExternalStore } from "react";

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before starting the fade-in (for stagger) */
  delay?: number;
};

export function FadeInSection({
  children,
  className = "",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    let delayId: ReturnType<typeof setTimeout> | null = null;
    let fallbackId: ReturnType<typeof setTimeout> | null = null;
    let shown = false;

    const reveal = () => {
      if (shown) return;
      shown = true;
      if (delay) delayId = setTimeout(() => setVisible(true), delay);
      else setVisible(true);
    };

    const inViewport = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < vh && rect.bottom > 0;
    };

    if (inViewport()) reveal();

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
    );
    obs.observe(el);

    fallbackId = setTimeout(reveal, 1200 + delay);

    return () => {
      obs.disconnect();
      if (delayId) clearTimeout(delayId);
      if (fallbackId) clearTimeout(fallbackId);
    };
  }, [delay, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
