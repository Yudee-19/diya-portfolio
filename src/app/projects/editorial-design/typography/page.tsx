import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Typography",
  "A typography project by Kasturi Pal exploring type and editorial expression.",
);

// The Typography PDF lives on Cloudinary as the public ID `typography`;
// SlideStack rasterises each of its 9 pages via the pg_N transformation.
export default function TypographyPage() {
  return (
    <SlideStack
      pdf={{ publicId: "typography", pages: 9 }}
      title="Typography"
      backHref="/projects/editorial-design"
    />
  );
}
