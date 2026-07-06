# Production Deployment Runbook

Everything below that could be implemented in code has been. What remains is
inherently account-gated (Vercel, GitHub repo settings, a real domain,
Cloudflare) — this is the exact runbook for those steps.

---

## 1. Performance Optimization

**Already implemented:**
- Fully static generation (SSG) for every content page — no database, no
  per-request data fetching. `generateStaticParams` pre-builds every
  framework, insight, and case study at build time.
- `next/font` for all three typefaces (Source Serif 4, Inter, IBM Plex Mono) —
  self-hosted, zero layout shift, no external font-loading round trip.
- No client-side JavaScript on any content page except the six chart
  components (which need hover state) — everything else is a Server
  Component by default.
- `transpilePackages` correctly configured for `next-mdx-remote` under
  Turbopack (this was a real bug found and fixed this session, not a
  precaution — Turbopack silently dropped inline component props without it).

**Verify after first deploy (Vercel gives you this automatically):**
- Run Lighthouse (or Vercel's built-in Speed Insights) against `/`,
  `/frameworks/[slug]`, and `/tools/visual-library` (the heaviest page — six
  client chart components). Target: 90+ performance, since there are no
  images or heavy client bundles to fight.
- Confirm the `Cache-Control` headers on static pages are being served from
  Vercel's edge cache (they will be, automatically, for SSG output).

**No action needed:**
- Bundle size: the chart library is hand-rolled SVG with zero charting
  dependency (no Chart.js/Recharts/D3) — there's nothing to code-split or
  dynamically import.

---

## 2. SEO Setup

**Already implemented:**
- `metadataBase` set from `NEXT_PUBLIC_SITE_URL` (see env vars below) — every
  relative OG/canonical URL resolves correctly regardless of preview vs.
  production domain.
- `app/sitemap.ts` — dynamically enumerates every framework, insight, and
  case study alongside the static routes. Available at `/sitemap.xml`.
- `app/robots.ts` — allows all crawlers, points to the sitemap. Available at
  `/robots.txt`.
- Per-page `canonical` alternates on every route.
- Dynamic Open Graph images (`opengraph-image.tsx`) for every framework,
  insight, case study, and the homepage — auto-generated on-brand share
  cards, no manual image creation needed ever.
- JSON-LD structured data: `Organization` schema site-wide (root layout),
  `Article` schema on every framework/insight/case-study page (headline,
  author, datePublished, publisher).
- `seoTitle` / `seoDescription` / `ogDescription` frontmatter fields, used in
  `generateMetadata` in preference to the on-page title/dek wherever set.

**Manual steps after launch:**
1. **Google Search Console** — verify domain ownership (DNS TXT record,
   added alongside the Cloudflare records below), then submit
   `https://<domain>/sitemap.xml`.
2. **Bing Webmaster Tools** — same sitemap submission; low effort, non-zero
   recruiter-search traffic.
3. Set the real `NEXT_PUBLIC_SITE_URL` environment variable in Vercel before
   the first production deploy — the metadata and sitemap both read it, and
   the fallback in `lib/site.ts` is a placeholder domain, not your real one.

---

## 3. Accessibility

**Already implemented:**
- Skip-to-content link (first focusable element on every page).
- `aria-current="page"` on the active primary nav item.
- Contrast audit run against WCAG AA 4.5:1 (computed, not eyeballed) — found
  and fixed two token failures: `--color-ink-faint` and `--color-gold-600`
  were both sub-4.5:1 on the paper background at the sizes they're actually
  used at. Both were darkened by the minimum amount needed to clear AA
  without changing the visual hierarchy.
- All decorative icons (`lucide-react`) carry `aria-hidden`.
- Every chart has a "View as table" fallback (`<details>`, no JS required)
  for screen-reader and non-visual access to the underlying data.
- Single `<h1>` per page; section headers are semantic `<h2>`/`<h3>`, not
  styled `<div>`s.
- Status is never color-only: the Scorecard, Decision Matrix "Recommended"
  tag, and KPI deltas all pair color with a text label.

**Manual steps before launch:**
1. One real keyboard-only pass: Tab through the homepage, a framework page,
   and the visual library — confirm focus order is logical and every
   interactive element (nav, chart hover targets, the "View as table"
   disclosure) is reachable and visibly focused.
2. One screen-reader spot check (VoiceOver on Mac, or NVDA on Windows) on the
   homepage and one chart — confirm the table fallback reads sensibly.
3. Re-run the contrast check if the brand palette changes — the validator
   command is in the dataviz skill; the token values live in
   `app/globals.css`.

---

## 4. Image Optimization Strategy

No photography exists in the site yet — every visual is typographic or an
SVG chart, which is why there's nothing to "optimize" today. This is the
pattern to follow the moment real images are added (hero photography per the
`heroImageConcept` frontmatter field already written for every case study):

1. **Always `next/image`, never `<img>`.** It handles responsive `srcset`,
   lazy loading below the fold, and format negotiation automatically.
2. **Format:** let Next.js serve AVIF/WebP automatically (default
   `images.formats` behavior) — don't hand-convert source files.
3. **The LCP image gets `priority`.** On any page with a hero photo, that one
   image should set `priority` to skip lazy-loading; every other image on
   the page should not.
4. **Always set `sizes`** matching the actual rendered width at each
   breakpoint — an unset `sizes` prop defeats responsive `srcset` selection
   and downloads the largest variant on every device.
5. **Source resolution:** export hero photography at 2x the largest rendered
   width (e.g., 2400px wide for a 1200px-max hero) and let `next/image`
   downscale — never upscale a small source.
6. **If images move to a CMS/CDN later:** add the CDN's hostname to
   `images.remotePatterns` in `next.config.ts` — Next.js blocks
   unconfigured external image hosts by default, which is a deliberate
   security control, not a bug to route around.

---

## 5. Deployment Steps for Vercel

1. **Import the repo.** Vercel dashboard → Add New → Project → select
   `sheldonmeeks59-creator/retail-operations-institute`. Vercel auto-detects
   Next.js; no build configuration overrides are needed (`npm run build` /
   `.next` output are the defaults).
2. **Set environment variables** (Project Settings → Environment Variables),
   for both Production and Preview:
   - `NEXT_PUBLIC_SITE_URL` — the real production domain, e.g.
     `https://retailoperationsinstitute.com` (no trailing slash).
3. **Deploy.** The first push to `main` (or the initial import) triggers the
   production build; every subsequent PR gets its own preview deployment
   automatically — this is where you review content changes before merging,
   not just CI passing.
4. **Set the production branch** to `main` (Vercel default) — confirm no
   other branch is accidentally set as production in Project Settings → Git.
5. **Enable Vercel Analytics / Speed Insights** (optional, one click in the
   dashboard) — gives you the real-user performance data to check against
   the Lighthouse targets in section 1.

---

## 6. GitHub Best Practices

1. **Branch protection on `main`** (Settings → Branches → Add rule):
   - Require a pull request before merging (no direct pushes).
   - Require the `CI / build` status check (from
     `.github/workflows/ci.yml`, added this session) to pass before merging.
   - Require branches to be up to date before merging.
2. **The CI workflow already runs lint + build on every PR and push to
   `main`** — this is the automated gate; branch protection is what makes it
   mandatory rather than advisory.
3. **The PR template** (`.github/pull_request_template.md`, added this
   session) auto-populates new PRs with a test-plan checklist — keep using
   it rather than blank PR descriptions.
4. **Commit convention:** this repo's history uses plain, descriptive
   present/imperative-tense subject lines ("Add," "Fix," not "Added,"
   "Fixed") — keep that consistent for a clean, scannable log.
5. **Never force-push `main`.** If history needs correcting, do it on a
   branch and open a PR, even solo — it's the one habit that prevents a
   platform-wide accident.
6. **Secrets:** if any API keys are ever added (analytics, a form backend),
   they go in Vercel's environment variables, never committed — there is
   currently nothing in this repo that needs a secret.

---

## 7. Domain Connection (Cloudflare DNS)

Assuming the domain is registered and its nameservers already point to
Cloudflare (if not: that's a one-time change at the registrar, propagation
takes up to 24-48 hours before the records below will resolve).

1. **In Vercel:** Project Settings → Domains → Add → enter the apex domain
   (`retailoperationsinstitute.com`) and the `www` subdomain. Vercel will show
   the exact DNS records it needs.
2. **In Cloudflare DNS**, add:
   - `A` record: `@` → Vercel's provided IP (or `CNAME` `@` → `cname.vercel-dns.com` if using Cloudflare's CNAME flattening, which Cloudflare supports at the apex).
   - `CNAME` record: `www` → `cname.vercel-dns.com`.
3. **Set the Cloudflare proxy status.** Vercel already terminates TLS and
   serves via its own global edge network — running Cloudflare's orange-cloud
   proxy in front of it is optional and mainly useful for Cloudflare's WAF/
   bot-management if you want it. If enabled, set **SSL/TLS mode to "Full
   (strict)"** in Cloudflare — "Flexible" will loop redirects against
   Vercel's own HTTPS enforcement.
4. **Redirect `www` → apex (or vice versa)** — pick one canonical host and
   configure the redirect in Vercel's Domains settings (it offers this as a
   toggle once both domains are added), so search engines and shared links
   never split authority between two hostnames.
5. **Verify** in Vercel's dashboard that both domains show "Valid
   Configuration" before considering DNS done — propagation can lag even
   after the records look correct in Cloudflare.
6. **Update `NEXT_PUBLIC_SITE_URL`** in Vercel to the final canonical domain
   and redeploy — this env var drives the sitemap, canonical tags, and OG
   image URLs, so it must match the domain that's actually live.

---

## 8. Final QA Checklist Before Launch

- [ ] `npm run lint` and `npm run build` both pass clean (verified this
      session — see below).
- [ ] Every internal link resolves (no 404s) — verified this session via a
      full-site crawl, see results below.
- [ ] Responsive check at 375px (mobile), 768px (tablet), 1440px (desktop) on
      the homepage, a framework detail page, and the visual library —
      verified this session, see screenshots.
- [ ] `NEXT_PUBLIC_SITE_URL` set correctly in Vercel production env before
      the first real deploy.
- [ ] Sitemap submitted to Google Search Console and Bing Webmaster Tools.
- [ ] Branch protection + required CI check enabled on `main`.
- [ ] One manual keyboard-only pass and one screen-reader spot check (listed
      in section 3) — these require a human in a real browser and weren't
      simulated.
- [ ] Real Open Graph preview check: paste a live production URL into
      Twitter/X's card validator or LinkedIn's post inspector once deployed,
      to confirm the dynamic OG image renders as expected on each platform's
      actual crawler (not just verified locally, as it was this session).
- [ ] `robots.txt` and `sitemap.xml` reachable at the production domain
      (not just localhost).
