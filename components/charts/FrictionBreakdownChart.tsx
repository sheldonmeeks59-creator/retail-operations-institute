"use client";

import { useState } from "react";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { FRICTION_CATEGORIES as CATEGORIES } from "@/lib/chartData";

const WIDTH = 560;
const ROW_HEIGHT = 44;
const PADDING = { top: 8, right: 48, bottom: 8, left: 148 };
const MAX_SCORE = 80;

export function FrictionBreakdownChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const height = PADDING.top + PADDING.bottom + CATEGORIES.length * ROW_HEIGHT;
  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const maxScore = Math.max(...CATEGORIES.map((c) => c.score));

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="w-full"
        role="img"
        aria-label="Operational friction score by category"
      >
        {CATEGORIES.map((c, i) => {
          const y = PADDING.top + i * ROW_HEIGHT;
          const barWidth = (c.score / MAX_SCORE) * plotWidth;
          const isTop = c.score === maxScore;
          const barHeight = 22;
          const barY = y + (ROW_HEIGHT - barHeight) / 2;

          return (
            <g
              key={c.category}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <rect x={0} y={y} width={WIDTH} height={ROW_HEIGHT} fill="transparent" />
              <text
                x={PADDING.left - 12}
                y={y + ROW_HEIGHT / 2 + 4}
                textAnchor="end"
                fontSize={12}
                fill="var(--chart-ink-secondary)"
              >
                {c.category}
              </text>
              <rect
                x={PADDING.left}
                y={barY}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill={isTop ? "var(--chart-status-critical)" : "var(--chart-series-1)"}
              />
              <text
                x={PADDING.left + barWidth + 10}
                y={y + ROW_HEIGHT / 2 + 4}
                fontSize={12}
                fontWeight={600}
                fill="var(--chart-ink-primary)"
              >
                {c.score}
              </text>
            </g>
          );
        })}
      </svg>

      {hovered !== null ? (
        <ChartTooltip
          xPercent={60}
          yPercent={((PADDING.top + hovered * ROW_HEIGHT) / height) * 100}
          title={CATEGORIES[hovered].category}
          rows={[
            {
              label: "Friction score",
              value: `${CATEGORIES[hovered].score} / 100`,
              color:
                CATEGORIES[hovered].score === maxScore
                  ? "var(--chart-status-critical)"
                  : "var(--chart-series-1)",
            },
          ]}
        />
      ) : null}
    </div>
  );
}
