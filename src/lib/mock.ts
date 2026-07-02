import type { Question, MockForm } from './types'
import { DOMAINS, domainWeight, allocateForm } from './blueprint'
import type { DomainId } from './blueprint'

export const FORM_SIZE: Record<MockForm, number> = {
  'full-90': 90,
  'half-45': 45,
  'domain-focus': 30,
}
export const FORM_MINUTES: Record<MockForm, number> = {
  'full-90': 150,
  'half-45': 75,
  'domain-focus': 45,
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Build a blueprint-weighted mock form. Domain counts follow allocateForm();
 * capped at the number of authored questions available (the seed bank is
 * smaller than 90, so an early full mock returns as many as it can).
 */
export function buildMockForm(
  questions: Question[],
  form: MockForm,
  focusDomain?: DomainId,
): string[] {
  const size = FORM_SIZE[form]
  if (form === 'domain-focus' && focusDomain) {
    return shuffle(questions.filter((q) => q.domain === focusDomain))
      .slice(0, size)
      .map((q) => q.id)
  }
  const alloc = allocateForm(size)
  const chosen: string[] = []
  for (const d of DOMAINS) {
    const pool = shuffle(questions.filter((q) => q.domain === d.id))
    chosen.push(...pool.slice(0, alloc[d.id]).map((q) => q.id))
  }
  if (chosen.length < size) {
    const picked = new Set(chosen)
    const rest = shuffle(questions.filter((q) => !picked.has(q.id)))
    chosen.push(...rest.slice(0, size - chosen.length).map((q) => q.id))
  }
  return shuffle(chosen)
}

export function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const s = new Set(a)
  return b.every((x) => s.has(x))
}

export interface MockScore {
  scoreByDomain: Record<string, number>
  scoreByBloom: Record<string, number>
  overall: number
  readinessEstimate: number
  correctCount: number
}

export function scoreMock(
  questionIds: string[],
  answers: Record<string, string[]>,
  getQuestion: (id: string) => Question | undefined,
): MockScore {
  const domAgg: Record<string, { c: number; t: number }> = {}
  const bloomAgg: Record<string, { c: number; t: number }> = {}
  let correctCount = 0
  for (const id of questionIds) {
    const q = getQuestion(id)
    if (!q) continue
    const ok = sameSet(answers[id] ?? [], q.correct)
    if (ok) correctCount++
    const dom = (domAgg[q.domain] ??= { c: 0, t: 0 })
    dom.t++
    if (ok) dom.c++
    const bl = (bloomAgg[q.bloomLevel] ??= { c: 0, t: 0 })
    bl.t++
    if (ok) bl.c++
  }
  const scoreByDomain: Record<string, number> = {}
  for (const k in domAgg) scoreByDomain[k] = domAgg[k].t ? domAgg[k].c / domAgg[k].t : 0
  const scoreByBloom: Record<string, number> = {}
  for (const k in bloomAgg) scoreByBloom[k] = bloomAgg[k].t ? bloomAgg[k].c / bloomAgg[k].t : 0
  const overall = questionIds.length ? correctCount / questionIds.length : 0
  let weighted = 0
  let wsum = 0
  for (const d of DOMAINS) {
    if (scoreByDomain[d.id] !== undefined) {
      weighted += domainWeight(d.id) * scoreByDomain[d.id]
      wsum += domainWeight(d.id)
    }
  }
  return {
    scoreByDomain,
    scoreByBloom,
    overall,
    readinessEstimate: wsum ? weighted / wsum : overall,
    correctCount,
  }
}
