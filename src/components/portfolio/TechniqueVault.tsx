import { useCallback, useEffect, useState } from "react";
import type React from "react";

/* ------------------------------------------------------------------
   Technique Vault — character-forward homages, hand-drawn as SVG.
   Each entry can carry an optional `video` (mp4 in /public/anime/…).
   When a clip exists it plays in the stage; otherwise the animated
   character art plays instead. No copyrighted frames are bundled.
------------------------------------------------------------------- */

type ArtProps = { big?: boolean };
const V = "0 0 200 200";

/* shared silhouette bits ------------------------------------------ */
function Cloak({ fill, d }: { fill: string; d: string }) {
  return <path d={d} fill={fill} />;
}

const BODY = "M100 96 q26 6 30 46 q4 34 6 46 h-72 q2 -12 6 -46 q4 -40 30 -46 z";

function Head({ cx = 100, cy = 78, r = 17, skin = "var(--tv-skin)" }) {
  return <ellipse cx={cx} cy={cy} rx={r} ry={r * 1.15} fill={skin} />;
}

/* 01 · Frieren — Zoltraak ------------------------------------------ */
function Frieren({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="zbeam" x1="0" x2="1">
          <stop offset="0" stopColor="var(--tv-magic)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--tv-magic-hot)" />
        </linearGradient>
      </defs>
      <g className="tv-beam">
        <rect x="86" y="80" width="130" height="10" rx="5" fill="url(#zbeam)" opacity="0.4" />
        <rect x="86" y="83" width="130" height="4" rx="2" fill="var(--tv-magic-hot)" />
      </g>
      <g className="tv-bob-soft">
        <Cloak fill="var(--tv-cloth)" d={BODY} />
        <path d="M70 122 q30 -10 60 0 l-4 66 h-52 z" fill="var(--tv-cloth-2)" />
        <Head />
        {/* twin tails */}
        <path d="M84 68 q-16 6 -20 34 q-2 16 8 18 q4 -30 14 -40z" fill="var(--tv-hair-white)" />
        <path d="M116 68 q16 6 20 34 q2 16 -8 18 q-4 -30 -14 -40z" fill="var(--tv-hair-white)" />
        <path d="M83 70 q17 -20 34 0 q-17 -8 -34 0z" fill="var(--tv-hair-white)" />
        <circle cx="93" cy="79" r="2.2" fill="var(--tv-magic)" />
        <circle cx="107" cy="79" r="2.2" fill="var(--tv-magic)" />
        {/* staff arm */}
        <path d="M118 112 L150 86" stroke="var(--tv-skin)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M138 130 L162 62" stroke="var(--tv-wood)" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
      <g className="tv-spin" style={{ transformOrigin: "162px 62px" }}>
        <circle cx="162" cy="62" r="16" fill="none" stroke="var(--tv-magic)" strokeWidth="1.4" strokeDasharray="4 6" />
      </g>
      <circle cx="162" cy="62" r="6" fill="var(--tv-magic-hot)" className="tv-pulse" />
      {big &&
        [0, 1, 2, 3].map((i) => (
          <circle key={i} cx={40 + i * 14} cy={62 + (i % 2 ? 8 : -8)} r="2" fill="var(--tv-magic)" className="tv-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
    </svg>
  );
}

/* 02 · Luffy — Gear 5 ---------------------------------------------- */
function GearFive({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="100" cy="86" r="52" fill="none" stroke="var(--tv-sun)" strokeWidth="2" className="tv-ring" style={{ animationDelay: `${i * 0.9}s` }} />
      ))}
      <circle cx="100" cy="86" r="44" fill="var(--tv-sun)" opacity="0.14" className="tv-pulse" />
      <g className="tv-spin" style={{ transformOrigin: "100px 86px" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="99" y="26" width="2" height="14" rx="1" fill="var(--tv-sun)" opacity="0.8" transform={`rotate(${i * 30} 100 86)`} />
        ))}
      </g>
      <g className="tv-bob">
        <Cloak fill="var(--tv-cloth-light)" d={BODY} />
        <path d="M78 128 q22 -8 44 0 l-3 60 h-38 z" fill="var(--tv-rubber-pants)" />
        {/* rubbery arms */}
        <path d="M76 112 q-34 -6 -46 -34" stroke="var(--tv-skin)" strokeWidth="8" strokeLinecap="round" fill="none" className="tv-stretch" />
        <path d="M124 112 q34 -6 46 -34" stroke="var(--tv-skin)" strokeWidth="8" strokeLinecap="round" fill="none" className="tv-stretch" style={{ animationDelay: "0.35s" }} />
        <Head cy={74} />
        <path d="M82 66 q18 -22 36 0 q-6 -6 -18 -6 q-12 0 -18 6z" fill="var(--tv-hair-white)" />
        <path d="M78 62 q-8 -4 -14 2 M122 62 q8 -4 14 2" stroke="var(--tv-hair-white)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <g fill="var(--tv-ink)"><ellipse cx="92" cy="76" rx="3" ry="4" /><ellipse cx="108" cy="76" rx="3" ry="4" /></g>
        <path d="M93 86 q7 6 14 0" stroke="var(--tv-ink)" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* straw hat slung back */}
        <ellipse cx="140" cy="126" rx="20" ry="6" fill="var(--tv-sun)" opacity="0.9" />
        <path d="M126 126 q14 -16 28 0 z" fill="var(--tv-sun)" />
        <path d="M126 123 q14 6 28 0" stroke="var(--tv-reiatsu)" strokeWidth="3" fill="none" />
      </g>
      {big && (
        <g opacity="0.7">
          <path d="M14 168 q18 -14 36 0 q18 14 36 0" fill="none" stroke="var(--tv-sun)" strokeWidth="2" className="tv-wave" />
          <path d="M114 40 q18 -14 36 0 q18 14 36 0" fill="none" stroke="var(--tv-sun)" strokeWidth="2" className="tv-wave" style={{ animationDelay: "0.6s" }} />
        </g>
      )}
    </svg>
  );
}

/* 03 · Ichigo — Bankai --------------------------------------------- */
function Bankai({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="bpillar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--tv-reiatsu)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--tv-void)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="56" y="10" width="88" height="180" fill="url(#bpillar)" opacity="0.45" className="tv-flicker" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={62 + i * 26} y="70" width="3" height="70" rx="1.5" fill="var(--tv-reiatsu)" className="tv-rise" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
      <g>
        <Cloak fill="var(--tv-void)" d={BODY} />
        <path d="M74 128 q26 -8 52 0 l-6 60 h-40 z" fill="var(--tv-void)" />
        {/* tattered shroud */}
        <path d="M128 118 q26 14 20 54 q-10 -26 -24 -34z" fill="var(--tv-void)" opacity="0.85" className="tv-tatter" />
        <Head cy={74} />
        <path d="M82 66 q18 -24 36 -2 q-4 -8 -10 -4 q-4 -8 -12 -2 q-6 -4 -14 8z" fill="var(--tv-orange)" />
        <g fill="var(--tv-ink)"><ellipse cx="92" cy="77" rx="2.6" ry="3.6" /><ellipse cx="108" cy="77" rx="2.6" ry="3.6" /></g>
        <path d="M94 86 h12" stroke="var(--tv-ink)" strokeWidth="1.6" strokeLinecap="round" />
        {/* black blade */}
        <path d="M120 110 L182 40" stroke="var(--tv-void)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M120 110 L182 40" stroke="var(--tv-reiatsu)" strokeWidth="2" strokeLinecap="round" fill="none" className="tv-flicker" />
        <path d="M112 116 L126 104" stroke="var(--tv-ink)" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
      <path d="M24 160 q76 -66 152 -108" fill="none" stroke="var(--tv-reiatsu)" strokeWidth="3" strokeLinecap="round" className="tv-trace" />
      {big &&
        [0, 1, 2, 3, 4].map((i) => (
          <polygon key={i} points="0,-6 4,0 0,6 -4,0" fill="var(--tv-reiatsu)" opacity="0.8" transform={`translate(${28 + i * 12} ${170 - i * 12})`} className="tv-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
    </svg>
  );
}

/* 04 · Garp — Conqueror's Haki ------------------------------------- */
function Haki({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      <circle cx="100" cy="96" r="60" fill="var(--tv-haki)" opacity="0.28" className="tv-pulse" />
      <circle cx="100" cy="96" r="72" fill="none" stroke="var(--tv-void)" strokeWidth="10" opacity="0.3" className="tv-ring" />
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <path key={a} d="M100 96 L118 60 L108 62 L124 24" fill="none" stroke="var(--tv-magic-hot)" strokeWidth="2.6" strokeLinecap="round" transform={`rotate(${a} 100 96)`} className="tv-crackle tv-glow" style={{ color: "var(--tv-magic-hot)", animationDelay: `${i * 0.16}s` }} />
      ))}
      <g>
        {/* broad marine build */}
        <path d="M100 92 q34 8 38 50 q4 30 6 46 h-88 q2 -16 6 -46 q4 -42 38 -50z" fill="var(--tv-cloth-light)" />
        <path d="M62 120 q-24 6 -28 34 q12 -16 30 -18z" fill="var(--tv-cloth-light)" opacity="0.9" />
        <Head cy={70} r={19} />
        <path d="M80 60 q20 -20 40 0 q-6 -14 -20 -14 q-14 0 -20 14z" fill="var(--tv-hair-grey)" />
        <g fill="var(--tv-ink)"><ellipse cx="91" cy="73" rx="2.6" ry="3.4" /><ellipse cx="109" cy="73" rx="2.6" ry="3.4" /></g>
        <path d="M93 83 h14" stroke="var(--tv-ink)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M84 62 q8 -4 16 0 M116 62 q-8 -4 -16 0" stroke="var(--tv-scar)" strokeWidth="2" fill="none" />
        {/* fist forward */}
        <circle cx="140" cy="108" r="16" fill="var(--tv-skin)" className="tv-punch" />
        <path d="M128 104 h24 M128 112 h24" stroke="var(--tv-ink)" strokeWidth="1.4" opacity="0.5" />
      </g>
      {big && (
        <text x="100" y="192" textAnchor="middle" fontSize="12" fill="var(--tv-magic-hot)" fontFamily="monospace">覇王色の覇気</text>
      )}
    </svg>
  );
}

/* 05 · Naruto — Rasenshuriken -------------------------------------- */
function Rasenshuriken({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      <g>
        <Cloak fill="var(--tv-sun)" d={BODY} />
        <path d="M74 128 q26 -8 52 0 l-6 60 h-40 z" fill="var(--tv-cloak-orange)" />
        <Head cy={74} />
        <path d="M80 66 q20 -26 40 -2 q-6 -6 -10 -2 q-6 -8 -14 -2 q-8 -4 -16 6z" fill="var(--tv-blond)" />
        <rect x="80" y="60" width="40" height="7" rx="2" fill="var(--tv-metal)" />
        <g fill="var(--tv-ink)"><ellipse cx="92" cy="78" rx="2.6" ry="3.6" /><ellipse cx="108" cy="78" rx="2.6" ry="3.6" /></g>
        <path d="M94 87 h12" stroke="var(--tv-ink)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M84 82 h7 M109 82 h7" stroke="var(--tv-ink)" strokeWidth="1" opacity="0.45" />
        {/* raised arm */}
        <path d="M120 108 L150 66" stroke="var(--tv-skin)" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
      <g style={{ transformOrigin: "154px 60px" }}>
        <g className="tv-blade" style={{ transformOrigin: "154px 60px" }}>
          {[0, 90, 180, 270].map((a) => (
            <path key={a} d="M154 60 L200 52 Q206 60 200 68 Z" fill="var(--tv-wind)" opacity="0.42" transform={`rotate(${a} 154 60)`} />
          ))}
        </g>
        <g className="tv-spin-fast" style={{ transformOrigin: "154px 60px" }}>
          <circle cx="154" cy="60" r="20" fill="none" stroke="var(--tv-wind)" strokeWidth="3" strokeDasharray="20 10" opacity="0.85" />
        </g>
        <circle cx="154" cy="60" r="11" fill="var(--tv-wind)" opacity="0.9" className="tv-pulse" />
      </g>
      {big && [0, 1, 2].map((i) => (
        <circle key={i} cx="154" cy="60" r={44 + i * 8} fill="none" stroke="var(--tv-wind)" strokeWidth="0.8" opacity="0.35" className="tv-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
    </svg>
  );
}

/* 06 · Sasuke / Kakashi — Sharingan → Rinnegan --------------------- */
function Doujutsu({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      <ellipse cx="100" cy="100" rx="88" ry="52" fill="var(--tv-void)" opacity="0.45" />
      {/* face, three-quarter */}
      <path d="M56 62 q44 -30 88 0 q10 44 -14 78 q-30 26 -60 0 q-24 -34 -14 -78z" fill="var(--tv-skin)" />
      <path d="M52 58 q48 -34 96 0 q-10 -26 -48 -26 q-38 0 -48 26z" fill="var(--tv-ink)" />
      <path d="M52 58 q10 20 4 40 q-14 -18 -4 -40z M148 58 q-10 20 -4 40 q14 -18 4 -40z" fill="var(--tv-ink)" />
      {/* left eye: sharingan */}
      <ellipse cx="76" cy="92" rx="17" ry="10" fill="var(--tv-sharingan)" />
      <g className="tv-spin" style={{ transformOrigin: "76px 92px" }}>
        {[0, 120, 240].map((a) => (
          <path key={a} d="M76 84 q5 1 4 6 q-1 4 -5 3 q-3 -1 -2 -5z" fill="var(--tv-void)" transform={`rotate(${a} 76 92)`} />
        ))}
      </g>
      <circle cx="76" cy="92" r="3" fill="var(--tv-void)" />
      {/* right eye: rinnegan */}
      <ellipse cx="124" cy="92" rx="17" ry="10" fill="var(--tv-rinnegan)" opacity="0.9" />
      {[4, 8, 12].map((r, i) => (
        <circle key={r} cx="124" cy="92" r={r} fill="none" stroke="var(--tv-void)" strokeWidth="1.2" opacity="0.7" className="tv-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      <circle cx="124" cy="92" r="2.5" fill="var(--tv-void)" />
      <path d="M90 118 h20" stroke="var(--tv-ink)" strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round" />
      {big && (
        <text x="100" y="188" textAnchor="middle" fontSize="12" fill="var(--tv-sharingan)" fontFamily="monospace">写輪眼 → 輪廻眼</text>
      )}
    </svg>
  );
}

/* 07 · Gojo — Six Eyes & Infinity ---------------------------------- */
function Gojo({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="34" y="34" width="132" height="132" rx="12" fill="none" stroke="var(--tv-six-eyes)" strokeWidth="1.2" className="tv-converge" style={{ animationDelay: `${i * 0.75}s` }} />
      ))}
      <circle cx="100" cy="90" r="56" fill="var(--tv-six-eyes)" opacity="0.08" className="tv-pulse" />
      <g>
        <path d="M100 96 q28 6 32 46 q4 30 6 46 h-76 q2 -16 6 -46 q4 -40 32 -46z" fill="var(--tv-void)" />
        <path d="M84 100 h32 v22 h-32z" fill="var(--tv-cloth-light)" opacity="0.15" />
        <Head cy={74} r={18} />
        {/* spiked white hair */}
        <path d="M80 66 q20 -30 40 -2 q-4 -10 -10 -6 q-6 -10 -14 -4 q-8 -6 -16 12z" fill="var(--tv-hair-white)" />
        <path d="M78 60 q-6 -10 2 -16 M122 60 q6 -10 -2 -16" stroke="var(--tv-hair-white)" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* blindfold */}
        <rect x="80" y="70" width="40" height="11" rx="4" fill="var(--tv-void)" className="tv-flicker" />
        <path d="M80 75 H120" stroke="var(--tv-six-eyes)" strokeWidth="1.2" opacity="0.7" className="tv-trace" />
        <path d="M94 90 h12" stroke="var(--tv-ink)" strokeWidth="1.6" fill="none" opacity="0.6" strokeLinecap="round" />
        {/* infinity palm */}
        <path d="M128 116 L162 100" stroke="var(--tv-skin)" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="170" cy="98" r={10 + i * 8} fill="none" stroke="var(--tv-six-eyes)" strokeWidth="1.4" opacity={0.7 - i * 0.18} className="tv-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      {big && (
        <text x="100" y="192" textAnchor="middle" fontSize="12" fill="var(--tv-six-eyes)" fontFamily="monospace">六眼 · 無下限</text>
      )}
    </svg>
  );
}

/* 08 · Tanjiro — Water Breathing ----------------------------------- */
function WaterBreathing({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M-10 ${64 + i * 22} q40 -24 80 0 q40 24 80 0 q40 -24 80 0`} fill="none" stroke="var(--tv-water)" strokeWidth={3 - i * 0.4} opacity={0.75 - i * 0.14} className="tv-wave" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
      <g className="tv-lunge">
        <Cloak fill="var(--tv-void)" d={BODY} />
        {/* checkered haori */}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={72 + (i % 4) * 14} y={120 + Math.floor(i / 4) * 14} width="14" height="14" fill={i % 2 ? "var(--tv-void)" : "var(--tv-checker)"} opacity="0.9" />
        ))}
        <Head cy={74} />
        <path d="M80 66 q20 -24 40 -2 q-8 -14 -20 -14 q-14 0 -20 16z" fill="var(--tv-maroon)" />
        <path d="M84 60 q16 -6 32 0" stroke="var(--tv-scar)" strokeWidth="3" fill="none" />
        <g fill="var(--tv-ink)"><ellipse cx="92" cy="78" rx="2.6" ry="3.6" /><ellipse cx="108" cy="78" rx="2.6" ry="3.6" /></g>
        <path d="M94 87 h12" stroke="var(--tv-ink)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M122 110 L176 52" stroke="var(--tv-metal)" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
      <path d="M30 150 q56 -46 140 -104" fill="none" stroke="var(--tv-water)" strokeWidth="4" strokeLinecap="round" className="tv-trace" />
      {big && [0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={30 + i * 30} cy={150 - i * 18} r="2.5" fill="var(--tv-water)" className="tv-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </svg>
  );
}

/* 09 · Haikyuu — the perfect quick ---------------------------------- */
function Haikyuu({ big }: ArtProps) {
  return (
    <svg viewBox={V} className="tv-svg h-full w-full" aria-hidden="true">
      {/* court light */}
      <rect x="0" y="150" width="200" height="50" fill="var(--tv-court)" opacity="0.25" />
      <path d="M0 150 H200" stroke="var(--tv-court)" strokeWidth="1.5" opacity="0.6" />
      {/* net */}
      <g opacity="0.5">
        <rect x="0" y="86" width="200" height="4" fill="var(--tv-hair-white)" />
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={i * 10} y1="90" x2={i * 10} y2="124" stroke="var(--tv-hair-white)" strokeWidth="0.6" />
        ))}
        <line x1="0" y1="124" x2="200" y2="124" stroke="var(--tv-hair-white)" strokeWidth="1" />
      </g>
      {/* speed lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="10" y1={30 + i * 12} x2="70" y2={38 + i * 12} stroke="var(--tv-sun)" strokeWidth="1.4" opacity="0.6" className="tv-crackle" style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
      {/* spiker mid-air */}
      <g className="tv-spike">
        <path d="M96 74 q18 4 22 30 q3 18 4 26 h-52 q1 -8 4 -26 q4 -26 22 -30z" fill="var(--tv-orange)" />
        <ellipse cx="96" cy="58" rx="13" ry="15" fill="var(--tv-skin)" />
        <path d="M82 52 q14 -22 28 -2 q-4 -8 -8 -6 q-6 -8 -12 -2 q-6 -2 -8 10z" fill="var(--tv-orange-hair)" />
        <g fill="var(--tv-ink)"><ellipse cx="90" cy="57" rx="2.4" ry="3.2" /><ellipse cx="103" cy="57" rx="2.4" ry="3.2" /></g>
        <path d="M92 65 q5 4 9 0" stroke="var(--tv-ink)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* swinging arm */}
        <path d="M112 86 L146 46" stroke="var(--tv-skin)" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* legs tucked */}
        <path d="M84 128 q-6 22 2 34 M110 128 q8 20 2 34" stroke="var(--tv-cloth-light)" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
      {/* the ball + contact flash */}
      <g className="tv-ball">
        <circle cx="152" cy="40" r="11" fill="var(--tv-hair-white)" />
        <path d="M141 40 q11 -8 22 0 M144 32 q8 16 0 18 M160 32 q-8 16 0 18" stroke="var(--tv-court)" strokeWidth="1.4" fill="none" />
      </g>
      <circle cx="152" cy="40" r="16" fill="none" stroke="var(--tv-sun)" strokeWidth="2" className="tv-ring" />
      {big && (
        <text x="100" y="192" textAnchor="middle" fontSize="12" fill="var(--tv-sun)" fontFamily="monospace">最速の一撃 · Freak Quick</text>
      )}
    </svg>
  );
}

type Technique = {
  id: string;
  name: string;
  who: string;
  series: string;
  kanji: string;
  line: string;
  /** optional clip in /public/anime/<file>.mp4 — plays instead of the art */
  video?: string;
  Art: (p: ArtProps) => React.ReactElement;
};

const TECHNIQUES: Technique[] = [
  { id: "zoltraak", name: "Zoltraak", who: "Frieren", series: "Frieren: Beyond Journey's End", kanji: "ゾルトラーク", line: "Ordinary offensive magic — until you spend eighty years making it ordinary.", Art: Frieren },
  { id: "gear5", name: "Gear 5", who: "Monkey D. Luffy", series: "One Piece", kanji: "ギア5", line: "The warrior who brings joy — liberation, drums, and cartoon physics.", Art: GearFive },
  { id: "bankai", name: "Bankai", who: "Kurosaki Ichigo", series: "Bleach", kanji: "卍解", line: "Five to ten times the power. Tensa Zangetsu, and the whole Gotei follows.", Art: Bankai },
  { id: "haki", name: "Conqueror's Haki", who: "Monkey D. Garp", series: "One Piece", kanji: "覇王色の覇気", line: "Willpower loud enough that the weak fall before a fist ever lands.", Art: Haki },
  { id: "rasenshuriken", name: "Rasenshuriken", who: "Uzumaki Naruto", series: "Naruto Shippuden", kanji: "螺旋手裏剣", line: "Wind-nature chakra shaped by pure stubbornness.", Art: Rasenshuriken },
  { id: "doujutsu", name: "Sharingan → Rinnegan", who: "Uchiha & Kakashi", series: "Naruto", kanji: "写輪眼 · 輪廻眼", line: "Copy, predict, then rewrite the rules entirely.", Art: Doujutsu },
  { id: "sixeyes", name: "Six Eyes & Infinity", who: "Gojo Satoru", series: "Jujutsu Kaisen", kanji: "六眼 · 無下限", line: "Perfect information plus a distance you can never actually close.", Art: Gojo },
  { id: "water", name: "Water Breathing", who: "Kamado Tanjiro", series: "Demon Slayer", kanji: "水の呼吸", line: "Total concentration — the same discipline a long debugging night needs.", Art: WaterBreathing },
  { id: "haikyuu", name: "The Perfect Quick", who: "Hinata × Kageyama", series: "Haikyuu!!", kanji: "変人速攻", line: "Eyes closed, full trust, ball already gone. Best set-piece in sports anime.", Art: Haikyuu },
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
              Nine characters, nine signature moments — hand-drawn and animated. Click a card to play it full-size.
            </p>
          </div>
          <span
            aria-hidden="true"
            className="shrink-0 rounded-full border border-primary/60 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground"
          >
            {open ? "Close ▲" : "Open ▼"}
          </span>
        </div>
      </button>

      {open && (
        <div id="technique-vault" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNIQUES.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Play ${t.name} — ${t.who} from ${t.series}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-3 text-left transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_60px_-30px_var(--primary)]"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-background/60">
                <t.Art />
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold leading-tight">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.who}</p>
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
          aria-label={`${current.name} — ${current.who}, ${current.series}`}
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
                <p className="text-sm text-muted-foreground">{current.who}</p>
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
              {current.video ? (
                <video
                  key={current.id}
                  src={current.video}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              ) : (
                <div className="mx-auto h-full w-auto aspect-square">
                  <current.Art big />
                </div>
              )}
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
