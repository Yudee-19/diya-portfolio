import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Drapping",
  "A draping project by Kasturi Pal exploring garment construction on the form.",
);

// Cloudinary public IDs: drapping-1 … drapping-6
const slides = Array.from({ length: 6 }, (_, i) => `drapping-${i + 1}`);

export default function DrappingPage() {
  return (
    <SlideStack
      slides={slides}
      title="Drapping"
      backHref="/projects/design-development"
    />
  );
}
