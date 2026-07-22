import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { AskAbhishek } from "@/components/portfolio/AskAbhishek";
import { Playground } from "@/components/portfolio/Playground";
import { GithubLive } from "@/components/portfolio/GithubLive";
import heroPortrait from "@/assets/hero-portrait.jpg";

const HeroScene = lazy(() =>
  import("@/components/portfolio/HeroScene").then((m) => ({ default: m.HeroScene })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abhishek Rai A — Aspiring ML Engineer · Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Abhishek Rai A — B.E. AI & ML student (GPA 9.31), Mysore. Live GitHub, in-browser ML demos, and an AI assistant trained on his resume.",
      },
      { property: "og:title", content: "Abhishek Rai A — Aspiring ML Engineer" },
      {
        property: "og:description",
        content:
          "Scroll-driven portfolio: live GitHub, MNIST digit classifier, sorting & search visualizers, Ask-Abhishek AI.",
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
      <Nav />
      <Hero />
      <Origin />
      <NowBuilding />
      <Arsenal />
      <GithubSection />
      <PlaygroundSection />
      <Projects />
      <AskSection />
      <AnimeShelf />
      <Devlog />
      <Contact />
      <Footer />
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
        <div>
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            Chapter 00 · Portfolio / 2026
          </div>
          <h1 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
            <span className="block">ABHISHEK</span>
            <span className="block gold-text">RAI · A</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Aspiring{" "}
            <span className="text-foreground font-medium">Machine Learning Engineer</span>. B.E. AI &amp; ML at
            Mysore University · <span className="text-primary font-mono">GPA 9.31/10</span> · currently building a hybrid
            movie recommender on ~1M titles.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#ask"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
            >
              Ask my AI ↴
            </a>
            <a
              href="mailto:abhirai2006@gmail.com?subject=Internship%20opportunity"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition"
            >
              Hire me
            </a>
            <a
              href="https://github.com/Abhirai2006"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition"
            >
              GitHub →
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
            <Kpi k="9.31" sub="GPA / 10" />
            <Kpi k="IV" sub="Semester" />
            <Kpi k="4+" sub="Shipped projects" />
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full" />
          <img
            src={heroPortrait}
            alt="Abhishek Rai A"
            width={1024}
            height={1280}
            className="relative rounded-2xl border border-border w-full object-cover aspect-[4/5] grayscale-[15%]"
          />
          <div className="absolute -bottom-4 -left-4 rounded-lg border border-border bg-background/90 backdrop-blur px-4 py-2 font-mono text-[11px] uppercase tracking-widest">
            <span className="text-primary">●</span> currently building{" "}
            <span className="text-foreground">movie rec sys</span>
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
        <StatusCard tag="Up next" title="Kaggle · PyTorch" body="Hands-on PyTorch + scikit-learn, first Kaggle submission, then a second small ML system." />
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

/* ---------- PLAYGROUND ---------- */
function PlaygroundSection() {
  return (
    <section id="playground" className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="04" title="Interactive Playground" />
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Every claim below is a working demo. Draw digits, race a bubble sort, watch a binary search narrow, or drop
        points and let k-means cluster them.
      </p>
      <div className="mt-10">
        <Playground />
      </div>
    </section>
  );
}

/* ---------- PROJECTS ---------- */
function Projects() {
  const items = [
    {
      title: "MUSE Students Voice",
      tag: "Full-stack · SSR · Auth",
      body: "USN-verified anonymous grievance platform. Peer-voted complaints auto-escalate into formal PDF letters. Supabase RLS + security-definer RPCs so identities stay server-side. Cloudflare Workers + TanStack Start + React 19. Seeded against 1,159+ verified student IDs.",
      tags: ["TanStack Start", "Supabase RLS", "Cloudflare"],
    },
    {
      title: "O(patience)",
      tag: "Algorithms · React · TypeScript",
      body: "Deep sorting playground — 5 algorithms, pointer flags, pitch-based sound mode, step-by-step export. Race Mode with live leaderboard, Quiz Mode, Sort DNA personality engine, embeddable /embed widget.",
      tags: ["TypeScript", "React", "Motion"],
    },
    {
      title: "Binary Search Visualizer",
      tag: "Vanilla JS · Glassmorphism",
      body: "High-performance visualizer with real-time low/mid/high tracking and interactive audio feedback for each step. Demonstrates O(log n) narrowing visually.",
      tags: ["JavaScript", "Netlify"],
    },
    {
      title: "C++ Console Mini-Suite",
      tag: "OOP · Terminal",
      body: "Tic-Tac-Toe (board logic, win/tie), Mini Banking System (validated deposit/withdraw), Rock-Paper-Scissors — reinforcing OOP, arrays, modular design.",
      tags: ["C++", "OOP"],
    },
  ];
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="05" title="The Arsenal" />
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Built with curiosity, AI as copilot, and a lot of Stack Overflow.
      </p>
      <div className="mt-10 grid md:grid-cols-2 gap-4">
        {items.map((p) => (
          <div
            key={p.title}
            className="group rounded-2xl border border-border bg-card/50 p-6 hover:border-primary transition-colors"
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
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- ASK AI ---------- */
function AskSection() {
  return (
    <section id="ask" className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="06" title="Ask Abhishek" />
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
      <ChapterHeader n="07" title="Side Quest · Anime Shelf" />
      <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg">
        <Kpi k="53" sub="Series" />
        <Kpi k="3,622" sub="Episodes" />
        <Kpi k="S" sub="One Piece" />
      </div>
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs">
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
        領域展開 · 全集中 · 葬送 · 計画通り · 自由の翼
      </p>
    </section>
  );
}

/* ---------- DEVLOG ---------- */
function Devlog() {
  const posts = [
    {
      title: "Why I lost 8 hours to a single semicolon in my sorting visualizer",
      note: "It rendered fine. Race Mode broke. Fix was 1 character. Lesson was bigger.",
      read: "4 min",
    },
    {
      title: "The math behind why my Movie Rec model favoured comedies",
      note: "Cosine similarity is honest. It told me my training data was biased — I just wasn't listening.",
      read: "5 min",
    },
    {
      title: "I asked Claude to refactor my code. Here's where it failed.",
      note: "AI copilots are powerful — but they don't know what your code is FOR. That's still your job.",
      read: "3 min",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="08" title="Devlog" />
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Most students hide their bugs. I write about mine.
      </p>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {posts.map((p, i) => (
          <article key={p.title} className="grid md:grid-cols-[100px_1fr_100px] gap-6 py-6 group">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              POST · {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="font-display text-2xl group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
            </div>
            <div className="text-xs font-mono text-muted-foreground md:text-right">{p.read}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <ChapterHeader n="09" title="Let's Build Something" />
      <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-2xl border border-border bg-black/60 font-mono text-sm p-6 space-y-1 shadow-2xl">
          <div className="flex gap-1.5 mb-3">
            <span className="h-3 w-3 rounded-full bg-destructive" />
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="h-3 w-3 rounded-full bg-muted-foreground" />
          </div>
          <div><span className="text-primary">$</span> whoami</div>
          <div className="text-muted-foreground pl-2">abhishek@rai:~$ aspiring_ml_engineer</div>
          <div><span className="text-primary">$</span> cat contact.sh</div>
          <div className="text-muted-foreground pl-2">→ <a href="mailto:abhirai2006@gmail.com" className="text-primary hover:underline">abhirai2006@gmail.com</a></div>
          <div className="text-muted-foreground pl-2">→ <a href="tel:+919606801145" className="text-primary hover:underline">+91 96068 01145</a></div>
          <div><span className="text-primary">$</span> ./transmit.sh</div>
          <div className="text-muted-foreground pl-2 animate-pulse">▍</div>
        </div>
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            An algorithm to crack, a theorem to prove, or the latest anime arc — drop a line.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:abhirai2006@gmail.com"
              className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90"
            >
              Email me
            </a>
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
