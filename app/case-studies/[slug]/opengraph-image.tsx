import { getCaseStudy } from "@/lib/content";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Retail Operations Institute case study";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);

  return renderOgImage({
    eyebrow: entry?.frontmatter.industry ?? "Case Study",
    title: entry?.frontmatter.title ?? "Retail Operations Institute",
    dek: entry?.frontmatter.dek,
  });
}
