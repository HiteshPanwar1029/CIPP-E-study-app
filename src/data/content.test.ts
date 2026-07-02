import { describe, it, expect } from 'vitest'
import { QUESTIONS, FLASHCARDS, LAW_REFS } from './index'
import { DOMAINS } from '../lib/blueprint'

const compIds = new Set(DOMAINS.flatMap((d) => d.competencies.map((c) => c.id)))
const lawRefIds = new Set(LAW_REFS.map((r) => r.id))

describe('content bank integrity', () => {
  it('has a meaningful number of items', () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(70)
    expect(FLASHCARDS.length).toBeGreaterThanOrEqual(40)
  })

  it('every question is tagged to a real competency and matching domain', () => {
    for (const q of QUESTIONS) {
      expect(compIds.has(q.competency)).toBe(true)
      expect(q.competency.startsWith(q.domain + '.')).toBe(true)
    }
  })

  it('every question has options and a valid correct answer set', () => {
    for (const q of QUESTIONS) {
      expect(q.options.length).toBeGreaterThanOrEqual(2)
      expect(q.correct.length).toBeGreaterThanOrEqual(1)
      const ids = new Set(q.options.map((o) => o.id))
      for (const c of q.correct) expect(ids.has(c)).toBe(true)
      expect(q.explanation.length).toBeGreaterThan(0)
    }
  })

  it('question and flashcard ids are unique', () => {
    const qids = QUESTIONS.map((q) => q.id)
    expect(new Set(qids).size).toBe(qids.length)
    const cids = FLASHCARDS.map((c) => c.id)
    expect(new Set(cids).size).toBe(cids.length)
  })

  it('flashcards are tagged to real competencies', () => {
    for (const c of FLASHCARDS) expect(compIds.has(c.competency)).toBe(true)
  })

  it('all cited lawRef ids that look internal resolve to a reference', () => {
    for (const q of QUESTIONS) {
      for (const ref of q.lawRefs) {
        // internal refs use our id scheme (e.g. GDPR:Art.46, case:Schrems-II)
        if (ref.includes(':')) expect(lawRefIds.has(ref)).toBe(true)
      }
    }
  })

  it('covers all 18 competencies with at least one question', () => {
    const covered = new Set(QUESTIONS.map((q) => q.competency))
    for (const id of compIds) expect(covered.has(id)).toBe(true)
  })
})
