"use client";

import { useState } from "react";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { FLYWHEEL_STAGES as STAGES } from "@/lib/chartData";

const WIDTH = 560;
const HEIGHT = 260;
const PADDING = { top: 16, right: 16, bottom: 46, left: 16 };
const BAR_GAP = 18;
const MAX_SCORE = 100;

export function FlywheelStageChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const constraintIndex = STAGES.reduce(
    (minIdx, s, i, arr) => (s.score < arr[minIdx].score ? i : minIdx),
    0,
  );

  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const barWidth = (plotWidth - BAR_GAP * (STAGES.length - 1)) / STAGES.length;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Flywheel stage health scores">
        <line
          x1={PADDING.left}
          y1={PADDING.top + plotHeight}
          x2={WIDTH - PADDING.right}
          y2={PADDING.top + plotHeight}
          stroke="var(--chart-axis)"
          strokeWidth={1}
        />
        {STAGES.map((s, i) => {
          const x = PADDING.left + i * (barWidth + BAR_GAP);
          const barHeight = (s.score / MAX_SCORE) * plotHeight;
          const y = PADDING.top + plotHeight - barHeight;
          const isConstraint = i === constraintIndex;
          const color = isConstraint ? "var(--chart-status-critical)" : "var(--chart-series-1)";

          return (
            <g
              key={s.stage}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-default"
            >
              <rect x={x} y={PADDING.top} width={barWidth} height={plotHeight} fill="transparent" />
              <rect x={x} y={y} width={barWidth} height={barHeight} rx={4} fill={color} />
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill="var(--chart-ink-primary)"
              >
                {s.score}
              </text>
              <text
                x={x + barWidth / 2}
                y={PADDING.top + plotHeight + 16}
                textAnchor="middle"
                fontSize={10}
                fill="var(--chart-ink-secondary)"
              >
                {s.stage.split(" ")[0]}
              </text>
              <text
                x={x + barWidth / 2}
                y={PADDING.top + plotHeight + 28}
                textAnchor="middle"
                fontSize={10}
                fill="var(--chart-ink-secondary)"
              >
                {s.stage.split(" ").slice(1).join(" ")}
              </text>
              {isConstraint ? (
                <text
                  x={x + barWidth / 2}
                  y={PADDING.top + plotHeight + 40}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight={700}
                  fill="var(--chart-status-critical)"
                >
                  BINDING CONSTRAINT
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      {hovered !== null ? (
        <ChartTooltip
          xPercent={
            ((PADDING.left + hovered * (barWidth + BAR_GAP) + barWidth / 2) / WIDTH) * 100
          }
          yPercent={(PADDING.top / HEIGHT) * 100 + 8}
          title={STAGES[hovered].stage}
          rows={[
            {
              label: "Stage health score",
              value: `${STAGES[hovered].score} / 100`,
              color:
                hovered === constraintIndex
                  ? "var(--chart-status-critical)"
                  : "var(--chart-series-1)",
            },
          ]}
        />
      ) : null}
    </div>
  );
}
