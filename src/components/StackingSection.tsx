"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

interface StackingSectionProps {
  children: ReactNode;
  /** 0, 1, 2 … — a higher index renders on top of lower ones (z-index). */
  index: number;
  className?: string;
}

/**
 * Reports whether the viewport is at the `lg` breakpoint (>= 1024px) or wider.
 *
 * The stacking effect needs every section to be exactly one viewport tall.
 * That is only true at `lg`: the Hero is always 100svh, Key Projects is 100svh
 * from `md`, but ResumeSection only becomes 100svh at `lg` (`lg:h-[100svh]`).
 * Below `lg`, Resume/Projects are taller than the viewport, and a sticky
 * element taller than the viewport pins and clips its lower content — so the
 * stack is restricted to `lg` and up, where it actually behaves correctly.
 */
function useIsLargeScreen(): boolean {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLarge(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  return isLarge;
}

export function StackingSection({
  children,
  index,
  className = "",
}: StackingSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isLargeScreen = useIsLargeScreen();

  // Sticky positioning is pure CSS (`lg:sticky`) and works without JS.
  // The scale/opacity/radius transforms are gated: large screen only, and
  // never when the visitor has asked for reduced motion.
  const stackingEnabled = isLargeScreen && !prefersReducedMotion;

  // scrollYProgress maps 0 → 1 as this section is scrolled past:
  //   0 = the section's top edge meets the viewport top (it just became sticky)
  //   1 = the section's bottom edge meets the viewport top (next card covers it)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Bottom-card "settle" as the next card slides over it.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <div
      ref={ref}
      className={`lg:sticky lg:top-0 min-h-[100svh] ${className}`}
      style={{ zIndex: index }}
    >
      <motion.div
        className="min-h-[100svh] overflow-hidden bg-white"
        style={
          stackingEnabled
            ? {
                scale,
                opacity,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
                // Scale anchors from the top, so the card "settles" downward.
                transformOrigin: "center top",
                // GPU hint — wrapper only, never the children.
                willChange: "transform",
              }
            : undefined
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
