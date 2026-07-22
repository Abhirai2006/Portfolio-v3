import { useState } from "react";

function makeArr() {
  const a: number[] = [];
  let cur = 2;
  for (let i = 0; i < 20; i++) {
    cur += Math.floor(Math.random() * 8) + 1;
    a.push(cur);
  }
  return a;
}

export function BinarySearchDemo() {
  const [arr, setArr] = useState(makeArr);
  const [target, setTarget] = useState(() => arr[Math.floor(Math.random() * arr.length)]);
  const [lo, setLo] = useState(0);
  const [hi, setHi] = useState(arr.length - 1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(false);
  const [done, setDone] = useState(false);

  function reset(nextArr = arr) {
    setArr(nextArr);
    const t = nextArr[Math.floor(Math.random() * nextArr.length)];
    setTarget(t);
    setLo(0);
    setHi(nextArr.length - 1);
    setMid(-1);
    setFound(false);
    setDone(false);
  }

  function step() {
    if (done) return;
    if (lo > hi) {
      setDone(true);
      return;
    }
    const m = Math.floor((lo + hi) / 2);
    setMid(m);
    if (arr[m] === target) {
      setFound(true);
      setDone(true);
    } else if (arr[m] < target) setLo(m + 1);
    else setHi(m - 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 flex-wrap p-3 border border-border rounded-lg bg-background/40">
        {arr.map((v, i) => {
          const inRange = i >= lo && i <= hi;
          const isMid = i === mid;
          const isTarget = done && found && i === mid;
          return (
            <div
              key={i}
              className={`h-10 min-w-10 flex-1 rounded flex items-center justify-center text-xs font-mono transition-all ${
                isTarget
                  ? "bg-primary text-primary-foreground scale-110"
                  : isMid
                    ? "bg-primary/60 text-primary-foreground"
                    : inRange
                      ? "bg-muted text-foreground"
                      : "bg-muted/30 text-muted-foreground/40 line-through"
              }`}
            >
              {v}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 items-center text-xs font-mono text-muted-foreground">
        <span>target = <b className="text-primary">{target}</b></span>
        <span>lo={lo}</span>
        <span>hi={hi}</span>
        <span>mid={mid < 0 ? "—" : mid}</span>
        {done && (
          <span className={found ? "text-primary" : "text-destructive"}>
            {found ? "found ✓" : "not found ✗"}
          </span>
        )}
        <div className="ml-auto flex gap-2">
          <button
            onClick={step}
            disabled={done}
            className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground disabled:opacity-40"
          >
            Step →
          </button>
          <button
            onClick={() => reset(makeArr())}
            className="px-3 py-1.5 rounded-md border border-border hover:border-primary"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}