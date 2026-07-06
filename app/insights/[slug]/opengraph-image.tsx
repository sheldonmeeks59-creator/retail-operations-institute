import { getInsight } from "@/lib/content";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Retail Operations Institute insight";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getInsight(slug);

  return renderOgImage({
    eyebrow: entry?.frontmatter.topic ?? "Insight",
    title: entry?.frontmatter.title ?? "Retail Operations Institute",
    dek: entry?.frontmatter.dek,
  });
}
