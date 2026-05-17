import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";

/** Editorial Design sub-topics still on a placeholder page.
 *  (layout-designs and typography have their own bespoke pages.) */
const topics: Record<string, string> = {
  "magazine-design": "Magazine Design",
};

export function generateStaticParams() {
  return Object.keys(topics).map((topic) => ({ topic }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const title = topics[topic];

  if (!title) notFound();

  return (
    <ComingSoon
      eyebrow="Editorial Design"
      title={title}
      backHref="/projects/editorial-design"
      backLabel="Editorial Design"
    />
  );
}
