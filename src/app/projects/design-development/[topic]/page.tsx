import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";
import { getProject, getTopic } from "@/data/projects";

/** Pre-render the Design Development sub-topic routes. */
export function generateStaticParams() {
  return (
    getProject("design-development")?.topics?.map((t) => ({
      topic: t.slug,
    })) ?? []
  );
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const match = getTopic("design-development", topic);

  if (!match) notFound();

  return (
    <ComingSoon
      eyebrow="Design Development"
      title={match.title}
      backHref="/projects/design-development"
      backLabel="Design Development"
    />
  );
}
