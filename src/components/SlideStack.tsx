"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { StackingSection } from "@/components/StackingSection";

interface SlideStackProps {
  /** Cloudinary public IDs, one per slide. Use this OR `pdf`. */
  slides?: string[];
  /** A single multi-page PDF on Cloudinary, rendered one page per slide. */
  pdf?: { publicId: string; pages: number };
  /** Used for each slide's alt text, e.g. "Branding — slide 3". */
  title: string;
  /** Where the fixed back link points. */
  backHref: string;
}

/**
 * Renders a sequence of Cloudinary-hosted images as full-viewport sections,
 * each wrapped in a StackingSection so they pin and stack on scroll (lg and
 * up). Source is either a list of image public IDs (`slides`) or a single
 * multi-page PDF (`pdf`) — for a PDF, Cloudinary rasterises each page via the
 * `pg_N` transformation, so no per-page upload is needed.
 */
export function SlideStack({ slides, pdf, title, backHref }: SlideStackProps) {
  // Normalise both inputs to a single list of CldImage configs.
  const items: { src: string; rawTransformations?: string[] }[] = pdf
    ? Array.from({ length: pdf.pages }, (_, i) => ({
        src: pdf.publicId,
        rawTransformations: [`pg_${i + 1}`],
      }))
    : (slides ?? []).map((src) => ({ src }));

  return (
    <div className="w-full bg-white">
      {/* Back link — fixed so it stays reachable through the whole stack */}
      <Link
        href={backHref}
        className="fixed left-4 top-4 z-50 rounded-full bg-white/85 px-3.5 py-1.5 font-sans text-sm tracking-wide text-gray-600 shadow-sm ring-1 ring-black/10 backdrop-blur transition-colors hover:text-black md:left-6 md:top-6"
      >
        ← Back
      </Link>

      {items.map((item, i) => (
        <StackingSection key={i} index={i} total={items.length}>
          <div className="relative h-[100svh] w-full bg-white">
            <CldImage
              src={item.src}
              rawTransformations={item.rawTransformations}
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
