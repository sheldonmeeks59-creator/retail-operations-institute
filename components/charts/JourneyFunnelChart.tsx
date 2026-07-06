"use client";

import { useState } from "react";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { JOURNEY_STAGES as STAGES } from "@/lib/chartData";

const WIDTH = 560;
const ROW_HEIGHT = 52;
const PADDING = { top: 8, bottom: 8, left: 16, right: 16 };
const MAX_WIDTH_FRACTION = 0.86;

export function JourneyFunnelChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const height = PADDING.top + PADDING.bottom + STAGES.length * ROW_HEIGHT;
  const plotWidth = WIDTH - PADDING.left - PADDING.right;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="w-full"
        role="img"
        aria-label="Customer journey retention funnel by stage"
      >
        {STAGES.map((s, i) => {
          const y = PADDING.top + i * ROW_HEIGHT;
          const barHeight = 30;
          const barY = y + (ROW_HEIGHT - barHeight) / 2;
          const barWidth = (s.retained / 100) * plotWidth * MAX_WIDTH_FRACTION;
          const x = PADDING.left + (plotWidth - barWidth) / 2;

          return (
            <g
              key={s.stage}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <rect x={0} y={y} width={WIDTH} height={ROW_HEIGHT} fill="transparent" />
              <rect x={x} y={barY} width={barWidth} height={barHeight} rx={4} fill={s.color} />
              <text
                x={WIDTH / 2}
                y={barY + barHeight / 2 - 6}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill="#ffffff"
              >
                {s.stage}
              </text>
              <text
                x={WIDTH / 2}
                y={barY + barHeight / 2 + 9}
                textAnchor="middle"
                fontSize={11}
                fill="#ffffff"
              >
                {s.retained}%
              </text>
            </g>
          );
        })}
      </svg>

      {hovered !== null ? (
        <ChartTooltip
          xPercent={72}
          yPercent={((PADDING.top + hovered * ROW_HEIGHT) / height) * 100}
          title={STAGES[hovered].stage}
          rows={[
            { label: "Customers retained", value: `${STAGES[hovered].retained}%`, color: STAGES[hovered].color },
            ...(hovered > 0
              ? [
                  {
                    label: "Drop-off from prior stage",
                    value: `-${STAGES[hovered - 1].retained - STAGES[hovered].retained} pts`,
                  },
                ]
              : []),
          ]}
        />
      ) : null}
    </div>
  );
}
