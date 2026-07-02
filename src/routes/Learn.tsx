import { useState } from 'react'
import { useStore } from '../lib/store'
import { DOMAINS } from '../lib/blueprint'
import { competencyCoverage } from '../lib/stats'
import type { CoverageStatus } from '../lib/stats'
import { LEARN_NOTES } from '../data/learn'
import { lawRefsForCompetency, lawRefsById } from '../data'
import { buildQueue } from '../lib/queue'
import type { StudyItem } from '../lib/types'
import { DrillRunner } from '../session/DrillRunner'
import { PageHeader, Card, Chip } from '../components/ui'

const NOTE = new Map(LEARN_NOTES.map((n) => [n.competency, n]))
const COMP_TITLE = new Map(DOMAINS.flatMap((d) => d.competencies).map((c) => [c.id, c.title]))

const STATUS_STYLE: Record<CoverageStatus, string> = {
  untouched: 'bg-surface-2 text-muted',
  seen: 'bg-accent-soft text-accent',
  mastered: 'bg-accent text-accent-fg',
}

export function Learn() {
  const items = useStore((s) => s.items)
  const srs = useStore((s) => s.srs)
  const reviews = useStore((s) => s.reviews)
  const [selected, setSelected] = useState<string | null>(null)
  const [queue, setQueue] = useState<StudyItem[] | null>(null)

  const cov = competencyCoverage(reviews)

  if (queue) {
    return (
      <div className="mx-auto max-w-2xl">
        <DrillRunner queue={queue} onExit={() => setQueue(null)} />
      </div>
    )
  }

  if (selected) {
    const note = NOTE.get(selected)
    const refs = lawRefsForCompetency(selected)
    const anchor = note?.anchorCase ? lawRefsById.get(note.anchorCase) : undefined
    const startChecks = () => {
      const q = buildQueue(items, srs, reviews, { competency: selected, size: 5, includeNew: true })
      if (q.length) setQueue(q)
    }
    return (
      <div className="mx-auto max-w-2xl">
        <PageHeader kicker={`Learn · ${selected}`} title={COMP_TITLE.get(selected) ?? selected}>
          <button onClick={() => setSelected(null)} className="text-xs text-muted hover:text-fg">
            ← All topics
          </button>
        </PageHeader>

        <Card className="mb-4">
          <p className="prose-legal text-[15px]">{note?.summary}</p>
        </Card>

        {note && note.keyPoints.length > 0 && (
          <Card className="mb-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Key points</div>
            <ul className="list-disc space-y-1 pl-4 text-sm">
              {note.keyPoints.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </Card>
        )}

        {refs.length > 0 && (
          <Card className="mb-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Governing law</div>
            <div className="space-y-2">
              {refs.map((r) => (
                <div key={r.id} className="text-sm">
                  <Chip>
                    {r.instrument} {r.citation}
                  </Chip>{' '}
                  <span className="font-medium">{r.title}</span>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{r.plainSummary}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {anchor && (
          <Card className="mb-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Anchor case</div>
            <p className="text-sm">
              <span className="font-medium">{anchor.title}</span> — {anchor.plainSummary}
            </p>
          </Card>
        )}

        <button
          onClick={startChecks}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
        >
          Practice this topic →
        </button>
        <p className="mt-2 text-xs text-muted">
          A few checks from this competency; your grades enter the spaced-repetition schedule.
        </p>
      </div>
    )
  }

  const counts = { untouched: 0, seen: 0, mastered: 0 }
  for (const d of DOMAINS) for (const c of d.competencies) counts[cov[c.id].status]++

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader kicker="Learn" title="Concepts & coverage" />
      <Card className="mb-6">
        <p className="text-sm leading-relaxed text-muted">
          Concept-first study across the blueprint. Each topic gives a short explanation, the
          governing law, and a few practice checks that enter your spaced-repetition schedule. Badges
          show your coverage:{' '}
          <span className="font-medium text-accent">{counts.mastered} mastered</span>, {counts.seen}{' '}
          seen, {counts.untouched} untouched.
        </p>
      </Card>
      <div className="space-y-4">
        {DOMAINS.map((d) => (
          <Card key={d.id}>
            <h2 className="mb-3 font-semibold">
              <span className="text-accent">{d.id}.</span> {d.title}
            </h2>
            <div className="space-y-1.5">
              {d.competencies.map((c) => {
                const st = cov[c.id].status
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c.id)}
                    className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-1.5 text-left text-sm hover:bg-surface-2"
                  >
                    <span>
                      <span className="font-medium text-accent">{c.id}</span> · {c.title}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${STATUS_STYLE[st]}`}
                    >
                      {st}
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
