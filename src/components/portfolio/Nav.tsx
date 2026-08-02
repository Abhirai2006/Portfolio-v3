import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-sm tracking-widest">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          <span className="gold-text font-semibold">ABHISHEK RAI A</span>
          <span className="text-muted-foreground hidden sm:inline">— PORTFOLIO / 2026</span>
        </a>
        <div className="flex items-center gap-3">
          <ThemeToggle compact />
          <a
            href="#contact"
            className="rounded-full border border-primary/60 text-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Hire me →
          </a>
        </div>
      </div>
    </header>
  );
}
