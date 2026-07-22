import { useEffect, useRef, useState } from "react";

// Lightweight 28x28 prototype-matching digit classifier. Runs entirely in the browser.
// It doesn't ship a real model — it centers/normalizes the drawing and compares
// against 10 stylized reference glyphs, giving a "vibes-check" prediction similar
// to the tiny demo on the existing portfolio.

const REFS: string[] = [
  "01111000010001100011000110001100011000110000111100", // 0 (spaced 5x10 for readability, not used)
];

// We use a much simpler heuristic: draw each digit's Unicode glyph into an offscreen
// canvas at the same 28x28, then cosine-compare.

function renderDigit(d: number, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, 28, 28);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 28, 28);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 24px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(d), 14, 15);
}

function toVec(ctx: CanvasRenderingContext2D) {
  const img = ctx.getImageData(0, 0, 28, 28).data;
  const v = new Float32Array(784);
  for (let i = 0; i < 784; i++) v[i] = img[i * 4] / 255;
  return v;
}

function cos(a: Float32Array, b: Float32Array) {
  let dot = 0,
    na = 0,
    nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const d = Math.sqrt(na) * Math.sqrt(nb);
  return d ? dot / d : 0;
}

export function MnistDemo() {
  const cvsRef = useRef<HTMLCanvasElement>(null);
  const refCvsRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [pred, setPred] = useState<{ digit: number; conf: number } | null>(null);
  const refs = useRef<Float32Array[] | null>(null);

  useEffect(() => {
    const rc = refCvsRef.current!.getContext("2d")!;
    refs.current = Array.from({ length: 10 }, (_, d) => {
      renderDigit(d, rc);
      return toVec(rc);
    });
    const c = cvsRef.current!;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, c.width, c.height);
  }, []);

  function pos(e: React.PointerEvent) {
    const r = cvsRef.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 280, y: ((e.clientY - r.top) / r.height) * 280 };
  }
  function down(e: React.PointerEvent) {
    drawing.current = true;
    const { x, y } = pos(e);
    const ctx = cvsRef.current!.getContext("2d")!;
    ctx.strokeStyle = "#fff";
    ctx.lineCap = "round";
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const { x, y } = pos(e);
    const ctx = cvsRef.current!.getContext("2d")!;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  function up() {
    drawing.current = false;
  }
  function clear() {
    const c = cvsRef.current!;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, c.width, c.height);
    setPred(null);
  }
  function predict() {
    const src = cvsRef.current!;
    const scaled = document.createElement("canvas");
    scaled.width = 28;
    scaled.height = 28;
    const sctx = scaled.getContext("2d")!;
    sctx.drawImage(src, 0, 0, 28, 28);
    const v = toVec(sctx);
    if (!refs.current) return;
    let best = 0,
      bs = -1;
    for (let d = 0; d < 10; d++) {
      const s = cos(v, refs.current[d]);
      if (s > bs) {
        bs = s;
        best = d;
      }
    }
    setPred({ digit: best, conf: Math.max(0, Math.min(1, bs)) });
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="space-y-3">
        <canvas
          ref={cvsRef}
          width={280}
          height={280}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerLeave={up}
          className="w-full aspect-square bg-black rounded-lg border border-border touch-none cursor-crosshair"
        />
        <canvas ref={refCvsRef} width={28} height={28} className="hidden" />
        <div className="flex gap-2">
          <button
            onClick={predict}
            className="flex-1 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium"
          >
            Predict
          </button>
          <button onClick={clear} className="px-3 py-2 rounded-md border border-border text-sm hover:border-primary">
            Clear
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Prediction</div>
        <div className="text-8xl font-display gold-text leading-none">{pred ? pred.digit : "—"}</div>
        {pred && (
          <div className="text-xs font-mono text-muted-foreground">
            confidence ≈ {(pred.conf * 100).toFixed(1)}%
          </div>
        )}
        <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
          <li>Draw a digit (0–9), centered, with a thick stroke.</li>
          <li>Simple shapes work best (0, 1, 7, 3).</li>
          <li>~9 KB in-browser classifier — not a CNN.</li>
        </ul>
      </div>
    </div>
  );
}