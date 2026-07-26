import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useRef, useState } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { AskAbhishek } from "@/components/portfolio/AskAbhishek";
import { GithubLive } from "@/components/portfolio/GithubLive";
import { ProjectModal, type Project } from "@/components/portfolio/ProjectModal";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/motion/dock";
import { Magnetic } from "@/components/motion/magnetic";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { TextEffect } from "@/components/motion/text-effect";
import { InfiniteSlider } from "@/components/motion/infinite-slider";
import { Cursor } from "@/components/motion/cursor";
import { Home, User, Github, FolderGit2, Sparkles, Clapperboard, Mail } from "lucide-react";
import portrait from "@/assets/abhishek-portrait.jpg.asset.json";
import muse1 from "@/assets/projects/muse-1.png.asset.json";
import muse2 from "@/assets/projects/muse-2.png.asset.json";
import muse3 from "@/assets/projects/muse-3.png.asset.json";
import sort1 from "@/assets/projects/sort-1.png.asset.json";
import sort2 from "@/assets/projects/sort-2.png.asset.json";
import sort3 from "@/assets/projects/sort-3.png.asset.json";
import bs1 from "@/assets/projects/bs-1.png.asset.json";
import bs2 from "@/assets/projects/bs-2.png.asset.json";
import bs3 from "@/assets/projects/bs-3.png.asset.json";

const HeroScene = lazy(() =>
  import("@/components/portfolio/HeroScene").then((m) => ({ default: m.HeroScene })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abhishek Rai A - ML Engineer · Live Projects" },
      {
        name: "description",
        content:
          "Portfolio of Abhishek Rai A — B.E. AI & ML student, Mysore. Live GitHub, in-browser ML demos, and an AI assistant trained on his resume.",
      },
      { property: "og:title", content: "Abhishek Rai A - ML Engineer · Live Projects" },
      {
        property: "og:description",
        content:
          "Portfolio of Abhishek Rai A — B.E. AI & ML student, Mysore. Live GitHub, in-browser ML demos, and an AI assistant trained on his resume.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground grain">
      <CursorGlow />
      <Nav />
      <Hero />
      <Origin />
      <NowBuilding />
      <Arsenal />
      <GithubSection />
      <Projects />
      <AskSection />
      <AnimeShelf />
      <Contact />
      <Footer />
      <FloatingDock />
    </div>
  );
}

/* ---------- FLOATING DOCK ---------- */
function FloatingDock() {
  const items = [
    { title: "Top", icon: <Home className="h-5 w-5" />, href: "#top" },
    { title: "Origin", icon: <User className="h-5 w-5" />, href: "#origin" },
    { title: "GitHub", icon: <Github className="h-5 w-5" />, href: "#github" },
    { title: "Arsenal", icon: <FolderGit2 className="h-5 w-5" />, href: "#projects" },
    { title: "Ask", icon: <Sparkles className="h-5 w-5" />, href: "#ask" },
    { title: "Anime", icon: <Clapperboard className="h-5 w-5" />, href: "#shelf" },
    { title: "Contact", icon: <Mail className="h-5 w-5" />, href: "#contact" },
  ];
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <Dock magnification={64} distance={140} panelHeight={64}>
        {items.map((it) => (
          <DockItem key={it.title} href={it.href}>
            <DockLabel>{it.title}</DockLabel>
            <DockIcon>{it.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pt-32 pb-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            Chapter 00 · Portfolio / 2026
          </div>
          <h1 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
            <TextEffect per="char" as="span" className="block">ABHISHEK</TextEffect>
            <TextEffect per="char" as="span" className="block gold-text" delay={0.35}>RAI A</TextEffect>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Aspiring{" "}
            <span className="text-foreground font-medium">Machine Learning Engineer</span>. B.E. AI &amp; ML at
            Mysore University · <span className="text-primary font-mono">GPA 9.31/10</span> · currently building a hybrid
            movie recommender on ~1M titles.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic intensity={0.25} range={140}>
              <a
                href="#ask"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
              >
                Ask my AI ↴
              </a>
            </Magnetic>
            <Magnetic intensity={0.25} range={140}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition"
              >
                Hire me
              </a>
            </Magnetic>
            <Magnetic intensity={0.2} range={140}>
              <a
                href="https://drive.google.com/file/d/1OaO_nbj7jrrgJY1JGp3CSh798Vh_rf8w/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition"
              >
                Résumé ↗
              </a>
            </Magnetic>
            <Magnetic intensity={0.2} range={140}>
              <a
                href="https://github.com/Abhirai2006"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition"
              >
                GitHub →
              </a>
            </Magnetic>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
            <Kpi k="9.31" sub="GPA / 10" />
            <Kpi k="IV" sub="Semester" />
            <Kpi k="3+1" sub="Web apps · C++ suite" />
          </dl>
        </div>
        <div className="hidden lg:flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/40 via-accent/20 to-destructive/30 blur-2xl opacity-60" />
            <img
              src={portrait.url}
              alt="Abhishek Rai A"
              className="relative h-[420px] w-[320px] object-cover rounded-[2rem] border border-border shadow-2xl grayscale-[0.15]"
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background/90 backdrop-blur px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground whitespace-nowrap">
              <span className="text-primary">●</span> abhishek · mysuru
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono uppercase tracking-widest text-muted-foreground animate-bounce">
        scroll ↓
      </div>
    </section>
  );
}

function Kpi({ k, sub }: { k: string; sub: string }) {
  return (
    <div>
      <div className="text-3xl font-display gold-text">{k}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
        {sub}
      </div>
    </div>
  );
}

function AnimatedKpi({ n, sub }: { n: number; sub: string }) {
  return (
    <div>
      <div className="text-3xl font-display gold-text">
        <AnimatedNumber value={n} />
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
        {sub}
      </div>
    </div>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee({ words }: { words: string[] }) {
  const line = words.join("  ★  ");
  return (
    <div className="overflow-hidden border-y border-border bg-muted/30 py-4">
      <div className="whitespace-nowrap marquee flex">
        <span className="font-chapter text-2xl tracking-widest px-6">{line}</span>
        <span className="font-chapter text-2xl tracking-widest px-6">{line}</span>
      </div>
    </div>
  );
}

/* ---------- ORIGIN ---------- */
function Origin() {
  return (
    <>
      <Marquee
        words={[
          "ML ENGINEER",
          "PROBLEM SOLVER",
          "ANIME FAN",
          "DSA NERD",
          "TULU · KANNADA · HINDI · ENGLISH",
        ]}
      />
      <section id="origin" className="mx-auto max-w-6xl px-6 py-28">
        <ChapterHeader n="01" title="Origin Story" />
        <div className="mt-10 grid md:grid-cols-[1fr_1.4fr] gap-12">
          <blockquote className="relative border-l-2 border-primary pl-6 font-display text-2xl leading-snug">
            "Building cool stuff — <span className="gold-text">one algorithm at a time.</span>"
          </blockquote>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm <span className="text-foreground font-semibold">Abhishek Rai A</span>, a
              <span className="text-foreground"> B.E. AI &amp; ML</span> student at
              <span className="text-foreground"> Mysore University School of Engineering</span>. IV semester,
              GPA <span className="text-primary font-mono">9.31/10</span>. Originally from Mangalore, now in Mysuru.
            </p>
            <p>
              I find patterns in mathematics and elegance in algorithms. I speak Tulu (mother tongue), Kannada, Hindi
              and English. 53+ anime watched, One Piece bias. I vibe-code the web layer with AI copilots and put my head
              down on the AI/ML core.
            </p>
            <p className="text-sm">
              The plan: ship one small ML system every month. This portfolio is one of them.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-widest">
              <Chip>Mysuru, Karnataka</Chip>
              <Chip>B.E. AI &amp; ML</Chip>
              <Chip>DRISHTI CPS · IIT Indore</Chip>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">{children}</span>
  );
}

function ChapterHeader({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-6">
      <span className="font-chapter text-7xl gold-text leading-none">{n}</span>
      <div>
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Chapter</div>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}

/* ---------- NOW BUILDING ---------- */
function NowBuilding() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      <div className="grid md:grid-cols-3 gap-4">
        <StatusCard tag="Now building" title="Movie Rec System" body="Hybrid content-based + collaborative filtering on ~1M movies. Python · FastAPI · React · scikit-learn." />
        <StatusCard tag="Learning" title="AI & Data Science" body="Ongoing certification via DRISHTI CPS (IIT Indore) — ML fundamentals, workflows, applied AI." />
        <StatusCard tag="Up next" title="DevOps" body="Docker, CI/CD pipelines, and cloud deploys — so my ML systems actually ship, not just train." />
      </div>
    </section>
  );
}
function StatusCard({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur p-5 hover:border-primary/60 transition-colors">
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> {tag}
      </div>
      <div className="mt-3 font-display text-xl">{title}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

/* ---------- ARSENAL ---------- */
function Arsenal() {
  const tiers = [
    { tier: "S", label: "Proficient", items: ["Python", "C", "C++", "Calculus", "Linear Algebra", "Git"] },
    { tier: "A", label: "Intermediate", items: ["SQL", "DSA", "OOP", "DBMS", "Probability"] },
    { tier: "B", label: "Learning", items: ["PyTorch", "scikit-learn", "FastAPI", "Discrete Math"] },
  ];
  return (
    <section id="arsenal" className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="02" title="Power Levels" />
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Core weapons in the arsenal — AI/ML + math foundations. I vibe-code web (HTML/CSS/JS/React) with AI as
        copilot. Focus stays on the algorithms.
      </p>
      <div className="mt-10 space-y-4">
        {tiers.map((t) => (
          <div
            key={t.tier}
            className="grid grid-cols-[80px_1fr] items-center border border-border rounded-xl overflow-hidden bg-card/40"
          >
            <div className="bg-primary text-primary-foreground py-6 text-center">
              <div className="font-chapter text-4xl leading-none">{t.tier}</div>
              <div className="text-[9px] font-mono uppercase tracking-widest mt-1">TIER</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t.label}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {t.items.map((i) => (
                  <span
                    key={i}
                    className="rounded-md bg-secondary border border-border px-3 py-1 text-sm font-mono"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- GITHUB ---------- */
function GithubSection() {
  return (
    <section id="github" className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="03" title="Live Code Activity" />
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Not hardcoded — pulled live from the GitHub API every 10 minutes. What you see is what I actually shipped.
      </p>
      <div className="mt-10">
        <GithubLive />
      </div>
    </section>
  );
}

/* ---------- PROJECTS ---------- */
function Projects() {
  const items: Project[] = [
    {
      title: "MUSE Students Voice",
      tag: "Full-stack · SSR · Auth",
      body: "USN-verified anonymous grievance platform. Peer-voted complaints auto-escalate into formal PDF letters. Supabase RLS + security-definer RPCs so identities stay server-side. Cloudflare Workers + TanStack Start + React 19. Seeded against 1,159+ verified student IDs.",
      tags: ["TanStack Start", "Supabase RLS", "Cloudflare"],
      images: [muse1.url, muse2.url, muse3.url],
      live: "https://muse-studentsvoice.lovable.app/",
      repo: "https://github.com/Abhirai2006",
    },
    {
      title: "O(patience)",
      tag: "Algorithms · React · TypeScript",
      body: "Deep sorting playground — 5 algorithms, pointer flags, pitch-based sound mode, step-by-step export. Race Mode with live leaderboard, Quiz Mode, Sort DNA personality engine, embeddable /embed widget.",
      tags: ["TypeScript", "React", "Motion"],
      images: [sort1.url, sort2.url, sort3.url],
      live: "https://sort-visually-abhirai2006.lovable.app/",
      repo: "https://github.com/Abhirai2006",
    },
    {
      title: "Binary Search Visualizer",
      tag: "Vanilla JS · Glassmorphism",
      body: "High-performance visualizer with real-time low/mid/high tracking and interactive audio feedback for each step. Demonstrates O(log n) narrowing visually.",
      tags: ["JavaScript", "Netlify"],
      images: [bs1.url, bs2.url, bs3.url],
      live: "https://binarysearch-abhirai.netlify.app/",
      repo: "https://github.com/Abhirai2006",
    },
    {
      title: "C++ Console Mini-Suite",
      tag: "OOP · Terminal",
      body: "Tic-Tac-Toe (board logic, win/tie), Mini Banking System (validated deposit/withdraw), Rock-Paper-Scissors — reinforcing OOP, arrays, modular design.",
      tags: ["C++", "OOP"],
      images: [],
      repo: "https://github.com/Abhirai2006",
      snippet: {
        title: "banking.cpp — sample session",
        lines: [
          "$ ./banking",
          "── Mini Banking System ─────────────",
          "1) Deposit   2) Withdraw   3) Balance   4) Exit",
          "> 1",
          "Amount: 2500",
          "✔ Deposited ₹2500.  New balance: ₹7,300",
          "> 2",
          "Amount: 9000",
          "✘ Insufficient funds. Balance: ₹7,300",
          "> 3",
          "Balance: ₹7,300",
          "> 4",
          "Session closed. Goodbye 👋",
        ],
      },
    },
  ];
  const [active, setActive] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveringGrid, setHoveringGrid] = useState(false);
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="04" title="The Arsenal" />
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Click any card to open the case file — screenshots, live site, and source code.
      </p>
      <div
        ref={gridRef}
        onMouseEnter={() => setHoveringGrid(true)}
        onMouseLeave={() => setHoveringGrid(false)}
        className="mt-10 grid md:grid-cols-2 gap-4 md:[&_*]:cursor-none"
      >
        {items.map((p) => (
          <button
            key={p.title}
            onClick={() => setActive(p)}
            className="group text-left rounded-2xl border border-border bg-card/50 p-6 hover:border-primary hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-primary">{p.tag}</div>
                <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
              </div>
              <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 text-[10px] font-mono uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              open case file →
            </div>
          </button>
        ))}
      </div>
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      <Cursor visible={hoveringGrid && !active}>
        <div className="rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest shadow-lg flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
          Open
        </div>
      </Cursor>
    </section>
  );
}

/* ---------- ASK AI ---------- */
function AskSection() {
  return (
    <section id="ask" className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="05" title="Ask Abhishek" />
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Recruiter in a hurry? Skip the scroll — ask the AI trained on my resume and projects. Answers stay grounded
        in my actual background.
      </p>
      <div className="mt-10 max-w-3xl mx-auto">
        <AskAbhishek />
      </div>
    </section>
  );
}

/* ---------- ANIME ---------- */
function AnimeShelf() {
  const top = [
    ["One Piece", 1120],
    ["Naruto", 721],
    ["Hunter x Hunter", 148],
    ["My Hero Academia", 138],
    ["Dragon Ball", 125],
    ["The Seven Deadly Sins", 96],
    ["Attack on Titan", 89],
    ["Haikyuu!!", 86],
    ["Demon Slayer", 83],
    ["Jujutsu Kaisen", 60],
    ["Fire Force", 60],
    ["Bleach", 50],
    ["Sword Art Online", 49],
    ["Jobless Reincarnation", 48],
    ["Black Clover", 48],
    ["Frieren", 38],
  ];
  return (
    <section id="shelf" className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="06" title="Side Quest · Anime Shelf" />
      <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg">
        <AnimatedKpi n={56} sub="Series + movies" />
        <AnimatedKpi n={3653} sub="Episodes" />
        <Kpi k="S" sub="One Piece" />
      </div>
      <div className="mt-10">
        <InfiniteSlider gap={12} duration={35} speedOnHover={12}>
          {top.map(([name, ep]) => (
            <div
              key={String(name)}
              className="shrink-0 rounded-lg border border-border bg-card/60 px-4 py-2 font-mono text-xs flex items-center gap-3"
            >
              <span className="text-foreground">{name}</span>
              <span className="text-primary">{ep}ep</span>
            </div>
          ))}
        </InfiniteSlider>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs">
        {top.map(([name, ep], i) => (
          <div
            key={name}
            className="flex items-center justify-between border border-border rounded-md px-3 py-2 bg-card/40"
          >
            <span className="flex items-center gap-2">
              <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span>{name}</span>
            </span>
            <span className="text-primary">{ep}ep</span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs font-mono text-muted-foreground">
        領域展開 · 全集中 · 葬送 · 計画通り · 自由の翼 · 76,750 min watched
      </p>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const [revealed, setRevealed] = useState(false);
  // Split + reversed encoding so raw source doesn't contain the strings verbatim.
  const decode = (parts: string[]) => parts.map((p) => p.split("").reverse().join("")).join("");
  const email = decode(["iarihba", "mg@6002", "moc.lia"]);
  const phone = decode(["69 19+", "110 860", "54"]);
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="07" title="Let's Build Something" />
      <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-2xl border border-border bg-black/60 font-mono text-sm p-6 space-y-1 shadow-2xl">
          <div className="flex gap-1.5 mb-3">
            <span className="h-3 w-3 rounded-full bg-destructive" />
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="h-3 w-3 rounded-full bg-muted-foreground" />
          </div>
          <div><span className="text-primary">$</span> whoami</div>
          <div className="text-muted-foreground pl-2">abhishek@rai:~$ aspiring_ml_engineer</div>
          <div>
            <span className="text-primary">$</span>{" "}
            <button
              onClick={() => setRevealed(true)}
              className="text-foreground hover:text-primary underline-offset-4 hover:underline"
            >
              cat contact.sh
            </button>
          </div>
          {revealed ? (
            <>
              <div className="text-muted-foreground pl-2">
                →{" "}
                <a href={`mailto:${email}`} className="text-primary hover:underline">
                  {email}
                </a>
              </div>
              <div className="text-muted-foreground pl-2">
                →{" "}
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                  {phone}
                </a>
              </div>
            </>
          ) : (
            <div className="text-muted-foreground pl-2 italic">
              [ contact locked — click <span className="text-primary">cat contact.sh</span> to decrypt ]
            </div>
          )}
          <div><span className="text-primary">$</span> ./transmit.sh</div>
          <div className="text-muted-foreground pl-2 animate-pulse">▍</div>
        </div>
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            An algorithm to crack, a theorem to prove, or the latest anime arc — drop a line.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setRevealed(true)}
              className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90"
            >
              {revealed ? (
                <a href={`mailto:${email}`} className="text-primary-foreground">
                  {email}
                </a>
              ) : (
                "Reveal email"
              )}
            </button>
            <a
              href="https://github.com/Abhirai2006"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm hover:border-primary hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abhishek-rai-a-00067238b/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm hover:border-primary hover:text-primary"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/_abhishek.rai.a_"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm hover:border-primary hover:text-primary"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
        <div>© 2026 · Abhishek Rai A · Portfolio v3</div>
        <div>Built with TanStack Start · Three.js · Lovable AI</div>
      </div>
    </footer>
  );
}
