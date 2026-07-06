import type { MetadataRoute } from "next";
import { getAllFrameworks, getAllInsights, getAllCaseStudies } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/frameworks`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/insights`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/case-studies`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/tools`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/tools/visual-library`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const frameworkRoutes: MetadataRoute.Sitemap = getAllFrameworks().map((entry) => ({
    url: `${SITE_URL}/frameworks/${entry.slug}`,
    lastModified: entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const insightRoutes: MetadataRoute.Sitemap = getAllInsights().map((entry) => ({
    url: `${SITE_URL}/insights/${entry.slug}`,
    lastModified: entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = getAllCaseStudies().map((entry) => ({
    url: `${SITE_URL}/case-studies/${entry.slug}`,
    lastModified: entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...frameworkRoutes, ...insightRoutes, ...caseStudyRoutes];
}
