"use client";

import type { PerformanceEntry } from "@/lib/performance-storage";

interface Props {
  data: PerformanceEntry[];
}

export default function CumulativeChart({ data }: Props) {
  const maxVal = Math.max(...data.map((d) => Math.max(d.cumPortfolio, d.cumBenchmark)));
  const chartH = 350;
  const chartW = 900;
  const padL = 50;
  const padR = 20;
  const padT = 30;
  const padB = 80;
  const w = chartW - padL - padR;
  const h = chartH - padT - padB;

  const yMax = Math.ceil(maxVal / 50) * 50;
  const yTicks = Array.from({ length: yMax / 50 + 1 }, (_, i) => i * 50);

  const x = (i: number) => padL + (i / (data.length - 1)) * w;
  const y = (v: number) => padT + h - (v / yMax) * h;

  const line = (key: "cumPortfolio" | "cumBenchmark") =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d[key])}`).join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full min-w-175" style={{ fontFamily: "inherit" }}>
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={padL} y1={y(t)} x2={chartW - padR} y2={y(t)} stroke="#e0e0e0" strokeWidth={1} />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#888">{t}</text>
          </g>
        ))}

        <path d={line("cumPortfolio")} fill="none" stroke="#1e6fad" strokeWidth={2.5} />
        {data.map((d, i) => (
          <g key={`p-${i}`}>
            <circle cx={x(i)} cy={y(d.cumPortfolio)} r={4} fill="#1e6fad" />
            <text x={x(i)} y={y(d.cumPortfolio) - 10} textAnchor="middle" fontSize={10} fill="#1e6fad" fontWeight="bold">
              {d.cumPortfolio}
            </text>
          </g>
        ))}

        <path d={line("cumBenchmark")} fill="none" stroke="#c0392b" strokeWidth={2.5} />
        {data.map((d, i) => (
          <g key={`b-${i}`}>
            <circle cx={x(i)} cy={y(d.cumBenchmark)} r={4} fill="#c0392b" />
            <text x={x(i)} y={y(d.cumBenchmark) + 18} textAnchor="middle" fontSize={10} fill="#c0392b" fontWeight="bold">
              {d.cumBenchmark}
            </text>
          </g>
        ))}

        {data.map((d, i) => (
          <text
            key={`x-${i}`}
            x={x(i)}
            y={chartH - padB + 16}
            textAnchor="end"
            fontSize={10}
            fill="#888"
            transform={`rotate(-45, ${x(i)}, ${chartH - padB + 16})`}
          >
            {d.label}
          </text>
        ))}

        <circle cx={padL + w / 2 - 100} cy={16} r={6} fill="#1e6fad" />
        <text x={padL + w / 2 - 88} y={20} fontSize={12} fill="#333" fontWeight="bold">PORTFOLIO</text>
        <circle cx={padL + w / 2 + 30} cy={16} r={6} fill="#c0392b" />
        <text x={padL + w / 2 + 42} y={20} fontSize={12} fill="#333" fontWeight="bold">BSE500TRI</text>
      </svg>
    </div>
  );
}
