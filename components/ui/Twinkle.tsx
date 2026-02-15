"use client";

import { useEffect, useState } from "react";

/** Soft opaline white with slight teal tint; opacity controlled by animation (max 0.6) */
const TWINKLE_FILL = "#e8f5f3";

type TwinkleProps = {
  size?: number;
  className?: string;
};

export function Twinkle({ size = 24, className = "" }: TwinkleProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : true
  );
  const [animParams, setAnimParams] = useState<{ duration: number; delay: number }>(() => ({
    duration: 5000,
    delay: 1000,
  }));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setAnimParams({
        duration: 4000 + Math.random() * 2000,
        delay: Math.random() * 2000,
      });
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const { duration, delay } = animParams;

  const animate = !prefersReducedMotion;
  const animationStyle = animate
    ? { animation: `twinkle-pulse ${duration}ms ease-in-out ${delay}ms infinite` }
    : { opacity: 0.5 };

  return (
    <span
      aria-hidden="true"
      className={`inline-block pointer-events-none select-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, ...animationStyle }}
    >
      <svg
        viewBox="0 0 512 512"
        className="w-full h-full"
        fill={TWINKLE_FILL}
        role="presentation"
      >
        <path d="M321.566,284.228l141.934-28.228-141.934-28.228c-3.461-.688-6.782-1.75-9.923-3.137l48.899-73.178-73.177,48.899c-1.387-3.141-2.448-6.462-3.137-9.924l-28.228-141.933-28.228,141.933c-.688,3.461-1.75,6.782-3.137,9.924l-73.177-48.899,48.899,73.178c-3.141,1.387-6.462,2.449-9.923,3.137l-141.934,28.228,141.934,28.228c3.461.688,6.782,1.75,9.923,3.137l-48.899,73.177,73.177-48.899c1.387,3.141,2.448,6.462,3.137,9.924l28.228,141.933,28.228-141.933c.688-3.461,1.75-6.782,3.137-9.924l73.177,48.899-48.899-73.177c3.141-1.387,6.462-2.449,9.923-3.137Z" />
        <path d="M355.546,103.822l30.42,6.05c.742.148,1.454.375,2.127.672l-10.48,15.684,15.684-10.48c.297.673.525,1.385.672,2.127l6.05,30.42,6.05-30.42c.147-.742.375-1.454.672-2.127l15.684,10.48-10.48-15.684c.673-.297,1.385-.525,2.127-.672l30.42-6.05-30.42-6.05c-.742-.148-1.454-.375-2.127-.672l10.48-15.684-15.684,10.48c-.297-.673-.525-1.385-.672-2.127l-6.05-30.42-6.05,30.42c-.148.742-.375,1.454-.672,2.127l-15.684-10.48,10.48,15.684c-.673.297-1.385.525-2.127.672l-30.42,6.05Z" />
        <path d="M454.356,396.934l-20.042-3.986c-.489-.097-.958-.247-1.401-.443l6.905-10.333-10.333,6.905c-.196-.444-.346-.913-.443-1.401l-3.986-20.042-3.986,20.042c-.097.489-.247.958-.443,1.401l-10.333-6.905,6.905,10.333c-.443.196-.912.346-1.401.443l-20.042,3.986,20.042,3.986c.489.097.958.247,1.401.443l-6.905,10.333,10.333-6.905c.196.444.346.913.443,1.401l3.986,20.042,3.986-20.042c.097-.489.247-.958.443-1.401l10.333,6.905-6.905-10.333c.444-.196.913-.346,1.401-.443l20.042-3.986Z" />
        <path d="M101.948,345.236l-16.517-3.285c-.403-.08-.789-.204-1.155-.365l5.69-8.516-8.516,5.691c-.161-.366-.285-.752-.365-1.155l-3.285-16.517-3.285,16.517c-.08.403-.204.789-.365,1.155l-8.516-5.691,5.691,8.516c-.365.161-.752.285-1.155.365l-16.517,3.285,16.517,3.285c.403.08.789.204,1.155.365l-5.691,8.516,8.516-5.691c.161.366.285.752.365,1.155l3.285,16.517,3.285-16.517c.08-.403.204-.789.365-1.155l8.516,5.691-5.69-8.516c.365-.161.752-.285,1.155-.365l16.517-3.285Z" />
      </svg>
    </span>
  );
}
