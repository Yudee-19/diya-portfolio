import type { Metadata } from "next";

const SITE = "Kasturi Pal";

/**
 * Builds per-page metadata — title, description, and matching Open Graph /
 * Twitter-card fields — so every page has a complete social-share preview.
 *
 * The root layout (src/app/layout.tsx) applies the "%s · Kasturi Pal" title
 * template, sets `metadataBase`, and supplies the shared Open Graph image
 * (src/app/opengraph-image.tsx), so callers only pass a title + description.
 */
export function pageMetadata(title: string, description: string): Metadata {
  const socialTitle = `${title} · ${SITE}`;
  return {
    title,
    description,
    openGraph: { title: socialTitle, description },
    twitter: { title: socialTitle, description },
  };
}
