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

---

## 2026-07-08 — Learning-optimisation trio (pairs, pacing, planner)

| # | Decision | Options | Chosen | Why |
|---|----------|---------|--------|-----|
| D32 | Confusion-pair drills | Log into review log vs separate stats | **New `pairs` Dexie table (schema v2) + `PairStat` per pair** | Binary discrimination prompts would inflate competency accuracy if logged as reviews. Separate lifetime accuracy per pair keeps analytics honest; mixed rounds bias toward the weakest pairs. |
| D33 | Pair content | Generate at runtime vs author | **10 authored pairs × 6 prompts (60)** in `src/data/confusionPairs.ts` | High-yield classic traps: EDPB/EDPS, SCC/BCR, Art. 33/34, controller/processor, 108/108+, erasure/restriction, GDPR/ePrivacy, adequacy/safeguards, objection/withdrawal, DPIA/prior consultation. Content-integrity test enforces tags + both sides exercised. |
| D34 | Mock pacing | Live per-second bar vs coarse chip | **Pace chip (on pace / ≈N behind / ≈N ahead) + per-question ms in `MockAttempt.timings`** | Chip is glanceable without being anxiety-inducing; timings power a Results pacing section (avg s/q vs budget, 5 slowest with ✓/✗). Mock misses now carry real `elapsedMs` into the review log. |
| D35 | Exam-date planner | Full scheduler vs simple pace | **`stats.examPlan`: even new-items/day with review-only buffer (3/2/1/0 days by runway)** | Honest and predictable; Dashboard card shows countdown, unseen count, ~new/day; suggests ~85% retention in the final week (spec §4.1). `Settings.examDate` optional — planner is opt-in. |

### Built / edited
- New: `src/data/confusionPairs.ts` (+test), `src/session/PairRunner.tsx`, `src/lib/stats.test.ts`.
- `src/lib/types.ts` — `ConfusionPair`/`PairItem`/`PairStat`, `MockAttempt.timings`, `Settings.examDate`.
- `src/lib/db.ts` — Dexie v2 (`pairs` table); export bundle v2 (backwards-compatible import); resets clear pairs.
- `src/lib/store.ts` — `pairStats` + `recordPairAnswer`.
- `src/routes/Session.tsx` — Confusion pairs card (mixed round + per-pair rounds with accuracy chips).
- `src/session/MockRunner.tsx` — per-question timing, pace chip, real elapsedMs on grading.
- `src/routes/Results.tsx` — Pacing section on mock results (guarded for pre-v2 attempts).
- `src/lib/stats.ts` — `examPlan`; `src/routes/Settings.tsx` — exam-date row; `src/routes/Dashboard.tsx` — Exam plan card.

Verification: `npm run build` pass; `npm run test` 24/24.

---

## 2026-07-08 — AI & Governance combined module (user request)

| # | Decision | Options | Chosen | Why |
|---|----------|---------|--------|-----|
| D36 | Where the module lives | Merge into blueprint pool vs self-contained | **Self-contained `/aigov` route + `moduleStats` Dexie table (schema v3)** | Much of the material (NIST AI RMF, ISO 42001, ethics frameworks) is beyond the CIPP/E blueprint; feeding it into drills/mocks/readiness would distort exam-faithful analytics. Section accuracy tracked separately; entry card on Learn. |
| D37 | AI Act timeline content | Regulation-as-adopted vs current | **Current (verified by web search)**: June 2026 digital-omnibus adopted — Annex III high-risk → 2 Dec 2027, Annex I embedded → 2 Aug 2028 | Study material should match the law as it stands; noted in the section summary and PROGRESS. |

### Built / edited
- New: `src/data/aiGov.ts` (5 sections × teaching note + key points; 30 original questions, recall+applied mix; +`aiGov.test.ts`), `src/routes/AiGov.tsx` (section list → note → quiz; reuses `QuestionView`; keyboard-first).
- `src/lib/types.ts` — `ModuleStat`; `src/lib/db.ts` — Dexie v3 `moduleStats`, export bundle v3 (older backups import fine); `src/lib/store.ts` — `moduleStats` + `recordModuleAnswer`; resets clear module stats.
- `src/main.tsx` — `/aigov` route; `src/routes/Learn.tsx` — module entry card.
- Sections: EU AI Act (risk tiers, GPAI, provider/deployer, fines, omnibus timeline); GDPR × AI (Art. 22, SCHUFA, EDPB Op. 28/2024, LI necessity, hallucination/accuracy); AI Ethics Frameworks (HLEG 7, OECD, UNESCO); DPIA Methodology (Art. 35(3), WP248 2-of-9, Art. 35(7), Art. 36, FRIA link); AI Governance Frameworks (NIST RMF, ISO 42001/23894, CoE Convention, org building blocks).

### Process note
The workspace mount served stale/truncated bash reads of several overwritten files (Learn.tsx, store.ts, db.ts, types.ts, main.tsx) — real files on Windows were correct (file tools authoritative). Verified by reconstructing those files in the sandbox build dir; `iflag=direct` confirmed the staleness is server-side, not page cache.

Verification: `npm run build` pass; `npm run test` 29/29.

---

## 2026-07-08 — NIST AI RMF + ISO/IEC 42001 deep dives (user request)

| # | Decision | Options | Chosen | Why |
|---|----------|---------|--------|-----|
| D38 | Where deep dives live | Expand umbrella section vs dedicated sections | **Two new sections in `data/aiGov.ts`** (`ag_nist`, `ag_iso42001`), 6 questions each | The umbrella "AI Governance Frameworks" section stays as the survey; deep dives go further (TEVV, GenAI Profile 600-1, Annex SL clauses, 38 Annex A controls, SoA, cert mechanics). Cross-framework confusion baked into distractors (RMF functions vs Annex SL vs risk pyramid vs trustworthiness list). |

Facts verified by web search: ISO/IEC 42005:2025 (impact assessment) and 42006:2025 (cert-body requirements) both published. Module now 7 sections / 42 questions; test tightened to `toBe(7)`, ≥40 questions. Verification: build pass, tests 29/29.

---

## 2026-07-15 — AI & Gov module deepened: case files + scenario questions (user request)

| # | Decision | Options | Chosen | Why |
|---|----------|---------|--------|-----|
| D39 | Adding real-world depth | Fictional vignettes vs researched cases | **14 researched case files** (2/section, `facts` + `lesson` fields, rendered as a "Case files" card) + 20 new apply/analyze questions grounded in them (42 → 62) | User asked for analytical depth, deep-knowledge testing and live examples. Cases verified by web search: Clearview (~€100m GDPR fines; conduct now Art. 5-prohibited), Garante v OpenAI (€15m, annulled 3/2026 on one-stop-shop), Meta training pause/resume + EDPB 7/2026 training-data guidelines, Amazon scrapped recruiter (proxy bias), toeslagenaffaire (€2.75m fine, government fell) + SyRI, Deliveroo "Frank" (€2.5m incl. missing-DPIA violation), Air Canada chatbot (tribunal: company owns bot output), ISO 42001 wave (AWS 11/2024, Anthropic 1/2025, Microsoft Copilots, 350+ certs; 42006 professionalises auditors). |
| D40 | Test tightening | Keep loose vs enforce depth | `aiGov.test.ts` now requires ≥2 case studies/section (substantive facts+lesson), ≥8 questions/section, ≥60 total, ≥3 applied-tier per section | Locks in the analytical mix against future edits. |

### Process note
Mount again served stale/truncated bash reads of freshly edited files (aiGov.ts, AiGov.tsx, aiGov.test.ts); real files verified correct via file tools. Sandbox copies reconstructed by heredoc for verification. Also: workspace restart cleared /tmp — reinstalled node_modules.

Verification: `npm run build` pass; `npm run test` 29/29 (62 module questions).

---

## 2026-07-25 — Multi-track: AIGP added alongside CIPP/E (user request)

Source material: the user's two uploaded AIGP study guides, plus the official **AIGP Body of
Knowledge & Exam Blueprint v2.1** (approved 9 Sep 2025, effective 2 Feb 2026) fetched for the
min/max item counts the study guide references but does not print.

| # | Decision | Options | Chosen | Why |
|---|----------|---------|--------|-----|
| D41 | Two certifications in one app | Separate app/build vs runtime track switch | **Track registry (`src/lib/tracks.ts`) + active-track state** | One SRS engine, one analytics stack, one set of screens, parameterised by a `TrackDef` (blueprint tree, content, exam format). Adding a third certification = one registry entry. |
| D42 | Data isolation | Separate DBs vs tagged rows | **Dexie v4: `track` field on reviews and mocks, indexed; item ids are globally unique** | Store keeps `allSrs/allReviews/allMocks` and exposes track-filtered `srs/reviews/mocks/items` — every screen consumes the filtered view unchanged. Migration tags all pre-existing rows `cippe` and moves `examDate` → `examDates.cippe`. |
| D43 | Blueprint helpers | Duplicate per track vs generalise | **`totalMidpoint/domainWeight/maxDomainWeight/allocateForm` now take a `Domain[]`** | Same largest-remainder allocation serves both trees; `DOMAINS` kept as a CIPP/E alias so nothing else broke. |
| D44 | AIGP blueprint invariant | Copy the CIPP/E test | **Assert MIDPOINT reconciliation, not min/max sums** | Unlike CIPP/E, AIGP domain ranges are tighter than the sum of competency ranges (I: 16–20 vs 15–21). Midpoints do reconcile and sum to 85 scored items of a 100-item exam — and midpoints are what drive weighting. Caught by the new test. |
| D45 | AI & Governance module placement | AIGP-only vs shared vs merged | **Shared by both tracks** (user's choice) | Content is relevant to both; keeps its own `moduleStats`, still outside blueprint analytics. |
| D46 | Multi-select support | Skip vs support | **Authored 11 multi-select items; QuestionView now shows "select N · no partial credit"** | The real AIGP exam includes "select 3 of 5, no partial credit" items; `sameSet` scoring already required exact matches. |

### Built
- New: `src/lib/tracks.ts` (+`tracks.test.ts`), `src/data/aigp/{blueprint,refs,learn,questions,questions2,flashcards,confusionPairs,index,content.test}.ts`.
- AIGP content: 4 domains / 13 competencies with performance indicators; **71 questions** (blueprint-weighted, 11 multi-select, ~45% applied tier), 42 flashcards, 40 reference nodes (EU AI Act articles, GDPR intersections, IP/non-discrimination/consumer/product-liability, Colorado, South Korea, NIST AI RMF + GenAI Profile, ISO 22989/42001/42005/23894, OECD, CoE/HUDERIA), 13 Learn notes, 8 confusion pairs.
- Modified: blueprint/stats/mock generalised; store (track state + scoping); db (v4 migration); Dashboard (switcher + track-aware planner/analytics), Learn, Session, Results, Reference, Settings, Layout, MockRunner, QuestionView; app renamed "IAPP Prep" in `index.html` and the PWA manifest.

Verification: `npm run build` pass; `npm run test` **49/49** (was 29). CIPP/E behaviour unchanged by design.

---

## 2026-07-25 — AIGP bank 71 → 144; cross-track citation fix

| # | Decision | Options | Chosen | Why |
|---|----------|---------|--------|-----|
| D47 | Citation chips for AIGP items | Leave as-is vs per-track lookup | **`ALL_REFS_BY_ID` in tracks.ts, used by QuestionView and CardView** | Both views resolved refs through the CIPP/E-only `lawRefsById`, so AIGP items rendered raw ids ("aia:Art.5") instead of "EU AI Act Art. 5". Found in a pre-authoring sweep for hardcoded CIPP/E dependencies. |
| D48 | Bank growth | One large batch vs weighted batches | **Three batches: 3 (Domains I–II, 22), 4 (Domains III–IV, 27), 5 (recall/comprehension, 24)** | Batches 3–4 are scenario-led (incl. multi-paragraph CASE items, matching the real exam's case studies); batch 5 rebalances cognitive level. |
| D49 | Bloom mix drift | Loosen the test vs author to fix it | **Authored batch 5** | After batches 3–4 the bank hit exactly 75% applied tier and the content test failed. IAPP exams sit across remember/understand AND apply/analyze, so the honest fix was more recall items, not a weaker assertion. Test band tightened to 45–70% applied. |

Bank now **144 questions / 26 multi-select**, per-competency share within ~1.5pp of blueprint weight everywhere (II.D +1.5, IV.C −1.4). Test thresholds raised: ≥140 questions, ≥18 multi-select, ≥6 per competency, plus a new assertion that the heaviest competency outweighs the lightest.

Verification: `npm run build` pass; `npm run test` **50/50**, run against the copy in the project folder.

---

## 2026-07-25 — AIGP case studies + bank to 191

The AIGP exam "includes case studies that present real-world challenges" (per the IAPP study guide),
so the bank now has that format. Scenarios researched against current events rather than invented.

| # | Decision | Options | Chosen | Why |
|---|----------|---------|--------|-----|
| D50 | Case-study data model | Separate case entity with its own runner vs scenario carried on the question | **Optional `scenario` / `caseId` / `caseTitle` on `Question`** | Case items then flow through drill, mock, SRS and analytics with zero new plumbing — and because the scenario travels with each question, an item still reads correctly when spaced repetition surfaces it alone months later. A `TrackDef.cases` list drives the Session UI. |
| D51 | Case runner | New component vs reuse | **Reuse `DrillRunner` with the case's questions as the queue** | Free keyboard nav, immediate feedback, confidence grading and SRS integration. QuestionView renders the scenario in a bordered box above the stem. |
| D52 | Grounding | Invent scenarios vs research | **All 8 modelled on documented events** (dealer-chatbot prompt injection; agentic model executing unapproved trades then misreporting; consumer chatbot duty-of-care litigation; the Aug-2026 AI Act position; clinical model applied to an unlike population; improperly licensed/scraped training corpus; Amazon-style promotion bias found late; hosted-model deprecation) | Each case carries a `groundedIn` line shown in the UI, so the learner sees the real-world pattern behind the fiction. Sensitive subject matter is handled at the governance-control level only. |
| D53 | Bloom drift, again | Loosen band vs author recall items | **Batch 6 (14 recall/comprehension items)** | Case questions are inherently applied; after them the bank hit 68.4%. Batch 6 brought it to 63.4%, inside the 45–70% band. |

Bank: **191 questions** (34 multi-select, 8 cases / 33 linked questions), 63.4% applied tier.
New tests assert: ≥8 cases, ≥4 questions each, scenario/title identical across a case's questions,
no orphan `caseId`, every case >60% applied tier and spanning more than one domain.

Verification: `npm run build` pass; `npm run test` **52/52**, run against the copy in the project folder.
