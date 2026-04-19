import type { PortableTextBlock } from "@portabletext/types";

/** Flatten portable text blocks to a single plain string for previews. */
export function portableTextToPlain(
  blocks: PortableTextBlock[] | undefined
): string {
  if (!blocks?.length) return "";
  const parts: string[] = [];
  for (const block of blocks) {
    const b = block as {
      _type?: string;
      children?: Array<{ text?: string }>;
    };
    if (b._type === "block" && Array.isArray(b.children)) {
      for (const c of b.children) {
        if (typeof c?.text === "string") parts.push(c.text);
      }
      parts.push(" ");
    }
  }
  return parts.join("").replace(/\s+/g, " ").trim();
}

const MAX_FALLBACK_CHARS = 280;

/**
 * First up to `sentenceCount` sentences (split on . ? ! followed by whitespace).
 * If there are not enough clear sentence breaks, uses a soft character cap.
 */
export function firstSentencesTease(
  text: string,
  sentenceCount = 3
): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return "";

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length >= 2) {
    return sentences.slice(0, sentenceCount).join(" ");
  }

  if (normalized.length <= MAX_FALLBACK_CHARS) return normalized;

  const cut = normalized.slice(0, MAX_FALLBACK_CHARS);
  const lastSpace = cut.lastIndexOf(" ");
  const end = lastSpace > 200 ? lastSpace : MAX_FALLBACK_CHARS;
  return `${cut.slice(0, end).trim()}…`;
}

export function listTeaseFromBody(
  plainBody: string | undefined,
  portableBody: PortableTextBlock[] | undefined,
  excerptFallback?: string
): string | undefined {
  const fromPlain = plainBody?.trim()
    ? firstSentencesTease(plainBody)
    : "";
  if (fromPlain) return fromPlain;

  const fromPortable = portableTextToPlain(portableBody);
  if (fromPortable) return firstSentencesTease(fromPortable);

  const ex = excerptFallback?.trim();
  return ex || undefined;
}
