// Certification tracks. The app runs CIPP/E and AIGP in parallel: one set of
// screens, one SRS engine, one analytics stack — parameterised by the active
// track. Everything track-specific (blueprint tree, content, exam format)
// lives in a TrackDef, so adding a third certification means adding one entry.

import { CIPPE_DOMAINS, SCORED_ITEMS, FULL_FORM, type Domain } from './blueprint'
import type { ConfusionPair, Flashcard, LawRef, Question, StudyItem, CompetencyNode } from './types'
import {
  QUESTIONS as CIPPE_QUESTIONS,
  FLASHCARDS as CIPPE_FLASHCARDS,
  LAW_REFS as CIPPE_LAW_REFS,
  COMPETENCY_NODES as CIPPE_COMPETENCY_NODES,
  STUDY_ITEMS as CIPPE_STUDY_ITEMS,
} from '../data'
import { LEARN_NOTES as CIPPE_LEARN_NOTES, type LearnNote } from '../data/learn'
import { CONFUSION_PAIRS as CIPPE_PAIRS } from '../data/confusionPairs'
import {
  AIGP_QUESTIONS,
  AIGP_FLASHCARDS,
  AIGP_REFS,
  AIGP_LEARN_NOTES,
  AIGP_CONFUSION_PAIRS,
  AIGP_DOMAINS,
  AIGP_COMPETENCY_NODES,
  AIGP_STUDY_ITEMS,
  AIGP_FULL_FORM,
  AIGP_SCORED_ITEMS,
  AIGP_ALL_CASES,
} from '../data/aigp'

export type TrackId = 'cippe' | 'aigp'
export const TRACK_IDS: TrackId[] = ['cippe', 'aigp']
export const DEFAULT_TRACK: TrackId = 'cippe'

export interface ExamFormat {
  /** Items delivered in the real exam. */
  deliveredItems: number
  /** Of those, how many are scored (the rest are unscored pretest items). */
  scoredItems: number
  /** Real exam duration in minutes. */
  minutes: number
  /** Mock form sizes and time limits. */
  formSize: { 'full-90': number; 'half-45': number; 'domain-focus': number }
  formMinutes: { 'full-90': number; 'half-45': number; 'domain-focus': number }
  formLabel: { 'full-90': string; 'half-45': string; 'domain-focus': string }
}

/** An exam-style case study: one scenario, several linked questions. */
export interface TrackCase {
  id: string
  title: string
  premise: string
  groundedIn: string
  scenario: string
}

export interface TrackDef {
  id: TrackId
  label: string
  shortLabel: string
  /** Blueprint version line shown in the reference library. */
  blueprintVersion: string
  tagline: string
  domains: Domain[]
  competencyNodes: CompetencyNode[]
  questions: Question[]
  flashcards: Flashcard[]
  refs: LawRef[]
  learnNotes: LearnNote[]
  confusionPairs: ConfusionPair[]
  items: StudyItem[]
  /** Exam-style case studies, if the track has them. */
  cases: TrackCase[]
  exam: ExamFormat
  /** Label for the reference library's citation column, e.g. "law" vs "instruments". */
  referenceNoun: string
}

export const TRACKS: Record<TrackId, TrackDef> = {
  cippe: {
    id: 'cippe',
    label: 'CIPP/E',
    shortLabel: 'CIPP/E',
    blueprintVersion: 'IAPP CIPP/E BoK v1.3.3',
    tagline: 'Certified Information Privacy Professional / Europe',
    domains: CIPPE_DOMAINS,
    competencyNodes: CIPPE_COMPETENCY_NODES,
    questions: CIPPE_QUESTIONS,
    flashcards: CIPPE_FLASHCARDS,
    refs: CIPPE_LAW_REFS,
    learnNotes: CIPPE_LEARN_NOTES,
    confusionPairs: CIPPE_PAIRS,
    items: CIPPE_STUDY_ITEMS,
    cases: [],
    referenceNoun: 'law references',
    exam: {
      deliveredItems: FULL_FORM,
      scoredItems: SCORED_ITEMS,
      minutes: 150,
      formSize: { 'full-90': 90, 'half-45': 45, 'domain-focus': 30 },
      formMinutes: { 'full-90': 150, 'half-45': 75, 'domain-focus': 45 },
      formLabel: {
        'full-90': 'Full · 90 / 150 min',
        'half-45': 'Half · 45 / 75 min',
        'domain-focus': 'Domain mock',
      },
    },
  },
  aigp: {
    id: 'aigp',
    label: 'AIGP',
    shortLabel: 'AIGP',
    blueprintVersion: 'IAPP AIGP BoK v2.1 (eff. 2 Feb 2026)',
    tagline: 'Artificial Intelligence Governance Professional',
    domains: AIGP_DOMAINS,
    competencyNodes: AIGP_COMPETENCY_NODES as CompetencyNode[],
    questions: AIGP_QUESTIONS,
    flashcards: AIGP_FLASHCARDS,
    refs: AIGP_REFS,
    learnNotes: AIGP_LEARN_NOTES,
    confusionPairs: AIGP_CONFUSION_PAIRS,
    items: AIGP_STUDY_ITEMS,
    cases: AIGP_ALL_CASES,
    referenceNoun: 'laws, standards & frameworks',
    exam: {
      deliveredItems: AIGP_FULL_FORM,
      scoredItems: AIGP_SCORED_ITEMS,
      minutes: 180,
      formSize: { 'full-90': 100, 'half-45': 50, 'domain-focus': 30 },
      formMinutes: { 'full-90': 180, 'half-45': 90, 'domain-focus': 55 },
      formLabel: {
        'full-90': 'Full · 100 / 180 min',
        'half-45': 'Half · 50 / 90 min',
        'domain-focus': 'Domain mock',
      },
    },
  },
}

export const getTrack = (id: TrackId): TrackDef => TRACKS[id] ?? TRACKS[DEFAULT_TRACK]

/** Which track an item id belongs to — used to keep per-track analytics clean. */
const TRACK_OF_ITEM = new Map<string, TrackId>()
for (const id of TRACK_IDS) {
  for (const item of TRACKS[id].items) TRACK_OF_ITEM.set(item.id, id)
}
export const trackOfItem = (itemId: string): TrackId | undefined => TRACK_OF_ITEM.get(itemId)

/** Every reference node across all tracks, so citation chips resolve whatever
 *  track an item came from (CIPP/E law refs and AIGP instruments alike). */
export const ALL_REFS_BY_ID = new Map<string, LawRef>()
for (const id of TRACK_IDS) {
  for (const ref of TRACKS[id].refs) ALL_REFS_BY_ID.set(ref.id, ref)
}
