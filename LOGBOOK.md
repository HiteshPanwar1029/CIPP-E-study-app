# Project Logbook — CIPP/E Prep

Append-only decision & change log. Newest entries at the bottom. Timestamps in UTC.
Records **what we decided**, **the options considered**, and **what was built/edited** each session.
Companion to `PROGRESS.md` (status/roadmap) — this file is the "why".

---

## 2026-07-01 — Planning & Phase 0 (scaffold & tokens)

### Decisions

| # | Decision | Options considered | Chosen | Why |
|---|----------|--------------------|--------|-----|
| D1 | Blueprint weighting granularity | (a) domain-level only; (b) competency-level | **(b) competency-level** | The BoK publishes per-competency min–max that sum exactly to each domain's range; lets us weight mocks *and* authoring at competency resolution for free. |
| D2 | Tailwind version | v3 (JS/PostCSS config) vs v4 (CSS-first `@theme`) | **v4** | Current default; design tokens live in one CSS file — matches the "define tokens once" goal. Native `oxide` binary verified working here. |
| D3 | Routing | React Router vs TanStack Router vs hash-only | **React Router** (`createBrowserRouter`) | Mainstream, matches spec's five-screen model. GitHub Pages SPA-fallback deferred to Phase 5 (see D11). |
| D4 | State management | Zustand vs Context + reducer | **Zustand** | Spec's first option; tiny, unopinionated. Used for the theme store so far. |
| D5 | Component primitives (shadcn/ui) | Adopt now vs defer | **Defer** | Hand-built minimal tokened UI keeps full control of the aesthetic in Phase 0. Revisit when we need dialog/slider/tabs (Phase 4–5). |
| D6 | Fonts | Web fonts (Google) vs system stacks | **System stacks** | No network calls — keeps the core loop local-first/offline-ready. Serif stack for legal prose, sans for UI. Swap to self-hosted later if wanted. |
| D7 | Repo layout & copyright | (a) app at CIPPE root, PDFs git-ignored; (b) app in subfolder | **(a) root + ignore all PDFs** | Repo deploys to GitHub Pages later; the three IAPP PDFs are copyrighted and must never be published. `.gitignore` excludes `*.pdf`. |
| D8 | Theme persistence | localStorage vs IndexedDB/Dexie | **localStorage** (theme pref only) | Tiny UI preference; Dexie is reserved for study data (per spec §3.2). |
| **D9** | **Build tool: Vite 8 vs Vite 7** | Vite 8 (Rolldown bundler) vs Vite 7 (Rollup) | **Vite 7** | **Real blocker (flagged per spec).** create-vite scaffolded Vite 8, whose Rolldown native binary **SIGBUS-crashes** on this CPU (Intel Core Ultra 5 225H: AVX2 but no AVX-512). Pinned Vite 7 + `@vitejs/plugin-react@5`; Rollup native + esbuild verified building. This is the **only** substitution from the pre-agreed stack. |
| D10 | vitest install | Resolve cleanly vs `--legacy-peer-deps` | **`--legacy-peer-deps`** | vitest 4 declares a peerOptional that ERESOLVE-conflicts; harmless override. Tests run green. |
| D11 | GitHub Pages SPA routing | Solve now vs Phase 5 | **Defer to Phase 5** | Needs `base` set + `404.html` fallback (or HashRouter). Noted in `vite.config.ts`. |

### Built / edited
- Scaffolded Vite + React 19 + TS 6 project; added `react-router-dom`, `zustand`, `tailwindcss` v4 + `@tailwindcss/vite`, `vitest`.
- `src/index.css` — single-file design-token layer (`:root` + `.dark` + `@theme inline`), citation + legal-prose styling.
- `index.html` — no-flash theme boot script.
- `src/lib/theme.ts` — Zustand theme store (light/dark/system), localStorage-persisted, OS-sync.
- `src/lib/blueprint.ts` — 5 domains / 18 competencies with per-competency min–max (BoK v1.3.3); weight + largest-remainder form allocator.
- `src/lib/blueprint.test.ts` — 6 Vitest checks (tree integrity, midpoints = 75, 90-form = {I:12,II:28,III:20,IV:16,V:14}).
- `src/components/` — `Layout` (sidebar nav, skip link, header), `ui.tsx` (PageHeader, Card, Chip, Meter, EmptyNote, ThemeToggle).
- `src/routes/` — Dashboard (weight-sized domain bars, Bloom strip, honest readiness caption), Reference (renders the full competency tree), Session, Results, Settings.
- Verification: `npm run build` ✓ (tsc + Vite), `npm run test` ✓ (6/6), dev server serves ✓.
- Docs: `README.md`, `PROGRESS.md`, this `LOGBOOK.md`, `.gitignore` (excludes IAPP PDFs).

### Assumptions / open items
- The textbook PDF (`european-data-protection-law-and-practicepdf-pdf.pdf`) is in the folder, git-ignored, used only as an on-demand coverage checklist — never copied (spec §10).
- Node 22 verified locally; the user runs `npm install` on their own machine (Windows) — the sandbox's Linux `node_modules` are not shipped.

---

## 2026-07-01 — Phases 1–6 (content, drill, mock, analytics, PWA, AI)

### Decisions

| # | Decision | Options considered | Chosen | Why |
|---|----------|--------------------|--------|-----|
| D12 | Content vs user-state storage | Seed all content into Dexie vs bundle content + Dexie for user state | **Bundle + Dexie user-state** | Authored content ships in `src/data`; Dexie holds SRS/reviews/mocks/flags/settings + AI-generated questions. Simpler, and progress survives content updates. |
| D13 | Grading semantics | — | Questions: correctness from answer match, confidence = FSRS grade. Flashcards: self-graded, correct = grade ≠ Again. | Captures the confidence-calibration signal (spec §4.3). |
| D14 | Mock → analytics | Score only vs also log reviews | **Log each answered question as a review** (correct→Good, wrong→Again) | Populates domain/Bloom analytics and SRS from mock attempts; misses surface as due. |
| D15 | Mock size vs bank | Pad/repeat vs cap | **Cap at available** | A full-90 form returns as many as the bank holds; honest, and grows automatically as content expands. |
| D16 | Seed bank size | ~200 now vs quality-first seed | **36 questions + 32 flashcards, all 18 competencies** | Spec prioritises correct tagging over volume; expandable toward 200. |
| D17 | recharts peer dep | — | Added `react-is` | recharts requires it; not auto-installed under `--legacy-peer-deps`. |
| D18 | Bundle size | Single chunk vs split | **manualChunks (vendor / recharts / app)** | Keeps the main chunk small; clears the 500 kB warning (perf pass). |
| D19 | AI wiring depth | Wire all four vs one + libraries | **Wire "explain differently"; ship tutor + synthesis as library fns** | Demonstrates the graceful-degradation AI layer; rest is ready to surface. Everything is off with no key. |

### Process note
- The build environment's Linux view of the folder intermittently served **stale/truncated** copies of files that were overwritten (a mount page-cache issue). Builds were verified against reconstructed copies in a scratch tree; the delivered files were confirmed correct via authoritative reads and a final sync of the verified tree back into the folder. Worth remembering for future sessions here.

### Built / edited
- `src/lib/types.ts` — full entity schemas (Question, Flashcard, LawRef, CompetencyNode, SrsState, ReviewLogEntry, MockAttempt, Settings).
- `src/data/` — `questions.ts` (36), `flashcards.ts` (32), `lawRefs.ts` (47), `competencies.ts` (18 nodes + PIs), `index.ts` (aggregation + lookups).
- `src/lib/` — `db.ts` (Dexie + export/import/reset), `srs.ts` (ts-fsrs wrapper), `stats.ts` (analytics), `queue.ts` (adaptive selection), `mock.ts` (form builder + scoring), `store.ts` (Zustand orchestration), `ai.ts` (optional AI client).
- `src/session/` — `QuestionView`, `CardView`, `DrillRunner`, `MockRunner`.
- `src/components/` — `charts.tsx` (Recharts), `AiExplain.tsx`, updated `Layout` (store init + due badge).
- `src/routes/` — live `Dashboard`, `Session` (drill + mock launcher), `Results`, `Reference`, `Settings`.
- `vite.config.ts` — `vite-plugin-pwa` + manualChunks. `package.json` — added ts-fsrs, dexie, recharts, react-is, vite-plugin-pwa.
- Verification: `npm run build` pass, `npm run test` 6/6, dev serves.

---

## 2026-07-01 — Post-Phase enhancements (fix + expand + tutor + deploy)

### Decisions

| # | Decision | Options considered | Chosen | Why |
|---|----------|--------------------|--------|-----|
| D20 | Missing `vite-plugin-pwa` broke `npm run dev` | Require reinstall only vs make plugin optional | **Both** | User's `npm install` predated the PWA dep. Made PWA load via a guarded dynamic import so a missing plugin never blocks dev/build (verified with the plugin removed). Fix is still `npm install` to get all newer deps. |
| D21 | Growing the question bank | Overwrite `questions.ts` vs add batch files | **Add `questions2.ts` (+40) aggregated in `data/index.ts`** | Keeps the large primary file stable and sidesteps the mount overwrite quirk. Now 76 questions + 47 flashcards; added a content-integrity test. |
| D22 | Socratic tutor | Inline in Session vs its own screen | **New `/tutor` screen** using `socraticTutor()` behind the AI toggle | Cleanest surface for a chat-style exchange; degrades to an explanatory empty state with no key. |
| D23 | GitHub Pages deploy | Hardcode base vs env-driven | **`base: process.env.VITE_BASE \|\| '/'`, router `basename` from `BASE_URL`, `404.html` SPA fallback, Actions workflow** | Works at any project subpath without code edits; deep links resolve. |

### Built / edited
- `src/data/questions2.ts` (+40 weighted questions), `src/data/flashcards2.ts` (+15), aggregated in `src/data/index.ts`.
- `src/data/content.test.ts` — integrity checks (valid tags, resolvable citations, unique ids, all 18 competencies covered).
- `src/routes/Tutor.tsx` + route in `src/main.tsx` + nav entry in `Layout`; router `basename`.
- `vite.config.ts` — optional PWA (guarded dynamic import) + env-driven `base`.
- `.github/workflows/deploy.yml` — build (with `VITE_BASE`) + 404 fallback + deploy to Pages.
- Verification: `npm run build` pass; `npm run test` 13/13; PWA-absent build still succeeds.

---

## 2026-07-01 — Bank to 116 + weak-area AI synthesis

### Decisions

| # | Decision | Options considered | Chosen | Why |
|---|----------|--------------------|--------|-----|
| D24 | More content | Stop at 76 vs add batch 3 | **+40 in `questions3.ts` (weighted II/III) → 116 total** | Continues toward ~200 without touching earlier files; content-integrity test still green. |
| D25 | Weak-area synthesis surface | Results vs Dashboard | **Dashboard `WeakAreas` card** | It reads the whole review log to summarise weakest competencies + Bloom tiers; natural home is the overview. Behind the AI toggle; renders nothing when off. |

### Built / edited
- `src/data/questions3.ts` (+40), aggregated in `src/data/index.ts` (now 116 questions, 47 flashcards).
- `src/components/WeakAreas.tsx` — builds a weakest-areas summary from `stats` and calls `synthesiseWeakAreas()`; added to `Dashboard`.
- Verification: `npm run build` pass; `npm run test` 13/13 (content-integrity covers the larger bank).

---

## 2026-07-01 — AI layer removed (user request)

| # | Decision | Options considered | Chosen | Why |
|---|----------|--------------------|--------|-----|
| D26 | Optional AI features | Leave dormant (off by default) vs remove entirely | **Remove entirely** | User is not integrating any AI/Claude API and wanted a clean, fully self-contained app. |

### Removed
- Files deleted: `src/lib/ai.ts`, `src/components/AiExplain.tsx`, `src/components/WeakAreas.tsx`, `src/routes/Tutor.tsx`.
- References stripped from `QuestionView` (explain-differently), `Dashboard` (weak-area note), `main.tsx` (Tutor route), `Layout` (Tutor nav), `Settings` (AI toggle/key card), and the `Settings` type (`aiEnabled`/`aiKey`/`aiProxyUrl`).
- Result: no AI code, no network calls anywhere; nav back to 5 screens. `npm run build` pass, `npm run test` 13/13.

---

## 2026-07-01 — Filling the remaining spec features (Learn, Review, coverage, projection)

Honest self-review against spec §5/§7 surfaced four gaps; built all in one pass.

| # | Decision | Options considered | Chosen | Why |
|---|----------|--------------------|--------|-----|
| D27 | Learn mode (spec's 4th mode) | Skip vs build | **Build** `src/routes/Learn.tsx` + `src/data/learn.ts` (18 original notes) | Concept-first teaching + governing law + practice checks that reuse `DrillRunner` to seed SRS. |
| D28 | Coverage tracker | Separate view vs reuse | **Learn list shows per-competency status; Dashboard shows a summary** | `stats.competencyCoverage` classifies untouched/seen/mastered from the review log. |
| D29 | Richer Review | Extend Results | **Filter tabs + re-queue + jump-to-reference** | `store.requeue(itemId)` sets due=now; ↗ links to `/reference#<competency>`; Reference opens/scrolls to the hash. |
| D30 | Time-to-readiness | Complex model vs simple pace | **Simple 7-day pace extrapolation, clearly labelled indicative** | `stats.readinessProjection`; per-domain status chips; honest caption. |

### Built / edited
- New: `src/routes/Learn.tsx`, `src/data/learn.ts` (+`learn.test.ts`).
- `src/lib/stats.ts` — `competencyCoverage`, `readinessProjection`.
- `src/lib/store.ts` — `requeue`.
- `src/routes/Results.tsx` — filter tabs, re-queue, jump-to-reference (mock + review list).
- `src/routes/Reference.tsx` — competency anchors + hash open/scroll.
- `src/routes/Dashboard.tsx` — coverage summary + readiness-projection cards.
- `src/main.tsx` + `src/components/Layout.tsx` — Learn route + nav (now 6 screens).
- Verification: `npm run build` pass; `npm run test` 15/15; dev serves.

### Still intentionally out
- "Retrain FSRS" (§7.5): omitted — real optimisation needs a heavy optimiser + ~1000 reviews; the scheduler uses sound defaults meanwhile.
- Content seeded into IndexedDB with migration (kept in bundle); bank at 116; minimal mobile nav.

---

## 2026-07-02 — Mobile bottom navigation

| # | Decision | Options | Chosen | Why |
|---|----------|---------|--------|-----|
| D31 | Mobile navigation | Leave sidebar hidden vs add bottom nav | **Fixed bottom tab bar (`sm:hidden`)** | On phones the sidebar was hidden with no replacement, leaving Reference/Settings unreachable. Bottom bar makes the "study on the go" PWA use case work; sidebar still used on ≥640px. Safe-area padding for notched phones; content gets extra bottom padding so the bar never overlaps. |

Verification: `npm run build` pass; `npm run test` 15/15. Delivered to `src/components/Layout.tsx`. README gained a "Use it on your phone" section.
