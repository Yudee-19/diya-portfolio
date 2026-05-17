import { SlideStack } from "@/components/SlideStack";

// brand-design.pdf lives on Cloudinary as the public ID `brand-design`;
// SlideStack rasterises each of its 46 pages via the pg_N transformation.
export default function BrandingPage() {
  return (
    <SlideStack
      pdf={{ publicId: "brand-design", pages: 46 }}
      title="Branding"
      backHref="/#key-projects"
    />
  );
}
