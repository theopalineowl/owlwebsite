type ResourceDownloadButtonProps = {
  href: string;
  label?: string;
};

export function ResourceDownloadButton({
  href,
  label = "Download PDF",
}: ResourceDownloadButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full px-10 py-3.5 text-base sm:text-lg font-semibold text-white bg-gradient-to-b from-violet-500 to-violet-700 shadow-[0_0_24px_rgba(126,58,237,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(126,58,237,0.5)]"
    >
      {label}
      <span aria-hidden>↓</span>
    </a>
  );
}
