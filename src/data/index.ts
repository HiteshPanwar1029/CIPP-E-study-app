import { QUESTIONS as QUESTIONS_1 } from './questions'
import { QUESTIONS_2 } from './questions2'
import { QUESTIONS_3 } from './questions3'
import { FLASHCARDS as FLASHCARDS_1 } from './flashcards'
import { FLASHCARDS_2 } from './flashcards2'
import { LAW_REFS } from './lawRefs'
import { COMPETENCY_NODES } from './competencies'
import type { StudyItem } from '../lib/types'

export const QUESTIONS = [...QUESTIONS_1, ...QUESTIONS_2, ...QUESTIONS_3]
export const FLASHCARDS = [...FLASHCARDS_1, ...FLASHCARDS_2]
export { LAW_REFS, COMPETENCY_NODES }

export const STUDY_ITEMS: StudyItem[] = [
  ...QUESTIONS.map((q) => ({ kind: 'question' as const, ...q })),
  ...FLASHCARDS.map((c) => ({ kind: 'card' as const, ...c })),
]

export const itemsById = new Map<string, StudyItem>(STUDY_ITEMS.map((i) => [i.id, i]))
export const questionsById = new Map(QUESTIONS.map((q) => [q.id, q]))
export const lawRefsById = new Map(LAW_REFS.map((r) => [r.id, r]))
export const competencyNodeById = new Map(COMPETENCY_NODES.map((c) => [c.id, c]))

export const questionsForCompetency = (competency: string) =>
  QUESTIONS.filter((q) => q.competency === competency)
export const questionsForLawRef = (refId: string) =>
  QUESTIONS.filter((q) => q.lawRefs.includes(refId))
export const lawRefsForCompetency = (competency: string) =>
  LAW_REFS.filter((r) => r.competency === competency)
