import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Textile Study",
  "A textile study by Kasturi Pal exploring fabric, surface and material development.",
);

// Cloudinary public IDs: textile-study-1 … textile-study-12
const slides = Array.from({ length: 12 }, (_, i) => `textile-study-${i + 1}`);

export default function TextileStudyPage() {
  return (
    <SlideStack
      slides={slides}
      title="Textile Study"
      backHref="/projects/design-development"
    />
  );
}
