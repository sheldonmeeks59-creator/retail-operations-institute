# Retail Operations Institute — Product Architecture

A thought-leadership research platform, not a portfolio: a system for publishing frameworks, case studies, and executive insights with the clarity and authority of a McKinsey-style insights site. This document is the architecture reference for the platform; the repository itself is a working implementation of everything described here (Next.js 16, App Router, TypeScript, Tailwind v4, MDX).

---

## 1. Product Architecture

The platform has three concentric layers. Content is the core asset; the site is the delivery mechanism; tools are the future expansion layer that turns readers into users.

```
┌───────────────────────────────────────────────────────────────┐
│                         DISTRIBUTION                          │
│   Search (SEO/SSG) · LinkedIn · Newsletter · Direct/Referral   │
└───────────────────────────────┬───────────────────────────────┘
                                 ▼
┌───────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                     │
│   Next.js App Router · Server Components · Static Generation  │
│   Design System (navy/gold/serif editorial identity)          │
└───────────────────────────────┬───────────────────────────────┘
                                 ▼
┌───────────────────────────────────────────────────────────────┐
│                         CONTENT LAYER                          │
│   Frameworks · Insights · Case Studies · Authors               │
│   MDX + frontmatter, file-based, git-versioned                │
└───────────────────────────────┬───────────────────────────────┘
                                 ▼
┌───────────────────────────────────────────────────────────────┐
│                    FUTURE: APPLICATION LAYER                  │
│   Interactive tools · Diagnostics · Newsletter/CRM · Auth      │
│   (Phase 2+, additive — does not replace the content layer)   │
└───────────────────────────────────────────────────────────────┘
```

**Core architectural decision:** content is file-based MDX in the repo (not a headless CMS) for the MVP. This keeps the entire knowledge base version-controlled, reviewable in pull requests, and free of monthly SaaS cost — appropriate for a single-author institute. A CMS becomes justified only when a second author or editorial workflow (draft → review → publish by non-engineers) is needed — see Phase 2.

---

## 2. Information Architecture / Site Map

```
/                           Home — thesis, flywheel, featured frameworks/insights/case studies, CTA
/frameworks                 Index — all signature frameworks, filterable by category
/frameworks/[slug]          Framework detail — full model, application steps, related frameworks
/insights                   Index — all articles, reverse-chronological
/insights/[slug]            Article detail
/case-studies               Index — all case studies, filterable by industry
/case-studies/[slug]        Case study detail — consulting-grade structure (Exec Summary → Lessons Learned)
/tools                      Index of interactive diagnostics (Phase 2 — placeholder in MVP)
/tools/[tool-slug]          Individual tool (Phase 2+)
/about                      Institute thesis, focus areas, philosophy
/contact                    Direct contact (email / LinkedIn); form + CRM in Phase 2
/search                     (Phase 2) full-text search across all content types
```

Navigation is flat and shallow by design — five primary items (Frameworks, Insights, Case Studies, Tools, About) plus Contact. An executive reader should reach any piece of content in two clicks from the homepage. No nested dropdown mega-menus: that reads as a marketing site, not a research institute.

**Cross-linking model:** every content type can reference every other type (a framework lists related frameworks; a case study cites the frameworks it applies; an insight can cite both). This is the mechanism that makes the site feel like a coherent body of work rather than a blog — implemented today via `relatedFrameworks` frontmatter fields and inline MDX links.

---

## 3. Core User Journeys

**Recruiter / hiring manager** — arrives from a resume link or LinkedIn, has 90 seconds.
`Home → skim thesis + flywheel diagram → open one Framework → open one Case Study → About`
Design implication: the homepage must state the thesis in one sentence above the fold, and every framework/case study must be independently legible without reading anything else first.

**Executive / operator** — arrives via search or referral with a specific operating problem.
`Search or direct link → Framework or Insight matching their problem → related Case Study showing it applied → Contact`
Design implication: every framework page ends with a path to proof (a case study) and a path to engagement (CTA), not a dead end.

**Consulting firm / potential collaborator** — evaluating the depth and originality of the IP.
`Frameworks index (assess breadth) → 2–3 framework detail pages (assess rigor) → Case Studies (assess application) → About (assess who's behind it) → Contact`
Design implication: the frameworks index must communicate the full catalog at a glance (category tags), and case studies must be explicit about what's illustrative vs. real engagement work — credibility depends on that honesty, not on inflating claims.

---

## 4. Content Model

Four content types, each file-based MDX with typed frontmatter (`types/content.ts`), plus a lightweight Author reference.

| Type | Purpose | Key frontmatter | Body structure |
|---|---|---|---|
| **Framework** | Original IP model | `category`, `heroStat`, `relatedFrameworks` | Free-form MDX: concept → mechanism → application steps → pull-quote |
| **Insight** (article) | Short-form executive POV | `topic`, `tags`, `featured` | Free-form MDX, 600–1000 words |
| **Case Study** | Framework applied to a problem | `industry`, `engagementType`, `kpiImpact[]` | Fixed structure: Executive Summary → Business Context → Problem Definition → Root Cause Analysis → Framework Application → Strategic Options → Recommendation → KPI Impact → Lessons Learned |
| **Author** | Byline data | `name`, `role`, `bio` | N/A (reference data, not a page) |

All four share: `title`, `dek` (subhead/summary), `publishedAt`, `status` (`published`/`draft` — drafts are filtered out of listings automatically), `author`.

`engagementType` on case studies is a deliberate integrity mechanism: it's either a real named engagement or explicitly `"Illustrative case study"`, and the UI renders a visible disclosure callout whenever it's illustrative. An institute's credibility is the product; nothing on this platform should imply client work that didn't happen.

Reading time is computed automatically from body word count (`reading-time` package) rather than hand-entered — one less thing to get stale.

---

## 5. Technical Architecture (Next.js)

```
Request
   │
   ▼
Next.js App Router (RSC by default)
   │
   ├─ Static pages (/, /about, /contact, /tools) ──────► prerendered at build
   ├─ Index pages (/frameworks, /insights, /case-studies)
   │      └─ lib/content.ts reads content/**/*.mdx (fs + gray-matter) at build time
   ├─ Detail pages ([slug])
   │      └─ generateStaticParams() → full SSG, one HTML file per entry
   │      └─ next-mdx-remote/rsc renders MDX body server-side (no client JS shipped for content)
   └─ generateMetadata() per page → per-entry <title>/description for SEO
```

- **Rendering strategy:** fully static (SSG) for all content. There is no runtime database and no per-request data fetching — every framework/insight/case-study page is pre-built HTML at deploy time. This is the correct choice for editorial content that changes on a publishing cadence (weekly/monthly), not per-request: fastest possible TTFB, trivial CDN caching, zero infra to operate.
- **Content pipeline:** `content/*.mdx` → `gray-matter` (frontmatter parse) → typed `ContentEntry<T>` → `next-mdx-remote/rsc` (MDX → React, server-rendered). No database, no CMS API call, no client-side data fetching for content.
- **Styling:** Tailwind v4 with an `@theme` token layer (`app/globals.css`) — colors, fonts, and container widths are CSS custom properties consumed by both Tailwind utilities and hand-written prose CSS for MDX body copy.
- **Type safety:** all content frontmatter is typed (`types/content.ts`); `lib/content.ts` is the single read boundary, so a shape change to any content type is a compiler error everywhere it's consumed, not a runtime surprise.
- **Deployment target:** Vercel (zero-config for this stack); works equally on any static-capable Node host since there's no server-only runtime dependency in the MVP.

---

## 6. Folder Structure

```
retail-operations-institute/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, Header, Footer, metadata
│   ├── page.tsx                  # Home
│   ├── globals.css               # Design tokens + editorial prose styles
│   ├── not-found.tsx
│   ├── frameworks/
│   │   ├── page.tsx              # Index
│   │   └── [slug]/page.tsx       # Detail
│   ├── insights/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── case-studies/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── tools/page.tsx            # Phase 2 placeholder
│   ├── about/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── layout/                   # Header, Footer, Container, PageHeader, Breadcrumbs
│   ├── content/                  # FrameworkCard, InsightCard, CaseStudyCard, Byline,
│   │                             #   Tag, KpiRow, Callout, MdxContent
│   ├── marketing/                # CTASection
│   └── ui/                       # (reserved) low-level primitives as the system grows
│
├── content/                      # The actual editorial product — git-versioned MDX
│   ├── frameworks/*.mdx
│   ├── insights/*.mdx
│   ├── case-studies/*.mdx
│   └── authors/                  # (reserved for per-author MDX bios if needed)
│
├── lib/
│   ├── content.ts                # File-system content loaders (get all / get by slug)
│   ├── authors.ts                # Author reference data
│   ├── nav.ts                    # Primary/footer nav config
│   └── utils.ts                  # cn(), formatDate()
│
├── types/
│   └── content.ts                # Frontmatter + ContentEntry<T> types per content kind
│
└── public/                       # Static assets (og images, icons)
```

Rule of thumb as the codebase grows: `app/` stays thin (composition only), `components/` holds anything reused more than once, `lib/` holds anything that isn't a component (data access, formatting, config), `content/` holds the product.

---

## 7. Reusable Components

| Component | Responsibility |
|---|---|
| `Container` | Max-width + gutter wrapper (`content` = 42rem prose width, `wide` = 72rem layout width) |
| `Header` | Sticky nav, wordmark, primary nav, CTA button |
| `Footer` | Sitemap links, institute description, copyright |
| `PageHeader` | Eyebrow + serif H1 + dek — used at the top of every index/detail page |
| `Breadcrumbs` | Section → title trail on all detail pages |
| `Tag` | Category/topic/industry pill (gold-on-cream) |
| `Byline` | Author name · publish date · reading time, resolved from `lib/authors.ts` |
| `FrameworkCard` | Grid card: category tag, title, dek, "Read the framework" affordance |
| `InsightCard` | List row: topic tag, date/reading time, title, dek |
| `CaseStudyCard` | Grid card: industry tag, title, dek, headline KPI stat |
| `KpiRow` | 3-stat definition-list block for case study impact metrics |
| `Callout` | Two variants — `note` (gold, in-body emphasis) and `disclosure` (illustrative-content notice) |
| `MdxContent` | Wraps `next-mdx-remote/rsc`, binds custom MDX components (currently `Callout`) |
| `CTASection` | Full-bleed navy conversion block, reused on home + framework detail |

Every card and detail page consumes the same `Tag`, `Byline`, and `Container` primitives — that's what keeps three distinct content types (frameworks, insights, case studies) feeling like one system instead of three separate templates.

---

## 8. Design System

**Palette** — restrained, three-role system (not a rainbow of brand colors):

| Role | Token | Value | Use |
|---|---|---|---|
| Surface | `--color-paper` | `#faf9f6` | Page background (warm off-white, not clinical white) |
| Surface raised | `--color-paper-raised` | `#ffffff` | Cards |
| Ink | `--color-ink` / `-muted` / `-faint` | `#14181f` → `#7a8091` | Text hierarchy |
| Brand | `--color-navy-950…600` | `#0a1628` → `#2a5296` | Headlines, header/footer, CTA fields — the "authority" color |
| Accent | `--color-gold-600/500/100` | `#9a7327` / `#b5893a` / `#f3e9d2` | Category tags, pull-quote rule, CTA button — used sparingly, never as a background at scale |
| Signal | `--color-signal-positive/-negative` | `#2f6b4f` / `#963d33` | KPI deltas only — never decorative |
| Structure | `--color-line` / `-strong` | `#e2e0d8` / `#c9c6ba` | Borders/dividers |

Gold is intentionally rare — it marks "this is worth your attention" (a tag, a CTA, a pull-quote rule). If gold is everywhere, it stops meaning anything, which is the opposite of an executive-trust palette.

**Typography** — two families, clear division of labor:
- **Source Serif 4** (`--font-serif`) — all headlines (H1–H3) and MDX body copy. Serif signals "written, edited, considered" rather than "app UI," which is the entire point of a research-institute register.
- **Inter** (`--font-sans`) — navigation, buttons, labels, metadata (byline, tags). Sans-serif for anything functional/UI keeps the serif reserved for content, not diluted.
- **IBM Plex Mono** — reserved for future data/metric displays (e.g., tool outputs in Phase 2).

Type scale: H1 `text-4xl`–`text-6xl` serif/semibold, H2 `1.5rem` serif/semibold, body `1.125rem`/`1.75` line-height (editorial reading comfort, not app-density).

**Spacing** — Tailwind's default 4px-based scale, used at a generous multiple for an editorial (not dashboard) density: section padding `py-16`–`py-24`, card padding `p-6`, prose paragraph rhythm `1.5em` top/bottom margin. Nothing under `gap-4` between distinct content blocks — cramped spacing is the fastest way to make an insights site look like a template.

---

## 9. MVP vs. Future Phases

### MVP (this repository, as built)
- Static Next.js site, four content types (Framework, Insight, Case Study, Author), file-based MDX
- Full site map: Home, Frameworks (index + detail), Insights (index + detail), Case Studies (index + detail), About, Contact, Tools (placeholder)
- Complete design system implemented in Tailwind tokens + reusable component library
- SEO metadata per page, static generation for performance and zero hosting cost at this scale
- Five seeded frameworks, one article, one (explicitly illustrative) case study — enough real content to prove the system, not filler

### Phase 2 — Content & Distribution
- Full-text search (`/search`) across all content types (Pagefind or a small client-side index — no backend needed at this content volume)
- Newsletter capture (ConvertKit/Buttondown embed) on article/case-study pages
- RSS feed for frameworks + insights
- OG image generation per entry (`next/og`) for LinkedIn share cards — high-leverage given the recruiter/executive LinkedIn-referral journey
- Author pages if a second contributor joins

### Phase 3 — Interactive Tools (the platform's real differentiator)
- `/tools/friction-index-calculator` — turn the Operational Friction Index into an interactive scoring tool (client component, no auth required, results shareable via URL state)
- `/tools/value-creation-matrix` — interactive quadrant plotter for initiative prioritization
- These are the bridge from "content platform" to "product platform" — each tool is a lead-gen and credibility mechanism simultaneously

### Phase 4 — Platform Maturity
- Headless CMS migration (Sanity/Contentlayer) *only if* a non-engineer needs to publish — until then, MDX-in-git is strictly better (versioned, reviewable, free)
- Light auth + saved results for tools (so an operator can revisit their friction score over time)
- Analytics-driven content strategy (which frameworks/case studies actually drive Contact conversions)

The phase boundary that matters most: **everything through Phase 2 is still a content site with zero backend.** Phase 3 is the deliberate decision point to introduce client-side interactivity and (eventually) persistence — it should be made consciously, once the content layer has enough traffic and authority to justify the added complexity, not before.
