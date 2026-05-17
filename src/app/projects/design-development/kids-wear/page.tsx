import { SlideStack } from "@/components/SlideStack";

// Cloudinary public IDs: kids-wear-1 … kids-wear-5
const slides = Array.from({ length: 5 }, (_, i) => `kids-wear-${i + 1}`);

export default function KidsWearPage() {
  return (
    <SlideStack
      slides={slides}
      title="Kids Wear"
      backHref="/projects/design-development"
    />
  );
}
