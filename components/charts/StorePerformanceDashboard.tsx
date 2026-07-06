import { DashboardFrame } from "@/components/charts/DashboardFrame";
import { DashboardPanel } from "@/components/charts/DashboardPanel";
import { KpiRow } from "@/components/content/KpiRow";
import { LaborAlignmentGapChart } from "@/components/charts/LaborAlignmentGapChart";
import { JourneyFunnelChart } from "@/components/charts/JourneyFunnelChart";
import { ProductivityLeversChart } from "@/components/charts/ProductivityLeversChart";

export function StorePerformanceDashboard() {
  return (
    <DashboardFrame
      title="Store Performance — Labor & Customer Flow"
      purpose="A single-store (or store-cluster) working view for regional operations, combining staffing alignment, journey retention, and the three productivity levers."
      insight="The staffing curve under-covers the 5–7pm demand peak by a wide margin, and that same window is where journey retention drops fastest — the two views point to the same root cause rather than two separate problems."
    >
      <KpiRow
        items={[
          { label: "Peak-hour coverage ratio", value: "0.71", delta: "+0.17 vs. baseline" },
          { label: "Weekend conversion", value: "+5.8%", delta: "improved" },
        ]}
      />

      <DashboardPanel title="Demand vs. Staffing Curve — Labor-Capacity Alignment Model">
        <LaborAlignmentGapChart />
      </DashboardPanel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardPanel title="Customer Journey Retention">
          <JourneyFunnelChart />
        </DashboardPanel>
        <DashboardPanel title="Productivity Levers, Indexed">
          <ProductivityLeversChart />
        </DashboardPanel>
      </div>
    </DashboardFrame>
  );
}
