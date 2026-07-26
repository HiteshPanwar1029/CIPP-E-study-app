import { describe, it, expect } from 'vitest'
import { TRACKS, TRACK_IDS, getTrack, trackOfItem, DEFAULT_TRACK } from './tracks'

describe('certification tracks', () => {
  it('registers both tracks with distinct content', () => {
    expect(TRACK_IDS).toEqual(['cippe', 'aigp'])
    expect(TRACKS.cippe.questions.length).toBeGreaterThan(0)
    expect(TRACKS.aigp.questions.length).toBeGreaterThan(0)
    expect(TRACKS.cippe.domains).not.toBe(TRACKS.aigp.domains)
  })

  it('item ids never overlap between tracks, so analytics stay separate', () => {
    const cippe = new Set(TRACKS.cippe.items.map((i) => i.id))
    for (const item of TRACKS.aigp.items) expect(cippe.has(item.id)).toBe(false)
  })

  it('maps every item id back to its track', () => {
    expect(trackOfItem(TRACKS.cippe.items[0].id)).toBe('cippe')
    expect(trackOfItem(TRACKS.aigp.items[0].id)).toBe('aigp')
    expect(trackOfItem('does-not-exist')).toBeUndefined()
  })

  it('exposes each track’s real exam format', () => {
    expect(TRACKS.cippe.exam.deliveredItems).toBe(90)
    expect(TRACKS.cippe.exam.minutes).toBe(150)
    expect(TRACKS.aigp.exam.deliveredItems).toBe(100)
    expect(TRACKS.aigp.exam.minutes).toBe(180)
    expect(TRACKS.aigp.exam.formSize['full-90']).toBe(100)
  })

  it('falls back to the default track for an unknown id', () => {
    // @ts-expect-error deliberately invalid at runtime
    expect(getTrack('nope').id).toBe(DEFAULT_TRACK)
  })
})
