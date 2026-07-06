export type ContentKind = "framework" | "insight" | "case-study";

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
}

export interface KpiImpact {
  label: string;
  value: string;
  delta?: string;
}

export interface BaseFrontmatter {
  title: string;
  dek: string;
  publishedAt: string;
  updatedAt?: string;
  status: "published" | "draft";
  author: string;
  seoTitle?: string;
  seoDescription?: string;
  ogDescription?: string;
  heroImageConcept?: string;
}

export interface StakeholderEntry {
  role: string;
  interest: string;
  influence: "High" | "Medium" | "Low";
}

export interface DecisionOption {
  option: string;
  cost: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
  timeToValue: string;
  recommended?: boolean;
}

export interface RoadmapPhase {
  quickWins: string[];
  mediumTerm: string[];
  longTerm: string[];
}

export interface RiskEntry {
  risk: string;
  mitigation: string;
}

export interface FrameworkFrontmatter extends BaseFrontmatter {
  category: string;
  heroStat?: { label: string; value: string };
  relatedFrameworks?: string[];
  coreIdea?: string;
  diagram?: string;
  kpis?: string[];
  failureModes?: string[];
  executiveSummary?: string;
}

export interface InsightFrontmatter extends BaseFrontmatter {
  topic: string;
  tags: string[];
  featured?: boolean;
}

export interface CaseStudyFrontmatter extends BaseFrontmatter {
  industry: string;
  category: string;
  tags: string[];
  engagementType: string;
  kpiImpact: KpiImpact[];
  relatedFrameworks?: string[];
  stakeholders?: StakeholderEntry[];
  decisionMatrix?: DecisionOption[];
  roadmap?: RoadmapPhase;
  risks?: RiskEntry[];
  reflectionQuestions?: string[];
}

export interface ContentEntry<TFrontmatter> {
  slug: string;
  frontmatter: TFrontmatter;
  readingTimeMinutes: number;
  content: string;
}

export type FrameworkEntry = ContentEntry<FrameworkFrontmatter>;
export type InsightEntry = ContentEntry<InsightFrontmatter>;
export type CaseStudyEntry = ContentEntry<CaseStudyFrontmatter>;
