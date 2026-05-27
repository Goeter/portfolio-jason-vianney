import { notFound, redirect } from "next/navigation"

import { getProjectPath, projects } from "@/lib/site-content"

type ExperienceRedirectPageProps = {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: String(project.id) }))
}

export default function ExperienceRedirectPage({ params }: ExperienceRedirectPageProps) {
  const { id } = params
  const project = projects.find((item) => String(item.id) === id || item.slug === id)

  if (!project) {
    notFound()
  }

  redirect(getProjectPath(project))
}
