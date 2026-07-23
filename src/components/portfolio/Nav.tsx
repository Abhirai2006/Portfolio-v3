import { useEffect, useState } from "react";

const links = [
  { href: "#origin", label: "Origin" },
  { href: "#github", label: "GitHub" },
  { href: "#projects", label: "Arsenal" },
  { href: "#ask", label: "Ask Abhishek" },
  { href: "#shelf", label: "Anime" },
  { href: "#devlog", label: "Devlog" },
  { href: "#contact", label: "Contact" },
];

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
          <span className="gold-text font-semibold">ABHI.RAI</span>
          <span className="text-muted-foreground">— PORTFOLIO / 2026</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-primary/60 text-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Hire me →
        </a>
      </div>
    </header>
  );
}