@import "tailwindcss";

:root {
  /* Surfaces */
  --color-paper: #faf9f6;
  --color-paper-raised: #ffffff;
  --color-ink: #14181f;
  --color-ink-muted: #4a5060;
  --color-ink-faint: #6b7180; /* darkened from #7a8091 to clear 4.5:1 WCAG AA on paper */

  /* Brand: deep navy, used for authority + structure */
  --color-navy-950: #0a1628;
  --color-navy-900: #0f2140;
  --color-navy-800: #16305a;
  --color-navy-700: #1e3f73;
  --color-navy-600: #2a5296;

  /* Accent: restrained warm gold, used sparingly for emphasis */
  --color-gold-600: #846322; /* darkened from #9a7327 to clear 4.5:1 WCAG AA on paper and gold-100 */
  --color-gold-500: #b5893a;
  --color-gold-100: #f3e9d2;

  /* Structural */
  --color-line: #e2e0d8;
  --color-line-strong: #c9c6ba;

  /* Signal (KPI / status use only) */
  --color-signal-positive: #2f6b4f;
  --color-signal-negative: #963d33;

  /* Chart categorical palette — fixed order, validated (script pass, 6 slots) */
  --chart-series-1: #2a5296; /* navy */
  --chart-series-2: #b5893a; /* gold */
  --chart-series-3: #0e8a6d; /* teal */
  --chart-series-4: #c14b2a; /* rust */
  --chart-series-5: #0d7fb8; /* slate blue */
  --chart-series-6: #8a2f96; /* plum */

  /* Chart sequential ramp — single hue (navy), light -> dark */
  --chart-seq-100: #dce7f5;
  --chart-seq-200: #b3c9e8;
  --chart-seq-300: #7fa1d1;
  --chart-seq-400: #4a74ab;
  --chart-seq-500: #2a5296;
  --chart-seq-600: #16305a;
  --chart-seq-700: #0a1628;

  /* Chart diverging pair — navy (cool) <-> rust (warm), neutral midpoint */
  --chart-div-cool: #2a5296;
  --chart-div-warm: #c14b2a;
  --chart-div-mid: #e2e0d8;

  /* Chart status trio (RAG) — distinct role from categorical identity */
  --chart-status-good: #2f6b4f;
  --chart-status-watch: #b5893a;
  --chart-status-critical: #963d33;

  /* Chart chrome */
  --chart-surface: #ffffff;
  --chart-grid: #e2e0d8;
  --chart-axis: #c9c6ba;
  --chart-ink-primary: #14181f;
  --chart-ink-secondary: #4a5060;
  --chart-ink-muted: #7a8091;

  --font-serif: "Source Serif 4", ui-serif, Georgia, "Times New Roman", serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, monospace;
}

@theme inline {
  --color-paper: var(--color-paper);
  --color-paper-raised: var(--color-paper-raised);
  --color-ink: var(--color-ink);
  --color-ink-muted: var(--color-ink-muted);
  --color-ink-faint: var(--color-ink-faint);

  --color-navy-950: var(--color-navy-950);
  --color-navy-900: var(--color-navy-900);
  --color-navy-800: var(--color-navy-800);
  --color-navy-700: var(--color-navy-700);
  --color-navy-600: var(--color-navy-600);

  --color-gold-600: var(--color-gold-600);
  --color-gold-500: var(--color-gold-500);
  --color-gold-100: var(--color-gold-100);

  --color-line: var(--color-line);
  --color-line-strong: var(--color-line-strong);

  --color-signal-positive: var(--color-signal-positive);
  --color-signal-negative: var(--color-signal-negative);

  --font-serif: var(--font-serif);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);

  --container-content: 42rem;
  --container-wide: 72rem;
}

body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
}

.font-serif-display {
  font-family: var(--font-serif);
  font-feature-settings: "liga" 1, "kern" 1;
}

.prose-editorial {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--color-ink);
}

.prose-editorial p {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}

.prose-editorial h2 {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 1.5rem;
  margin-top: 2.5em;
  margin-bottom: 0.75em;
  color: var(--color-navy-900);
}

.prose-editorial h3 {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 1.25rem;
  margin-top: 2em;
  margin-bottom: 0.6em;
  color: var(--color-navy-900);
}

.prose-editorial blockquote {
  border-left: 3px solid var(--color-gold-500);
  padding-left: 1.25rem;
  font-style: italic;
  color: var(--color-ink-muted);
}

.prose-editorial ul,
.prose-editorial ol {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.5em;
}

.prose-editorial li {
  margin-top: 0.4em;
}

.prose-editorial a {
  color: var(--color-navy-700);
  text-decoration-line: underline;
  text-underline-offset: 3px;
}

.prose-editorial code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--color-gold-100);
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
}

.prose-editorial table {
  width: 100%;
  margin-top: 2em;
  margin-bottom: 2em;
  border-collapse: collapse;
  font-family: var(--font-sans);
  font-size: 0.9rem;
}

.prose-editorial th,
.prose-editorial td {
  border: 1px solid var(--color-line);
  padding: 0.6em 0.9em;
  text-align: left;
  vertical-align: top;
}

.prose-editorial th {
  background: var(--color-paper-raised);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-ink-faint);
  font-weight: 600;
}
