import { notFound, redirect } from "next/navigation"

import { getProjectPath, projects } from "@/lib/site-content"

type ExperienceRedirectPageProps = {
  params: Promise<{
    id: string
  }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: String(project.id) }))
}

export default async function ExperienceRedirectPage({ params }: ExperienceRedirectPageProps) {
  const { id } = await params
  const project = projects.find((item) => String(item.id) === id || item.slug === id)

  if (!project) {
    notFound()
  }

  redirect(getProjectPath(project))
}
