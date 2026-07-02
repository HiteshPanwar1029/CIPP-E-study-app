import { describe, it, expect } from 'vitest'
import { LEARN_NOTES } from './learn'
import { DOMAINS } from '../lib/blueprint'

describe('learn notes', () => {
  const comps = new Set(DOMAINS.flatMap((d) => d.competencies.map((c) => c.id)))
  it('covers all 18 competencies exactly once', () => {
    expect(LEARN_NOTES).toHaveLength(18)
    const ids = LEARN_NOTES.map((n) => n.competency)
    expect(new Set(ids).size).toBe(18)
    for (const id of ids) expect(comps.has(id)).toBe(true)
  })
  it('each note has a real summary and key points', () => {
    for (const n of LEARN_NOTES) {
      expect(n.summary.length).toBeGreaterThan(40)
      expect(n.keyPoints.length).toBeGreaterThanOrEqual(2)
    }
  })
})
