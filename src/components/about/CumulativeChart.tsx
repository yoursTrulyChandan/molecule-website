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
      <div className="flex justify-center items-center gap-6 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#4285F4]" />
          <span className="text-base font-semibold text-gray-600">PORTFOLIO</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#EA4335]" />
          <span className="text-base font-semibold text-gray-600">BSE500TRI</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full min-w-120" style={{ fontFamily: "inherit" }}>
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={padL} y1={y(t)} x2={chartW - padR} y2={y(t)} stroke="#e0e0e0" strokeWidth={2} />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize={16} fill="#000000">{t}</text>
          </g>
        ))}

        <path d={line("cumPortfolio")} fill="none" stroke="#4285F4" strokeWidth={5} />
        {data.map((d, i) => (
          <g key={`p-${i}`}>
            <circle cx={x(i)} cy={y(d.cumPortfolio)} r={5} fill="#4285F4" />
            <text x={x(i)} y={y(d.cumPortfolio) - 10} textAnchor="middle" fontSize={16} fill="#4285F4" fontWeight="bold">
              {d.cumPortfolio}
            </text>
          </g>
        ))}

        <path d={line("cumBenchmark")} fill="none" stroke="#EA4335" strokeWidth={5} />
        {data.map((d, i) => (
          <g key={`b-${i}`}>
            <circle cx={x(i)} cy={y(d.cumBenchmark)} r={5} fill="#EA4335" />
            <text x={x(i)} y={y(d.cumBenchmark) + 18} textAnchor="middle" fontSize={16} fill="#EA4335" fontWeight="bold">
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
            fontSize={16}
            fill="#000"
            transform={`rotate(-45, ${x(i)}, ${chartH - padB + 16})`}
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
