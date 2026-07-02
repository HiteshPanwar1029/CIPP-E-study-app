# CIPP/E Prep

A local-first, single-user study and training web app for the **IAPP CIPP/E** exam, built 1:1 against the official **Body of Knowledge & Exam Blueprint (v1.3.3)**. No login, no server, no API key — everything runs entirely in your browser with zero network calls.

> **Status:** built and verified. See `PROGRESS.md` for what works and `LOGBOOK.md` for decisions.

## Quick start

Prerequisites: **Node 20+** and npm.

```bash
npm install      # first time only
npm run dev      # http://localhost:5173
```

Other scripts: `npm run build` (type-check + production build, PWA + code-split), `npm run preview`, `npm run test` (Vitest).

## Features

- **Drill** — adaptive spaced repetition (FSRS via `ts-fsrs`), weighted on both competency mastery and Bloom tier. Keyboard-first: number keys select, Space reveals, 1–4 grade confidence, F flags. Every answer shows an original explanation, why each distractor is wrong, and the governing articles/cases.
- **Mock exam** — timed, blueprint-weighted forms (full 90 / half 45 / domain-focused), no feedback until submit, then a per-domain and per-Bloom breakdown with an indicative readiness score; misses are auto-queued.
- **Dashboard** — weight-sized domain-mastery bars, recall-vs-applied split, a 14-day due-load chart, streak, a confidently-wrong list, and an honest readiness caption.
- **Reference** — the full competency tree (18 competencies) with performance indicators and plain-language summaries of the key GDPR articles and CJEU cases.
- **Settings** — target-retention slider, one-file JSON export/import, and reset.
- **PWA** — installable and offline-capable.

## Project structure

```
src/
  main.tsx            # entry + router
  index.css           # design tokens + Tailwind (one place to reskin)
  data/               # authored content: questions (3 batches), flashcards, lawRefs, competencies
  lib/                # blueprint, types, db (Dexie), srs (FSRS), stats, queue, mock, store, theme
  session/            # QuestionView, CardView, DrillRunner, MockRunner
  components/         # Layout, ui, charts
  routes/             # Dashboard, Session, Results, Reference, Settings
```

## Data model

Everything is tagged to the blueprint: **domain (I–V) → competency (I.A … V.D) → performance indicator → lawRef**, with an orthogonal **Bloom tier** on every question. Authored content ships as typed data in `src/data`; all user state (FSRS schedule, an append-only review log, mock attempts, flags, settings) lives in **IndexedDB** via Dexie, with one-file JSON export/import as the backup and portability path. Mock weighting matches the blueprint ratio — a full 90-item form is `{ I: 12, II: 28, III: 20, IV: 16, V: 14 }`.

## Content & copyright

All questions, explanations, and summaries are **authored originally**. Law is cited by article/recital number and cases by name (facts, not copyrightable text). The IAPP PDFs kept in this folder are used only to derive the tagging tree and coverage checklist — never copied — and are **git-ignored**.

## Honest metrics

Every readiness/mastery number is captioned with what it's based on and labelled **indicative** — an internal study heuristic, never a prediction or a guarantee of passing.

## Use it on your phone

The app is a PWA, so you can install it to your home screen and run it offline.

**Recommended — installable + offline (via GitHub Pages, HTTPS):**
1. Push the repo to GitHub and enable Pages (**Settings → Pages → Source: GitHub Actions**). The included workflow builds and deploys it.
2. On your phone, open the Pages URL (e.g. `https://<you>.github.io/<repo>/`).
3. Install it: **iOS Safari** → Share → *Add to Home Screen*; **Android Chrome** → ⋮ menu → *Install app*.
4. It now launches fullscreen and works offline. A bottom tab bar gives you all six screens.

**Quick try on the same Wi‑Fi (no deploy):**
- On your computer run `npm run dev -- --host`, then open `http://<your-computer-LAN-IP>:5173` on the phone (same network). Note: the *installed/offline* experience needs the HTTPS Pages URL — a service worker won't register over plain `http`.

**Moving progress between devices:** the app is local-first, so your phone and laptop keep **separate** data. To sync, use **Settings → Export** (one JSON file) on one device and **Import** on the other.
