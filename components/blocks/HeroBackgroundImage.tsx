"use client";

import Image from "next/image";

const IMAGE_SRC = "/images/mysticalforest.png";

export function HeroBackgroundImage() {
  return (
    <div className="absolute inset-0">
      {/* Background image — fades in on load */}
      <div className="absolute inset-0 animate-hero-bg">
        <Image
          src={IMAGE_SRC}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
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
