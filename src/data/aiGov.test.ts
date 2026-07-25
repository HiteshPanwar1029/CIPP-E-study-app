import { describe, it, expect } from 'vitest'
import { AIGOV_SECTIONS, AIGOV_QUESTION_COUNT } from './aiGov'
import { QUESTIONS } from './index'
import { DOMAINS } from '../lib/blueprint'

const compIds = new Set(DOMAINS.flatMap((d) => d.competencies.map((c) => c.id)))

describe('AI & Governance module integrity', () => {
  it('covers the requested topics', () => {
    expect(AIGOV_SECTIONS.length).toBe(7)
    const titles = AIGOV_SECTIONS.map((s) => s.title.toLowerCase()).join(' | ')
    for (const t of ['ai act', 'gdpr', 'ethics', 'dpia', 'governance', 'nist', '42001']) {
      expect(titles).toContain(t)
    }
  })

  it('section and question ids are unique and do not collide with the main bank', () => {
    const sids = AIGOV_SECTIONS.map((s) => s.id)
    expect(new Set(sids).size).toBe(sids.length)
    const qids = AIGOV_SECTIONS.flatMap((s) => s.questions.map((q) => q.id))
    expect(new Set(qids).size).toBe(qids.length)
    const bankIds = new Set(QUESTIONS.map((q) => q.id))
    for (const id of qids) expect(bankIds.has(id)).toBe(false)
  })

  it('every section has real teaching material, case studies, and enough questions', () => {
    for (const s of AIGOV_SECTIONS) {
      expect(s.summary.length).toBeGreaterThan(400)
      expect(s.keyPoints.length).toBeGreaterThanOrEqual(4)
      expect(s.caseStudies.length).toBeGreaterThanOrEqual(2)
      for (const c of s.caseStudies) {
        expect(c.title.length).toBeGreaterThan(0)
        expect(c.facts.length).toBeGreaterThan(100)
        expect(c.lesson.length).toBeGreaterThan(100)
      }
      expect(s.questions.length).toBeGreaterThanOrEqual(8)
    }
    expect(AIGOV_QUESTION_COUNT).toBeGreaterThanOrEqual(60)
  })

  it('every question is well-formed with a valid nearest-competency tag', () => {
    for (const s of AIGOV_SECTIONS) {
      for (const q of s.questions) {
        expect(q.options.length).toBeGreaterThanOrEqual(2)
        expect(q.correct.length).toBeGreaterThanOrEqual(1)
        const ids = new Set(q.options.map((o) => o.id))
        for (const c of q.correct) expect(ids.has(c)).toBe(true)
        expect(q.explanation.length).toBeGreaterThan(0)
        expect(compIds.has(q.competency)).toBe(true)
        expect(q.competency.startsWith(q.domain + '.')).toBe(true)
      }
    }
  })

  it('every section tests deep knowledge: at least 3 applied-tier (apply/analyze) questions', () => {
    for (const s of AIGOV_SECTIONS) {
      const applied = s.questions.filter(
        (q) => q.bloomLevel === 'apply' || q.bloomLevel === 'analyze',
      ).length
      const recall = s.questions.length - applied
      expect(applied).toBeGreaterThanOrEqual(3)
      expect(recall).toBeGreaterThanOrEqual(1)
    }
  })
})
