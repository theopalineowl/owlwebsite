import Image from "next/image";

export type TarotPillar = {
  title: string;
  description: string;
  iconSrc: string;
  index: number;
};

export function TarotPillarCard({ title, description, iconSrc, index }: TarotPillar) {
  return (
    <div
      className="about-tarot-card group relative flex aspect-[3/4] max-w-sm mx-auto w-full flex-col overflow-hidden rounded-sm transition-transform duration-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:hover:-translate-y-1"
      style={{
        animationDelay: `${index * 0.45}s`,
      }}
    >
      {/* Ornate frame layer */}
      <div
        className="absolute inset-0 bg-[url('/images/Tarot%20Card%20copy.svg')] bg-contain bg-center bg-no-repeat opacity-[0.92]"
        aria-hidden
      />
      {/* Inner face — inset so Tarot frame art stays visible */}
      <div className="relative z-[1] mx-[10%] mt-[22%] flex min-h-0 flex-1 flex-col items-center rounded-sm bg-gradient-to-b from-[#1c1424]/85 via-[#15101c]/90 to-[#0f0a14]/85 px-3 pb-6 pt-5 shadow-[inset_0_1px_0_rgba(251,191,36,0.08)] sm:mx-[11%] sm:mt-[24%] sm:px-4 sm:pt-6">
        <div className="mb-3 flex h-12 w-12 items-center justify-center sm:mb-4 sm:h-14 sm:w-14">
          <Image
            src={iconSrc}
            alt=""
            width={64}
            height={64}
            className="about-icon-gold h-11 w-11 object-contain sm:h-14 sm:w-14"
          />
        </div>
        <h3 className="font-[var(--font-display)] text-center text-[0.95rem] font-semibold leading-snug tracking-tight text-amber-50 [text-shadow:0_1px_12px_rgba(0,0,0,0.65)] sm:text-lg">
          {title}
        </h3>
        <div className="mx-auto mt-2 h-px w-10 bg-gradient-to-r from-transparent via-amber-400/45 to-transparent sm:mt-3 sm:w-12" />
        <p className="mt-3 text-center font-[var(--font-body)] text-[0.8rem] leading-relaxed text-violet-100/92 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
