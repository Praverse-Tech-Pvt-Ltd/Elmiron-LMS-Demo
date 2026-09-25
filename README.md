# Elmiron Learning — MR capability platform (demo)

A clickable build of the Elmiron Learning module, extended from product training into a complete **Medical Representative capability-development platform**:

- a **36-course curriculum** that runs Beginner → Intermediate → Advanced → Certification
- **learning paths**, an **8-week new-MR onboarding** and a **4-level certification programme**
- a **Practice with AI Doctor** simulator: a fictional doctor challenges the MR, then an AI Coach scores the call against a defined rubric

All promotional and doctor-engagement content stays within approved product information, company compliance policy, applicable law, industry codes, medical ethics and pharmacovigilance requirements.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # AI Doctor benchmark conversations + redaction tests
npm run build      # static site in dist/ (+ api/ai.ts as a serverless function on Vercel)
```

### Live AI (optional)

The AI Doctor works out of the box on a **built-in rules engine**, with no key, no network and no cost. To use Claude as the doctor and coach, copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`. On Vercel, set it as an environment variable.

- The key is only read by the server endpoint `api/ai.ts`. The browser never sees it.
- The browser never sends a prompt. The server rebuilds every prompt from its own copy of the approved content, so the key can't be used as a general-purpose proxy.
- If the AI times out or fails, the session carries on with the built-in doctor.
- Compliance scoring and the critical-error override always come from the rules. A model's judgement never decides them.

## What's where

| Area | Screens (`#/…`) | Code |
|---|---|---|
| Learn hub (brief §56) | `l1` | `src/screens/learn/LearnHub.tsx` |
| Catalogue, course template, lesson player | `a2`, `l2/<course>`, `l3/<course>/<lesson>` | `src/screens/learn/*`, `src/content/*` |
| Paths, onboarding, certification | `l4` | `src/screens/learn/PathsPage.tsx` |
| Role-play and case library | `l5` | `src/screens/learn/CasesPage.tsx` |
| AI Doctor: hub, setup, live call, feedback, progress | `p1`–`p5` | `src/screens/practice/*`, `src/ai/*` |
| Manager: AI practice and assignment reviews | `b3` | `src/screens/manager/TeamPractice.tsx` |
| Admin: curriculum and paths, AI Doctor configuration | `c6`, `c7` | `src/screens/admin/*` |
| Original design screens (A1–A9, B1–B2, C1–C5) | `a1`… | `src/screens/generated/*` |

### Content is data

- **Courses** live in `src/content/courses-a.ts` and `courses-b.ts`. Every course uses the same template (`src/content/types.ts`): objective, audience, duration, modules, lessons, key takeaways, exercise, knowledge check, final assessment, pass mark and certificate. Lessons can be text, video, frameworks, examples, scenarios, role-plays, cases and assignments.
- **Paths, onboarding and certification levels** are in `src/content/index.ts`.
- **Admins can publish new courses** from *Curriculum & paths → New course* with no code change.
- **Market versions:** courses can carry per-market versions, for example India (UCPMP 2024), UK or a global baseline.

### AI Doctor

| Piece | File |
|---|---|
| Personas (9), specialties (10), scenarios (14), approved product pack | `src/ai/content.ts` |
| Conversation engine, rubric scoring, critical-error override, coaching | `src/ai/engine.ts` |
| Layered prompts: system rules, persona, retrieved grounding, scenario, difficulty, learner, compressed conversation | `src/ai/prompts.ts` |
| Benchmark conversations with expected score ranges | `src/ai/benchmarks.ts`, `npm test` |
| Admin config: critical errors, transcript access, certification rule, model and cost limits, extra prohibited claims | `src/ai/store.ts` |

The Elmiron product pack is **demo grounding** built from the public US prescribing information. Replace it with the approved PI for your market before real use. The Elmiron masterclass course deliberately contains no product claims, only placeholders pending medical review.

**Privacy:** the MR is warned not to enter patient identifiers. Phone numbers, record numbers, emails and "patient named …" are redacted before anything is stored or sent, first in the browser and again on the server.

### Persistence

This is a front-end demo. Progress, sessions, reviews, admin settings and published courses are saved in the browser's `localStorage`. In production they would live in the LMS database; the stored shapes follow the brief's tracking fields (§29).

## Motion

Type is Source Sans 3 (UI) with Source Code Pro (IDs), tuned for comfortable reading on a laptop. Motion is kept calm, per the design notes ("no confetti, no badge"):

- **Loading:** a start-up screen waits for the typeface, and each screen loads on demand behind a skeleton of its layout.
- **Navigation:** switching role moves the whole shell, while moving within a flow cascades only the content. A green sweep runs across the top on every navigation.
- **Content:** cards, rows and pills stage in, bars grow, numbers count up and score rings fill.
- **AI Doctor:** the doctor's tone ring changes colour, a typing indicator runs while the doctor replies, and coaching chips pop in. At the end there is a handover to the AI Coach.
- **Lessons and questions:** framework diagrams draw themselves step by step, and question choices reveal their feedback.
- `prefers-reduced-motion` turns all of it off.

Keyboard: `Alt + ←/→` steps through the screens in demo mode, and `Esc` closes menus.
