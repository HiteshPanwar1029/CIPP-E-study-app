# PROGRESS

_Last updated: 2026-07-01 — 116-question bank, GitHub Pages deploy; AI layer removed at user request._
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
- **Mock**: timed, blueprint-weighted forms (full / half / domain-focused); per-domain and per-Bloom breakdown; misses auto-queued.
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
| Unit + content tests | `npm run test` | 15/15 pass |

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
