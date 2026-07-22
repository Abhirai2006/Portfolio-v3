
# Abhishek Rai A — Portfolio v3

A single-page, scroll-choreographed portfolio built on TanStack Start. Recruiter-credible on first paint, manga-flavored as you scroll, and backed by real data (GitHub API, live ML demos, RAG chatbot) so nothing feels faked.

## The motto, made concrete

- Every scroll tick moves something in 3D — the site *reacts*, it doesn't just fade in.
- Nothing is hardcoded that shouldn't be: GitHub stats, commit graph, repo languages all come from live APIs.
- Every "I can do X" claim has a working demo next to it (MNIST, sorting, binary search, k-means, gradient descent, Ask-Abhishek).

## Tech stack

- TanStack Start (existing template) + Tailwind v4
- **three.js via @react-three/fiber + @react-three/drei** for 3D
- **GSAP + ScrollTrigger** for scroll choreography (Lenis for smooth-scroll)
- **Framer Motion** for micro-interactions
- **Lovable AI Gateway** (google/gemini-3.6-flash) for the chatbot
- **Lovable Cloud** for: chat history + a `resume_chunks` table with embeddings for RAG
- GitHub REST API via connector (or unauthenticated for public data) for live stats

## Page structure (one long scroll, chapter-based)

```text
[00] Boot Sequence  →  loader with rotating 3D wireframe head, "loading portfolio.exe"
[01] Hero           →  3D scene: floating katana + geometric shards + name typewriter
                        Recruiter row: GPA 9.31 · B.E. AI&ML · Mysore · Resume / Hire Me / GitHub
[02] Origin Story   →  chapter 01 manga panel, parallax portrait, bio
[03] Now Building   →  Movie Rec System live status card + roadmap
[04] Arsenal (3D)   →  rotating 3D tech-stack orb (icons on a sphere), tier lists on scroll pin
[05] GitHub Live    →  real repos, real contribution heatmap, real language breakdown
[06] Playground     →  tabbed lab: MNIST · Sorting · Binary Search · K-Means · Gradient Descent
[07] Projects       →  scroll-pinned horizontal gallery of project cards with 3D tilt
[08] Ask Abhishek   →  RAG chatbot trained on resume + projects
[09] Anime Shelf    →  chapter 06, 53-series grid with wanted-poster easter egg
[10] Devlog         →  3 posts, expandable
[11] Contact        →  terminal-style form, socials, resume download
```

Route: everything on `/` for the scroll narrative. `/chat` for a standalone AI chat page. `/playground/[demo]` for shareable deep-links to each demo.

## Scroll-driven 3D — the headline feature

- Lenis smooth-scroll wraps the whole page.
- One persistent `<Canvas>` fixed behind the content; sections update its camera/scene via GSAP ScrollTrigger timelines.
- Hero: katana + floating polygons; on scroll they explode outward and re-form into the "Arsenal" tech orb.
- Arsenal → GitHub: the orb morphs into a contribution grid extruded in 3D.
- Playground: canvas dims, DOM demos take focus.
- Contact: camera pulls back to reveal a wireframe city with a single lit window.
- Reduced-motion + no-WebGPU/low-power fallback: skip 3D scene, keep static hero image and fade-in sections.

## Feature specs

### Recruiter-first hero (top of fold)

- Name, role ("B.E. AI & ML · Mysore University · GPA 9.31/10"), Resume + Hire Me + GitHub buttons.
- Small credential strip: DRISHTI CPS IIT Indore · 4+ shipped projects · Python/C++/ML.
- The 3D is behind, never blocks reading. Recruiter can screenshot the fold and get everything.

### Real GitHub activity (section 05)

- Server function fetches `https://api.github.com/users/Abhirai2006` + `/repos` + a small GraphQL query for the contribution calendar (via connector when linked, else public REST).
- Cached in-memory for 10 min per request.
- Renders: total commits (past year), current streak, top 6 repos with stars/language, real language pie, 3D-extruded contribution heatmap.
- Replaces the current portfolio's hardcoded "14 repos · 21 stars · 0 commits".

### Interactive DSA/ML playground (section 06)

Tabbed lab, each tab is a real demo (no video, no gif):

1. **MNIST digit** — port existing 9KB prototype classifier.
2. **Sorting race** — 5 algorithms bar-race with speed slider.
3. **Binary search** — array + target, animated low/mid/high.
4. **K-Means (2D)** — click to add points, watch centroids converge.
5. **Gradient descent** — draggable start point on a 3D loss surface (Three.js).

Each demo has "Open standalone" → `/playground/<slug>`.

### Ask Abhishek — RAG chatbot (section 08 + `/chat`)

- Lovable Cloud tables: `resume_chunks(id, content, embedding vector, source)`, `chat_messages(conversation_id, role, content, created_at)`.
- Seed migration inserts resume + project descriptions chunked ~500 tokens, embedded with Lovable AI embeddings.
- Server function on ask: embed query → pgvector similarity search top-5 → stream answer via `streamText` with google/gemini-3.6-flash.
- UI: AI Elements chat window, suggested prompts ("What's his strongest ML project?", "Is he available for internships?", "Explain O(patience)").
- System prompt keeps it factual and refuses off-topic questions.

### Manga/anime elements to carry over

- Chapter headers, "wanted" poster in the origin chapter, tier list styling in Arsenal, anime shelf grid, kanji accents (領域展開 etc.) used sparingly as design texture — never in the recruiter-critical fold.

## Design direction

- **Palette:** Noir & Gold — near-black background, gold accent for CTAs and highlights, off-white text. Recruiter-serious, anime-friendly.
- **Type:** Space Grotesk for headings (with occasional Bebas Neue for chapter numbers), Inter for body, JetBrains Mono for code/terminal moments.
- **Density:** generous whitespace on recruiter sections, denser/playful in anime + devlog sections.
- Reject: purple gradients, glassmorphism-everywhere, three-column feature grids.

## Data & backend

Lovable Cloud tables (with RLS + grants per platform rules):
- `resume_chunks` — public read (`anon` SELECT), service_role writes.
- `chat_conversations`, `chat_messages` — scoped to anonymous session id in a cookie; no login required.
- `github_cache` — key/value with `expires_at`; server functions read/write with service_role.

Server functions (all under `src/lib/*.functions.ts`):
- `getGithubProfile`, `getGithubRepos`, `getContributions`
- `startConversation`, `sendChatMessage` (streams)
- `embedAndSearchResume`

Public API route: `src/routes/api/chat.ts` for the streaming chat transport (`useChat`).

## Build order

1. Enable Lovable Cloud, create tables + migrations + resume chunk seed.
2. Redesign shell: __root layout, Noir & Gold theme in styles.css, fonts via `<link>` in __root head.
3. Replace `src/routes/index.tsx` with the sectioned page + Lenis + persistent 3D canvas.
4. Build hero + origin + arsenal sections with GSAP ScrollTrigger.
5. Wire GitHub live section (server functions + cache).
6. Ship playground demos (MNIST first — reuse existing logic, then sorting/binary search, then k-means and gradient descent).
7. Ship Ask Abhishek: embeddings pipeline, RAG server fn, chat UI on `/` and `/chat`.
8. Anime shelf + devlog + contact + terminal form.
9. SEO: per-route `head()` on `/` (rewrite title/description/og), `/chat`, `/playground/*`.
10. Reduced-motion + no-WebGL fallback pass. Mobile pass (drop heavy 3D on `< md`, keep static hero).

## Out of scope for v1

- Blog CMS (devlog posts stay as static entries in code).
- Auth on Ask Abhishek (anonymous session only).
- Realtime multiplayer visualizers.

## Open assumptions (say if any is wrong)

- Model for chat: **google/gemini-3.6-flash** (fast, cheap, multimodal-ready).
- GitHub username: **Abhirai2006** (from resume).
- Resume PDF stays the current one on file; I'll host it as a Lovable Asset.
- No login anywhere.
