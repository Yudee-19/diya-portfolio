import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Internship",
  "Kasturi Pal's fashion design internship work and experience.",
);

// Cloudinary public IDs: internship-1 … internship-13
const slides = Array.from({ length: 13 }, (_, i) => `internship-${i + 1}`);

export default function InternshipPage() {
  return (
    <SlideStack
      slides={slides}
      title="Internship"
      backHref="/#key-projects"
    />
  );
}
