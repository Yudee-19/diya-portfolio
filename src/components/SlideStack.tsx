"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { StackingSection } from "@/components/StackingSection";

interface SlideStackProps {
  /** Ordered Cloudinary public IDs of the slides. */
  slides: string[];
  /** Used for each slide's alt text, e.g. "Fashion Marketing — slide 3". */
  title: string;
  /** Where the fixed back link points. */
  backHref: string;
}

/**
 * Renders a sequence of Cloudinary-hosted images as full-viewport sections,
 * each wrapped in a StackingSection so they pin and stack on scroll (lg and
 * up). CldImage auto-serves the best format/quality from Cloudinary's CDN;
 * the slide's white background blends into the section, so `object-contain`
 * shows the whole slide with no visible letterbox.
 */
export function SlideStack({ slides, title, backHref }: SlideStackProps) {
  return (
    <div className="w-full bg-white">
      {/* Back link — fixed so it stays reachable through the whole stack */}
      <Link
        href={backHref}
        className="fixed left-4 top-4 z-50 rounded-full bg-white/85 px-3.5 py-1.5 font-sans text-sm tracking-wide text-gray-600 shadow-sm ring-1 ring-black/10 backdrop-blur transition-colors hover:text-black md:left-6 md:top-6"
      >
        ← Back
      </Link>

      {slides.map((id, i) => (
        <StackingSection key={id} index={i} total={slides.length}>
          <div className="relative h-[100svh] w-full bg-white">
            <CldImage
              src={id}
              alt={`${title} — slide ${i + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority={i === 0}
            />
          </div>
        </StackingSection>
      ))}
    </div>
  );
}
