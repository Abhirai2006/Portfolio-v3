import { createFileRoute } from "@tanstack/react-router";

// Non-streaming chat endpoint. Uses Lovable AI Gateway directly to avoid AI SDK
// version-drift issues; the client posts { messages: [...] } and gets { reply }.

const RESUME_CONTEXT = `
ABHISHEK RAI A — Aspiring ML Engineer
Contact: abhirai2006@gmail.com | +91-9606801145
GitHub: https://github.com/Abhirai2006 | LinkedIn: /in/abhishek-rai-a-00067238b
Location: Mysuru, Karnataka (originally Mangalore)
Languages spoken: Tulu (mother tongue), Kannada, Hindi, English

EDUCATION
- B.E. in Artificial Intelligence & Machine Learning, Mysore University School of Engineering (Sep 2024 – Present). GPA 9.31/10 as of 3rd semester. Currently in 4th semester.
- Ongoing AI & Data Science certification, DRISHTI CPS (Technology Innovation Hub of IIT Indore), via Intellipaat.
- PUC (PCMB) at Gopalaswamy Independent PU College, Mysore (2022–2024) — 90.15%.
- SSLC at Gopalaswamy Shishuvihara High School (until 2022) — 95%.

SHIPPED PROJECTS
1. MUSE Students Voice — anonymous USN-verified campus grievance platform; peer-voted complaints auto-escalate into formal PDF letters to the Director and Vice Chancellor. Supabase Row Level Security, sanitized views, security-definer RPCs so author identities never leave the server. SSR on Cloudflare Workers with TanStack Start and React 19. Seeded against 1,159+ verified student IDs.
2. O(patience) — interactive sorting-algorithm playground (Bubble, Selection, Insertion, Merge, Quick). Pointer flags, sound mode, step-by-step export, Race Mode (5 algorithms racing with live leaderboard), Quiz Mode (identify-the-sort game), Sort DNA (behavior-based personality engine), embeddable /embed widget.
3. Binary Search Visualizer — vanilla JS, glassmorphism, real-time low/mid/high tracking, audio feedback, demonstrates O(log n).
4. C++ Console Mini-Projects — Tic-Tac-Toe, Rock-Paper-Scissors, Mini Banking System with input validation.
5. Currently building: Movie Recommendation System — hybrid content-based + collaborative filtering on ~1M movies (Python, FastAPI, React, ML).

SKILLS
- Programming: C, C++, Python, SQL
- Web: HTML, CSS, JavaScript, React, TanStack Start, Cloudflare Workers, Vercel, Netlify, Replit
- CS Fundamentals: Data Structures & Algorithms, OOP, DBMS
- Math: Linear Algebra, Calculus, Discrete Mathematics, Probability & Statistics
- Learning: PyTorch, scikit-learn, FastAPI

INTERESTS
- 53+ anime series watched (~3,600+ episodes). One Piece is his all-time favorite. Currently watching Frieren: Beyond Journey's End.
- Vibe-coder: focuses on AI/ML fundamentals and uses AI copilots to move fast on web scaffolding.
- Motto: "Building cool stuff — one algorithm at a time."

CAREER GOAL
Aspiring Machine Learning Engineer, looking for internships. Available for interviews.
`.trim();

const BASE_PROMPT = `You are "Ask Abhishek" — a concise, friendly assistant embedded in Abhishek Rai A's portfolio site.

You know only what is in the RESUME_CONTEXT below. Answer recruiter and visitor questions about Abhishek's background, projects, skills, education, and interests using ONLY that information. If asked something outside it, say so and suggest emailing abhirai2006@gmail.com.

Style: 2-4 sentences, direct, third-person ("Abhishek..."). Never invent projects, grades, dates, employers, or credentials. Use plain text (light markdown OK — bold, bullets).

RESUME_CONTEXT:
${RESUME_CONTEXT}`;

const ANIME_ADDON = `

ANIME MODE IS ON:
- ALWAYS answer the actual question accurately and completely FIRST. Personality never replaces information.
- After the real answer, you MAY add ONE short line (max ~15 words) with a light, relevant anime reference or vibe — e.g. compare debugging to a training arc, complexity to power scaling, persistence to a shonen protagonist.
- Pull references from: One Piece (his favorite — occasional is fine), Naruto, Attack on Titan, Jujutsu Kaisen, Hunter x Hunter, Demon Slayer, My Hero Academia, Haikyuu, Frieren, Bleach.
- Paraphrase only. NEVER quote copyrighted lyrics, catchphrases, or dialogue verbatim. No song lines. Speak generically ("very shonen-protagonist energy") rather than quoting.
- Keep it subtle: one line, not a paragraph. Skip the reference entirely if nothing fits — do not force it.
- A small emoji at the end of the anime line is fine (🌀 ⚔️ 🍥). Don't spam emojis in the factual part.`;

type Msg = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return Response.json({ error: "AI is not configured yet." }, { status: 500 });
        }
        let body: { messages?: Msg[] };
        try {
          body = (await request.json()) as { messages?: Msg[] };
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const animeMode = Boolean((body as { animeMode?: boolean }).animeMode);
        const messages = (body.messages ?? []).slice(-12).filter(
          (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.length < 4000,
        );
        if (!messages.length) return Response.json({ error: "No messages" }, { status: 400 });

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-3.6-flash",
            messages: [
              { role: "system", content: BASE_PROMPT + (animeMode ? ANIME_ADDON : "") },
              ...messages,
            ],
          }),
        });

        if (res.status === 429) return Response.json({ error: "Getting a lot of questions right now — try again in a minute." }, { status: 429 });
        if (res.status === 402) return Response.json({ error: "AI credits exhausted." }, { status: 402 });
        if (!res.ok) {
          const t = await res.text();
          console.error("AI gateway error", res.status, t);
          return Response.json({ error: "AI request failed." }, { status: 500 });
        }

        const data = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content?.trim() ?? "";
        return Response.json({ reply });
      },
    },
  },
});