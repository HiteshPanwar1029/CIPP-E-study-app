import { describe, it, expect } from 'vitest'
import { CONFUSION_PAIRS } from './confusionPairs'
import { DOMAINS } from '../lib/blueprint'

const compIds = new Set(DOMAINS.flatMap((d) => d.competencies.map((c) => c.id)))

describe('confusion pairs integrity', () => {
  it('has a meaningful set of pairs', () => {
    expect(CONFUSION_PAIRS.length).toBeGreaterThanOrEqual(8)
  })

  it('pair ids are unique', () => {
    const ids = CONFUSION_PAIRS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every pair is tagged to a real competency and matching domain', () => {
    for (const p of CONFUSION_PAIRS) {
      expect(compIds.has(p.competency)).toBe(true)
      expect(p.competency.startsWith(p.domain + '.')).toBe(true)
    }
  })

  it('every pair has distinct labels, a contrast line, and enough prompts', () => {
    for (const p of CONFUSION_PAIRS) {
      expect(p.a).not.toBe(p.b)
      expect(p.contrast.length).toBeGreaterThan(0)
      expect(p.items.length).toBeGreaterThanOrEqual(4)
    }
  })

  it('answers are valid and both sides are exercised', () => {
    for (const p of CONFUSION_PAIRS) {
      let a = 0
      let b = 0
      for (const it of p.items) {
        expect(['a', 'b']).toContain(it.answer)
        expect(it.prompt.length).toBeGreaterThan(0)
        if (it.answer === 'a') a += 1
        else b += 1
      }
      // A round shouldn't be answerable by always picking the same side.
      expect(a).toBeGreaterThanOrEqual(2)
      expect(b).toBeGreaterThanOrEqual(2)
    }
  })
})
