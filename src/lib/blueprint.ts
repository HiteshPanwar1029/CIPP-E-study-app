// src/lib/blueprint.ts
//
// The tagging spine — derived directly from the IAPP CIPP/E Body of Knowledge
// & Exam Blueprint, v1.3.3 (approved 4 Mar 2025; effective 1 Sep 2025).
//
// Per-competency min/max question counts are taken verbatim from the BoK. Each
// domain's published range equals the sum of its competencies' ranges, and the
// domain midpoints sum to 75 scored items — so the same numbers drive mock-form
// weighting AND how many questions we author per competency. (See LOGBOOK D1.)

export type DomainId = 'I' | 'II' | 'III' | 'IV' | 'V'
export type BloomLevel = 'remember' | 'understand' | 'apply' | 'analyze'

export interface Competency {
  id: string
  domain: DomainId
  title: string
  minQ: number
  maxQ: number
}

export interface Domain {
  id: DomainId
  title: string
  shortTitle: string
  minQ: number
  maxQ: number
  competencies: Competency[]
}

export const DOMAINS: Domain[] = [
  {
    id: 'I',
    title: 'Introduction to European Data Protection',
    shortTitle: 'Introduction',
    minQ: 7,
    maxQ: 13,
    competencies: [
      { id: 'I.A', domain: 'I', title: 'Origins & historical context of European DP law', minQ: 1, maxQ: 3 },
      { id: 'I.B', domain: 'I', title: 'Roles & functions of EU institutions', minQ: 1, maxQ: 2 },
      { id: 'I.C', domain: 'I', title: 'Legislative framework', minQ: 5, maxQ: 8 },
    ],
  },
  {
    id: 'II',
    title: 'European Data Protection Law and Regulation',
    shortTitle: 'Law & Regulation',
    minQ: 18,
    maxQ: 28,
    competencies: [
      { id: 'II.A', domain: 'II', title: 'Basic GDPR concepts', minQ: 3, maxQ: 5 },
      { id: 'II.B', domain: 'II', title: 'Security of personal data', minQ: 7, maxQ: 11 },
      { id: 'II.C', domain: 'II', title: 'Data subjects’ rights', minQ: 8, maxQ: 12 },
    ],
  },
  {
    id: 'III',
    title: 'European Data Processing',
    shortTitle: 'Data Processing',
    minQ: 13,
    maxQ: 21,
    competencies: [
      { id: 'III.A', domain: 'III', title: 'Processing principles', minQ: 2, maxQ: 4 },
      { id: 'III.B', domain: 'III', title: 'Lawful processing bases', minQ: 3, maxQ: 5 },
      { id: 'III.C', domain: 'III', title: 'Information-provision obligations', minQ: 4, maxQ: 6 },
      { id: 'III.D', domain: 'III', title: 'International data transfers', minQ: 4, maxQ: 6 },
    ],
  },
  {
    id: 'IV',
    title: 'European Data Protection: Scope and Accountability',
    shortTitle: 'Scope & Accountability',
    minQ: 8,
    maxQ: 18,
    competencies: [
      { id: 'IV.A', domain: 'IV', title: 'Territorial & material scope', minQ: 2, maxQ: 4 },
      { id: 'IV.B', domain: 'IV', title: 'Accountability requirements', minQ: 4, maxQ: 8 },
      { id: 'IV.C', domain: 'IV', title: 'Supervision & enforcement structure', minQ: 1, maxQ: 3 },
      { id: 'IV.D', domain: 'IV', title: 'Consequences for violations', minQ: 1, maxQ: 3 },
    ],
  },
  {
    id: 'V',
    title: 'Compliance with European Data Protection Law and Regulation',
    shortTitle: 'Compliance',
    minQ: 8,
    maxQ: 16,
    competencies: [
      { id: 'V.A', domain: 'V', title: 'Employment', minQ: 3, maxQ: 5 },
      { id: 'V.B', domain: 'V', title: 'Surveillance', minQ: 1, maxQ: 3 },
      { id: 'V.C', domain: 'V', title: 'Direct marketing', minQ: 2, maxQ: 4 },
      { id: 'V.D', domain: 'V', title: 'Internet technology & communications', minQ: 2, maxQ: 4 },
    ],
  },
]

export interface BloomInfo {
  id: BloomLevel
  label: string
  tier: 'recall' | 'applied'
}

export const BLOOMS: BloomInfo[] = [
  { id: 'remember', label: 'Remember', tier: 'recall' },
  { id: 'understand', label: 'Understand', tier: 'recall' },
  { id: 'apply', label: 'Apply', tier: 'applied' },
  { id: 'analyze', label: 'Analyze', tier: 'applied' },
]

/** Scored items on the real exam (unscored pretest items bring the total to 90). */
export const SCORED_ITEMS = 75
/** Items on a full mock form. */
export const FULL_FORM = 90

const mid = (c: { minQ: number; maxQ: number }): number => (c.minQ + c.maxQ) / 2

export const totalMidpoint = (): number => DOMAINS.reduce((s, d) => s + mid(d), 0)

export const domainWeight = (id: DomainId): number => {
  const d = DOMAINS.find((x) => x.id === id)
  if (!d) return 0
  return mid(d) / totalMidpoint()
}

export const maxDomainWeight = (): number =>
  Math.max(...DOMAINS.map((d) => domainWeight(d.id)))

/**
 * Allocate `size` questions across the five domains proportional to blueprint
 * weight, using largest-remainder rounding so the parts sum to exactly `size`.
 * allocateForm(90) => { I: 12, II: 28, III: 20, IV: 16, V: 14 }.
 */
export function allocateForm(size: number): Record<DomainId, number> {
  const total = totalMidpoint()
  const rows = DOMAINS.map((d) => {
    const exact = (mid(d) / total) * size
    const base = Math.floor(exact)
    return { id: d.id, base, frac: exact - base }
  })
  let used = rows.reduce((s, r) => s + r.base, 0)
  rows.sort((a, b) => b.frac - a.frac)
  let i = 0
  while (used < size) {
    rows[i % rows.length].base += 1
    used += 1
    i += 1
  }
  const out = {} as Record<DomainId, number>
  for (const r of rows) out[r.id] = r.base
  return out
}
