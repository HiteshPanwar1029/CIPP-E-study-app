import { describe, it, expect } from 'vitest'
import { DOMAINS, BLOOMS, totalMidpoint, domainWeight, allocateForm } from './blueprint'

describe('CIPP/E blueprint spine (BoK v1.3.3)', () => {
  it('has five domains and eighteen competencies', () => {
    expect(DOMAINS).toHaveLength(5)
    expect(DOMAINS.flatMap((d) => d.competencies)).toHaveLength(18)
  })

  it('each domain range equals the sum of its competencies', () => {
    for (const d of DOMAINS) {
      const min = d.competencies.reduce((s, c) => s + c.minQ, 0)
      const max = d.competencies.reduce((s, c) => s + c.maxQ, 0)
      expect(min).toBe(d.minQ)
      expect(max).toBe(d.maxQ)
    }
  })

  it('domain midpoints sum to 75 scored items', () => {
    expect(totalMidpoint()).toBe(75)
  })

  it('domain weights sum to 1', () => {
    const sum = DOMAINS.reduce((s, d) => s + domainWeight(d.id), 0)
    expect(sum).toBeCloseTo(1, 10)
  })

  it('a 90-item form sums to 90 and matches the spec allocation', () => {
    const f = allocateForm(90)
    expect(Object.values(f).reduce((s, n) => s + n, 0)).toBe(90)
    expect(f).toEqual({ I: 12, II: 28, III: 20, IV: 16, V: 14 })
  })

  it('classifies every Bloom tier as recall or applied', () => {
    expect(BLOOMS).toHaveLength(4)
    for (const b of BLOOMS) {
      expect(['recall', 'applied']).toContain(b.tier)
    }
  })
})
