import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Layout Designs",
  "Layout design work by Kasturi Pal — editorial composition and grids.",
);

// The Layout Designs PDF lives on Cloudinary as the public ID `layout-designs`;
// SlideStack rasterises each of its 8 pages via the pg_N transformation.
export default function LayoutDesignsPage() {
  return (
    <SlideStack
      pdf={{ publicId: "layout-designs", pages: 8 }}
      title="Layout Designs"
      backHref="/projects/editorial-design"
    />
  );
}
