import { SlideStack } from "@/components/SlideStack";

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
