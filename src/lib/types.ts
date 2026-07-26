import type { DomainId, BloomLevel } from './blueprint'

/** Certification tracks the app can study in parallel. */
export type TrackId = 'cippe' | 'aigp'

export type QuestionType = 'single' | 'multiple' | 'scenario'
export type Grade = 'again' | 'hard' | 'good' | 'easy'
export type StudyMode = 'learn' | 'drill' | 'mock' | 'review'
export type Source = 'authored' | 'ai'

export interface QuestionOption {
  id: string
  text: string
}

export interface Question {
  id: string
  type: QuestionType
  domain: DomainId
  competency: string
  bloomLevel: BloomLevel
  lawRefs: string[]
  stem: string
  options: QuestionOption[]
  correct: string[]
  explanation: string
  distractorRationale?: Record<string, string>
  tags?: string[]
  source: Source
  /**
   * Case-study support. IAPP exams present a scenario followed by several
   * linked questions; `scenario` travels with each item so it still makes
   * sense when spaced repetition surfaces the question on its own.
   */
  scenario?: string
  caseId?: string
  caseTitle?: string
}

export interface Flashcard {
  id: string
  domain: DomainId
  competency: string
  bloomLevel: BloomLevel
  front: string
  back: string
  lawRefs?: string[]
  source?: Source
}

export type StudyItem =
  | ({ kind: 'question' } & Question)
  | ({ kind: 'card' } & Flashcard)

export interface LawRef {
  id: string
  instrument: string
  citation: string
  title: string
  plainSummary: string
  relatedCases?: string[]
  domain?: DomainId
  competency?: string
}

export interface CompetencyNode {
  id: string
  domain: DomainId
  title: string
  performanceIndicators: string[]
  blueprintMinQ: number
  blueprintMaxQ: number
}

export interface SrsState {
  itemId: string
  due: string
  stability: number
  difficulty: number
  elapsed_days: number
  scheduled_days: number
  reps: number
  lapses: number
  learning_steps: number
  state: number
  last_review?: string
  lastGrade?: Grade
}

export interface ReviewLogEntry {
  id?: number
  itemId: string
  ts: string
  grade: Grade
  correct: boolean
  confidence: Grade
  elapsedMs: number
  mode: StudyMode
  domain: DomainId
  competency: string
  bloomLevel: BloomLevel
  /** Which certification track the item belongs to. Absent on pre-v4 rows (treated as CIPP/E). */
  track?: TrackId
}

export type MockForm = 'full-90' | 'half-45' | 'domain-focus'

export interface MockAttempt {
  id?: number
  startedAt: string
  finishedAt?: string
  durationMs: number
  form: MockForm
  focusDomain?: DomainId
  /** Which certification track this attempt belongs to. Absent on pre-v4 rows. */
  track?: TrackId
  questionIds: string[]
  answers: Record<string, string[]>
  /** Milliseconds spent on each question (summed across visits). Absent on pre-pacing attempts. */
  timings?: Record<string, number>
  scoreByDomain: Record<string, number>
  scoreByBloom: Record<string, number>
  overall: number
  readinessEstimate: number
}

export interface ItemMeta {
  itemId: string
  flagged?: boolean
  note?: string
  seen?: boolean
}

export interface Settings {
  key: string
  targetRetention: number
  /** Legacy single exam date (pre-multi-track). Migrated into examDates.cippe. */
  examDate?: string
  /** Which track the app is currently studying. */
  activeTrack?: TrackId
  /** ISO date (yyyy-mm-dd) of each track's exam — drives the dashboard planner. */
  examDates?: Partial<Record<TrackId, string>>
}

// ── Confusion pairs — rapid discrimination training ─────────────────────────

export interface PairItem {
  prompt: string
  answer: 'a' | 'b'
  /** Optional extra discriminator shown after answering (falls back to the pair contrast). */
  note?: string
}

export interface ConfusionPair {
  id: string
  a: string
  b: string
  domain: DomainId
  competency: string
  /** One-line discriminator between the two concepts. */
  contrast: string
  items: PairItem[]
}

/** Per-pair lifetime accuracy, persisted in IndexedDB. */
export interface PairStat {
  pairId: string
  attempts: number
  correct: number
  lastTs?: string
}

// ── AI & Governance module — self-contained extra-curricular section ─────────

/**
 * Per-section lifetime accuracy for the AI & Governance module. Kept separate
 * from the review log on purpose: module questions must not skew the
 * blueprint-weighted readiness and domain analytics.
 */
export interface ModuleStat {
  sectionId: string
  attempts: number
  correct: number
  lastTs?: string
}
