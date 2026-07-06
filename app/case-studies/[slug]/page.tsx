import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Tag } from "@/components/content/Tag";
import { Byline } from "@/components/content/Byline";
import { KpiRow } from "@/components/content/KpiRow";
import { Callout } from "@/components/content/Callout";
import { MdxContent } from "@/components/content/MdxContent";
import { StakeholderMap } from "@/components/content/StakeholderMap";
import { DecisionMatrix } from "@/components/content/DecisionMatrix";
import { RoadmapTimeline } from "@/components/content/RoadmapTimeline";
import { RiskTable } from "@/components/content/RiskTable";
import { ReflectionQuestions } from "@/components/content/ReflectionQuestions";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseStudies().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.seoDescription ?? entry.frontmatter.dek,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      type: "article",
      title: entry.frontmatter.seoTitle ?? entry.frontmatter.title,
      description: entry.frontmatter.ogDescription ?? entry.frontmatter.dek,
      url: `/case-studies/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.frontmatter.seoTitle ?? entry.frontmatter.title,
      description: entry.frontmatter.ogDescription ?? entry.frontmatter.dek,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) notFound();

  return (
    <article className="py-16">
      <ArticleJsonLd
        title={entry.frontmatter.title}
        description={entry.frontmatter.dek}
        slug={entry.slug}
        path="case-studies"
        authorSlug={entry.frontmatter.author}
        publishedAt={entry.frontmatter.publishedAt}
        updatedAt={entry.frontmatter.updatedAt}
      />
      <Container size="content">
        <Breadcrumbs
          items={[
            { label: "Case Studies", href: "/case-studies" },
            { label: entry.frontmatter.title },
          ]}
        />

        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            <Tag>{entry.frontmatter.category}</Tag>
            <Tag className="bg-paper text-ink-faint border border-line-strong">
              {entry.frontmatter.industry}
            </Tag>
          </div>
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

        {entry.frontmatter.engagementType === "Illustrative case study" ? (
          <Callout variant="disclosure">
            This is an illustrative case study constructed to demonstrate
            framework application. It is not a report of a real client
            engagement.
          </Callout>
        ) : null}

        <div className="mt-8">
          <KpiRow items={entry.frontmatter.kpiImpact} />
        </div>

        <div className="mt-12">
          <MdxContent source={entry.content} />
        </div>

        {entry.frontmatter.stakeholders?.length ||
        entry.frontmatter.decisionMatrix?.length ||
        entry.frontmatter.roadmap ||
        entry.frontmatter.risks?.length ||
        entry.frontmatter.reflectionQuestions?.length ? (
          <div className="mt-16 max-w-content border-t border-line pt-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
              Supporting Exhibits
            </p>

            {entry.frontmatter.stakeholders?.length ? (
              <>
                <h3 className="font-serif-display mt-8 text-xl font-semibold text-navy-950">
                  Stakeholder Map
                </h3>
                <StakeholderMap stakeholders={entry.frontmatter.stakeholders} />
              </>
            ) : null}

            {entry.frontmatter.decisionMatrix?.length ? (
              <>
                <h3 className="font-serif-display mt-8 text-xl font-semibold text-navy-950">
                  Decision Matrix
                </h3>
                <DecisionMatrix options={entry.frontmatter.decisionMatrix} />
              </>
            ) : null}

            {entry.frontmatter.roadmap ? (
              <>
                <h3 className="font-serif-display mt-8 text-xl font-semibold text-navy-950">
                  Implementation Timeline
                </h3>
                <RoadmapTimeline roadmap={entry.frontmatter.roadmap} />
              </>
            ) : null}

            {entry.frontmatter.risks?.length ? (
              <>
                <h3 className="font-serif-display mt-8 text-xl font-semibold text-navy-950">
                  Risk Register
                </h3>
                <RiskTable risks={entry.frontmatter.risks} />
              </>
            ) : null}

            {entry.frontmatter.reflectionQuestions?.length ? (
              <ReflectionQuestions questions={entry.frontmatter.reflectionQuestions} />
            ) : null}
          </div>
        ) : null}

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
