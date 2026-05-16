"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
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
  // The scale/opacity/radius/shadow transforms are gated: large screen only,
  // and never when the visitor has asked for reduced motion.
  const stackingEnabled = isLargeScreen && !prefersReducedMotion;

  // Tracker A — this card RECEDING as the next card scrolls over it.
  //   0 = the card's top edge meets the viewport top (it just became sticky)
  //   1 = the card's bottom edge meets the viewport top (next card covers it)
  const { scrollYProgress: recedeProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Tracker B — this card RISING up onto the stack from below.
  //   0 = the card's top edge sits at the viewport bottom (still fully below)
  //   1 = the card's top edge reaches the viewport top (fully risen / sticky)
  const { scrollYProgress: riseProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // Bottom-card "settle" as the next card slides over it.
  const scale = useTransform(recedeProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(recedeProgress, [0, 1], [1, 0.6]);
  const borderRadius = useTransform(recedeProgress, [0, 1], [0, 24]);

  // Depth: the shadow this card casts onto the section it is covering.
  // It ramps up while the card slides in, peaks as it overlaps, then eases
  // back to a lighter resting elevation once the card is locked in place.
  const shadowAlpha = useTransform(riseProgress, [0, 0.9, 1], [0, 0.32, 0.22]);
  // Negative Y offset → the shadow falls on the top edge, over the card below.
  const boxShadow = useMotionTemplate`0px -28px 60px -18px rgba(10, 8, 14, ${shadowAlpha})`;

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
                boxShadow,
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
