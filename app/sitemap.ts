import type { MetadataRoute } from "next"
import { getAbsoluteUrl, getProjectPath, projectsLatestFirst } from "@/lib/site-content"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: getAbsoluteUrl(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: getAbsoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/certificates"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectsLatestFirst.map((project) => ({
      url: getAbsoluteUrl(getProjectPath(project)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
