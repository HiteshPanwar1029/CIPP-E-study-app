# CIPP/E Exam Prep Web App — Build Specification (v2, blueprint-aligned)

**Purpose of this document:** Master brief to paste into Claude Code / Cowork to build an upgraded, single-user CIPP/E study-and-training web app. Self-contained: an agent should be able to build from this document plus its own judgment.

**What changed from the first draft:** This version is aligned to the **official IAPP CIPP/E Body of Knowledge & Exam Blueprint, v1.3.3, effective 1 September 2025** (approved by the CIPP/E EDB, 4 March 2025; supersedes 1.3.2), and to the *European Data Protection: Law and Practice, 2nd ed.* (IAPP textbook, Exec. Ed. Eduardo Ustaran) chapter structure. The earlier draft used an approximate five-domain model; **the real blueprint has five numbered domains with a specific competency/performance-indicator tree and published min–max question counts.** Everything below — tagging, analytics, mock weighting — now maps 1:1 to that official structure. Keep both source PDFs in the Cowork project so the build agent can re-derive tags directly.

**Author context:** Solo learner preparing for the IAPP CIPP/E. Prior version was a vanilla HTML/CSS/JS app, no backend, no API key. v2 keeps the "runs locally, no mandatory API key, no login" philosophy but is a significantly more capable learning-and-training tool.

---

## 1. Target certification — authoritative scope

Train for the **IAPP CIPP/E** (Certified Information Privacy Professional / Europe). The credential is ANAB-accredited under ISO/IEC 17024:2012 — i.e. a rigorous, blueprint-driven exam. The app must mirror the blueprint exactly.

### 1.1 Exam format to design around
- **90 questions, 2.5 hours**, multiple-choice.
- Of the 90 items, roughly **75 are scored and ~15 are unscored pretest items** distributed through the form (the candidate cannot tell which). This matters for the app's mock mode: build 90-item forms, weight them by the blueprint, and compute the readiness score on all 90 (the app can't know which are "pretest", and neither can the real candidate).
- IAPP recommends **~30 hours** of preparation.
- Internal **target-mastery threshold ≈ 70–75%** for the app's "you're ready" signal. This is the app's own readiness heuristic, **not** the official scaled cut score (IAPP does not publish it) — label it as indicative everywhere it appears.

### 1.2 Question cognitive levels — Bloom-tagged (blueprint-mandated)
The blueprint explicitly ties question difficulty to **Bloom's Taxonomy** via the verb that opens each performance indicator (define/list → *Remember*; describe/explain → *Understand*; implement/solve → *Apply*; differentiate/compare → *Analyze*; etc.). Two question tiers result:
- **Remember/Understand** — factual recall ("Which EU institution can propose data-protection legislation?"). Answers are indisputable facts.
- **Apply/Analyze/Evaluate** — scenario questions requiring the *best* answer among plausible options ("Which poses the greatest challenge for a controller absent clear contractual provisions?").

**Every question in the bank must carry a `bloomLevel` tag.** Mock exams should mix tiers realistically (the real exam is roughly half recall, half applied). Analytics should show the user their accuracy split by Bloom tier — a candidate who aces recall but fails scenarios needs different practice than the reverse.

### 1.3 The five domains — official structure, competencies, and question weighting

Structure **all** content, tagging, analytics, and mock weighting around this exact tree. Codes (I.A, II.B, …) are the official competency IDs — use them verbatim as the tagging spine.

| Domain | Blueprint min–max Qs | Derived mock weight | ~ / 90-item form |
|---|---|---|---|
| **I. Introduction to European Data Protection** | 7–13 | 13.3% | 12 |
| **II. European Data Protection Law and Regulation** | 18–28 | 30.7% | 28 |
| **III. European Data Processing** | 13–21 | 22.7% | 20 |
| **IV. European Data Protection: Scope and Accountability** | 8–18 | 17.3% | 16 |
| **V. Compliance with European Data Protection Law and Regulation** | 8–16 | 16.0% | 14 |

> Weighting derived from the midpoint of each domain's published min–max range, normalised (midpoints sum to 75 scored items; scale to a 90-item form for mocks). Domain II is the single heaviest — nearly a third of the exam — followed by III. **Content authoring effort and question-bank depth should follow this same ratio.**

**Full competency / performance-indicator tree** (this is the tagging vocabulary — `subTopic` values map to these):

**Domain I — Introduction to European Data Protection** (7–13)
- **I.A** Origins & historical context of European DP law — rationale for DP; human-rights law & early laws (OECD Guidelines, Treaty of Lisbon, Convention 108 and 108+); the drive for a harmonised approach and its challenges (Brexit).
- **I.B** Roles & functions of EU institutions — Council of Europe, ECtHR, European Parliament, European Commission, European Council, CJEU.
- **I.C** Legislative framework — CoE Convention 1981; Data Protection Directive 95/46/EC; ePrivacy Directive 2002/58/EC (as amended); e-Commerce Directive 2000/31/EC; GDPR (EU) 2016/679; NIS/NIS2 Directives; the EU AI Act.

**Domain II — European Data Protection Law and Regulation** (18–28)
- **II.A** Basic GDPR concepts — personal data; sensitive/special-category data; pseudonymous vs anonymous data; key principles of lawful processing; controller & processor (+ EDPB guidance); data subject.
- **II.B** Security of personal data — appropriate technical & organisational measures (encryption, access controls); breach-notification requirements (+ EDPB guidance); responsible vendor management; sharing data with third parties.
- **II.C** Data-subject rights — access, rectification, erasure/RTBF, restriction, objection, consent (incl. withdrawal), rights re automated decision-making & profiling, data portability, and restrictions on those rights (all with EDPB guidance).

**Domain III — European Data Processing** (13–21)
- **III.A** Processing principles — fairness & lawfulness, purpose limitation, proportionality, accuracy, storage limitation/retention, integrity & confidentiality.
- **III.B** Lawful processing bases — consent, contractual necessity, legal obligation / vital interests / public interest, legitimate interest (+ EDPB guidance); processing special-category data.
- **III.C** Information-provision obligations — transparency principle; key components of privacy notices; layered notices.
- **III.D** International data transfers — rationale for prohibition; adequate jurisdiction; Safe Harbor & Privacy Shield history incl. the **Schrems** decisions; EU-US Data Privacy Framework basics; SCCs & BCRs; codes of conduct & certifications; derogations; transfer impact assessments (TIAs). (All with EDPB guidance.)

**Domain IV — Scope and Accountability** (8–18)
- **IV.A** Territorial & material scope — establishment vs non-establishment (+ EDPB guidance); scope of processing & exemptions.
- **IV.B** Accountability requirements — obligations of controllers/joint controllers/processors incl. **data protection by design & by default**; documentation & regulator cooperation; **DPIAs** and the criteria for conducting them; mandatory **DPO**; the role of auditing.
- **IV.C** Supervision & enforcement structure — roles/powers of the **EDPB** and **EDPS**; other supervisory authorities; **lead supervisory authority** (one-stop-shop) (+ EDPB guidance).
- **IV.D** Consequences for violations — procedures & fines for infringements; conditions for class actions; compensation to data subjects.

**Domain V — Compliance with European Data Protection Law and Regulation** (8–16)
- **V.A** Employment — legal basis for employee data; personnel-record storage & risks; workplace monitoring & DLP; BYOD pros/cons; EU Works Councils & whistleblowing systems.
- **V.B** Surveillance — surveillance by public authorities; interception of communications; CCTV, geolocation, biometrics/facial recognition (+ EDPB guidance).
- **V.C** Direct marketing — compliance requirements for marketing processing; online behavioural targeting (+ EDPB guidance).
- **V.D** Internet technology & communications — cloud computing; web cookies; social-media platforms incl. **dark patterns** (+ EDPB guidance); search-engine marketing (SEM); **AI/ML compliance & ethics** issues.

### 1.4 Instrument & case coverage (the reference layer)
The question bank and reference library must explicitly cover, with article/recital-level tagging:
- **GDPR (Reg. 2016/679)** — the spine; tag to specific articles/recitals.
- **Law Enforcement Directive 2016/680**; **ePrivacy Directive 2002/58/EC**; **e-Commerce Directive 2000/31/EC**; **NIS & NIS2 Directives**; **Convention 108/108+**; **EU Charter Arts. 7 & 8**; and **touchpoints with the EU AI Act** (explicitly in I.C and V.D).
- **Leading CJEU jurisprudence** — especially the **Schrems I & II** line (transfers), plus Google Spain (RTBF), Digital Rights Ireland (retention), Breyer (IP addresses/personal data), Planet49 (cookie consent). These are named in the blueprint and are high-yield.

> **Content-sourcing guardrail for the build agent:** Do **not** reproduce copyrighted IAPP exam items or textbook prose. Author **original** questions, explanations, and summaries that teach the blueprint's performance indicators. Cite law by article/recital number and cases by name — those are facts, not copyrightable text. All authored explanations stay in the app's own words. The two source PDFs are for *deriving the tagging tree and coverage checklist*, not for copying content.

---

## 2. Design goals for v2 ("significantly better")
1. **Blueprint-faithful.** Content, tags, analytics, and mock weighting map 1:1 to the official five-domain / competency tree in §1.3.
2. **Adaptive, not linear.** Learn what the user is weak on (by domain *and* by Bloom tier) and preferentially drill it.
3. **Spaced repetition at the core.** Modern scheduler (FSRS, §4.1) — the whole point of a 30-hour block spread over weeks is retention.
4. **Two-dimensional weakness model.** Track mastery per `(domain, competency)` **and** per `bloomLevel`. Recall gaps and scenario-reasoning gaps get different remediation.
5. **Exam-faithful mock mode.** 90-item / 2.5-hour timed forms, domain-weighted per the table in §1.3, Bloom-tier-mixed.
6. **Zero-friction to run.** Local-first, no login, optional API key only for AI features.
7. **Honest readiness signal.** Per-domain readiness estimate with stated assumptions — never false confidence.

---

## 3. Architecture

### 3.1 Overall shape
Client-side SPA, local-first persistence, optional thin AI proxy.

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (SPA)                        │
│  UI layer ──► App state (store)                          │
│     │              │                                     │
│     ▼              ▼                                     │
│  FSRS scheduler   Content repository                     │
│     │              (questions, cards, explanations,      │
│     │               lawRefs, competency tree)            │
│     ▼              │                                     │
│  Persistence adapter ◄─┘                                 │
│     │                                                    │
│     ▼                                                    │
│  IndexedDB (review log, SRS state, mocks, settings)      │
│                                                          │
│  Optional: AI client ─► (if key/proxy present) ─►────────┼─► Anthropic API
└─────────────────────────────────────────────────────────┘
```

**Rationale:** a privacy-certification study app that demands a login and ships study data to a server would be self-defeating. Local-first is the right default, works offline, and has no hosting cost.

### 3.2 Persistence
- **IndexedDB** via **Dexie** (ergonomic queries over review history) — primary store: full content set, per-card SRS state, append-only review log, mock attempts, settings. Do **not** use localStorage for the main data (too small, synchronous).
- **Content bundle** ships as versioned static JSON (§6), seeded into IndexedDB on first load; thereafter the DB is source of truth, with a versioned migration step so the user's notes survive content updates.
- **Export / import** — one-click JSON export of all user data (progress + notes) and re-import. This is the backup, the portability path, and the "sync between laptop and desktop" story without a backend.

### 3.3 Deployment
1. `npm run dev` (Vite) locally — normal iteration path.
2. Static build on **GitHub Pages** (matches the user's existing "The Governance Layer" hosting) — access anywhere, still no backend.
3. Installable **PWA** (`vite-plugin-pwa`: service worker + manifest) for offline drill/review and home-screen install — a real upgrade over v1, cheap to add.

### 3.4 Optional AI proxy
Only reason for any server: keep an API key off the client if AI features are wanted hosted rather than key-in-browser. Keep it optional and isolated — one serverless function (Cloudflare Worker / Vercel) forwarding a prompt to the Anthropic API. If absent, fall back to "paste your own key (stored locally only)" or disable AI features. **The core study loop must never depend on it.**

---

## 4. Core methods & algorithms

### 4.1 Spaced repetition — use FSRS
Use **FSRS (Free Spaced Repetition Scheduler), current FSRS-5/6 family**, via **`ts-fsrs`**. Do not hand-roll Leitner or the 1987 SM-2 formula.

Why (to justify the dependency): FSRS models each item with **Difficulty, Stability, Retrievability** and schedules each review for the moment predicted recall drops to a target retention (default 0.90). On public benchmarks it needs ~**20–30% fewer reviews** than SM-2 for equal retention and predicts recall more accurately for the large majority of users; its difficulty mean-reversion avoids SM-2's "ease hell". For a working professional on a fixed hour budget, review efficiency = hours saved.

**Honest caveat to encode:** FSRS only fits a *personalised* model after ~1,000+ reviews; before that it uses sensible defaults and performs ~like SM-2. Ship it anyway — the personalisation compounds across a multi-week prep.

Store each card's FSRS state (D, S, last-review, due) in IndexedDB; expose a "retrain schedule" action once the review log is large enough. **Target retention** is a user setting (default 0.90); the app can suggest lowering it (~0.85) in the final week to widen intervals and prioritise breadth before exam day.

### 4.2 Adaptive selection — two-dimensional
Beyond raw SRS due-dates, weight item selection by **weakness on both axes**:
- **Competency mastery gap** — rolling accuracy per `(domain, competency)` (I.A … V.D). Bias drill toward the weakest competencies (inverse-accuracy or Thompson-style weighting).
- **Bloom-tier gap** — if scenario (Apply/Analyze) accuracy lags recall accuracy, up-weight scenario items even within already-strong competencies.
Expose the weighting so the user can **manually** target a domain, a competency, or a tier ("drill me only on III.D transfers", "only scenario questions").

### 4.3 Confidence-calibrated grading
Capture the four FSRS grades (Again/Hard/Good/Easy) as a **confidence signal**, not just correct/incorrect. Track calibration; surface **confidently-wrong** items with top priority and a visual flag. These are the highest-value study targets and most apps ignore them.

### 4.4 Optional AI features (degrade gracefully to off)
Only if a key/proxy is present:
- **"Explain differently"** — regenerate an explanation for a missed item at a chosen depth (ELI5 → practitioner).
- **Socratic scenario tutor** — model poses an applied vignette ("US SaaS vendor processes EU employee data — walk through the transfer analysis") and critiques the user's reasoning against the GDPR framework. Directly trains the Apply/Analyze tier that scenario questions test.
- **Scenario generator** — fresh, original applied vignettes tagged to a chosen competency, added to the local bank after quick self-review.
- **Weak-area synthesis** — summarise the user's worst competencies/tiers into a focused revision note.

Use Anthropic `/v1/messages`, model `claude-sonnet-4-6`; **never hardcode a key**; prompt for strict JSON on structured generations and parse defensively. Enhancements only — the app is complete without them.

---

## 5. Training modes (four experiences)

1. **Learn mode** — concept-first. Presents a competency (e.g. III.D) as a short original explanation + the governing GDPR articles/recitals + anchoring CJEU case (e.g. Schrems II), then 2–3 low-stakes checks. Introduces new SRS cards. Where new material enters the system. Progress trackable against the full competency tree so the user can see coverage.

2. **Drill mode** — the daily driver. Serves the SRS "due" queue, adaptively weighted on both axes (§4.2). Fast, keyboard-navigable, one item at a time, immediate feedback + explanation, confidence grade captured.

3. **Mock-exam mode** — exam-faithful: **90 items, 2.5-hour countdown**, domain weighting per §1.3, Bloom-tier mix, no feedback until submission. Results: per-domain breakdown, per-Bloom-tier breakdown, indicative readiness score, and auto-queue of every miss into SRS. Include a **half-mock** (45 items / 75 min) and a **domain-focused mock** (e.g. "Domain II only") for time-boxed practice.

4. **Review mode** — post-hoc analysis. Browse any past mock/drill; filter to incorrect / confidently-wrong / flagged; re-read explanations; jump to the linked law reference; re-queue. Also free-browse of the whole reference layer (all articles/cases/competencies with the app's plain-language notes) — doubles as revision reading.

---

## 6. Data model

Ship content as versioned JSON, seed into IndexedDB, treat DB as source of truth.

### 6.1 Core entities

**Question**
```json
{
  "id": "q_0421",
  "type": "single | multiple | scenario",
  "domain": "III",
  "competency": "III.D",
  "bloomLevel": "analyze",
  "lawRefs": ["GDPR:Art.44", "GDPR:Art.46", "case:Schrems-II"],
  "stem": "…original question text…",
  "options": [
    { "id": "a", "text": "…" },
    { "id": "b", "text": "…" },
    { "id": "c", "text": "…" },
    { "id": "d", "text": "…" }
  ],
  "correct": ["b"],
  "explanation": "…original plain-language rationale citing the article by number and the case by name…",
  "distractorRationale": {
    "a": "why this is wrong",
    "c": "why this is wrong",
    "d": "why this is wrong"
  },
  "difficultySeed": 0.5,
  "tags": ["transfers", "SCCs", "adequacy"],
  "source": "authored"
}
```
*(distractorRationale is a v2 upgrade — teaching why each wrong option is wrong is where scenario mastery actually forms.)*

**Flashcard**
```json
{
  "id": "c_0107",
  "domain": "I",
  "competency": "I.B",
  "bloomLevel": "remember",
  "front": "Which EU institution has the power to propose data-protection legislation?",
  "back": "The European Commission (sole right of legislative initiative).",
  "lawRefs": []
}
```

**SRS state** (one per card)
```json
{
  "cardId": "c_0107",
  "difficulty": 5.2,
  "stability": 12.4,
  "lastReview": "2026-06-30T18:00:00Z",
  "due": "2026-07-12T18:00:00Z",
  "reps": 4,
  "lapses": 1,
  "lastGrade": "good"
}
```

**Review log entry** (append-only; FSRS trains on this; analytics read it)
```json
{
  "id": "r_88231",
  "cardId": "c_0107",
  "ts": "2026-06-30T18:00:00Z",
  "grade": "good",
  "correct": true,
  "confidence": "good",
  "elapsedMs": 8400,
  "mode": "drill",
  "domain": "I",
  "competency": "I.B",
  "bloomLevel": "remember"
}
```

**Mock attempt**
```json
{
  "id": "m_014",
  "startedAt": "…",
  "durationMs": 9000000,
  "form": "full-90 | half-45 | domain-focus",
  "questionIds": ["q_0421", "…"],
  "answers": { "q_0421": ["b"] },
  "scoreByDomain": { "I": 0.83, "II": 0.71, "III": 0.66, "IV": 0.75, "V": 0.79 },
  "scoreByBloom": { "remember": 0.88, "understand": 0.80, "apply": 0.64, "analyze": 0.58 },
  "readinessEstimate": 0.72
}
```

**LawRef / reference node** (powers reference layer + jump-to-source links)
```json
{
  "id": "GDPR:Art.46",
  "instrument": "GDPR",
  "citation": "Article 46",
  "title": "Transfers subject to appropriate safeguards",
  "plainSummary": "…app's own plain-language summary…",
  "relatedCases": ["case:Schrems-II"],
  "domain": "III",
  "competency": "III.D"
}
```

**Competency node** (the tagging spine — seed directly from §1.3)
```json
{
  "id": "III.D",
  "domain": "III",
  "title": "International data transfers",
  "performanceIndicators": [
    "Rationale for prohibiting transfers",
    "Adequate jurisdiction",
    "Safe Harbor / Privacy Shield / Schrems / EU-US DPF",
    "SCCs and BCRs",
    "Codes of conduct and certifications",
    "Derogations",
    "Transfer impact assessments (TIAs)"
  ],
  "blueprintMinQ": 4,
  "blueprintMaxQ": 6
}
```

### 6.2 Tagging tree
`domain (I–V) → competency (I.A … V.D) → performanceIndicator → lawRef`, with an **orthogonal `bloomLevel`** on every question. Every analytic (mastery %, due count, accuracy trend, tier split) is computable at any level of this tree. This is the backbone that makes the app blueprint-faithful and genuinely diagnostic.

---

## 7. UI / UX system

### 7.1 Principles
- **Focused, distraction-free study surface.** One item fills the viewport in drill/mock; no competing sidebars mid-session.
- **Keyboard-first.** Number keys select options; Space/Enter reveals; 1–4 grade confidence; J/K navigate; F flags. A professional drilling on a laptop should never need the mouse.
- **Legible for dense legal text.** ~65–75ch line length, clear type hierarchy, real citation styling for article references (e.g. a distinct treatment for "GDPR Art. 46" and case names). Serif for long explanatory prose is fine; sans-serif UI chrome.
- **Calm, credible aesthetic** consistent with the user's "The Governance Layer" / independent-research-bureau identity: restrained palette, one strong accent, generous whitespace, **no gamified confetti**. Progress reads as earned and quantitative.
- **Dark mode** first-class (long evening sessions).
- **Mobile-usable** for drill/review on the go (PWA); mock mode is best on desktop.

### 7.2 Key screens
1. **Dashboard** — today's due count; **five domain-mastery bars** (I–V, showing estimated mastery + trend, sized subtly to blueprint weight so the eye is drawn to heavy Domain II); a **Bloom-tier strip** (recall vs applied accuracy); current streak; one primary CTA ("Start today's drill"); readiness estimate captioned "based on N reviews over M days — indicative, not a pass guarantee".
2. **Session view** (drill/mock) — the focused item surface; slim progress bar; timer in mock; confidence-grade buttons on reveal; distractor rationale shown after answering.
3. **Results view** — per-domain **and** per-Bloom-tier breakdown; accuracy over time; list of missed / confidently-wrong / flagged with one-tap re-queue and jump-to-explanation.
4. **Reference library** — browsable competency tree (I.A … V.D) → performance indicators → articles/cases, each with the app's plain-language summary and links to every question that touches it. Doubles as revision reading and coverage tracker.
5. **Settings** — target-retention slider; theme; export/import; optional AI key/proxy toggle; "retrain FSRS"; reset progress (guarded).

### 7.3 Analytics the user actually needs
- **Mastery by domain** (headline) — with blueprint weight shown, so effort tracks what the exam rewards.
- **Recall vs scenario split** (Bloom tiers) — the second headline; tells the user *what kind* of studying they still need.
- **Forgetting-curve / due-load view** — upcoming due volume over the next 14 days to plan study time and avoid a pre-exam pile-up.
- **Confidently-wrong list** — the single most actionable widget.
- **Coverage tracker** — which competencies have been seen at all vs mastered vs untouched, against the full §1.3 tree.
- **Time-to-readiness projection** — rough estimate of when each domain crosses the readiness threshold at current pace; clearly labelled an estimate.

---

## 8. Recommended tech stack
Optimised for a solo builder using Claude Code; mainstream and well-documented so the agent builds reliably.

- **Language:** TypeScript throughout.
- **Framework:** React + **Vite** (fast dev, trivial static build). Svelte is a fine lighter alternative; React chosen for ecosystem familiarity and the user's prior React artifacts.
- **Styling:** Tailwind CSS + a small set of design tokens (colour, spacing, type scale) defined once to enforce the §7 aesthetic. Optionally shadcn/ui for accessible primitives (dialog, tabs, slider).
- **State:** Zustand (small, unopinionated) or Context + reducer. Avoid heavy state libs.
- **Persistence:** IndexedDB via **Dexie**.
- **SRS:** **`ts-fsrs`**.
- **Charts:** Recharts (domain-mastery bars, Bloom strip, forgetting-curve area, accuracy trend).
- **PWA:** `vite-plugin-pwa`.
- **Testing:** Vitest for scheduler + selection logic (where correctness matters most); a few Playwright smoke tests for session flows.
- **AI (optional):** Anthropic `/v1/messages`, model `claude-sonnet-4-6`, via optional serverless proxy or local-key mode; strict-JSON prompting for structured generations; never hardcode keys.
- **Hosting:** GitHub Pages for the static build; optional Cloudflare Worker / Vercel function only if the AI proxy is wanted.

**Deliberately avoided:** mandatory backend, SQL database, user accounts/auth, anything complicating a pure static deploy. None justified for a single-user local-first tool; each adds cost, attack surface, and friction.

---

## 9. Phased build plan

**Phase 0 — scaffold & tokens.** Vite + React + TS; Tailwind + design tokens; routing for the five screens; dark/light theming; empty-state dashboard. → navigable shell.

**Phase 1 — content pipeline & competency tree.** Encode the full §1.3 competency tree (I.A … V.D with performance indicators and blueprint min/max) as seed data; define the JSON schemas (§6); build the LawRef reference nodes for GDPR articles + the key CJEU cases; build the reference library UI from them; build the IndexedDB seed + versioned migration. Author a **first seed question set weighted to the blueprint** — start ~200 questions and a parallel flashcard set, allocated by the §1.3 ratio (heaviest on II, then III), each tagged with domain + competency + bloomLevel + lawRefs + distractor rationale. → content loads, is browsable, and is correctly tagged.

**Phase 2 — SRS core & drill mode.** Integrate `ts-fsrs`; wire the append-only review log; build the focused session view with keyboard controls, confidence grading, and post-answer distractor rationale; implement the two-dimensional adaptive queue (§4.2). → the daily loop works end to end.

**Phase 3 — mock-exam mode.** 90-item timed form, domain-weighted per §1.3, Bloom-tier-mixed; results view with per-domain **and** per-tier breakdown and re-queue of misses; half-mock and domain-focus variants. → exam-faithful practice.

**Phase 4 — analytics & readiness.** Dashboard domain bars (weight-aware) + Bloom strip; forgetting-curve/due-load; confidently-wrong widget; coverage tracker against the full tree; readiness projection with honest captions. → the user can see where they stand and plan.

**Phase 5 — polish & PWA.** Export/import; PWA install + offline; performance pass; accessibility pass (focus states, ARIA labels, no keyboard traps); visual refinement to the Governance-Layer aesthetic. → shippable v2.

**Phase 6 — optional AI layer.** Graceful-degradation AI features (§4.4) behind the key/proxy toggle, especially the Socratic scenario tutor (trains the applied tier). → enhanced tutoring with no hard dependency.

---

## 10. Guardrails & non-negotiables for the build agent
- **No copyrighted content.** Author all questions/explanations originally; cite law by article/recital and cases by name only. Do not reproduce IAPP or textbook material. The source PDFs are for deriving the tagging tree and coverage checklist, not for copying.
- **Blueprint is the spine.** Content, tagging, analytics, and mock weighting map 1:1 to the official five-domain / competency tree (§1.3), and every question carries a Bloom tier.
- **Local-first, no mandatory login or key.** Core loop runs with zero credentials and zero network calls. AI strictly optional, degrades to off.
- **Honest metrics.** Every readiness/mastery number states what it's based on and that it's indicative — never presented as a pass guarantee.
- **Data portability.** Export/import must always work; the user owns their data.
- **Accessibility & keyboard-first** are requirements, not nice-to-haves.

---

## 11. Source materials to keep in the Cowork project
- **IAPP CIPP/E Body of Knowledge & Exam Blueprint, v1.3.3** (effective 1 Sept 2025) — the authoritative competency/PI tree and min–max question counts. *This document's §1.3 is derived directly from it; re-derive tags from the PDF if in doubt.*
- **European Data Protection: Law and Practice, 2nd ed.** (IAPP, Ustaran) — chapter structure maps closely to the domains and is a useful topic checklist for authoring coverage (do not copy its text).
- *(Optional, if the user extracts it)* IAPP "How to prepare for an IAPP certification" course notes — mostly exam logistics; fold in any concrete scheduling/booking specifics the user pastes in.

---

*End of specification. Build against this document and the blueprint PDF; where this document is silent, prefer the simplest choice consistent with a local-first, single-user, blueprint-faithful study tool.*
