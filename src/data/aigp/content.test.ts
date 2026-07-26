import { describe, it, expect } from 'vitest'
import {
  AIGP_ALL_CASES,
  AIGP_QUESTIONS,
  AIGP_FLASHCARDS,
  AIGP_REFS,
  AIGP_LEARN_NOTES,
  AIGP_CONFUSION_PAIRS,
  AIGP_DOMAINS,
  AIGP_COMPETENCY_NODES,
} from './index'
import { totalMidpoint, allocateForm } from '../../lib/blueprint'
import { QUESTIONS as CIPPE_QUESTIONS } from '../index'

const compIds = new Set(AIGP_DOMAINS.flatMap((d) => d.competencies.map((c) => c.id)))
const refIds = new Set(AIGP_REFS.map((r) => r.id))

describe('AIGP blueprint spine (BoK v2.1)', () => {
  it('has four domains and thirteen competencies', () => {
    expect(AIGP_DOMAINS).toHaveLength(4)
    expect(AIGP_DOMAINS.flatMap((d) => d.competencies)).toHaveLength(13)
  })

  it('each domain MIDPOINT equals the sum of its competency midpoints', () => {
    // Unlike the CIPP/E blueprint, AIGP domain ranges are tighter than the sum
    // of their competency ranges (not every competency can hit its max at
    // once). The midpoints — which drive mock weighting — do reconcile, and
    // the competency ranges must sit inside the domain range.
    const mid = (x: { minQ: number; maxQ: number }) => (x.minQ + x.maxQ) / 2
    for (const d of AIGP_DOMAINS) {
      expect(d.competencies.reduce((s, c) => s + mid(c), 0)).toBe(mid(d))
      expect(d.competencies.reduce((s, c) => s + c.minQ, 0)).toBeLessThanOrEqual(d.minQ)
      expect(d.competencies.reduce((s, c) => s + c.maxQ, 0)).toBeGreaterThanOrEqual(d.maxQ)
    }
  })

  it('domain midpoints sum to 85 scored items', () => {
    expect(totalMidpoint(AIGP_DOMAINS)).toBe(85)
  })

  it('a 100-item form sums to 100 and follows blueprint weight', () => {
    const f = allocateForm(AIGP_DOMAINS, 100)
    expect(Object.values(f).reduce((s, n) => s + n, 0)).toBe(100)
    expect(f).toEqual({ I: 21, II: 25, III: 27, IV: 27 })
  })

  it('every competency has a performance-indicator node', () => {
    for (const id of compIds) {
      const node = AIGP_COMPETENCY_NODES.find((n) => n.id === id)
      expect(node, `missing node for ${id}`).toBeDefined()
      expect(node!.performanceIndicators.length).toBeGreaterThan(0)
    }
  })
})

describe('AIGP content bank integrity', () => {
  it('has a meaningful number of items', () => {
    expect(AIGP_QUESTIONS.length).toBeGreaterThanOrEqual(185)
    expect(AIGP_FLASHCARDS.length).toBeGreaterThanOrEqual(30)
    expect(AIGP_REFS.length).toBeGreaterThanOrEqual(25)
  })

  it('ids are unique and never collide with the CIPP/E bank', () => {
    const ids = [...AIGP_QUESTIONS, ...AIGP_FLASHCARDS].map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
    const cippe = new Set(CIPPE_QUESTIONS.map((q) => q.id))
    for (const id of ids) expect(cippe.has(id)).toBe(false)
  })

  it('every question is tagged to a real competency and matching domain', () => {
    for (const q of AIGP_QUESTIONS) {
      expect(compIds.has(q.competency), `bad competency ${q.competency}`).toBe(true)
      expect(q.competency.startsWith(q.domain + '.')).toBe(true)
    }
  })

  it('every question is well-formed and cites resolvable references', () => {
    for (const q of AIGP_QUESTIONS) {
      expect(q.options.length).toBeGreaterThanOrEqual(2)
      expect(q.correct.length).toBeGreaterThanOrEqual(1)
      const ids = new Set(q.options.map((o) => o.id))
      for (const c of q.correct) expect(ids.has(c)).toBe(true)
      expect(q.explanation.length).toBeGreaterThan(0)
      for (const r of q.lawRefs) expect(refIds.has(r), `unresolved ref ${r}`).toBe(true)
      // multi-select items must expect more than one answer
      if (q.type === 'multiple') expect(q.correct.length).toBeGreaterThan(1)
    }
  })

  it('includes multi-select items, as the real AIGP exam does', () => {
    const multi = AIGP_QUESTIONS.filter((q) => q.type === 'multiple')
    expect(multi.length).toBeGreaterThanOrEqual(30)
  })

  it('roughly tracks blueprint weight: heavier competencies carry more questions', () => {
    const mid = (x: { minQ: number; maxQ: number }) => (x.minQ + x.maxQ) / 2
    const comps = AIGP_DOMAINS.flatMap((d) => d.competencies)
    const heaviest = comps.reduce((a, b) => (mid(a) >= mid(b) ? a : b))
    const lightest = comps.reduce((a, b) => (mid(a) <= mid(b) ? a : b))
    const count = (id: string) => AIGP_QUESTIONS.filter((q) => q.competency === id).length
    expect(count(heaviest.id)).toBeGreaterThan(count(lightest.id))
  })

  it('covers every competency with questions', () => {
    for (const id of compIds) {
      const n = AIGP_QUESTIONS.filter((q) => q.competency === id).length
      expect(n, `too few questions for ${id}`).toBeGreaterThanOrEqual(8)
    }
    // the heaviest competency should have at least as many as the lightest
    const counts = [...compIds].map((id) => AIGP_QUESTIONS.filter((q) => q.competency === id).length)
    expect(Math.max(...counts)).toBeGreaterThan(Math.min(...counts))
  })

  it('has exam-style case studies wired into the bank', () => {
    expect(AIGP_ALL_CASES.length).toBeGreaterThanOrEqual(8)
    const caseIds = new Set(AIGP_ALL_CASES.map((c) => c.id))
    for (const c of AIGP_ALL_CASES) {
      expect(c.scenario.length, `thin scenario for ${c.id}`).toBeGreaterThan(400)
      expect(c.groundedIn.length).toBeGreaterThan(50)
      const linked = AIGP_QUESTIONS.filter((q) => q.caseId === c.id)
      expect(linked.length, `too few questions for case ${c.id}`).toBeGreaterThanOrEqual(4)
      // the scenario must travel with every linked question, so items still
      // read correctly when spaced repetition surfaces them individually
      for (const q of linked) {
        expect(q.scenario).toBe(c.scenario)
        expect(q.caseTitle).toBe(c.title)
      }
    }
    // no orphaned case references
    for (const q of AIGP_QUESTIONS) {
      if (q.caseId) expect(caseIds.has(q.caseId), `orphan caseId ${q.caseId}`).toBe(true)
      if (q.scenario) expect(q.caseId).toBeDefined()
    }
  })

  it('case studies exercise applied reasoning across multiple domains', () => {
    for (const c of AIGP_ALL_CASES) {
      const linked = AIGP_QUESTIONS.filter((q) => q.caseId === c.id)
      const applied = linked.filter(
        (q) => q.bloomLevel === 'apply' || q.bloomLevel === 'analyze',
      ).length
      expect(applied / linked.length, `case ${c.id} is not applied enough`).toBeGreaterThan(0.6)
      expect(new Set(linked.map((q) => q.domain)).size, `case ${c.id} is single-domain`).toBeGreaterThan(1)
    }
  })

  it('mixes recall and applied Bloom tiers', () => {
    const applied = AIGP_QUESTIONS.filter(
      (q) => q.bloomLevel === 'apply' || q.bloomLevel === 'analyze',
    ).length
    // The exam mixes remember/understand with apply/analyze; keep the bank in
    // the same band rather than drifting scenario-only.
    expect(applied / AIGP_QUESTIONS.length).toBeGreaterThan(0.45)
    expect(applied / AIGP_QUESTIONS.length).toBeLessThan(0.7)
  })

  it('has a learn note for every competency', () => {
    for (const id of compIds) {
      const note = AIGP_LEARN_NOTES.find((n) => n.competency === id)
      expect(note, `missing learn note for ${id}`).toBeDefined()
      expect(note!.summary.length).toBeGreaterThan(300)
      expect(note!.keyPoints.length).toBeGreaterThanOrEqual(4)
    }
  })

  it('flashcards and refs are tagged to real competencies', () => {
    for (const c of AIGP_FLASHCARDS) expect(compIds.has(c.competency)).toBe(true)
    for (const r of AIGP_REFS) if (r.competency) expect(compIds.has(r.competency)).toBe(true)
  })

  it('confusion pairs are well-formed and exercise both sides', () => {
    expect(AIGP_CONFUSION_PAIRS.length).toBeGreaterThanOrEqual(6)
    for (const p of AIGP_CONFUSION_PAIRS) {
      expect(compIds.has(p.competency)).toBe(true)
      expect(p.a).not.toBe(p.b)
      expect(p.items.length).toBeGreaterThanOrEqual(4)
      const a = p.items.filter((i) => i.answer === 'a').length
      expect(a).toBeGreaterThanOrEqual(2)
      expect(p.items.length - a).toBeGreaterThanOrEqual(2)
    }
  })
})
