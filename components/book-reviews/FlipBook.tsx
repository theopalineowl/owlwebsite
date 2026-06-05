"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { PortableText } from "@/components/blocks/PortableText";
import type { FlipBookPage } from "@/lib/book-reviews/paginate";

const HTMLFlipBook = dynamic(
  () => import("react-pageflip").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div
        className="flipbook-wrapper flipbook-wrapper--skeleton"
        aria-busy="true"
      >
        <div className="flipbook-skeleton-inner rounded-lg border border-stone-400/40 bg-[#f2e7cf]/90 min-h-[min(70vh,38rem)] w-full max-w-4xl mx-auto animate-pulse" />
      </div>
    ),
  },
);

export type FlipBookProps = {
  header: ReactNode;
  pages: FlipBookPage[];
};

/** Page-flip hides non-active spreads with `display: none` on `.stf__item`. */
function getVisiblePageInners(block: Element | null | undefined): HTMLElement[] {
  if (!block) return [];

  const out: HTMLElement[] = [];

  block.querySelectorAll(".flipbook-page-inner").forEach((node) => {
    const el = node as HTMLElement;
    const item = el.closest(".stf__item");

    if (!item) return;

    const cs = getComputedStyle(item);

    if (cs.display === "none" || cs.visibility === "hidden") return;

    const r = (item as HTMLElement).getBoundingClientRect();

    if (r.width < 2 || r.height < 2) return;

    out.push(el);
  });

  return out;
}

/** Native `input[type=range]` vertical mode is unreliable; custom pointer slider. */
function FlipGutter({
  maxScroll,
  scrollTop,
  onChange,
}: {
  maxScroll: number;
  scrollTop: number;
  onChange: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const scrollTopRef = useRef(scrollTop);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    scrollTopRef.current = scrollTop;
    onChangeRef.current = onChange;
  }, [scrollTop, onChange]);

  useEffect(() => {
    const el = trackRef.current;

    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (maxScroll <= 0) return;

      e.preventDefault();
      e.stopPropagation();

      const cur = scrollTopRef.current;
      const next = Math.min(maxScroll, Math.max(0, cur + e.deltaY));

      onChangeRef.current(next);
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel);
  }, [maxScroll]);

  const pct =
    maxScroll > 0 ? Math.max(0, Math.min(1, scrollTop / maxScroll)) : 0;

  const yToScroll = (clientY: number) => {
    const track = trackRef.current;

    if (!track || maxScroll <= 0) return;

    const rect = track.getBoundingClientRect();
    const y = Math.min(Math.max(clientY, rect.top), rect.bottom);
    const ratio = (y - rect.top) / Math.max(rect.height, 1);

    onChange(Math.round(ratio * maxScroll));
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label="Scroll both pages of the open spread"
      className="flipbook-gutter-track"
      style={
        { "--flipbook-gutter-pct": `${pct * 100}%` } as CSSProperties
      }
      aria-valuemin={0}
      aria-valuemax={maxScroll}
      aria-valuenow={scrollTop}
      aria-orientation="vertical"
      onKeyDown={(e) => {
        if (maxScroll <= 0) return;

        const step = Math.max(1, Math.round(maxScroll / 20));

        if (e.key === "ArrowDown" || e.key === "PageDown") {
          e.preventDefault();
          onChange(Math.min(maxScroll, scrollTop + step));
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          e.preventDefault();
          onChange(Math.max(0, scrollTop - step));
        } else if (e.key === "Home") {
          e.preventDefault();
          onChange(0);
        } else if (e.key === "End") {
          e.preventDefault();
          onChange(maxScroll);
        }
      }}
      onPointerDown={(e) => {
        if (maxScroll <= 0) return;

        e.preventDefault();
        e.stopPropagation();

        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        yToScroll(e.clientY);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;

        e.preventDefault();
        yToScroll(e.clientY);
      }}
      onPointerUp={(e) => {
        if (!dragging.current) return;

        dragging.current = false;

        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {
          // Already released.
        }
      }}
      onPointerCancel={(e) => {
        dragging.current = false;

        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {
          // Ignore.
        }
      }}
    >
      <div className="flipbook-gutter-thumb" aria-hidden />
    </div>
  );
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") return () => {};

      const mq = window.matchMedia(query);

      mq.addEventListener("change", onChange);

      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

type PageFlipApi = {
  getCurrentPageIndex: () => number;
  getPageCount: () => number;
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
  turnToNextPage: () => void;
  turnToPrevPage: () => void;
};

type FlipBookHandle = {
  pageFlip: () => PageFlipApi | undefined;
};

function syncFromRef(
  ref: React.RefObject<FlipBookHandle | null>,
  setPageIdx: (n: number) => void,
  setPageCount: (n: number) => void,
) {
  const api = ref.current?.pageFlip?.();

  if (!api) return;

  setPageIdx(api.getCurrentPageIndex());
  setPageCount(api.getPageCount());
}

const COMPACT_READER_QUERY = "(max-width: 1023px)";

function ReadingHint({ compact }: { compact: boolean }) {
  if (compact) {
    return (
      <p className="text-center text-xs text-[#1a140c]/60">
        Use Previous and Next below to turn pages.
      </p>
    );
  }

  return (
    <p className="text-center text-xs text-[#1a140c]/60">
      Turn pages with the corner curls or the buttons below. On desktop, scroll
      inside the pages or use the center slider when the spread overflows.
    </p>
  );
}

/**
 * Phone + tablet reader. PageFlip uses absolute positioning everywhere, which is
 * incompatible with `height: auto` — that's why expanded pages collapsed.
 * Below 1024px we render a single parchment column instead.
 */
function MobileReader({
  header,
  pages,
  pageIdx,
  pageCount,
  canPrev,
  canNext,
  goPrev,
  goNext,
}: {
  header: ReactNode;
  pages: FlipBookPage[];
  pageIdx: number;
  pageCount: number;
  canPrev: boolean;
  canNext: boolean;
  goPrev: () => void;
  goNext: () => void;
}) {
  const safeIdx = Math.max(0, Math.min(pageIdx, pages.length));
  const isHeader = safeIdx === 0;
  const page = isHeader ? null : pages[safeIdx - 1];

  return (
    <div className="flipbook-mobile">
      <div className="flipbook-mobile-page">
        <div className="flipbook-mobile-page-inner">
          {isHeader ? (
            header
          ) : page?.kind === "text" ? (
            <p className="flipbook-page-text whitespace-pre-wrap text-base leading-relaxed text-[#1a140c]">
              {page.text}
            </p>
          ) : page?.kind === "blocks" && page.blocks.length > 0 ? (
            <div className="flipbook-prose max-w-none text-left text-[#1a140c]">
              <PortableText value={page.blocks} tone="onParchment" />
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 rounded-lg border border-white/15 bg-[#0b1220]/90 px-3 py-2.5 shadow-md backdrop-blur-sm">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          className="inline-flex min-w-0 flex-1 shrink-0 items-center justify-center rounded-lg border border-stone-600/35 bg-stone-900/80 px-3 py-2.5 text-sm font-medium text-amber-100/95 shadow-sm transition enabled:hover:bg-stone-800 enabled:focus-visible:outline enabled:focus-visible:ring-2 enabled:focus-visible:ring-amber-400/50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          Previous
        </button>
        <p
          className="shrink-0 max-w-[40%] text-center text-xs leading-tight tabular-nums text-[var(--text-muted)]"
          aria-live="polite"
        >
          Page {pageCount > 0 ? safeIdx + 1 : 0} of {pageCount}
        </p>
        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          className="inline-flex min-w-0 flex-1 shrink-0 items-center justify-center rounded-lg border border-stone-600/35 bg-stone-900/80 px-3 py-2.5 text-sm font-medium text-amber-100/95 shadow-sm transition enabled:hover:bg-stone-800 enabled:focus-visible:outline enabled:focus-visible:ring-2 enabled:focus-visible:ring-amber-400/50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function restoreWindowScroll(scrollX: number, scrollY: number) {
  requestAnimationFrame(() => {
    window.scrollTo(scrollX, scrollY);

    requestAnimationFrame(() => {
      window.scrollTo(scrollX, scrollY);
    });
  });
}

export function FlipBook({ header, pages }: FlipBookProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<FlipBookHandle | null>(null);
  const scrollLock = useRef(false);

  const isCompactReader = useMediaQuery(COMPACT_READER_QUERY);
  /** Compact reader uses MobileReader; PageFlip gets native scrollbars on desktop. */
  const showPageScrollbar = !isCompactReader;
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const [pageIdx, setPageIdx] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [gutterMax, setGutterMax] = useState(0);
  const [gutterValue, setGutterValue] = useState(0);
  const [bookBox, setBookBox] = useState({ top: 0, height: 0 });

  const flippingTime = reduceMotion ? 1 : 700;

  const measureBookBox = useCallback(() => {
    const wrap = wrapperRef.current;
    const book = wrap?.querySelector(".stf__wrapper") as HTMLElement | null;
    const frame = wrap?.querySelector(
      ".flipbook-book-frame",
    ) as HTMLElement | null;

    if (!wrap || !book || !frame) return;

    const fr = frame.getBoundingClientRect();
    const br = book.getBoundingClientRect();

    const bookTop = br.top - fr.top;
    const bookBottom = br.bottom - fr.top;
    const top = Math.max(0, bookTop);
    const bottom = Math.min(fr.height, bookBottom);
    const height = Math.max(0, bottom - top);

    setBookBox({ top, height });
  }, []);

  const measureGutter = useCallback(() => {
    const block = wrapperRef.current?.querySelector(".stf__block");
    const inners = getVisiblePageInners(block);

    let max = 0;

    for (const el of inners) {
      max = Math.max(max, el.scrollHeight - el.clientHeight);
    }

    setGutterMax(Math.max(0, Math.ceil(max)));
  }, []);

  /**
   * Keep this only for first load/init.
   * Do NOT call this on every page turn, or mobile users lose their scroll position.
   */
  const resetVisibleScroll = useCallback(() => {
    scrollLock.current = true;

    requestAnimationFrame(() => {
      const block = wrapperRef.current?.querySelector(".stf__block");

      block?.querySelectorAll(".flipbook-page-inner").forEach((node) => {
        (node as HTMLElement).scrollTop = 0;
      });

      setGutterValue(0);

      requestAnimationFrame(() => {
        measureGutter();
        scrollLock.current = false;
      });
    });
  }, [measureGutter]);

  const goNext = useCallback(() => {
    if (isCompactReader) {
      setPageIdx((i) => Math.min(i + 1, pages.length));
      return;
    }

    const api = bookRef.current?.pageFlip?.();

    if (!api) return;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    if (reduceMotion) api.turnToNextPage();
    else api.flipNext("top");

    requestAnimationFrame(() => {
      syncFromRef(bookRef, setPageIdx, setPageCount);
      measureGutter();
      restoreWindowScroll(scrollX, scrollY);
    });
  }, [isCompactReader, pages.length, reduceMotion, measureGutter]);

  const goPrev = useCallback(() => {
    if (isCompactReader) {
      setPageIdx((i) => Math.max(i - 1, 0));
      return;
    }

    const api = bookRef.current?.pageFlip?.();

    if (!api) return;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    if (reduceMotion) api.turnToPrevPage();
    else api.flipPrev("top");

    requestAnimationFrame(() => {
      syncFromRef(bookRef, setPageIdx, setPageCount);
      measureGutter();
      restoreWindowScroll(scrollX, scrollY);
    });
  }, [isCompactReader, reduceMotion, measureGutter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  /**
   * StPageFlip uses native listeners on `.stf__block` (touchstart) and `window` (touchmove).
   * Native bubble listeners on `.flipbook-page-inner` run before ancestors reach the block;
   * stopping propagation prevents flip-drag from stealing vertical scroll inside pages.
   */
  useEffect(() => {
    const wrap = wrapperRef.current;

    if (!wrap) return;

    const absorbTouchStart = (e: TouchEvent) => {
      e.stopPropagation();
    };

    const absorbTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
    };

    const bind = () => {
      wrap.querySelectorAll<HTMLElement>(".flipbook-page-inner").forEach((el) => {
        el.removeEventListener("touchstart", absorbTouchStart, false);
        el.addEventListener("touchstart", absorbTouchStart, false);

        el.removeEventListener("touchmove", absorbTouchMove, {
          capture: false,
        });
        el.addEventListener("touchmove", absorbTouchMove, {
          passive: true,
          capture: false,
        });
      });
    };

    bind();

    const mo = new MutationObserver(() => bind());

    mo.observe(wrap, { childList: true, subtree: true });

    return () => {
      mo.disconnect();

      wrap.querySelectorAll<HTMLElement>(".flipbook-page-inner").forEach((el) => {
        el.removeEventListener("touchstart", absorbTouchStart, false);
        el.removeEventListener("touchmove", absorbTouchMove, {
          capture: false,
        });
      });
    };
  }, [pages.length, isCompactReader, pageIdx]);

  useEffect(() => {
    const el = wrapperRef.current;

    if (!el) return;

    const ro = new ResizeObserver(() => {
      measureGutter();
      measureBookBox();
    });

    ro.observe(el);

    const book = el.querySelector(".stf__wrapper");

    if (book) ro.observe(book);

    window.addEventListener("resize", measureBookBox);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureBookBox);
    };
  }, [measureGutter, measureBookBox, pages.length, isCompactReader, pageIdx]);

  /** Trackpad/wheel: scroll the visible spread directly. Bypasses StPageFlip's stacked layers. */
  useEffect(() => {
    if (isCompactReader) return;

    const el = wrapperRef.current?.querySelector(
      ".flipbook-book-frame",
    ) as HTMLElement | null;

    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const block = wrapperRef.current?.querySelector(".stf__block");
      const inners = getVisiblePageInners(block);

      if (inners.length === 0) return;

      const max = Math.max(
        0,
        ...inners.map((i) => i.scrollHeight - i.clientHeight),
      );

      if (max <= 0) return;

      const cur = Math.max(0, ...inners.map((i) => i.scrollTop));

      let deltaY = e.deltaY;

      if (e.deltaMode === 1) deltaY *= 16;
      if (e.deltaMode === 2) deltaY *= window.innerHeight;

      const eps = 1;

      if (deltaY < 0 && cur <= eps) return;
      if (deltaY > 0 && cur >= max - eps) return;

      e.preventDefault();

      const next = Math.min(max, Math.max(0, cur + deltaY));

      scrollLock.current = true;

      for (const inner of inners) {
        const m = Math.max(0, inner.scrollHeight - inner.clientHeight);
        inner.scrollTop = Math.min(next, m);
      }

      setGutterValue(next);

      requestAnimationFrame(() => {
        scrollLock.current = false;
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel as EventListener);
  }, [pages.length, isCompactReader, pageIdx]);

  const onFlip = useCallback(
    (e: { data?: unknown }) => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      const d = e?.data;

      if (typeof d === "number") setPageIdx(d);
      else syncFromRef(bookRef, setPageIdx, setPageCount);

      /**
       * Do not call resetVisibleScroll() here.
       * That was the cause of the page content jumping back to the top.
       */
      requestAnimationFrame(() => {
        measureGutter();
        restoreWindowScroll(scrollX, scrollY);
      });
    },
    [measureGutter],
  );

  const onInit = useCallback(
    (e: { data?: { page?: number } }) => {
      const p = e?.data?.page;

      if (typeof p === "number") setPageIdx(p);

      requestAnimationFrame(() => {
        syncFromRef(bookRef, setPageIdx, setPageCount);
        resetVisibleScroll();
      });
    },
    [resetVisibleScroll],
  );

  const handleInnerScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (scrollLock.current) return;

      const source = e.currentTarget;

      scrollLock.current = true;

      const v = source.scrollTop;
      const block = source.closest(".stf__block");
      const inners = getVisiblePageInners(block);

      for (const el of inners) {
        if (el === source) continue;

        const max = Math.max(0, el.scrollHeight - el.clientHeight);

        el.scrollTop = Math.min(v, max);
      }

      setGutterValue(v);

      requestAnimationFrame(() => {
        scrollLock.current = false;
      });
    },
    [],
  );

  const onGutterScrollChange = useCallback((v: number) => {
    scrollLock.current = true;

    const block = wrapperRef.current?.querySelector(".stf__block");
    const inners = getVisiblePageInners(block);

    let display = 0;

    for (const el of inners) {
      const max = Math.max(0, el.scrollHeight - el.clientHeight);

      el.scrollTop = Math.min(Math.max(0, v), max);
      display = Math.max(display, el.scrollTop);
    }

    setGutterValue(display);

    requestAnimationFrame(() => {
      scrollLock.current = false;
    });
  }, []);

  const headerWithHint = (
    <>
      {header}
      <ReadingHint compact={isCompactReader} />
    </>
  );

  /** On compact reader pageCount comes from props (header + pages); desktop is reported by PageFlip. */
  const effectivePageCount = isCompactReader ? pages.length + 1 : pageCount;
  const safePageIdx = Math.max(0, Math.min(pageIdx, Math.max(0, effectivePageCount - 1)));
  const canPrev = safePageIdx > 0;
  const canNext = effectivePageCount > 0 && safePageIdx < effectivePageCount - 1;

  const showGutter = !isCompactReader && gutterMax > 0;
  const gutterSliderValue = Math.min(gutterValue, gutterMax);

  const flipProps = {
    startPage: 0,
    size: "stretch" as const,
    width: 380,
    height: 535,
    minWidth: 220,
    maxWidth: 480,
    minHeight: 320,
    maxHeight: 670,
    drawShadow: true,
    flippingTime,
    usePortrait: isCompactReader,
    startZIndex: 0,
    autoSize: true,
    maxShadowOpacity: 0.45,
    showCover: false,

    mobileScrollSupport: true,

    clickEventForward: true,
    useMouseEvents: true,
    swipeDistance: 30,
    showPageCorners: !reduceMotion,

    /** Avoids page-turn on mouseup after using a scrollbar/native trackpad. */
    disableFlipByClick: true,

    onFlip,
    onInit,
  };

  if (isCompactReader) {
    return (
      <div ref={wrapperRef} className="flipbook-wrapper mx-auto w-full max-w-5xl">
        <MobileReader
          header={headerWithHint}
          pages={pages}
          pageIdx={safePageIdx}
          pageCount={effectivePageCount}
          canPrev={canPrev}
          canNext={canNext}
          goPrev={goPrev}
          goNext={goNext}
        />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="flipbook-wrapper mx-auto w-full max-w-5xl">
      {/* Frame height = book only so the gutter does not extend over Prev/Next. */}
      <div className="flipbook-book-frame relative w-full">
        {showGutter && bookBox.height > 0 ? (
          <div
            className="pointer-events-none absolute left-0 right-0 z-[40]"
            style={{
              top: `${bookBox.top}px`,
              height: `${bookBox.height}px`,
            }}
            aria-hidden={false}
          >
            {/* Taller center strip so trackpad/iPad users can grab it reliably. */}
            <div className="pointer-events-auto absolute left-1/2 top-[20%] z-[40] flex h-3/5 w-4 -translate-x-1/2 items-stretch justify-center">
              <FlipGutter
                maxScroll={gutterMax}
                scrollTop={gutterSliderValue}
                onChange={onGutterScrollChange}
              />
            </div>
          </div>
        ) : null}

        <HTMLFlipBook
          ref={bookRef}
          className="flipbook-stf relative z-[1]"
          style={{ width: "100%" }}
          {...flipProps}
        >
          <div key="flip-header" className="flipbook-page" data-density="soft">
            <div
              className={`flipbook-page-inner${showPageScrollbar ? " flipbook-page-inner--scrollbar" : ""}`}
              onScroll={handleInnerScroll}
            >
              {headerWithHint}
            </div>
          </div>

          {pages.map((p, i) => (
            <div key={`flip-${i}`} className="flipbook-page" data-density="soft">
              <div
                className={`flipbook-page-inner${showPageScrollbar ? " flipbook-page-inner--scrollbar" : ""}`}
                onScroll={handleInnerScroll}
              >
                {p.kind === "text" ? (
                  <p className="flipbook-page-text whitespace-pre-wrap text-base leading-relaxed text-[#1a140c] sm:text-lg">
                    {p.text}
                  </p>
                ) : p.blocks.length > 0 ? (
                  <div className="flipbook-prose max-w-none text-left text-[#1a140c]">
                    <PortableText value={p.blocks} tone="onParchment" />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          className="inline-flex min-w-[7rem] items-center justify-center rounded-lg border border-stone-600/35 bg-stone-900/80 px-4 py-2 text-sm font-medium text-amber-100/95 shadow-sm transition enabled:hover:bg-stone-800 enabled:focus-visible:outline enabled:focus-visible:ring-2 enabled:focus-visible:ring-amber-400/50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          Previous
        </button>

        <p
          className="text-sm tabular-nums text-[var(--text-muted)]"
          aria-live="polite"
        >
          Page {effectivePageCount > 0 ? safePageIdx + 1 : 0} of {effectivePageCount}
        </p>

        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          className="inline-flex min-w-[7rem] items-center justify-center rounded-lg border border-stone-600/35 bg-stone-900/80 px-4 py-2 text-sm font-medium text-amber-100/95 shadow-sm transition enabled:hover:bg-stone-800 enabled:focus-visible:outline enabled:focus-visible:ring-2 enabled:focus-visible:ring-amber-400/50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}