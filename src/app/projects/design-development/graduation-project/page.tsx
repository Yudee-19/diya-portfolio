import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "Graduation Project",
  "Kasturi Pal's fashion design graduation project.",
);

// Cloudinary public IDs: graduation-project-1 … graduation-project-19
const slides = Array.from(
    { length: 19 },
    (_, i) => `graduation-project-${i + 1}`,
);

export default function GraduationProjectPage() {
    return (
        <SlideStack
            slides={slides}
            title="Graduation Project"
            backHref="/projects/design-development"
        />
    );
}
