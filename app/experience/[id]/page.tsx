import { notFound, redirect } from "next/navigation"

import { getProjectPath, projects } from "@/lib/site-content"

interface ExperienceRedirectPageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: String(project.id) }))
}

export default function ExperienceRedirectPage({ params }: ExperienceRedirectPageProps) {
  const project = projects.find((item) => String(item.id) === params.id || item.slug === params.id)

  if (!project) {
    notFound()
  }

  redirect(getProjectPath(project))
}
