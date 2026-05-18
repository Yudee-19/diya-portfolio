import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Magazine Design",
  "A magazine design project by Kasturi Pal — editorial layout and visual storytelling.",
);

// The Magazine Design PDF lives on Cloudinary as the public ID `magazine`;
// SlideStack rasterises each of its 25 pages via the pg_N transformation.
export default function MagazineDesignPage() {
  return (
    <SlideStack
      pdf={{ publicId: "magazine", pages: 25 }}
      title="Magazine Design"
      backHref="/projects/editorial-design"
    />
  );
}
