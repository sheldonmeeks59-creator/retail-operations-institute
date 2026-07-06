"use client";

import { useState } from "react";
import { ChartLegend } from "@/components/charts/ChartLegend";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { PRODUCTIVITY_MONTHS as MONTHS, PRODUCTIVITY_SERIES as SERIES } from "@/lib/chartData";

const WIDTH = 560;
const HEIGHT = 260;
const PADDING = { top: 16, right: 16, bottom: 32, left: 34 };
const MIN_INDEX = 84;
const MAX_INDEX = 112;

export function ProductivityLeversChart() {
  const [hovered, setHovered] = useState<number | null>(null);

  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;

  const xFor = (i: number) => PADDING.left + (i / (MONTHS.length - 1)) * plotWidth;
  const yFor = (v: number) =>
    PADDING.top + plotHeight - ((v - MIN_INDEX) / (MAX_INDEX - MIN_INDEX)) * plotHeight;

  const gridValues = [90, 100, 110];

  return (
    <div className="relative">
      <ChartLegend items={SERIES.map((s) => ({ label: s.label, color: s.color }))} />
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mt-3 w-full"
        role="img"
        aria-label="Indexed trend of labor efficiency, customer flow, and output"
      >
        {gridValues.map((v) => (
          <g key={v}>
            <line
              x1={PADDING.left}
              y1={yFor(v)}
              x2={WIDTH - PADDING.right}
              y2={yFor(v)}
              stroke="var(--chart-grid)"
              strokeWidth={1}
            />
            <text x={4} y={yFor(v) + 3} fontSize={10} fill="var(--chart-ink-muted)">
              {v}
            </text>
          </g>
        ))}

        {MONTHS.map((m, i) => (
          <rect
            key={m}
            x={xFor(i) - plotWidth / (MONTHS.length - 1) / 2}
            y={PADDING.top}
            width={plotWidth / (MONTHS.length - 1)}
            height={plotHeight}
            fill="transparent"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}

        {SERIES.map((s) => (
          <path
            key={s.key}
            d={s.values.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ")}
            fill="none"
            stroke={s.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {SERIES.map((s) =>
          s.values.map((v, i) => (
            <circle
              key={`${s.key}-${i}`}
              cx={xFor(i)}
              cy={yFor(v)}
              r={hovered === i ? 5 : 4}
              fill={s.color}
              stroke="var(--chart-surface)"
              strokeWidth={2}
            />
          )),
        )}

        {hovered !== null ? (
          <line
            x1={xFor(hovered)}
            y1={PADDING.top}
            x2={xFor(hovered)}
            y2={PADDING.top + plotHeight}
            stroke="var(--chart-axis)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        ) : null}

        {MONTHS.map((m, i) => (
          <text
            key={m}
            x={xFor(i)}
            y={HEIGHT - 10}
            textAnchor="middle"
            fontSize={10}
            fill="var(--chart-ink-secondary)"
          >
            {m}
          </text>
        ))}
      </svg>

      {hovered !== null ? (
        <ChartTooltip
          xPercent={(xFor(hovered) / WIDTH) * 100}
          yPercent={(PADDING.top / HEIGHT) * 100}
          title={`Month ${hovered + 1} (indexed to 100)`}
          rows={SERIES.map((s) => ({
            label: s.label,
            value: String(s.values[hovered]),
            color: s.color,
          }))}
        />
      ) : null}
    </div>
  );
}
