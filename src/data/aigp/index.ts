import { AIGP_QUESTIONS_1 } from './questions'
import { AIGP_QUESTIONS_2 } from './questions2'
import { AIGP_QUESTIONS_3 } from './questions3'
import { AIGP_QUESTIONS_4 } from './questions4'
import { AIGP_QUESTIONS_5 } from './questions5'
import { AIGP_QUESTIONS_6 } from './questions6'
import { AIGP_CASES, AIGP_CASE_QUESTIONS } from './cases'
import { AIGP_CASES_2, AIGP_CASE_QUESTIONS_2 } from './cases2'
import { AIGP_FLASHCARDS } from './flashcards'
import { AIGP_REFS } from './refs'
import { AIGP_LEARN_NOTES } from './learn'
import { AIGP_CONFUSION_PAIRS } from './confusionPairs'
import { AIGP_DOMAINS, AIGP_COMPETENCY_NODES, AIGP_FULL_FORM, AIGP_SCORED_ITEMS } from './blueprint'
import type { StudyItem } from '../../lib/types'

export const AIGP_QUESTIONS = [
  ...AIGP_QUESTIONS_1,
  ...AIGP_QUESTIONS_2,
  ...AIGP_QUESTIONS_3,
  ...AIGP_QUESTIONS_4,
  ...AIGP_QUESTIONS_5,
  ...AIGP_QUESTIONS_6,
  ...AIGP_CASE_QUESTIONS,
  ...AIGP_CASE_QUESTIONS_2,
]
/** Exam-style case studies: one scenario, several linked questions. */
export const AIGP_ALL_CASES = [...AIGP_CASES, ...AIGP_CASES_2]

export {
  AIGP_FLASHCARDS,
  AIGP_REFS,
  AIGP_LEARN_NOTES,
  AIGP_CONFUSION_PAIRS,
  AIGP_DOMAINS,
  AIGP_COMPETENCY_NODES,
  AIGP_FULL_FORM,
  AIGP_SCORED_ITEMS,
}

export const AIGP_STUDY_ITEMS: StudyItem[] = [
  ...AIGP_QUESTIONS.map((q) => ({ kind: 'question' as const, ...q })),
  ...AIGP_FLASHCARDS.map((c) => ({ kind: 'card' as const, ...c })),
]
