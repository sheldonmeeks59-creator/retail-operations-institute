import { Compass, Building2, Gauge, Workflow, Network, Footprints, RefreshCcw } from "lucide-react";
import type { FocusArea, FocusAreaIcon } from "@/lib/profile";

const icons: Record<FocusAreaIcon, React.ComponentType<{ className?: string }>> = {
  Compass,
  Building2,
  Gauge,
  Workflow,
  Network,
  Footprints,
  RefreshCcw,
};

export function FocusAreaCard({ area }: { area: FocusArea }) {
  const Icon = icons[area.icon];

  return (
    <div className="rounded-sm border border-line bg-paper-raised p-6 transition-colors hover:border-navy-700">
      <div className="flex size-10 items-center justify-center rounded-sm bg-gold-100">
        <Icon className="size-5 text-gold-600" aria-hidden />
      </div>
      <h3 className="font-serif-display mt-4 text-lg font-semibold text-navy-950">
        {area.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{area.description}</p>
    </div>
  );
}
