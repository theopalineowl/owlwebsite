import { Twinkle } from "./Twinkle";

export function DividerOrnament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto flex w-full max-w-6xl items-center justify-center gap-4 px-4 md:gap-6 md:px-6 lg:px-8 py-4 md:py-5 ${className}`}
      aria-hidden
    >
      <span className="flex min-w-8 flex-1 items-center">
        <span className="divider-line-shimmer block" />
      </span>
      <span className="divider-twinkle-wrap inline-flex shrink-0">
        <Twinkle size={72} />
      </span>
      <span className="flex min-w-8 flex-1 items-center">
        <span className="divider-line-shimmer block" />
      </span>
    </div>
  );
}
