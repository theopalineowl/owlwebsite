"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ML_FORM_MARKUP } from "./mailerLiteFormMarkup";

const WEBFORMS =
  "https://groot.mailerlite.com/js/w/webforms.min.js?v95037e5bac78f29ed026832ca21a7c7b";
const TAKEL =
  "https://assets.mailerlite.com/jsonp/2278902/forms/185211668340410185/takel";

export type MailerLiteSurface = "on-light" | "on-dark";

function setSuccessHandler() {
  (window as unknown as { ml_webform_success_40131402?: () => void }).ml_webform_success_40131402 =
    function ml_webform_success_40131402() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      const $ = w.ml_jQuery || w.jQuery;
      if (typeof $ !== "function") return;
      $(".ml-subscribe-form-40131402 .row-success").show();
      $(".ml-subscribe-form-40131402 .row-form").hide();
    };
}

export function MailerLiteJoinForm({
  className = "",
  variant = "on-dark",
}: {
  className?: string;
  /** Footer (parchment) vs Journey & dark sections. */
  variant?: MailerLiteSurface;
}) {
  useEffect(() => {
    setSuccessHandler();
  }, []);

  const card =
    "rounded-2xl border px-5 py-7 sm:px-8 sm:py-8 " +
    (variant === "on-light"
      ? "border-slate-200/80 bg-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/55"
      : "border-white/20 bg-white/[0.07] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl");

  return (
    <>
      <div
        className={`w-full max-w-[650px] mx-auto ${className}`.trim()}
        data-opaline-ml={variant}
      >
        <div className={card}>
          <h2
            className={
              "text-center font-[var(--font-display)] text-2xl sm:text-[1.75rem] font-semibold tracking-tight leading-tight " +
              (variant === "on-light"
                ? "text-slate-800"
                : "text-white [text-shadow:0_0_32px_rgba(167,139,250,0.2)]")
            }
          >
            Join the Journey ✨
          </h2>
          <p
            className={
              "text-center text-sm sm:text-base leading-relaxed mt-2 mb-3 max-w-md mx-auto font-[var(--font-body)] " +
              (variant === "on-light" ? "text-slate-600" : "text-[var(--text-muted)]/95")
            }
          >
            Get updates on courses, healing offerings, and exclusive guidance.
          </p>
          <div
            className={
              "text-center text-xs sm:text-sm leading-relaxed space-y-1.5 mb-6 sm:mb-7 max-w-lg mx-auto font-[var(--font-body)] " +
              (variant === "on-light" ? "text-slate-600" : "text-[var(--text-muted)]/90")
            }
          >
            <p className="italic">
              *Receive exclusive content like guided meditations and rituals.
            </p>
            <p className="italic">
              *Be among the first to know when new products are launched and receive
              promotional discounts.
            </p>
            <p className="italic">*Learn about opportunities to connect with Jenny N live!</p>
          </div>
          <div
            className="opaline-ml-embed min-w-0"
            dangerouslySetInnerHTML={{ __html: ML_FORM_MARKUP }}
          />
        </div>
      </div>
      <Script
        id="mailerlite-webforms"
        src={WEBFORMS}
        strategy="afterInteractive"
        onLoad={() => {
          fetch(TAKEL, { method: "GET", mode: "cors" }).catch(() => {});
        }}
      />
    </>
  );
}
