import { useEffect, useRef, useState } from "react";

type P = { x: number; y: number; c: number };
const K = 3;
const COLORS = ["#c9a84c", "#8ab4f8", "#f28b82"];

function seed(): P[] {
  const pts: P[] = [];
  for (let g = 0; g < 3; g++) {
    const cx = 60 + Math.random() * 280;
    const cy = 40 + Math.random() * 200;
    for (let i = 0; i < 30; i++) {
      pts.push({
        x: cx + (Math.random() - 0.5) * 90,
        y: cy + (Math.random() - 0.5) * 90,
        c: -1,
      });
    }
  }
  return pts;
}

export function KMeansDemo() {
  const [pts, setPts] = useState<P[]>(seed);
  const [cents, setCents] = useState(() =>
    Array.from({ length: K }, () => ({ x: 50 + Math.random() * 300, y: 40 + Math.random() * 200 })),
  );
  const [iter, setIter] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [running, setRunning] = useState(false);

  function step() {
    const assigned = pts.map((p) => {
      let best = 0;
      let bd = Infinity;
      for (let k = 0; k < K; k++) {
        const d = (p.x - cents[k].x) ** 2 + (p.y - cents[k].y) ** 2;
        if (d < bd) {
          bd = d;
          best = k;
        }
      }
      return { ...p, c: best };
    });
    const next = cents.map((_, k) => {
      const mine = assigned.filter((p) => p.c === k);
      if (!mine.length) return cents[k];
      return {
        x: mine.reduce((s, p) => s + p.x, 0) / mine.length,
        y: mine.reduce((s, p) => s + p.y, 0) / mine.length,
      };
    });
    setPts(assigned);
    setCents(next);
    setIter((i) => i + 1);
  }

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(step, 500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  });

  function reset() {
    setRunning(false);
    setPts(seed());
    setCents(Array.from({ length: K }, () => ({ x: 50 + Math.random() * 300, y: 40 + Math.random() * 200 })));
    setIter(0);
  }

  return (
    <div className="space-y-4">
      <svg
        viewBox="0 0 400 260"
        className="w-full border border-border rounded-lg bg-background/40"
        role="img"
        aria-label="K-means clustering visualization"
      >
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={p.c >= 0 ? COLORS[p.c] : "#666"} opacity={0.8} />
        ))}
        {cents.map((c, k) => (
          <g key={k}>
            <circle cx={c.x} cy={c.y} r={10} fill="none" stroke={COLORS[k]} strokeWidth={2} />
            <circle cx={c.x} cy={c.y} r={4} fill={COLORS[k]} />
          </g>
        ))}
      </svg>
      <div className="flex gap-2 flex-wrap items-center text-xs font-mono text-muted-foreground">
        <span>iter: {iter}</span>
        <span>k = 3</span>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setRunning((r) => !r)}
            className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground"
          >
            {running ? "Pause" : "Run"}
          </button>
          <button onClick={step} className="px-3 py-1.5 rounded-md border border-border hover:border-primary">
            Step
          </button>
          <button onClick={reset} className="px-3 py-1.5 rounded-md border border-border hover:border-primary">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}