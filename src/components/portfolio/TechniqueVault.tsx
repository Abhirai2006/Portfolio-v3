import { useCallback, useEffect, useState } from "react";

/* ------------------------------------------------------------------
   Technique Vault — hand-drawn SVG homages to techniques from the
   anime I've actually watched. No clips, no copyrighted frames:
   everything here is procedural SVG + CSS animation.
------------------------------------------------------------------- */

type ArtProps = { big?: boolean };

const V = "0 0 200 200";

/* 01 · Frieren — Zoltraak */
function Zoltraak({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="zbeam" x1="0" x2="1">
          <stop offset="0" stopColor="var(--tv-magic)" stopOpacity="0" />
          <stop offset="0.25" stopColor="var(--tv-magic)" />
          <stop offset="1" stopColor="var(--tv-magic-hot)" />
        </linearGradient>
      </defs>
      <g className="tv-beam">
        <rect x="30" y="94" width="180" height="12" rx="6" fill="url(#zbeam)" opacity="0.35" />
        <rect x="30" y="97.5" width="180" height="5" rx="2.5" fill="var(--tv-magic-hot)" />
      </g>
      <g style={{ color: "var(--tv-magic)" }} className="tv-glow">
        <g className="tv-spin">
          <circle cx="46" cy="100" r="34" fill="none" stroke="var(--tv-magic)" strokeWidth="1.4" strokeDasharray="4 7" />
          <polygon points="46,70 72,115 20,115" fill="none" stroke="var(--tv-magic)" strokeWidth="1.2" opacity="0.7" />
        </g>
        <g className="tv-spin-rev">
          <circle cx="46" cy="100" r="24" fill="none" stroke="var(--tv-magic-hot)" strokeWidth="1.6" strokeDasharray="18 9" />
          <polygon points="46,82 62,110 30,110" fill="none" stroke="var(--tv-magic-hot)" strokeWidth="1" opacity="0.6" />
        </g>
        <circle cx="46" cy="100" r="9" fill="var(--tv-magic-hot)" className="tv-pulse" />
      </g>
      {big &&
        [0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={70 + i * 28}
            cy={100 + (i % 2 ? -14 : 14)}
            r="2"
            fill="var(--tv-magic-hot)"
            className="tv-pulse"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
    </svg>
  );
}

/* 02 · One Piece — Gear 5 */
function GearFive({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="var(--tv-sun)"
          strokeWidth="2"
          className="tv-ring"
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}
      <circle cx="100" cy="100" r="46" fill="var(--tv-sun)" opacity="0.12" className="tv-pulse" />
      <g className="tv-spin">
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x="99"
            y="34"
            width="2"
            height="16"
            rx="1"
            fill="var(--tv-sun)"
            opacity="0.75"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </g>
      <g className="tv-bob">
        <circle cx="100" cy="100" r="26" fill="var(--tv-sun)" opacity="0.9" />
        <path d="M84 96 q16 -14 32 0" fill="none" stroke="var(--tv-rubber)" strokeWidth="3" strokeLinecap="round" />
        <path d="M86 110 q14 12 28 0" fill="none" stroke="var(--tv-rubber)" strokeWidth="3" strokeLinecap="round" />
      </g>
      {big && (
        <g opacity="0.7">
          <path d="M24 150 q18 -16 36 0 q18 16 36 0" fill="none" stroke="var(--tv-sun)" strokeWidth="2" className="tv-wave" />
          <path d="M110 56 q18 -16 36 0 q18 16 36 0" fill="none" stroke="var(--tv-sun)" strokeWidth="2" className="tv-wave" style={{ animationDelay: "0.6s" }} />
        </g>
      )}
    </svg>
  );
}

/* 03 · Bleach — Bankai */
function Bankai({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="bpillar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--tv-reiatsu)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--tv-void)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="70" y="20" width="60" height="160" fill="url(#bpillar)" opacity="0.5" className="tv-flicker" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={82 + i * 12}
          y="60"
          width="3"
          height="70"
          rx="1.5"
          fill="var(--tv-reiatsu)"
          className="tv-rise"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
      <path
        d="M40 140 q60 -80 120 -80"
        fill="none"
        stroke="var(--tv-reiatsu)"
        strokeWidth="4"
        strokeLinecap="round"
        className="tv-trace"
      />
      <path
        d="M46 158 q54 -70 112 -74"
        fill="none"
        stroke="var(--tv-void)"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.55"
        className="tv-trace"
        style={{ animationDelay: "0.3s" }}
      />
      {big &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <polygon
            key={i}
            points="0,-6 4,0 0,6 -4,0"
            fill="var(--tv-reiatsu)"
            opacity="0.8"
            transform={`translate(${34 + i * 26} ${150 - i * 14})`}
            className="tv-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
    </svg>
  );
}

/* 04 · One Piece — Conqueror's Haki (Garp) */
function Haki({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      <circle cx="100" cy="100" r="52" fill="var(--tv-haki)" opacity="0.3" className="tv-pulse" />
      <circle cx="100" cy="100" r="66" fill="none" stroke="var(--tv-void)" strokeWidth="10" opacity="0.35" className="tv-ring" />
      <g className="tv-spin-rev">
        <circle cx="100" cy="100" r="44" fill="none" stroke="var(--tv-haki)" strokeWidth="2" strokeDasharray="12 10" />
      </g>
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <path
          key={a}
          d="M100 100 L118 64 L108 66 L124 30"
          fill="none"
          stroke="var(--tv-magic)"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${a} 100 100)`}
          className="tv-crackle"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
      <rect x="82" y="86" width="36" height="28" rx="8" fill="var(--tv-void)" stroke="var(--tv-haki)" strokeWidth="2" />
      {big && (
        <text x="100" y="176" textAnchor="middle" fontSize="13" fill="var(--tv-haki)" fontFamily="monospace">
          覇王色
        </text>
      )}
    </svg>
  );
}

/* 05 · Naruto — Rasenshuriken */
function Rasenshuriken({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      <circle cx="100" cy="100" r="64" fill="none" stroke="var(--tv-wind)" strokeWidth="1" opacity="0.4" className="tv-ring" />
      <g className="tv-blade">
        {[0, 90, 180, 270].map((a) => (
          <path
            key={a}
            d="M100 100 L172 88 Q182 100 172 112 Z"
            fill="var(--tv-wind)"
            opacity="0.42"
            transform={`rotate(${a} 100 100)`}
          />
        ))}
      </g>
      <g className="tv-spin-fast">
        <circle cx="100" cy="100" r="30" fill="none" stroke="var(--tv-wind)" strokeWidth="3" strokeDasharray="30 14" opacity="0.85" />
      </g>
      <circle cx="100" cy="100" r="18" fill="var(--tv-wind)" opacity="0.9" className="tv-pulse" />
      <circle cx="100" cy="100" r="9" fill="var(--tv-sun)" opacity="0.85" />
      {big &&
        [0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={74 + i * 8}
            fill="none"
            stroke="var(--tv-wind)"
            strokeWidth="0.8"
            opacity="0.35"
            className="tv-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
    </svg>
  );
}

/* 06 · Naruto — Sharingan → Rinnegan */
function Doujutsu({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      <ellipse cx="100" cy="100" rx="82" ry="46" fill="var(--tv-void)" opacity="0.55" />
      <ellipse cx="100" cy="100" rx="82" ry="46" fill="none" stroke="var(--tv-sharingan)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="100" r="34" fill="var(--tv-sharingan)" opacity="0.85" />
      <g className="tv-spin">
        {[0, 120, 240].map((a) => (
          <path
            key={a}
            d="M100 78 q11 3 9 13 q-2 8 -9 6 q-6 -2 -4 -9 z"
            fill="var(--tv-void)"
            transform={`rotate(${a} 100 100)`}
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="7" fill="var(--tv-void)" />
      <g className="tv-flicker" style={{ animationDuration: "5s" }}>
        {[10, 17, 24, 31].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="var(--tv-rinnegan)"
            strokeWidth="1.6"
            opacity="0.9"
            className="tv-pulse"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </g>
      {big && (
        <text x="100" y="172" textAnchor="middle" fontSize="12" fill="var(--tv-sharingan)" fontFamily="monospace">
          写輪眼 → 輪廻眼
        </text>
      )}
    </svg>
  );
}

/* 07 · Jujutsu Kaisen — Six Eyes / Infinity */
function SixEyes({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="40"
          y="40"
          width="120"
          height="120"
          rx="10"
          fill="none"
          stroke="var(--tv-six-eyes)"
          strokeWidth="1.2"
          className="tv-converge"
          style={{ animationDelay: `${i * 0.75}s` }}
        />
      ))}
      <circle cx="100" cy="100" r="52" fill="var(--tv-six-eyes)" opacity="0.08" className="tv-pulse" />
      {[74, 126].map((cx, i) => (
        <g key={cx} style={{ color: "var(--tv-six-eyes)" }} className="tv-glow">
          <ellipse cx={cx} cy="96" rx="20" ry="12" fill="var(--tv-six-eyes)" opacity="0.9" />
          <ellipse cx={cx} cy="96" rx="7" ry="9" fill="var(--tv-void)" />
          <ellipse
            cx={cx}
            cy="96"
            rx="20"
            ry="12"
            fill="none"
            stroke="var(--tv-six-eyes)"
            strokeWidth="1.4"
            className="tv-pulse"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        </g>
      ))}
      <path
        d="M78 138 q22 -16 44 0"
        fill="none"
        stroke="var(--tv-six-eyes)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
        className="tv-trace"
      />
      {big && (
        <text x="100" y="174" textAnchor="middle" fontSize="13" fill="var(--tv-six-eyes)" fontFamily="monospace">
          無下限 · 領域展開
        </text>
      )}
    </svg>
  );
}

/* 08 · Demon Slayer — Water Breathing */
function WaterBreathing({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M-10 ${70 + i * 20} q40 -26 80 0 q40 26 80 0 q40 -26 80 0`}
          fill="none"
          stroke="var(--tv-water)"
          strokeWidth={3 - i * 0.4}
          opacity={0.85 - i * 0.15}
          className="tv-wave"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
      <path
        d="M30 150 q56 -46 140 -104"
        fill="none"
        stroke="var(--tv-water)"
        strokeWidth="4"
        strokeLinecap="round"
        className="tv-trace"
      />
      {big &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={26 + i * 30}
            cy={150 - i * 18}
            r="2.5"
            fill="var(--tv-water)"
            className="tv-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
    </svg>
  );
}

type Technique = {
  id: string;
  name: string;
  series: string;
  kanji: string;
  line: string;
  Art: (p: ArtProps) => JSX.Element;
};

const TECHNIQUES: Technique[] = [
  { id: "zoltraak", name: "Zoltraak", series: "Frieren", kanji: "ゾルトラーク", line: "Ordinary offensive magic — until you spend eighty years making it ordinary.", Art: Zoltraak },
  { id: "gear5", name: "Gear 5", series: "One Piece", kanji: "ギア5", line: "The warrior who brings joy — liberation, drums, and cartoon physics.", Art: GearFive },
  { id: "bankai", name: "Bankai", series: "Bleach", kanji: "卍解", line: "Five to ten times the power. Zangetsu, Senbonzakura, Hyorinmaru — take your pick.", Art: Bankai },
  { id: "haki", name: "Conqueror's Haki", series: "One Piece · Garp", kanji: "覇王色の覇気", line: "Willpower loud enough that the weak fall before a fist lands.", Art: Haki },
  { id: "rasenshuriken", name: "Rasenshuriken", series: "Naruto", kanji: "螺旋手裏剣", line: "Wind-nature chakra, shaped by pure stubbornness.", Art: Rasenshuriken },
  { id: "doujutsu", name: "Sharingan → Rinnegan", series: "Naruto · Uchiha & Kakashi", kanji: "写輪眼", line: "Copy, predict, then rewrite the rules entirely.", Art: Doujutsu },
  { id: "sixeyes", name: "Six Eyes & Infinity", series: "Jujutsu Kaisen · Gojo", kanji: "六眼 · 無下限", line: "Perfect information plus a distance you can never actually close.", Art: SixEyes },
  { id: "water", name: "Water Breathing", series: "Demon Slayer", kanji: "水の呼吸", line: "Total concentration — the same discipline a long debugging night needs.", Art: WaterBreathing },
];

export function TechniqueVault() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback((d: number) => {
    setActive((i) => (i === null ? null : (i + d + TECHNIQUES.length) % TECHNIQUES.length));
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active === null ? null : TECHNIQUES[active];

  return (
    <div className="mt-12">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="technique-vault"
        className="group w-full rounded-2xl border border-border bg-card/50 px-6 py-5 text-left transition-colors hover:border-primary/60"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Optional · hidden by default
            </span>
            <h3 className="mt-1 text-lg font-semibold">
              Technique Vault <span className="text-muted-foreground font-mono text-sm">領域展開</span>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Eight animated homages to my favourite techniques. Click a card to play it full-size.
            </p>
          </div>
          <span
            aria-hidden="true"
            className={`shrink-0 rounded-full border border-primary/60 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground ${
              open ? "rotate-0" : ""
            }`}
          >
            {open ? "Close ▲" : "Open ▼"}
          </span>
        </div>
      </button>

      {open && (
        <div id="technique-vault" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNIQUES.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Play ${t.name} from ${t.series}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-3 text-left transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_60px_-30px_var(--primary)]"
            >
              <div className="aspect-square w-full rounded-lg bg-background/60">
                <t.Art />
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold leading-tight">{t.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.series}</p>
              </div>
              <span className="absolute right-3 top-3 rounded-full border border-border bg-background/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                Play
              </span>
            </button>
          ))}
        </div>
      )}

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.name} — ${current.series}`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
          onClick={close}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{current.series}</p>
                <h4 className="mt-1 text-2xl font-semibold">{current.name}</h4>
                <p className="font-mono text-sm text-primary">{current.kanji}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close technique"
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Esc ✕
              </button>
            </div>

            <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl border border-border bg-background">
              <div className="mx-auto h-full w-auto aspect-square">
                <current.Art big />
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">{current.line}</p>

            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous technique"
                className="rounded-full border border-border px-4 py-1.5 font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
              >
                ← Prev
              </button>
              <span className="font-mono text-[10px] text-muted-foreground">
                {String((active ?? 0) + 1).padStart(2, "0")} / {String(TECHNIQUES.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next technique"
                className="rounded-full border border-border px-4 py-1.5 font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
