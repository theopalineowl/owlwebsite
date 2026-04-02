import { Twinkle } from "@/components/ui/Twinkle";

export function CelestialDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto flex w-full max-w-6xl items-center gap-5 px-4 md:gap-6 md:px-6 lg:px-8 py-10 md:py-12 ${className}`}
      role="separator"
      aria-hidden
    >
      <div className="h-px min-w-8 flex-1 bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
      <Twinkle
        size={36}
        className="shrink-0 drop-shadow-[0_0_14px_rgba(232,245,243,0.35)]"
      />
      <div className="h-px min-w-8 flex-1 bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
    </div>
  );
}
