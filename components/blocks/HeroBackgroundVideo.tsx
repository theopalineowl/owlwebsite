"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/hero-720p-loop.mp4";
const POSTER = "/images/hero-poster.webp";
const CROSSFADE_DURATION_MS = 1800;
const CROSSFADE_TRIGGER_S = 2; // start crossfade when this many seconds left

export function HeroBackgroundVideo() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<"A" | "B">("A");
  const [opacityA, setOpacityA] = useState(1);
  const [opacityB, setOpacityB] = useState(0);
  const isCrossfading = useRef(false);
  const crossfadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const startPlayback = useCallback(() => {
    refA.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion) startPlayback();
  }, [prefersReducedMotion, startPlayback]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = active === "A" ? refA.current : refB.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (isCrossfading.current) return;
      const d = video.duration;
      if (!Number.isFinite(d) || d <= 0) return;
      if (video.currentTime < d - CROSSFADE_TRIGGER_S) return;

      isCrossfading.current = true;
      const other = active === "A" ? refB.current : refA.current;
      if (!other) {
        isCrossfading.current = false;
        return;
      }

      other.currentTime = 0;
      other.play().catch(() => {});

      if (active === "A") {
        setOpacityA(0);
        setOpacityB(1);
      } else {
        setOpacityB(0);
        setOpacityA(1);
      }

      crossfadeTimeout.current = setTimeout(() => {
        video.pause();
        video.currentTime = 0;
        setActive(active === "A" ? "B" : "A");
        isCrossfading.current = false;
        crossfadeTimeout.current = null;
      }, CROSSFADE_DURATION_MS);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      if (crossfadeTimeout.current) clearTimeout(crossfadeTimeout.current);
    };
  }, [active, prefersReducedMotion]);

  return (
    <div className="absolute inset-0">
      <video
        ref={refA}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-out"
        style={{ opacity: opacityA }}
        src={VIDEO_SRC}
        poster={POSTER}
        autoPlay={false}
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={refB}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-out"
        style={{ opacity: opacityB }}
        src={VIDEO_SRC}
        poster={POSTER}
        autoPlay={false}
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
    </div>
  );
}
