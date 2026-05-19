"use client";

import type { PerformanceEntry } from "@/lib/performance-storage";

interface Props {
  data: PerformanceEntry[];
}

export default function QuarterlyChart({ data }: Props) {
  const allVals = data.flatMap((d) => [d.qtrPortfolio, d.qtrBenchmark]);
  const maxV = Math.ceil(Math.max(...allVals) / 10) * 10;
  const minV = Math.floor(Math.min(...allVals) / 10) * 10;

  const chartW = 900;
  const chartH = 380;
  const padL = 50;
  const padR = 20;
  const padT = 10;
  const padB = 80;
  const w = chartW - padL - padR;
  const h = chartH - padT - padB;

  const range = maxV - minV;
  const yTicks: number[] = [];
  for (let v = minV; v <= maxV; v += 10) yTicks.push(v);

  const y = (v: number) => padT + h - ((v - minV) / range) * h;
  const zeroY = y(0);

  const groupW = w / data.length;
  const barW = groupW * 0.25;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-center items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 sm:w-4 h-3 sm:h-4 rounded bg-[#4285F4]" />
          <span className="text-sm sm:font-semibold text-gray-600">PORTFOLIO</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 sm:w-4 h-3 sm:h-4 rounded bg-[#EA4335]" />
          <span className="text-sm sm:font-semibold text-gray-600">BSE500TRI</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full min-w-full sm:min-w-120" style={{ fontFamily: "inherit" }}>
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={padL} y1={y(t)} x2={chartW - padR} y2={y(t)} stroke={t === 0 ? "#333" : "#e0e0e0"} strokeWidth={1.5} />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize={16} fill="#000">{t}</text>
          </g>
        ))}

        {data.map((d, i) => {
          const cx = padL + groupW * i + groupW / 2;
          const px = cx - barW - 1;
          const bx = cx + 1;

          const pY = d.qtrPortfolio >= 0 ? y(d.qtrPortfolio) : zeroY;
          const pH = Math.abs(y(d.qtrPortfolio) - zeroY);
          const bY = d.qtrBenchmark >= 0 ? y(d.qtrBenchmark) : zeroY;
          const bH = Math.abs(y(d.qtrBenchmark) - zeroY);

          return (
            <g key={i}>
              <rect x={px} y={pY} width={barW} height={pH} fill="#4285F4" rx={3} />
              <text x={px + barW / 2} y={d.qtrPortfolio >= 0 ? pY - 12 : pY + pH + 18} textAnchor="middle" fontSize={14} fill="#4285F4" fontWeight="bold" stroke="white" strokeWidth={4} paintOrder="stroke">
                {d.qtrPortfolio}
              </text>

              <rect x={bx} y={bY} width={barW} height={bH} fill="#EA4335" rx={3} />
              <text x={bx + barW / 2} y={d.qtrBenchmark >= 0 ? bY - 12 : bY + bH + 18} textAnchor="middle" fontSize={14} fill="#EA4335" fontWeight="bold" stroke="white" strokeWidth={4} paintOrder="stroke">
                {d.qtrBenchmark}
              </text>

              <text
                x={cx}
                y={chartH - padB + 16}
                textAnchor="end"
                fontSize={16}
                fill="#000"
                transform={`rotate(-45, ${cx}, ${chartH - padB + 16})`}
              >
                {d.label}
              </text>
            </g>
          );
        })}

      </svg>
    </div>
  );
}
