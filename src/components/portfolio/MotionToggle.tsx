import { useEffect, useState } from "react";

const KEY = "prefers-reduced-motion";

function apply(reduce: boolean) {
  if (typeof document === "undefined") return;
  if (reduce) document.documentElement.setAttribute("data-reduce-motion", "true");
  else document.documentElement.removeAttribute("data-reduce-motion");
}

/**
 * Small floating toggle that lets visitors mute animations.
 * Auto-initialises from prefers-reduced-motion, then persists overrides in localStorage.
 */
export function MotionToggle() {
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const system = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initial = stored === null ? system : stored === "true";
    setReduce(initial);
    apply(initial);
    setReady(true);
  }, []);

  function toggle() {
    const next = !reduce;
    setReduce(next);
    apply(next);
    localStorage.setItem(KEY, String(next));
  }

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={reduce}
      aria-label={reduce ? "Enable animations" : "Reduce animations"}
      title={reduce ? "Animations muted — click to enable" : "Reduce animations"}
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary transition-colors shadow-lg"
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${reduce ? "bg-muted-foreground" : "bg-primary animate-pulse"}`}
      />
      motion {reduce ? "off" : "on"}
    </button>
  );
}