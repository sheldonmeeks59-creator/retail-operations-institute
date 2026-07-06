import { getAuthor } from "@/lib/authors";
import { SITE_URL, SITE_NAME } from "@/lib/site";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  path: "frameworks" | "insights" | "case-studies";
  authorSlug: string;
  publishedAt: string;
  updatedAt?: string;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  path,
  authorSlug,
  publishedAt,
  updatedAt,
}: ArticleJsonLdProps) {
  const author = getAuthor(authorSlug);
  const url = `${SITE_URL}/${path}/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      "@type": "Person",
      name: author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
