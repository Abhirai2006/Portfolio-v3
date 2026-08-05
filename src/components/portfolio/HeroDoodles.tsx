/**
 * Hand-drawn marker doodles that self-draw around the hero — a nod to
 * marker-on-black title cards, rebuilt from scratch as animated SVG strokes.
 * Purely decorative; never intercepts pointer events.
 */
export function HeroDoodles() {
  const s = { stroke: "currentColor", fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] hidden text-primary/70 sm:block"
    >
      {/* top-left burst */}
      <svg className="doodle doodle-float absolute left-[4%] top-[22%] h-24 w-24" viewBox="0 0 100 100">
        <path {...s} strokeWidth="2" d="M20 60 q14 -34 34 -30 q18 4 12 22 q-6 16 -26 10" />
        <path {...s} strokeWidth="1.6" style={{ animationDelay: "0.5s" }} d="M62 22 l8 -12 M78 34 l14 -6 M74 52 l16 6" />
      </svg>

      {/* circled emphasis near the headline */}
      <svg className="doodle absolute left-[2%] top-[52%] h-32 w-72" viewBox="0 0 300 120">
        <path {...s} strokeWidth="2" d="M14 62 q60 -46 150 -40 q100 8 128 44 q-40 34 -140 34 q-104 -2 -134 -34" opacity="0.55" />
      </svg>

      {/* arrow pointing to the CTAs */}
      <svg className="doodle absolute bottom-[18%] left-[38%] h-20 w-32 text-accent/70" viewBox="0 0 160 90">
        <path {...s} strokeWidth="2.2" d="M8 12 q52 46 128 52" />
        <path {...s} strokeWidth="2.2" style={{ animationDelay: "0.6s" }} d="M118 48 l22 16 l-26 10" />
      </svg>

      {/* sparks + orbit on the right */}
      <svg className="doodle doodle-float absolute right-[6%] top-[16%] h-28 w-28 text-destructive/60" viewBox="0 0 100 100">
        <circle {...s} strokeWidth="1.6" cx="50" cy="50" r="30" />
        <path {...s} strokeWidth="1.8" style={{ animationDelay: "0.4s" }} d="M50 8 v10 M92 50 h-10 M50 92 v-10 M8 50 h10" />
      </svg>

      {/* squiggle underline bottom-right */}
      <svg className="doodle absolute bottom-[12%] right-[8%] h-16 w-48" viewBox="0 0 200 60">
        <path {...s} strokeWidth="2" d="M6 40 q20 -22 40 0 q20 22 40 0 q20 -22 40 0 q20 22 40 0" />
      </svg>
    </div>
  );
}
