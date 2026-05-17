import { pageMetadata } from "@/lib/metadata";
import { SlideViewer } from "@/components/SlideViewer";

export const metadata = pageMetadata(
  "Branding",
  "Branding and brand identity design by Kasturi Pal.",
);

// brand-design.pdf lives on Cloudinary as the public ID `brand-design`;
// SlideViewer rasterises each of its 46 pages via the pg_N transformation.
export default function BrandingPage() {
  return (
    <SlideViewer
      pdf={{ publicId: "brand-design", pages: 46 }}
      title="Branding"
      backHref="/#key-projects"
    />
  );
}
