import { pageMetadata } from "@/lib/metadata";
import { SlideStack } from "@/components/SlideStack";

export const metadata = pageMetadata(
  "New Media",
  "A new media project by Kasturi Pal exploring digital and contemporary fashion communication.",
);

// Cloudinary public IDs: new-media-1 … new-media-8
const slides = Array.from({ length: 8 }, (_, i) => `new-media-${i + 1}`);

export default function NewMediaPage() {
  return (
    <SlideStack
      slides={slides}
      title="New Media"
      backHref="/projects/fashion-communication"
    />
  );
}
