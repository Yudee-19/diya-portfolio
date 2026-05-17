import { SlideStack } from "@/components/SlideStack";

// Cloudinary public IDs: fashion-management-1 … fashion-management-24
const slides = Array.from(
  { length: 24 },
  (_, i) => `fashion-management-${i + 1}`,
);

export default function FashionManagementPage() {
  return (
    <SlideStack
      slides={slides}
      title="Fashion Management"
      backHref="/projects/fashion-communication"
    />
  );
}
