import type { PortableTextBlock } from "@portabletext/types";

export type FlipBookPage =
  | { kind: "text"; text: string }
  | { kind: "blocks"; blocks: PortableTextBlock[] };

const DEFAULT_WORDS = 100;

export function countWords(text: string): number {
  const m = text.trim().match(/\S+/g);
  return m ? m.length : 0;
}

/** Walk Portable Text-ish JSON for plain text (spans, nested children). */
export function walkPortablePlainText(node: unknown): string {
  if (node === null || node === undefined) return "";
  if (typeof node === "string") return node;
  if (typeof node !== "object") return "";
  const o = node as Record<string, unknown>;
  if (typeof o.text === "string") return o.text;
  if (Array.isArray(o.children)) {
    return o.children.map(walkPortablePlainText).join("");
  }
  return "";
}

export function blockWordCount(block: PortableTextBlock): number {
  return countWords(walkPortablePlainText(block));
}

/** Split so `head` has at most `n` words; both sides trim. */
function takeFirstNWords(text: string, n: number): [head: string, tail: string] {
  if (n <= 0) return ["", text.trim()];
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= n) return [words.join(" "), ""];
  return [words.slice(0, n).join(" "), words.slice(n).join(" ")];
}

function paginatePlainText(text: string, maxWords: number): FlipBookPage[] {
  const paras = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const pages: FlipBookPage[] = [];
  let currentParas: string[] = [];
  let currentCount = 0;

  const flush = () => {
    if (currentParas.length > 0) {
      pages.push({ kind: "text", text: currentParas.join("\n\n") });
      currentParas = [];
      currentCount = 0;
    }
  };

  /** Fill the current page up to `maxWords`, splitting paragraphs mid-stream when needed. */
  const addParagraphFlow = (para: string) => {
    let rest = para.trim();
    if (!rest) return;
    while (rest) {
      const room = maxWords - currentCount;
      if (room <= 0) {
        flush();
        continue;
      }
      const wc = countWords(rest);
      if (wc <= room) {
        currentParas.push(rest);
        currentCount += wc;
        rest = "";
      } else {
        const [head, tail] = takeFirstNWords(rest, room);
        if (head) {
          currentParas.push(head);
          currentCount += countWords(head);
        }
        flush();
        rest = tail;
      }
    }
  };

  for (const para of paras) {
    addParagraphFlow(para);
  }
  flush();
  return pages.length > 0 ? pages : [{ kind: "text", text: "" }];
}

function newBlockKey(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function cloneBlockWithText(
  template: PortableTextBlock,
  text: string,
): PortableTextBlock {
  if (template._type !== "block") {
    return { ...template, _key: newBlockKey("pt") } as PortableTextBlock;
  }
  return {
    ...template,
    _key: newBlockKey((template as { _key?: string })._key ?? "blk"),
    children: [
      {
        _type: "span",
        _key: newBlockKey("span"),
        text,
        marks: [],
      },
    ],
    markDefs: [],
  } as PortableTextBlock;
}

function paginatePortableBlocks(
  blocks: PortableTextBlock[],
  maxWords: number,
): FlipBookPage[] {
  const pages: FlipBookPage[] = [];
  let current: PortableTextBlock[] = [];
  let currentCount = 0;

  const flush = () => {
    if (current.length > 0) {
      pages.push({ kind: "blocks", blocks: current });
      current = [];
      currentCount = 0;
    }
  };

  const addBlockFlow = (b: PortableTextBlock) => {
    let remainder: PortableTextBlock | null = b;
    while (remainder !== null) {
      const room = maxWords - currentCount;
      if (room <= 0) {
        flush();
        continue;
      }
      const w = blockWordCount(remainder);
      if (w === 0) {
        current.push(remainder);
        remainder = null;
        continue;
      }
      if (w <= room) {
        current.push(remainder);
        currentCount += w;
        remainder = null;
        continue;
      }
      if (remainder._type === "block") {
        const full = walkPortablePlainText(remainder).trim();
        const [head, tail] = takeFirstNWords(full, room);
        if (head) {
          current.push(cloneBlockWithText(remainder, head));
          currentCount += countWords(head);
        }
        flush();
        remainder = tail ? cloneBlockWithText(remainder, tail) : null;
      } else {
        if (current.length > 0) flush();
        current.push(remainder);
        currentCount += w;
        remainder = null;
      }
    }
  };

  for (const b of blocks) {
    addBlockFlow(b);
  }
  flush();
  return pages.length > 0 ? pages : [{ kind: "blocks", blocks: [] }];
}

export function paginateReviewContent(
  input: string | PortableTextBlock[] | undefined,
  wordsPerPage: number = DEFAULT_WORDS,
): FlipBookPage[] {
  if (input === undefined || input === null) {
    return [{ kind: "text", text: "" }];
  }
  if (typeof input === "string") {
    return paginatePlainText(input, wordsPerPage);
  }
  if (!Array.isArray(input) || input.length === 0) {
    return [{ kind: "blocks", blocks: [] }];
  }
  return paginatePortableBlocks(input, wordsPerPage);
}
