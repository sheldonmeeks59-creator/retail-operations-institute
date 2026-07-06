import { cn } from "@/lib/utils";
import type { DecisionOption } from "@/types/content";

export function DecisionMatrix({ options }: { options: DecisionOption[] }) {
  return (
    <div className="my-8 overflow-x-auto rounded-sm border border-line">
      <table className="w-full min-w-[40rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-paper-raised text-left text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-4 py-3 font-semibold">Option</th>
            <th className="px-4 py-3 font-semibold">Cost</th>
            <th className="px-4 py-3 font-semibold">Impact</th>
            <th className="px-4 py-3 font-semibold">Time to Value</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option) => (
            <tr
              key={option.option}
              className={cn(
                "border-b border-line last:border-0",
                option.recommended && "bg-gold-100/40",
              )}
            >
              <td className="px-4 py-3 font-medium text-ink">
                {option.option}
                {option.recommended ? (
                  <span className="ml-2 rounded-sm bg-gold-500 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy-950">
                    Recommended
                  </span>
                ) : null}
              </td>
              <td className="px-4 py-3 text-ink-muted">{option.cost}</td>
              <td className="px-4 py-3 text-ink-muted">{option.impact}</td>
              <td className="px-4 py-3 text-ink-muted">{option.timeToValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
