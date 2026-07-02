import type { ReviewLogEntry, SrsState } from './types'
import { DOMAINS, domainWeight } from './blueprint'

export interface Acc {
  correct: number
  total: number
}
export const rate = (a: Acc | undefined): number => (a && a.total ? a.correct / a.total : 0)

export function accBy<K extends string>(
  reviews: ReviewLogEntry[],
  keyOf: (r: ReviewLogEntry) => K,
): Record<K, Acc> {
  const out = {} as Record<K, Acc>
  for (const r of reviews) {
    const k = keyOf(r)
    const a = (out[k] ??= { correct: 0, total: 0 })
    a.total += 1
    if (r.correct) a.correct += 1
  }
  return out
}

export const byDomain = (reviews: ReviewLogEntry[]) => accBy(reviews, (r) => r.domain)
export const byBloom = (reviews: ReviewLogEntry[]) => accBy(reviews, (r) => r.bloomLevel)
export const byCompetency = (reviews: ReviewLogEntry[]) => accBy(reviews, (r) => r.competency)

/** Last review per item (reviews are appended chronologically). */
export function latestPerItem(reviews: ReviewLogEntry[]): ReviewLogEntry[] {
  const m = new Map<string, ReviewLogEntry>()
  for (const r of reviews) m.set(r.itemId, r)
  return [...m.values()]
}

/** Missed items the user was confident about — the highest-value study targets. */
export function confidentlyWrong(reviews: ReviewLogEntry[]): ReviewLogEntry[] {
  return latestPerItem(reviews).filter(
    (r) => !r.correct && (r.confidence === 'good' || r.confidence === 'easy'),
  )
}

const dayKey = (ts: string): string => ts.slice(0, 10)
const distinctDays = (reviews: ReviewLogEntry[]): Set<string> =>
  new Set(reviews.map((r) => dayKey(r.ts)))

export interface Readiness {
  score: number
  reviews: number
  days: number
}
/** Blueprint-weighted mean of per-domain accuracy. Indicative only. */
export function readiness(reviews: ReviewLogEntry[]): Readiness {
  const dom = byDomain(reviews)
  let score = 0
  for (const d of DOMAINS) score += domainWeight(d.id) * rate(dom[d.id])
  return { score, reviews: reviews.length, days: distinctDays(reviews).size }
}

export function streak(reviews: ReviewLogEntry[], now = new Date()): number {
  const days = distinctDays(reviews)
  const iso = (d: Date) => d.toISOString().slice(0, 10)
  const today = iso(now)
  const yesterday = iso(new Date(now.getTime() - 86400000))
  if (!days.has(today) && !days.has(yesterday)) return 0
  const cursor = new Date(now)
  if (!days.has(today)) cursor.setTime(cursor.getTime() - 86400000)
  let count = 0
  while (days.has(iso(cursor))) {
    count += 1
    cursor.setTime(cursor.getTime() - 86400000)
  }
  return count
}

export interface DuePoint {
  date: string
  label: string
  count: number
}
/** Due volume per day for the next `days` days; overdue lumps into day 0. */
export function dueLoad(srs: SrsState[], days = 14, now = new Date()): DuePoint[] {
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  const buckets: DuePoint[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * 86400000)
    buckets.push({
      date: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      count: 0,
    })
  }
  for (const s of srs) {
    const idx = Math.floor((new Date(s.due).getTime() - start.getTime()) / 86400000)
    if (idx < 0) buckets[0].count += 1
    else if (idx < days) buckets[idx].count += 1
  }
  return buckets
}

export const dueCount = (srs: SrsState[], now = new Date()): number =>
  srs.filter((s) => new Date(s.due).getTime() <= now.getTime()).length

export type CoverageStatus = 'untouched' | 'seen' | 'mastered'
export const MASTERY_THRESHOLD = 0.8
export const MASTERY_MIN_REVIEWS = 3

export interface Coverage {
  status: CoverageStatus
  total: number
  correct: number
}
/** Per-competency study coverage against the full tree. */
export function competencyCoverage(reviews: ReviewLogEntry[]): Record<string, Coverage> {
  const by = byCompetency(reviews)
  const out: Record<string, Coverage> = {}
  for (const d of DOMAINS) {
    for (const c of d.competencies) {
      const a = by[c.id]
      const total = a?.total ?? 0
      let status: CoverageStatus = 'untouched'
      if (total > 0) {
        status =
          total >= MASTERY_MIN_REVIEWS && rate(a) >= MASTERY_THRESHOLD ? 'mastered' : 'seen'
      }
      out[c.id] = { status, total, correct: a?.correct ?? 0 }
    }
  }
  return out
}

export interface ReadinessProjection {
  ratePerDay: number
  daysToTarget: number | null
  target: number
  perDomain: { id: string; mastery: number; started: boolean; ready: boolean }[]
}
/**
 * Rough projection: compares readiness now vs 7 days ago to get a per-day pace,
 * then extrapolates days to the target. Clearly indicative only.
 */
export function readinessProjection(
  reviews: ReviewLogEntry[],
  target = 0.72,
  now = new Date(),
): ReadinessProjection {
  const nowScore = readiness(reviews).score
  const cutoff = now.getTime() - 7 * 86400000
  const past = reviews.filter((r) => new Date(r.ts).getTime() <= cutoff)
  const ratePerDay = (nowScore - readiness(past).score) / 7
  const daysToTarget =
    nowScore >= target ? 0 : ratePerDay > 0.0005 ? Math.ceil((target - nowScore) / ratePerDay) : null
  const dom = byDomain(reviews)
  const perDomain = DOMAINS.map((d) => {
    const a = dom[d.id]
    const mastery = rate(a)
    const started = (a?.total ?? 0) > 0
    return { id: d.id, mastery, started, ready: started && mastery >= target }
  })
  return { ratePerDay, daysToTarget, target, perDomain }
}
