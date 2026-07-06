import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  CaseStudyEntry,
  CaseStudyFrontmatter,
  ContentEntry,
  FrameworkEntry,
  FrameworkFrontmatter,
  InsightEntry,
  InsightFrontmatter,
} from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readEntries<TFrontmatter>(dir: string): ContentEntry<TFrontmatter>[] {
  const dirPath = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".mdx"));

  const entries = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      frontmatter: data as TFrontmatter,
      readingTimeMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
      content,
    };
  });

  return entries
    .filter((entry) => (entry.frontmatter as { status?: string }).status !== "draft")
    .sort((a, b) => {
      const aDate = (a.frontmatter as { publishedAt: string }).publishedAt;
      const bDate = (b.frontmatter as { publishedAt: string }).publishedAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
}

function readEntry<TFrontmatter>(
  dir: string,
  slug: string,
): ContentEntry<TFrontmatter> | null {
  const filePath = path.join(CONTENT_ROOT, dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as TFrontmatter,
    readingTimeMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

export function getAllFrameworks(): FrameworkEntry[] {
  return readEntries<FrameworkFrontmatter>("frameworks");
}

export function getFramework(slug: string): FrameworkEntry | null {
  return readEntry<FrameworkFrontmatter>("frameworks", slug);
}

export function getAllInsights(): InsightEntry[] {
  return readEntries<InsightFrontmatter>("insights");
}

export function getInsight(slug: string): InsightEntry | null {
  return readEntry<InsightFrontmatter>("insights", slug);
}

export function getAllCaseStudies(): CaseStudyEntry[] {
  return readEntries<CaseStudyFrontmatter>("case-studies");
}

export function getCaseStudy(slug: string): CaseStudyEntry | null {
  return readEntry<CaseStudyFrontmatter>("case-studies", slug);
}
