import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Print Development",
  "A print development project by Kasturi Pal — pattern and surface design.",
);

// Cloudinary public IDs: print-development-1 … print-development-4
const slides = Array.from(
  { length: 4 },
  (_, i) => `print-development-${i + 1}`,
);

export default function PrintDevelopmentPage() {
  return (
    <SlideStack
      slides={slides}
      title="Print Development"
      backHref="/projects/design-development"
    />
  );
}
