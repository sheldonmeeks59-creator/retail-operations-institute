export const FLYWHEEL_STAGES = [
  { stage: "Store Design", score: 78 },
  { stage: "Associate Productivity", score: 52 },
  { stage: "Customer Experience", score: 81 },
  { stage: "Sales Performance", score: 74 },
  { stage: "Capital Reinforcement", score: 69 },
];

export const flywheelStageChartData = {
  headers: ["Stage", "Health Score (0–100)"],
  rows: FLYWHEEL_STAGES.map((s) => [s.stage, s.score]),
};

export const PRODUCTIVITY_MONTHS = ["M1", "M2", "M3", "M4", "M5", "M6"];
export const PRODUCTIVITY_SERIES = [
  { key: "labor", label: "Labor Efficiency", color: "var(--chart-series-1)", values: [100, 103, 105, 106, 107, 108] },
  { key: "flow", label: "Customer Flow", color: "var(--chart-series-4)", values: [100, 94, 89, 91, 96, 101] },
  { key: "output", label: "Output", color: "var(--chart-series-3)", values: [100, 99, 97, 98, 101, 105] },
];

export const productivityLeversChartData = {
  headers: ["Month", ...PRODUCTIVITY_SERIES.map((s) => s.label)],
  rows: PRODUCTIVITY_MONTHS.map((m, i) => [m, ...PRODUCTIVITY_SERIES.map((s) => s.values[i])]),
};

export const FRICTION_CATEGORIES = [
  { category: "Labor Friction", score: 68 },
  { category: "Decision Friction", score: 41 },
  { category: "Layout Friction", score: 24 },
  { category: "Information Friction", score: 19 },
];

export const frictionBreakdownChartData = {
  headers: ["Friction Category", "Score (0–100)"],
  rows: FRICTION_CATEGORIES.map((c) => [c.category, c.score]),
};

export const JOURNEY_STAGES = [
  { stage: "Entry", retained: 100, color: "var(--chart-seq-700)" },
  { stage: "Orientation", retained: 61, color: "var(--chart-seq-600)" },
  { stage: "Evaluation", retained: 45, color: "var(--chart-seq-500)" },
  { stage: "Commitment", retained: 38, color: "var(--chart-seq-400)" },
];

export const journeyFunnelChartData = {
  headers: ["Stage", "Customers Retained (%)"],
  rows: JOURNEY_STAGES.map((s) => [s.stage, `${s.retained}%`]),
};

export const ALIGNMENT_HOURS = ["9a", "11a", "1p", "3p", "5p", "7p", "9p"];
export const ALIGNMENT_DEMAND = [30, 45, 60, 55, 90, 100, 62];
export const ALIGNMENT_STAFFING = [42, 48, 52, 54, 58, 60, 56];

export const laborAlignmentGapChartData = {
  headers: ["Hour", "Demand (index)", "Staffing (index)", "Gap"],
  rows: ALIGNMENT_HOURS.map((h, i) => [
    h,
    ALIGNMENT_DEMAND[i],
    ALIGNMENT_STAFFING[i],
    ALIGNMENT_DEMAND[i] - ALIGNMENT_STAFFING[i],
  ]),
};

export const CAPITAL_INITIATIVES = [
  { name: "Peak-hour redeployment rule", cost: 12, impact: 78, recommended: true },
  { name: "Signage correction", cost: 18, impact: 64, recommended: true },
  { name: "Counting-window rescheduling", cost: 15, impact: 70, recommended: true },
  { name: "Full layout redesign", cost: 82, impact: 74, recommended: false },
  { name: "Additional checkout lanes", cost: 68, impact: 40, recommended: false },
  { name: "Dedicated weekend labor pool", cost: 55, impact: 48, recommended: false },
  { name: "National retraining program", cost: 74, impact: 22, recommended: false },
];

export const capitalDecisionGridChartData = {
  headers: ["Initiative", "Cost", "Impact", "Classification"],
  rows: CAPITAL_INITIATIVES.map((i) => [
    i.name,
    i.cost,
    i.impact,
    i.recommended ? "Quick win" : "Lower priority",
  ]),
};

export interface ScorecardRow {
  stage: string;
  metric: string;
  value: string;
  status: "good" | "watch" | "critical";
  note: string;
}

export const SCORECARD_ROWS: ScorecardRow[] = [
  {
    stage: "Store Design",
    metric: "Layout friction score",
    value: "24 / 100",
    status: "good",
    note: "Layout is not a contributing constraint this period.",
  },
  {
    stage: "Associate Productivity",
    metric: "Peak-hour coverage ratio",
    value: "0.71",
    status: "critical",
    note: "Binding constraint — staffing curve under-covers the demand peak.",
  },
  {
    stage: "Customer Experience",
    metric: "Orientation-stage retention",
    value: "61%",
    status: "watch",
    note: "Improved from prior period; still below the 75% target band.",
  },
  {
    stage: "Sales Performance",
    metric: "Output index",
    value: "101.5",
    status: "good",
    note: "On plan, trailing the constraint stage as expected.",
  },
  {
    stage: "Capital Reinforcement",
    metric: "Constraint-alignment rate",
    value: "80%",
    status: "watch",
    note: "Above baseline; two pending proposals still await re-scoping.",
  },
];

export const STATUS_META: Record<ScorecardRow["status"], { label: string; color: string }> = {
  good: { label: "On Track", color: "var(--chart-status-good)" },
  watch: { label: "Watch", color: "var(--chart-status-watch)" },
  critical: { label: "At Risk", color: "var(--chart-status-critical)" },
};

export const retailPerformanceScorecardData = {
  headers: ["Stage", "Metric", "Value", "Status", "Note"],
  rows: SCORECARD_ROWS.map((r) => [
    r.stage,
    r.metric,
    r.value,
    STATUS_META[r.status].label,
    r.note,
  ]),
};
