import type { Metadata } from "next"

import ProjectsClient from "./ProjectsClient"
import { projectsCollectionStructuredData, siteConfig } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore ${siteConfig.owner}'s portfolio projects across system analysis, UI/UX design, data analysis, fullstack development, CMS websites, HR systems, and mobile applications.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${siteConfig.shortName} Portfolio`,
    description:
      "Explore portfolio projects across system analysis, UI/UX design, data analysis, fullstack development, CMS websites, HR systems, and mobile applications.",
    url: `${siteConfig.url}/projects`,
    images: [siteConfig.defaultOgImage],
  },
}

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsCollectionStructuredData) }}
      />
      <ProjectsClient />
    </>
  )
}
