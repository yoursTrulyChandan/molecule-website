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
  const padT = 30;
  const padB = 80;
  const w = chartW - padL - padR;
  const h = chartH - padT - padB;

  const range = maxV - minV;
  const yTicks: number[] = [];
  for (let v = minV; v <= maxV; v += 10) yTicks.push(v);

  const y = (v: number) => padT + h - ((v - minV) / range) * h;
  const zeroY = y(0);

  const groupW = w / data.length;
  const barW = groupW * 0.35;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full min-w-175" style={{ fontFamily: "inherit" }}>
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={padL} y1={y(t)} x2={chartW - padR} y2={y(t)} stroke={t === 0 ? "#333" : "#e0e0e0"} strokeWidth={t === 0 ? 1.5 : 1} />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#888">{t}</text>
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
              <rect x={px} y={pY} width={barW} height={pH} fill="#1e6fad" />
              <text x={px + barW / 2} y={d.qtrPortfolio >= 0 ? pY - 4 : pY + pH + 12} textAnchor="middle" fontSize={9} fill="#1e6fad" fontWeight="bold">
                {d.qtrPortfolio}
              </text>

              <rect x={bx} y={bY} width={barW} height={bH} fill="#c0392b" />
              <text x={bx + barW / 2} y={d.qtrBenchmark >= 0 ? bY - 4 : bY + bH + 12} textAnchor="middle" fontSize={9} fill="#c0392b" fontWeight="bold">
                {d.qtrBenchmark}
              </text>

              <text
                x={cx}
                y={chartH - padB + 16}
                textAnchor="end"
                fontSize={10}
                fill="#888"
                transform={`rotate(-45, ${cx}, ${chartH - padB + 16})`}
              >
                {d.label}
              </text>
            </g>
          );
        })}

        <rect x={padL + w / 2 - 110} y={8} width={14} height={14} fill="#1e6fad" />
        <text x={padL + w / 2 - 90} y={20} fontSize={12} fill="#333" fontWeight="bold">PORTFOLIO</text>
        <rect x={padL + w / 2 + 30} y={8} width={14} height={14} fill="#c0392b" />
        <text x={padL + w / 2 + 50} y={20} fontSize={12} fill="#333" fontWeight="bold">BSE500TRI</text>
      </svg>
    </div>
  );
}
