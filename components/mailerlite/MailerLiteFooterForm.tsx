"use client";

import { usePathname } from "next/navigation";
import { MailerLiteJoinForm } from "./MailerLiteJoinForm";

/** Full-bleed dark band (same as `home-dark`) + newsletter; home only — Journey uses the form on `/courses`. */
export function MailerLiteFooterForm() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return (
    <div className="home-dark relative w-full border-t border-white/10 py-10 md:py-14 px-4 sm:px-6">
      <div className="max-w-[650px] mx-auto w-full">
        <MailerLiteJoinForm variant="on-dark" />
      </div>
    </div>
  );
}
