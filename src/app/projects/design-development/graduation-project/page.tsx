import { SlideStack } from "@/components/SlideStack";

// Cloudinary public IDs: graduation-project-1 … graduation-project-19
const slides = Array.from(
    { length: 18 },
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
