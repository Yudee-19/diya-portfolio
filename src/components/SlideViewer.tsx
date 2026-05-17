"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideViewerProps {
  /** Cloudinary public IDs, one per slide. Use this OR `pdf`. */
  slides?: string[];
  /** A single multi-page PDF on Cloudinary, one page per slide. */
  pdf?: { publicId: string; pages: number };
  /** Used for alt text and labelling. */
  title: string;
  /** Where the fixed back link points. */
  backHref: string;
}

interface SlideItem {
  src: string;
  rawTransformations?: string[];
}

const RIBBON_HEIGHT = 152; // px — handle (32) + thumbnail row (120)
const HANDLE_HEIGHT = 32;

/**
 * A lightweight, paginated slide/PDF viewer — one full page on screen at a
 * time. Unlike the scroll-stacking layout, only the current page (plus the
 * one animating out) is mounted, so it stays smooth for long documents.
 *
 * Navigation: ← ↑ PageUp / Backspace (previous), → ↓ PageDown / Space / Enter
 * (next), Home / End (first / last), the on-screen arrows, or the thumbnail
 * ribbon that slides up from the bottom edge on hover.
 */
export function SlideViewer({ slides, pdf, title, backHref }: SlideViewerProps) {
  const items: SlideItem[] = useMemo(
    () =>
      pdf
        ? Array.from({ length: pdf.pages }, (_, i) => ({
            src: pdf.publicId,
            rawTransformations: [`pg_${i + 1}`],
          }))
        : (slides ?? []).map((src) => ({ src })),
    [pdf, slides],
  );
  const count = items.length;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ribbonOpen, setRibbonOpen] = useState(false);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  // Relative move (keyboard / arrows) — stable, so the key listener binds once.
  const step = useCallback(
    (delta: number) => {
      setDirection(delta >= 0 ? 1 : -1);
      setCurrent((prev) => Math.min(count - 1, Math.max(0, prev + delta)));
    },
    [count],
  );

  // Absolute jump (thumbnail ribbon).
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.min(count - 1, Math.max(0, index));
      setDirection(clamped >= current ? 1 : -1);
      setCurrent(clamped);
    },
    [count, current],
  );

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      const onControl = tag === "BUTTON" || tag === "A";
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          step(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          step(-1);
          break;
        case " ":
        case "Enter":
          if (onControl) break; // let a focused button/link activate normally
          e.preventDefault();
          step(1);
          break;
        case "Home":
          e.preventDefault();
          step(-count);
          break;
        case "End":
          e.preventDefault();
          step(count);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, count]);

  // Warm the neighbouring pages so flipping is instant (Cloudinary caches the
  // rasterised PDF page on first request).
  useEffect(() => {
    for (const i of [current - 1, current + 1]) {
      if (i < 0 || i >= count) continue;
      const img = new window.Image();
      img.src = getCldImageUrl({
        src: items[i].src,
        rawTransformations: items[i].rawTransformations,
      });
    }
  }, [current, count, items]);

  // Keep the active thumbnail in view within the ribbon.
  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [current]);

  if (count === 0) return null;

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 48 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -48 }),
  };

  const pill =
    "rounded-full bg-white/85 shadow-sm ring-1 ring-black/10 backdrop-blur transition-colors";

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-neutral-100">
      {/* Current page */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 lg:p-12"
        >
          <div className="relative h-full w-full">
            <CldImage
              src={items[current].src}
              rawTransformations={items[current].rawTransformations}
              alt={`${title} — page ${current + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Back link */}
      <Link
        href={backHref}
        className={`fixed left-4 top-4 z-50 px-3.5 py-1.5 font-sans text-sm tracking-wide text-gray-600 hover:text-black md:left-6 md:top-6 ${pill}`}
      >
        ← Back
      </Link>

      {/* Page counter */}
      <div
        className={`fixed right-4 top-4 z-50 px-3.5 py-1.5 font-sans text-sm tabular-nums text-gray-600 md:right-6 md:top-6 ${pill}`}
      >
        {current + 1} / {count}
      </div>

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={current === 0}
        aria-label="Previous page"
        className={`fixed left-2 top-1/2 z-50 -translate-y-1/2 p-2 text-gray-700 hover:text-black disabled:pointer-events-none disabled:opacity-25 sm:left-4 ${pill}`}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={current === count - 1}
        aria-label="Next page"
        className={`fixed right-2 top-1/2 z-50 -translate-y-1/2 p-2 text-gray-700 hover:text-black disabled:pointer-events-none disabled:opacity-25 sm:right-4 ${pill}`}
      >
        <ChevronRight size={22} />
      </button>

      {/* Thumbnail ribbon — peeks at the bottom, slides up on hover */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-50 select-none"
        style={{ height: RIBBON_HEIGHT }}
        initial={false}
        animate={{ y: ribbonOpen ? 0 : RIBBON_HEIGHT - HANDLE_HEIGHT }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseEnter={() => setRibbonOpen(true)}
        onMouseLeave={() => setRibbonOpen(false)}
      >
        {/* Handle (also tap-toggles on touch devices) */}
        <button
          type="button"
          onClick={() => setRibbonOpen((open) => !open)}
          className="flex h-8 w-full items-center justify-center gap-1.5 border-t border-black/10 bg-white/95 text-[0.6rem] uppercase tracking-[0.25em] text-gray-500 backdrop-blur"
        >
          <span className="text-[0.5rem]">{ribbonOpen ? "▼" : "▲"}</span> Pages
        </button>

        {/* Thumbnails */}
        <div className="flex h-[120px] items-center gap-2 overflow-x-auto bg-white/95 px-4 backdrop-blur">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              ref={i === current ? activeThumbRef : undefined}
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === current}
              className={`relative h-[92px] shrink-0 overflow-hidden rounded-sm bg-white transition ${
                i === current
                  ? "ring-2 ring-black"
                  : "ring-1 ring-black/10 hover:ring-black/40"
              }`}
            >
              <CldImage
                src={item.src}
                rawTransformations={item.rawTransformations}
                alt=""
                width={150}
                height={106}
                className="h-full w-auto object-contain"
              />
              <span className="absolute bottom-0 right-0 bg-black/65 px-1 text-[0.55rem] leading-tight text-white">
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
