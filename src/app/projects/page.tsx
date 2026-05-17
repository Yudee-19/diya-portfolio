import { redirect } from "next/navigation";

/**
 * `/projects` has no page of its own — forward visitors to the Key Projects
 * gallery on the home page.
 */
export default function ProjectsIndexPage() {
  redirect("/#key-projects");
}
