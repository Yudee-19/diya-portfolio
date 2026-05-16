"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";

interface StackingSectionProps {
  children: ReactNode;
  /** 0-based position in the stack — a higher index renders on top (z-index). */
  index: number;
  /** Total number of stacked sections on the page. */
  total: number;
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
  total,
  className = "",
}: StackingSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isLargeScreen = useIsLargeScreen();

  // Sticky positioning is pure CSS (`lg:sticky`) and works without JS.
  // The scale/opacity/radius/shadow/blur transforms are gated: large screen
  // only, and never when the visitor has asked for reduced motion.
  const stackingEnabled = isLargeScreen && !prefersReducedMotion;

  // Whole-page scroll progress (0 → 1), read from the document.
  //
  // This is deliberately NOT a `useScroll({ target })` on the section: once a
  // `position: sticky` element pins, its measured rect freezes, so a
  // target-based progress would stall the moment the card sticks.
  const { scrollYProgress } = useScroll();

  // With `total` equal-height (100svh) sections, the page scrolls `total - 1`
  // viewports. Each section owns one `span` of that 0 → 1 progress range.
  //
  // IMPORTANT: every range below must stay within [0, 1]. Motion can promote
  // scroll-linked transforms to native scroll-driven animations, where the
  // input range becomes WAAPI keyframe offsets — and offsets outside [0, 1]
  // throw. The first section never rises and the last never recedes, so those
  // edge cases use an inert [0, 1] range with a constant output instead.
  const span = total > 1 ? 1 / (total - 1) : 1;
  const canRecede = index < total - 1; // last card stays put — nothing covers it
  const canRise = index > 0; //           first card is on top from the start

  const recedeRange: [number, number] = canRecede
    ? [index * span, (index + 1) * span]
    : [0, 1];

  // RECEDING — the card settles back as the next one slides over it.
  const scale = useTransform(scrollYProgress, recedeRange, canRecede ? [1, 0.92] : [1, 1]);
  const opacity = useTransform(scrollYProgress, recedeRange, canRecede ? [1, 0.6] : [1, 1]);
  const borderRadius = useTransform(scrollYProgress, recedeRange, canRecede ? [0, 24] : [0, 0]);

  // Depth-of-field: the card drifts out of focus as it recedes behind the stack.
  const blurPx = useTransform(scrollYProgress, recedeRange, canRecede ? [0, 6] : [0, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  // RISING — the shadow this card casts onto the section it is covering.
  // Ramps up while the card slides in, peaks as it overlaps, then eases back
  // to a lighter resting elevation once the card is locked in place.
  const riseRange: [number, number, number] = canRise
    ? [(index - 1) * span, (index - 1) * span + span * 0.9, index * span]
    : [0, 0.5, 1];
  const shadowAlpha = useTransform(
    scrollYProgress,
    riseRange,
    canRise ? [0, 0.32, 0.22] : [0, 0, 0],
  );
  // Negative Y offset → the shadow falls on the top edge, over the card below.
  const boxShadow = useMotionTemplate`0px -28px 60px -18px rgba(10, 8, 14, ${shadowAlpha})`;

  return (
    <div
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
                filter,
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
