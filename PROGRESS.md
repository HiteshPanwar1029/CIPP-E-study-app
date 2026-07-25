# PROGRESS

_Last updated: 2026-07-08 — learning-optimisation trio (D32–D35) + combined AI & Governance module (D36)._
_Companion: `LOGBOOK.md` (decisions, options, change log)._

## Roadmap (spec §9)

- [x] Phase 0 — scaffold & tokens
- [x] Phase 1 — content pipeline & competency tree
- [x] Phase 2 — SRS core & drill mode
- [x] Phase 3 — mock-exam mode
- [x] Phase 4 — analytics & readiness
- [x] Phase 5 — polish & PWA
- [—] Phase 6 — optional AI layer (built, then **removed at your request** — see LOGBOOK D26)

## What works now

- **Local-first**: all study data in IndexedDB (Dexie). No login, no API key, no network calls at all.
- **Content**: 116 authored questions + 47 flashcards across all 18 competencies (distractor rationale + law citations), and 47 LawRef nodes (GDPR articles + CJEU cases) with original summaries. A content-integrity test enforces valid tags, resolvable citations, and full competency coverage.
- **Drill**: FSRS (`ts-fsrs`), two-axis adaptive queue (competency + Bloom), keyboard-first (digits select, Space reveals, 1–4 grade, F flags), per-answer explanations.
- **Mock**: timed, blueprint-weighted forms (full / half / domain-focused); per-domain and per-Bloom breakdown; misses auto-queued. **Pacing**: live on-pace/behind chip during the mock; per-question timing with avg-vs-budget and a 5-slowest list in Results.
- **Confusion pairs**: 10 authored discrimination pairs (60 rapid prompts) — EDPB/EDPS, SCC/BCR, Art. 33/34, controller/processor, 108/108+, erasure/restriction, GDPR/ePrivacy, adequacy/safeguards, objection/withdrawal, DPIA/prior consultation. Per-pair lifetime accuracy; mixed rounds bias to weakest pairs.
- **Exam plan**: set an exam date in Settings → Dashboard shows countdown, remaining new items, ~new items/day with a review-only run-in buffer, and a final-week retention hint.
- **AI & Governance module** (`/aigov`, linked from Learn): combined section — EU AI Act, GDPR × AI, AI ethics frameworks, DPIA methodology, AI governance frameworks, plus deep dives on **NIST AI RMF** (functions, trustworthiness characteristics, TEVV, GenAI Profile) and **ISO/IEC 42001** (Annex SL clauses, Annex A controls, impact assessment, certification mechanics, 42005/42006 companions). Seven teaching notes + **14 real-world case files** (Clearview ~€100m fines, Garante v OpenAI annulment, Meta training pause, Amazon's scrapped recruiter, the toeslagenaffaire, SyRI, Deliveroo "Frank", Air Canada's chatbot, the AWS/Anthropic/Microsoft ISO 42001 wave) + **62 original questions**, majority apply/analyze scenario tier, many case-grounded. Deliberately outside the blueprint pool: tracked in its own `moduleStats` table (Dexie v3) so it never skews mock weighting or readiness analytics. AI Act content reflects the June 2026 digital-omnibus timeline (high-risk duties → Dec 2027 / Aug 2028).
- **Dashboard**: weight-sized domain bars, recall-vs-applied strip, 14-day due-load chart, streak, confidently-wrong, honest readiness caption, a **coverage** summary, and a **time-to-readiness** projection.
- **Learn**: concept-first study — original teaching note + governing law + anchor case per competency, with practice checks that seed the SRS. Coverage badges (mastered / seen / untouched) against the full tree.
- **Review** (Results): filter by incorrect / confidently-wrong / flagged, one-tap **re-queue**, and **jump-to-law-reference** links.
- **Reference**: full competency tree with performance indicators + linked law summaries; deep-links open and scroll to a competency.
- **Settings**: target-retention slider, one-file JSON export/import, guarded reset.
- **PWA + mobile**: installable, offline, with a thumb-reachable bottom tab bar on phones (sidebar on larger screens).

## Verification

| Check | Command | Result |
|-------|---------|--------|
| Type-check + build (PWA + split) | `npm run build` | pass |
| Unit + content tests | `npm run test` | 29/29 pass |

## Deploy to GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`.

1. Push the repo to GitHub.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Push to `main` (or run the workflow). It builds with `VITE_BASE=/<repo-name>/`, adds a `404.html` SPA fallback, and deploys. The router reads the base path automatically, so deep links work.

To run a Pages-style build locally: `VITE_BASE=/your-repo/ npm run build && npm run preview`.

## Next steps (optional)

- Keep growing the bank toward ~200 (now **116**; add more `questionsN.ts` batch files, aggregated in `data/index.ts`).

## How to run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite (PWA + code-split)
npm run test     # Vitest (13 tests)
```

## Version control

Git wasn't initialised here (the build environment can't write git metadata to this folder). On your
machine: delete any leftover `.git`, then `git init && git add -A && git commit -m "CIPP/E app"`. The
`.gitignore` already excludes the IAPP PDFs.
