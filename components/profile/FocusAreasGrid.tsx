import { focusAreas } from "@/lib/profile";
import { FocusAreaCard } from "@/components/profile/FocusAreaCard";

export function FocusAreasGrid() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
        Areas of Focus
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map((area) => (
          <FocusAreaCard key={area.title} area={area} />
        ))}
      </div>
    </div>
  );
}
