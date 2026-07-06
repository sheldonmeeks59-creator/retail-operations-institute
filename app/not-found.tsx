import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Tag } from "@/components/content/Tag";
import { Byline } from "@/components/content/Byline";
import { MdxContent } from "@/components/content/MdxContent";
import { DiagramBlock } from "@/components/content/DiagramBlock";
import { LabeledList } from "@/components/content/LabeledList";
import { Callout } from "@/components/content/Callout";
import { CTASection } from "@/components/marketing/CTASection";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { getAllFrameworks, getFramework } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllFrameworks().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getFramework(slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.seoDescription ?? entry.frontmatter.dek,
    alternates: { canonical: `/frameworks/${slug}` },
    openGraph: {
      type: "article",
      title: entry.frontmatter.seoTitle ?? entry.frontmatter.title,
      description: entry.frontmatter.ogDescription ?? entry.frontmatter.dek,
      url: `/frameworks/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.frontmatter.seoTitle ?? entry.frontmatter.title,
      description: entry.frontmatter.ogDescription ?? entry.frontmatter.dek,
    },
  };
}

export default async function FrameworkPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getFramework(slug);
  if (!entry) notFound();

  return (
    <article className="py-16">
      <ArticleJsonLd
        title={entry.frontmatter.title}
        description={entry.frontmatter.dek}
        slug={entry.slug}
        path="frameworks"
        authorSlug={entry.frontmatter.author}
        publishedAt={entry.frontmatter.publishedAt}
        updatedAt={entry.frontmatter.updatedAt}
      />
      <Container size="content">
        <Breadcrumbs
          items={[
            { label: "Frameworks", href: "/frameworks" },
            { label: entry.frontmatter.title },
          ]}
        />

        <div className="mt-6">
          <Tag>{entry.frontmatter.category}</Tag>
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

        {entry.frontmatter.coreIdea ? (
          <p className="prose-editorial mt-10 max-w-content text-xl font-medium text-navy-900">
            {entry.frontmatter.coreIdea}
          </p>
        ) : null}

        {entry.frontmatter.diagram ? (
          <DiagramBlock diagram={entry.frontmatter.diagram} />
        ) : null}

        <div className="mt-12">
          <MdxContent source={entry.content} />
        </div>

        {entry.frontmatter.kpis?.length || entry.frontmatter.failureModes?.length ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {entry.frontmatter.kpis?.length ? (
              <LabeledList label="KPIs & Metrics" items={entry.frontmatter.kpis} />
            ) : null}
            {entry.frontmatter.failureModes?.length ? (
              <LabeledList label="Failure Modes" items={entry.frontmatter.failureModes} />
            ) : null}
          </div>
        ) : null}

        {entry.frontmatter.executiveSummary ? (
          <Callout variant="summary">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-700">
              Executive Summary
            </p>
            <p className="mt-2">{entry.frontmatter.executiveSummary}</p>
          </Callout>
        ) : null}

        {entry.frontmatter.relatedFrameworks?.length ? (
          <div className="mt-16 border-t border-line pt-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
              Related Frameworks
            </p>
            <ul className="mt-3 flex flex-wrap gap-4">
              {entry.frontmatter.relatedFrameworks.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/frameworks/${slug}`}
                    className="text-sm font-semibold text-navy-800 hover:text-navy-950"
                  >
                    {slug.replace(/-/g, " ")} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>

      <div className="mt-20">
        <CTASection
          title="See this framework applied."
          dek="Explore case studies that show how this model resolves real operating decisions."
          ctaLabel="Browse Case Studies"
          ctaHref="/case-studies"
        />
      </div>
    </article>
  );
}
