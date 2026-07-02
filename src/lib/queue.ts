import type { StudyItem, SrsState, ReviewLogEntry } from './types'
import type { DomainId, BloomLevel } from './blueprint'
import { byCompetency, rate } from './stats'

export interface QueueOpts {
  size?: number
  domain?: DomainId
  competency?: string
  bloom?: BloomLevel
  onlyDue?: boolean
  includeNew?: boolean
}

const DAY = 86400000

/**
 * Two-dimensional adaptive selection (spec §4.2). Due items first (most
 * overdue and weakest competencies weighted up), then new items to introduce,
 * then not-yet-due items to top up. Optional manual targeting by domain /
 * competency / Bloom tier.
 */
export function buildQueue(
  items: StudyItem[],
  srs: Record<string, SrsState>,
  reviews: ReviewLogEntry[],
  opts: QueueOpts = {},
): StudyItem[] {
  const { size = 20, domain, competency, bloom, onlyDue = false, includeNew = true } = opts
  const now = Date.now()
  const compAcc = byCompetency(reviews)
  const weakness = (c: string): number => {
    const a = compAcc[c]
    return a && a.total > 0 ? 1 - rate(a) : 0.6
  }

  const pool = items.filter(
    (it) =>
      (!domain || it.domain === domain) &&
      (!competency || it.competency === competency) &&
      (!bloom || it.bloomLevel === bloom),
  )

  const due: { it: StudyItem; score: number }[] = []
  const fresh: { it: StudyItem; score: number }[] = []
  const future: { it: StudyItem; score: number }[] = []

  for (const it of pool) {
    const st = srs[it.id]
    if (!st) {
      fresh.push({ it, score: weakness(it.competency) })
      continue
    }
    const overdueDays = (now - new Date(st.due).getTime()) / DAY
    if (overdueDays >= 0) {
      due.push({ it, score: (overdueDays + 1) * (0.5 + weakness(it.competency)) })
    } else {
      future.push({ it, score: -overdueDays })
    }
  }

  due.sort((a, b) => b.score - a.score)
  fresh.sort((a, b) => b.score - a.score)
  future.sort((a, b) => a.score - b.score)

  const ordered: StudyItem[] = []
  const push = (arr: { it: StudyItem }[]) => {
    for (const x of arr) if (!ordered.includes(x.it)) ordered.push(x.it)
  }

  push(due)
  if (onlyDue) return ordered.slice(0, size)
  if (includeNew) push(fresh)
  push(future)
  return ordered.slice(0, size)
}
