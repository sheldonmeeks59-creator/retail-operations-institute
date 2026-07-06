import { DashboardFrame } from "@/components/charts/DashboardFrame";
import { DashboardPanel } from "@/components/charts/DashboardPanel";
import { KpiRow } from "@/components/content/KpiRow";
import { CapitalDecisionGridChart } from "@/components/charts/CapitalDecisionGridChart";

export function CapitalPortfolioDashboard() {
  return (
    <DashboardFrame
      title="Capital Committee — Constraint-Aligned Portfolio"
      purpose="Portfolio-level view for the capital allocation committee, sequencing proposed initiatives by cost and impact after the constraint-alignment gate."
      insight="Three quick wins cluster in the low-cost, high-impact quadrant and should be funded first; the highest-cost items (layout redesign, added lanes) only earn strategic-bet status if they still target the binding constraint after quick wins are exhausted."
    >
      <KpiRow
        items={[
          { label: "Constraint-alignment rate", value: "80%", delta: "+38 pts vs. baseline" },
          { label: "Realized lift per capital $", value: "2.1x", delta: "improved" },
          { label: "Dead-end capital share", value: "12%", delta: "-41% vs. baseline" },
        ]}
      />

      <DashboardPanel title="Cost vs. Impact — Retail Value Creation Matrix">
        <CapitalDecisionGridChart />
      </DashboardPanel>

      <DashboardPanel title="Committee Sequencing Rule">
        <p className="text-sm leading-relaxed text-ink-muted">
          Fund quick wins in full before releasing budget to any strategic bet.
          A strategic bet is only added to the queue once it has passed the
          constraint-alignment gate — cost and impact are evaluated second, not
          first.
        </p>
      </DashboardPanel>
    </DashboardFrame>
  );
}
