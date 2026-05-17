import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Kids Wear",
  "A kids wear design project by Kasturi Pal.",
);

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
