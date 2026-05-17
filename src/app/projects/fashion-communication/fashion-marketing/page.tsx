import { SlideStack } from "@/components/SlideStack";

// Cloudinary public IDs: fashion-marketing-1 … fashion-marketing-13
const slides = Array.from(
  { length: 13 },
  (_, i) => `fashion-marketing-${i + 1}`,
);

export default function FashionMarketingPage() {
  return (
    <SlideStack
      slides={slides}
      title="Fashion Marketing"
      backHref="/projects/fashion-communication"
    />
  );
}
