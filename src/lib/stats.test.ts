import { describe, it, expect } from 'vitest'
import { examPlan } from './stats'

const now = new Date('2026-07-08T10:00:00')

describe('examPlan', () => {
  it('computes days left and an even daily pace with a review-only buffer', () => {
    // 20 days out, 170 unseen of 200 → 3 buffer days → ceil(170/17) = 10/day
    const p = examPlan('2026-07-28', 200, 30, now)
    expect(p.daysLeft).toBe(20)
    expect(p.unseen).toBe(170)
    expect(p.bufferDays).toBe(3)
    expect(p.newPerDay).toBe(10)
    expect(p.finalWeek).toBe(false)
  })

  it('flags the final week and shrinks the buffer on short runways', () => {
    const p = examPlan('2026-07-12', 200, 150, now) // 4 days out
    expect(p.daysLeft).toBe(4)
    expect(p.bufferDays).toBe(1)
    expect(p.newPerDay).toBe(Math.ceil(50 / 3))
    expect(p.finalWeek).toBe(true)
  })

  it('handles exam day and past dates', () => {
    expect(examPlan('2026-07-08', 100, 10, now).daysLeft).toBe(0)
    expect(examPlan('2026-07-08', 100, 10, now).newPerDay).toBeNull()
    expect(examPlan('2026-07-01', 100, 10, now).daysLeft).toBe(-7)
  })

  it('never reports negative unseen and never divides by zero', () => {
    const p = examPlan('2026-07-09', 100, 120, now)
    expect(p.unseen).toBe(0)
    expect(p.newPerDay).toBe(0)
  })
})
