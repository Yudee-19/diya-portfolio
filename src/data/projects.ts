/**
 * Single source of truth for the portfolio's project pages and their routes.
 *
 * Routes (nested under /projects):
 *   /projects/<project.slug>
 *   /projects/<project.slug>/<topic.slug>   (only for projects with `topics`)
 */

export interface Topic {
  slug: string;
  title: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Sub-topics this project drills down into. Only Fashion Communication
   *  has a fully designed page; the rest render placeholder pages. */
  topics?: Topic[];
}

export const projects: Project[] = [
  {
    slug: "fashion-communication",
    title: "Fashion Communication",
    topics: [
      { slug: "fashion-marketing", title: "Fashion Marketing" },
      { slug: "fashion-forecasting", title: "Fashion Forecasting" },
      { slug: "new-media", title: "New Media" },
      { slug: "fashion-management", title: "Fashion Management" },
    ],
  },
  {
    slug: "design-development",
    title: "Design Development",
    topics: [
      { slug: "graduation-project", title: "Graduation Project" },
      { slug: "textile-study", title: "Textile Study" },
      { slug: "brand-study", title: "Brand Study" },
      { slug: "kids-wear", title: "Kids Wear" },
      { slug: "print-development", title: "Print Development" },
      { slug: "drapping", title: "Drapping" },
    ],
  },
  { slug: "branding", title: "Branding" },
  { slug: "editorial-design", title: "Editorial Design" },
  { slug: "photography", title: "Photography" },
  { slug: "internship", title: "Internship" },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getTopic(
  projectSlug: string,
  topicSlug: string,
): Topic | undefined {
  return getProject(projectSlug)?.topics?.find((t) => t.slug === topicSlug);
}
