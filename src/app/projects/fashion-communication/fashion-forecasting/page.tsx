import { SlideStack } from "@/components/SlideStack";

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
