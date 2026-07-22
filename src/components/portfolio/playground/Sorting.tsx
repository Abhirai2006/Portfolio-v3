import { useEffect, useRef, useState } from "react";

function rand(n: number) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
}

async function bubble(arr: number[], step: (a: number[], i: number, j: number) => Promise<void>) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      await step(a, j, j + 1);
      if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
    }
  }
  return a;
}

export function SortingDemo() {
  const [arr, setArr] = useState(() => rand(28));
  const [active, setActive] = useState<[number, number]>([-1, -1]);
  const [running, setRunning] = useState(false);
  const speed = useRef(30);

  async function run() {
    if (running) return;
    setRunning(true);
    await bubble(arr, async (a, i, j) => {
      setArr([...a]);
      setActive([i, j]);
      await new Promise((r) => setTimeout(r, speed.current));
    });
    setActive([-1, -1]);
    setRunning(false);
  }

  useEffect(() => () => setRunning(false), []);

  const max = Math.max(...arr);
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-1 h-56 border border-border rounded-lg p-3 bg-background/40">
        {arr.map((v, i) => {
          const on = i === active[0] || i === active[1];
          return (
            <div
              key={i}
              className={`flex-1 rounded-sm transition-colors ${on ? "bg-primary" : "bg-muted-foreground/40"}`}
              style={{ height: `${(v / max) * 100}%` }}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={run}
          disabled={running}
          className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
        >
          {running ? "Sorting…" : "Bubble sort"}
        </button>
        <button
          onClick={() => setArr(rand(28))}
          disabled={running}
          className="px-4 py-1.5 rounded-md border border-border text-sm hover:border-primary"
        >
          Shuffle
        </button>
        <span className="ml-auto text-xs font-mono text-muted-foreground self-center">
          O(n²) · {arr.length} items
        </span>
      </div>
    </div>
  );
}