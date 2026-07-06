export const HEADSHOT_PUBLIC_PATH = "/images/profile/headshot.jpg";

export const profile = {
  name: "Sheldon Meeks",
  initials: "SM",
  positioning: "Founder, Retail Operations Institute",
  philosophy:
    "Great retail performance is not accidental — it is engineered. Every framework published here starts from the same premise: retail is a system of interconnected forces, and the leaders who improve it fastest are the ones who can see the whole loop, not just the stage in front of them.",
  bio: [
    "This work is driven by a persistent question: why do well-run retail organizations still leave so much performance on the table? Not from a lack of effort, but from treating a connected system — store design, labor, customer experience, capital — as a set of unrelated initiatives to be optimized one at a time.",
    "The frameworks, case studies, and diagnostics published here are the output of applying systems thinking and industrial-engineering discipline to that question — building original, testable models rather than repackaging conventional retail wisdom, and holding every claim to the same standard: is it falsifiable, and would the data actually support it.",
    "The approach is research-driven and deliberately skeptical of the most visible explanation for a problem. Retail Flywheel Dynamics, the Operational Friction Index, and the rest of the signature framework library all exist because the obvious diagnosis is, more often than not, aimed at the wrong stage of the loop.",
    "The goal of this platform is not to catalog what's been done, but to demonstrate how a genuinely systems-oriented mind approaches retail operations — with frameworks and case studies built to scale into a body of work, not a single portfolio piece.",
  ],
};

export type FocusAreaIcon =
  | "Compass"
  | "Building2"
  | "Gauge"
  | "Workflow"
  | "Network"
  | "Footprints"
  | "RefreshCcw";

export interface FocusArea {
  title: string;
  description: string;
  icon: FocusAreaIcon;
}

export const focusAreas: FocusArea[] = [
  {
    title: "Retail Strategy",
    description: "Translating enterprise strategy into store-level operating decisions without losing fidelity along the way.",
    icon: "Compass",
  },
  {
    title: "Store Planning",
    description: "Site-to-opening process design, capital sequencing, and format decisions grounded in operational data.",
    icon: "Building2",
  },
  {
    title: "Operational Excellence",
    description: "Diagnosing and removing the friction that quietly caps store performance, store by store.",
    icon: "Gauge",
  },
  {
    title: "Systems Thinking",
    description: "Treating retail as a closed-loop system, where the binding constraint — not the loudest problem — sets the ceiling.",
    icon: "Workflow",
  },
  {
    title: "Organizational Design",
    description: "Structuring decision rights and process ownership so execution reflects strategy, not local interpretation.",
    icon: "Network",
  },
  {
    title: "Customer Experience",
    description: "Modeling the customer journey as measurable stages, not a single satisfaction score.",
    icon: "Footprints",
  },
  {
    title: "Continuous Improvement",
    description: "Building feedback loops that make every engagement sharpen the framework behind the next one.",
    icon: "RefreshCcw",
  },
];

/**
 * Future-expansion sections (speaking engagements, publications, awards,
 * certifications, interviews, podcast appearances, press). Each is typed
 * and rendered conditionally so an empty array simply omits the section —
 * populate any of these later with zero component changes required.
 */
export interface CredentialEntry {
  title: string;
  venue: string;
  date: string;
  url?: string;
}

export const speakingEngagements: CredentialEntry[] = [];
export const publications: CredentialEntry[] = [];
export const awards: CredentialEntry[] = [];
export const certifications: CredentialEntry[] = [];
export const interviews: CredentialEntry[] = [];
export const podcastAppearances: CredentialEntry[] = [];
export const pressMentions: CredentialEntry[] = [];
