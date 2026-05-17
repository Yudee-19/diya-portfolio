import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Fashion Marketing",
  "A fashion marketing project by Kasturi Pal exploring brand storytelling and campaign design.",
);

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
