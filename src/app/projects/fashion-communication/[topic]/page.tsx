import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";
import { getProject, getTopic } from "@/data/projects";

/** Pre-render the Fashion Communication sub-topic placeholder routes.
 *  `fashion-marketing` is excluded — it has its own bespoke page. */
export function generateStaticParams() {
  return (
    getProject("fashion-communication")
      ?.topics?.filter((t) => t.slug !== "fashion-marketing")
      .map((t) => ({ topic: t.slug })) ?? []
  );
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const match = getTopic("fashion-communication", topic);

  if (!match) notFound();

  return (
    <ComingSoon
      eyebrow="Fashion Communication"
      title={match.title}
      backHref="/projects/fashion-communication"
      backLabel="Fashion Communication"
    />
  );
}
