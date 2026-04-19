import Image from "next/image";

export type TarotPillar = {
  title: string;
  description: string;
  iconSrc: string;
  index: number;
  /** Optional photo shown below the description (inside the card face). */
  photoSrc?: string;
};

export function TarotPillarCard({
  title,
  description,
  iconSrc,
  index,
  photoSrc,
}: TarotPillar) {
  return (
    <div
      className="about-tarot-card group relative flex h-full min-h-[28rem] w-full max-w-sm flex-col rounded-xl border border-amber-200/18 bg-gradient-to-b from-[#1c1424]/96 via-[#15101c]/98 to-[#0a0710] p-5 shadow-[inset_0_1px_0_rgba(251,191,36,0.07)] transition-transform duration-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-[30rem] sm:p-6 md:max-w-none md:mx-0 md:hover:-translate-y-1"
      style={{
        animationDelay: `${index * 0.45}s`,
      }}
    >
      <div className="mx-auto mb-3 flex h-12 w-12 shrink-0 items-center justify-center sm:mb-4 sm:h-14 sm:w-14">
        <Image
          src={iconSrc}
          alt=""
          width={64}
          height={64}
          className="about-icon-gold h-11 w-11 object-contain sm:h-14 sm:w-14"
        />
      </div>
      <h3 className="font-[var(--font-display)] text-center text-base font-semibold leading-snug tracking-tight text-amber-50 [text-shadow:0_1px_12px_rgba(0,0,0,0.65)] sm:text-lg">
        {title}
      </h3>
      <div className="mx-auto mt-2 h-px w-12 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent sm:mt-3 sm:w-14" />
      <p className="mt-3 shrink-0 text-center font-[var(--font-body)] text-sm leading-relaxed text-violet-100/93 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] sm:mt-4 sm:text-[0.95rem]">
        {description}
      </p>
      {photoSrc ? (
        <div className="relative mt-4 min-h-[11rem] w-full flex-1 overflow-hidden rounded-lg ring-1 ring-violet-300/15 sm:mt-5 sm:min-h-[13rem] md:min-h-[15rem]">
          <Image
            src={photoSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover object-center"
            priority={index === 0}
          />
        </div>
      ) : null}
    </div>
  );
}
