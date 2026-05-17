import { SlideStack } from "@/components/SlideStack";

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
