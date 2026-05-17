import { SlideStack } from "@/components/SlideStack";

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
