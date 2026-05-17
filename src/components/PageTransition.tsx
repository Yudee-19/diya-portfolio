"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

/** Curtain image — drop the file at `public/transition.png`. */
const CURTAIN_IMAGE = "/transition.png";

/**
 * Full-screen "curtain" page transition.
 *
 * An internal link click is intercepted → the two halves slide in from the
 * top and bottom edges and meet at the centre, covering the screen → the route
 * changes → once `usePathname()` reports the new route, the halves slide back
 * out, revealing the page.
 *
 * The reveal is keyed off `usePathname()` (not a `template.tsx` re-mount)
 * because the pathname updates on *every* navigation — including parent ↔
 * nested-child — whereas the root template does not reliably re-mount there.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // covered: the two halves have met and the screen is covered.
  const [covered, setCovered] = useState(false);
  // active: a transition is mid-flight — the curtain layer blocks clicks.
  const [active, setActive] = useState(false);
  const pendingHref = useRef<string | null>(null);

  // Reveal: the route has changed → the new page is mounting → retract the
  // curtain. Also runs harmlessly on first load (curtain is already open).
  useEffect(() => {
    setCovered(false);
  }, [pathname]);

  // Intercept internal link clicks. Capture phase, so this runs before Next's
  // <Link> handler — calling preventDefault() then makes <Link> bail, and we
  // drive the navigation ourselves once the curtain has closed.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      // Skip external links / mailto, and same-page (hash / scroll) links.
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      pendingHref.current = url.pathname + url.search + url.hash;
      setActive(true);
      setCovered(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const handleAnimationComplete = () => {
    if (covered && pendingHref.current) {
      // Curtain fully closed → navigate. The pathname change then reveals it.
      const href = pendingHref.current;
      pendingHref.current = null;
      router.push(href);
    } else if (!covered) {
      // Curtain fully retracted → transition finished.
      setActive(false);
    }
  };

  const slide = {
    duration: prefersReducedMotion ? 0 : 0.55,
    ease: [0.83, 0, 0.17, 1] as const,
  };

  const halfStyle = {
    backgroundColor: "#222220", // fallback wipe colour if the image is missing
    backgroundImage: `url(${CURTAIN_IMAGE})`,
    backgroundSize: "100% 200%", // image spans the full viewport (100vw × 100vh)
    backgroundRepeat: "no-repeat",
  } as const;

  return (
    <>
      {children}

      {/* Curtain — two halves that meet at the centre */}
      <div
        aria-hidden
        className="fixed inset-0 z-[9999]"
        style={{ pointerEvents: active ? "auto" : "none" }}
      >
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 bg-top"
          style={halfStyle}
          initial={{ y: "-100%" }}
          animate={{ y: covered ? "0%" : "-100%" }}
          transition={slide}
          onAnimationComplete={handleAnimationComplete}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-bottom"
          style={halfStyle}
          initial={{ y: "100%" }}
          animate={{ y: covered ? "0%" : "100%" }}
          transition={slide}
        />
      </div>
    </>
  );
}
