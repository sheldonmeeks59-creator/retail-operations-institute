import { DashboardFrame } from "@/components/charts/DashboardFrame";
import { DashboardPanel } from "@/components/charts/DashboardPanel";
import { KpiRow } from "@/components/content/KpiRow";
import { FlywheelStageChart } from "@/components/charts/FlywheelStageChart";
import { FrictionBreakdownChart } from "@/components/charts/FrictionBreakdownChart";

export function ExecutiveOperatingDashboard() {
  return (
    <DashboardFrame
      title="Executive Operating Review"
      purpose="Monthly leadership view organized around the operating loop's binding constraint, replacing function-by-function dashboard sprawl."
      insight="Associate Productivity is the binding constraint this month, and Labor Friction is its largest addressable driver — capital and management attention should follow that chain, not the loudest function in the room."
    >
      <KpiRow
        items={[
          { label: "Sales per labor hour", value: "+9.4%", delta: "vs. prior quarter" },
          { label: "Customer flow index", value: "94.2", delta: "-3.1 pts vs. target" },
          { label: "Output index", value: "101.5", delta: "on plan" },
        ]}
      />

      <DashboardPanel title="Binding Constraint View — Retail Flywheel Dynamics">
        <FlywheelStageChart />
      </DashboardPanel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardPanel title="Operational Friction by Category">
          <FrictionBreakdownChart />
        </DashboardPanel>
        <DashboardPanel title="This Month's Priority Actions">
          <ul className="space-y-3 text-sm text-ink-muted">
            <li className="flex gap-2">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
              Reallocate labor hours toward Associate Productivity&apos;s highest-friction stores first.
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
              Defer capital requests that do not target the current binding constraint.
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
              Re-measure the constraint at next month&apos;s review, not the individual initiative KPIs.
            </li>
          </ul>
        </DashboardPanel>
      </div>
    </DashboardFrame>
  );
}
