import { pageMetadata } from "@/lib/metadata";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata = pageMetadata(
  "Photography",
  "Photography work by Kasturi Pal — fashion and editorial direction.",
);

export default function PhotographyPage() {
  return (
    <ComingSoon
      eyebrow="Project"
      title="Photography"
      backHref="/#key-projects"
      backLabel="Projects"
    />
  );
}
