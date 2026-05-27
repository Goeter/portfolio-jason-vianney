import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ProjectDetailClient from "./ProjectDetailClient"
import {
  getProjectBySlug,
  getProjectOgImage,
  getProjectPath,
  getProjectSeoDescription,
  getProjectSeoTitle,
  getProjectStructuredData,
  projects,
  siteConfig,
} from "@/lib/site-content"

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: `Project Not Found | ${siteConfig.shortName} Portfolio`,
      robots: { index: false, follow: false },
    }
  }

  const title = getProjectSeoTitle(project)
  const description = getProjectSeoDescription(project)
  const url = `${siteConfig.url}${getProjectPath(project)}`
  const image = getProjectOgImage(project)

  return {
    title,
    description,
    alternates: { canonical: getProjectPath(project) },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: `${siteConfig.shortName} Portfolio`,
      images: [{ url: image, alt: `${project.title} project preview` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const projectJsonLd = getProjectStructuredData(project)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  )
}
