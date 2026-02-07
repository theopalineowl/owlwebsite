import { Twinkle } from "./Twinkle";

export function DividerOrnament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 py-8 ${className}`}
      aria-hidden
    >
      <span className="h-px w-12 bg-[var(--text-muted)]/30" />
      <Twinkle size={20} variant="divider" />
      <span className="h-px w-12 bg-[var(--text-muted)]/30" />
    </div>
  );
}
