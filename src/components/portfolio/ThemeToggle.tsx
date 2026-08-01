import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "theme";

function apply(light: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("light", light);
}

/** Floating light/dark switch. Dark stays the default. */
export function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const initial = stored === "light";
    setLight(initial);
    apply(initial);
    setReady(true);
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    apply(next);
    localStorage.setItem(KEY, next ? "light" : "dark");
  }

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={light}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      title={light ? "Switch to dark theme" : "Switch to light theme"}
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary transition-colors shadow-lg"
    >
      {light ? <Moon className="h-3.5 w-3.5" aria-hidden="true" /> : <Sun className="h-3.5 w-3.5" aria-hidden="true" />}
      {light ? "dark" : "light"}
    </button>
  );
}