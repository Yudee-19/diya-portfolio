import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Brand Study",
  "A brand study by Kasturi Pal within fashion design development.",
);

// Cloudinary public IDs: brand-study-1 … brand-study-6
const slides = Array.from({ length: 6 }, (_, i) => `brand-study-${i + 1}`);

export default function BrandStudyPage() {
  return (
    <SlideStack
      slides={slides}
      title="Brand Study"
      backHref="/projects/design-development"
    />
  );
}
