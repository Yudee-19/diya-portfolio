import { SlideStack } from "@/components/SlideStack";

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
