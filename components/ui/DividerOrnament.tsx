import { Twinkle } from "./Twinkle";

export function DividerOrnament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto flex w-full max-w-6xl items-center justify-center gap-6 px-4 md:gap-8 md:px-6 lg:px-8 py-10 md:py-12 ${className}`}
      aria-hidden
    >
      <span className="h-px min-w-8 flex-1 bg-[var(--text-muted)]/30" />
      <Twinkle size={100} />
      <span className="h-px min-w-8 flex-1 bg-[var(--text-muted)]/30" />
    </div>
  );
}
