import type { MetadataRoute } from "next"
import { certificatesLatestFirst, getProjectPath, projectsLatestFirst, siteConfig } from "@/lib/site-content"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/certificates`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectsLatestFirst.map((project) => ({
      url: `${siteConfig.url}${getProjectPath(project)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...certificatesLatestFirst.map((certificate) => ({
      url: `${siteConfig.url}/certificates#certificate-${certificate.id}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ]
}
