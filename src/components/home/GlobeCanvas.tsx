"use client";
import { useEffect, useRef } from "react";

type Vec3 = [number, number, number];

function normalizeVec(v: Vec3): Vec3 {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return [v[0] / len, v[1] / len, v[2] / len];
}

function midpointOnSphere(a: Vec3, b: Vec3): Vec3 {
  return normalizeVec([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]);
}

function generateGeodesicSphere(subdivisions: number) {
  const phi = (1 + Math.sqrt(5)) / 2;

  let vertices: Vec3[] = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
  ].map((v) => normalizeVec(v as Vec3));

  let faces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  for (let s = 0; s < subdivisions; s++) {
    const newFaces: [number, number, number][] = [];
    const midCache = new Map<string, number>();

    const getMid = (a: number, b: number): number => {
      const key = `${Math.min(a, b)}_${Math.max(a, b)}`;
      const cached = midCache.get(key);
      if (cached !== undefined) return cached;
      const mid = midpointOnSphere(vertices[a], vertices[b]);
      const idx = vertices.length;
      vertices.push(mid);
      midCache.set(key, idx);
      return idx;
    };

    for (const [a, b, c] of faces) {
      const ab = getMid(a, b);
      const bc = getMid(b, c);
      const ca = getMid(c, a);
      newFaces.push([a, ab, ca], [ab, b, bc], [ca, bc, c], [ab, bc, ca]);
    }
    faces = newFaces;
  }

  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];

  for (const [a, b, c] of faces) {
    for (const [x, y] of [[a, b], [b, c], [c, a]] as [number, number][]) {
      const key = `${Math.min(x, y)}_${Math.max(x, y)}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([x, y]);
      }
    }
  }

  return { vertices, edges };
}

export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { vertices, edges } = generateGeodesicSphere(3);

    let angleY = 0;
    let rafId: number;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.43;
      const fov = 4.5;

      ctx.clearRect(0, 0, W, H);

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const tilt = 0.18;
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      const pts = vertices.map(([x, y, z]) => {
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const perspScale = fov / (fov + z2 + 1.5);
        return { px: cx + x1 * R * perspScale, py: cy - y2 * R * perspScale, z: z2 };
      });

      for (const [a, b] of edges) {
        const pa = pts[a];
        const pb = pts[b];
        const avgZ = (pa.z + pb.z) / 2;
        const alpha = Math.max(0.04, Math.min(0.38, 0.18 + avgZ * 0.22));
        ctx.beginPath();
        ctx.moveTo(pa.px, pa.py);
        ctx.lineTo(pb.px, pb.py);
        ctx.strokeStyle = `rgba(90, 110, 130, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      for (const p of pts) {
        const alpha = Math.max(0.12, Math.min(0.95, 0.45 + p.z * 0.55));
        const perspScale = fov / (fov + p.z + 1.5);
        ctx.beginPath();
        ctx.arc(p.px, p.py, 2.8 * perspScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 50, 70, ${alpha})`;
        ctx.fill();
      }

      angleY += 0.003;
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Use explicit viewport-unit sizing — no Tailwind flex conflicts
  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={700}
      style={{
        display: "block",
        width: "min(44vw, 640px)",
        height: "min(44vw, 640px)",
      }}
    />
  );
}
