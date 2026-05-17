import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Fashion Forecasting",
  "A fashion forecasting project by Kasturi Pal — trend research and seasonal direction.",
);

// Cloudinary public IDs: fashion-forecasting-1 … fashion-forecasting-16
const slides = Array.from(
  { length: 16 },
  (_, i) => `fashion-forecasting-${i + 1}`,
);

export default function FashionForecastingPage() {
  return (
    <SlideStack
      slides={slides}
      title="Fashion Forecasting"
      backHref="/projects/fashion-communication"
    />
  );
}
