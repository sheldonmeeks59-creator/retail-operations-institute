import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChartFrame } from "@/components/charts/ChartFrame";
import { FlywheelStageChart } from "@/components/charts/FlywheelStageChart";
import { ProductivityLeversChart } from "@/components/charts/ProductivityLeversChart";
import { FrictionBreakdownChart } from "@/components/charts/FrictionBreakdownChart";
import { JourneyFunnelChart } from "@/components/charts/JourneyFunnelChart";
import { LaborAlignmentGapChart } from "@/components/charts/LaborAlignmentGapChart";
import { CapitalDecisionGridChart } from "@/components/charts/CapitalDecisionGridChart";
import { ExecutiveOperatingDashboard } from "@/components/charts/ExecutiveOperatingDashboard";
import { StorePerformanceDashboard } from "@/components/charts/StorePerformanceDashboard";
import { CapitalPortfolioDashboard } from "@/components/charts/CapitalPortfolioDashboard";
import { RetailPerformanceScorecard } from "@/components/charts/RetailPerformanceScorecard";
import {
  flywheelStageChartData,
  productivityLeversChartData,
  frictionBreakdownChartData,
  journeyFunnelChartData,
  laborAlignmentGapChartData,
  capitalDecisionGridChartData,
} from "@/lib/chartData";

export const metadata: Metadata = {
  title: "Visual Library",
  description:
    "Consulting-grade charts, dashboards, and a performance scorecard built on the Institute's signature frameworks.",
  alternates: { canonical: "/tools/visual-library" },
};

export default function VisualLibraryPage() {
  return (
    <Container size="wide" className="py-16">
      <PageHeader
        eyebrow="Tools · Visual Library"
        title="Retail operations, visualized"
        dek="Six charts, three dashboard structures, and a unified scorecard — each one a direct visual expression of a signature framework, built with illustrative data and ready to embed."
      />

      <section className="mt-16">
        <h2 className="font-serif-display text-2xl font-semibold text-navy-950">
          Six Charts
        </h2>
        <p className="mt-2 max-w-content text-ink-muted">
          Each chart makes a single operating concept legible at a glance —
          hover any mark for the underlying value, or open the table view for
          the raw data.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartFrame
            title="Flywheel Stage Health"
            purpose="Where Retail Flywheel Dynamics is compounding versus stalling, by stage."
            insight="Associate Productivity scores lowest across the five stages — it is the binding constraint this period, and the stage that should receive capital and management attention before any other."
            tableCaption="Flywheel stage health scores"
            tableHeaders={flywheelStageChartData.headers}
            tableRows={flywheelStageChartData.rows}
          >
            <FlywheelStageChart />
          </ChartFrame>

          <ChartFrame
            title="Store Productivity Levers, Indexed"
            purpose="Labor efficiency, customer flow, and output tracked as three independent series instead of one blended metric, per Store Productivity Architecture."
            insight="Labor efficiency climbed steadily while customer flow dipped and recovered — a blended sales-per-labor-hour figure would have shown a deceptively flat line across the same six months."
            tableCaption="Indexed productivity levers by month"
            tableHeaders={productivityLeversChartData.headers}
            tableRows={productivityLeversChartData.rows}
          >
            <ProductivityLeversChart />
          </ChartFrame>

          <ChartFrame
            title="Operational Friction Breakdown"
            purpose="Friction score by category, per the Operational Friction Index — frequency times time cost, not anecdote."
            insight="Labor friction is nearly double the next-highest category — the roadmap should target scheduling and task design before touching layout or signage."
            tableCaption="Friction score by category"
            tableHeaders={frictionBreakdownChartData.headers}
            tableRows={frictionBreakdownChartData.rows}
          >
            <FrictionBreakdownChart />
          </ChartFrame>

          <ChartFrame
            title="Customer Journey Retention Funnel"
            purpose="Share of customers retained across the four Customer Flow Optimization System stages."
            insight="The steepest drop-off is between Entry and Orientation, not at Commitment (checkout) — an investment in checkout speed would miss the stage actually losing the most customers."
            tableCaption="Customer retention by journey stage"
            tableHeaders={journeyFunnelChartData.headers}
            tableRows={journeyFunnelChartData.rows}
          >
            <JourneyFunnelChart />
          </ChartFrame>

          <ChartFrame
            title="Labor-Capacity Alignment Gap"
            purpose="Hourly demand versus staffing curve, per the Labor-Capacity Alignment Model — the shaded gap is the alignment problem."
            insight="Staffing tracks a nearly flat curve while demand peaks sharply at 7pm — the gap is a scheduling-shape problem, not a total-hours problem."
            tableCaption="Hourly demand vs. staffing index"
            tableHeaders={laborAlignmentGapChartData.headers}
            tableRows={laborAlignmentGapChartData.rows}
          >
            <LaborAlignmentGapChart />
          </ChartFrame>

          <ChartFrame
            title="Capital Decision Grid"
            purpose="Initiatives plotted by cost and impact, per the Retail Value Creation Matrix — gold marks are constraint-aligned quick wins."
            insight="Three low-cost, high-impact initiatives cluster in the quick-win quadrant; the costliest options only belong in the queue if they still target the binding constraint."
            tableCaption="Initiatives by cost and impact"
            tableHeaders={capitalDecisionGridChartData.headers}
            tableRows={capitalDecisionGridChartData.rows}
          >
            <CapitalDecisionGridChart />
          </ChartFrame>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-serif-display text-2xl font-semibold text-navy-950">
          Three Dashboards
        </h2>
        <p className="mt-2 max-w-content text-ink-muted">
          Conceptual structures — how the charts above compose into the
          working views three different audiences would actually use.
        </p>

        <div className="mt-8 space-y-10">
          <ExecutiveOperatingDashboard />
          <StorePerformanceDashboard />
          <CapitalPortfolioDashboard />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-serif-display text-2xl font-semibold text-navy-950">
          Retail Performance Scorecard
        </h2>
        <p className="mt-2 max-w-content text-ink-muted">
          A single-page, RAG-status view across all five Retail Flywheel
          Dynamics stages — the model every dashboard above ultimately rolls
          up to.
        </p>
        <div className="mt-8">
          <RetailPerformanceScorecard />
        </div>
        <p className="mt-5 max-w-content text-sm leading-relaxed text-ink-muted">
          <span className="font-semibold text-navy-800">Insight: </span>
          Associate Productivity is the only stage at risk; both watch-status
          stages (Customer Experience, Capital Reinforcement) are trailing
          effects of that same constraint, not independent problems requiring
          separate initiatives.
        </p>
      </section>
    </Container>
  );
}
