import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Fashion Management",
  "A fashion management project by Kasturi Pal covering planning, coordination and brand operations.",
);

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
