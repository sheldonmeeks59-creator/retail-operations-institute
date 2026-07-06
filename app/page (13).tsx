import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Tag } from "@/components/content/Tag";
import { Byline } from "@/components/content/Byline";
import { MdxContent } from "@/components/content/MdxContent";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { getAllInsights, getInsight } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllInsights().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getInsight(slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.seoDescription ?? entry.frontmatter.dek,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      type: "article",
      title: entry.frontmatter.seoTitle ?? entry.frontmatter.title,
      description: entry.frontmatter.ogDescription ?? entry.frontmatter.dek,
      url: `/insights/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.frontmatter.seoTitle ?? entry.frontmatter.title,
      description: entry.frontmatter.ogDescription ?? entry.frontmatter.dek,
    },
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getInsight(slug);
  if (!entry) notFound();

  return (
    <article className="py-16">
      <ArticleJsonLd
        title={entry.frontmatter.title}
        description={entry.frontmatter.dek}
        slug={entry.slug}
        path="insights"
        authorSlug={entry.frontmatter.author}
        publishedAt={entry.frontmatter.publishedAt}
        updatedAt={entry.frontmatter.updatedAt}
      />
      <Container size="content">
        <Breadcrumbs
          items={[
            { label: "Insights", href: "/insights" },
            { label: entry.frontmatter.title },
          ]}
        />

        <div className="mt-6">
          <Tag>{entry.frontmatter.topic}</Tag>
          <h1 className="font-serif-display mt-4 text-4xl font-semibold tracking-tight text-navy-950 sm:text-5xl">
            {entry.frontmatter.title}
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-ink-muted">
            {entry.frontmatter.dek}
          </p>
          <div className="mt-6">
            <Byline
              authorSlug={entry.frontmatter.author}
              publishedAt={entry.frontmatter.publishedAt}
              readingTimeMinutes={entry.readingTimeMinutes}
            />
          </div>
        </div>

        <div className="mt-12">
          <MdxContent source={entry.content} />
        </div>

        {entry.frontmatter.tags.length ? (
          <div className="mt-16 flex flex-wrap gap-2 border-t border-line pt-8">
            {entry.frontmatter.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
      </Container>
    </article>
  );
}
