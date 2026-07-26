import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import { competencyCoverage } from '../lib/stats'
import type { CoverageStatus } from '../lib/stats'
import { buildQueue } from '../lib/queue'
import type { StudyItem } from '../lib/types'
import { DrillRunner } from '../session/DrillRunner'
import { PageHeader, Card, Chip } from '../components/ui'

const STATUS_STYLE: Record<CoverageStatus, string> = {
  untouched: 'bg-surface-2 text-muted',
  seen: 'bg-accent-soft text-accent',
  mastered: 'bg-accent text-accent-fg',
}

export function Learn() {
  const items = useStore((s) => s.items)
  const srs = useStore((s) => s.srs)
  const reviews = useStore((s) => s.reviews)
  const trackDef = useStore((s) => s.trackDef)
  const [selected, setSelected] = useState<string | null>(null)
  const [queue, setQueue] = useState<StudyItem[] | null>(null)

  const domains = trackDef.domains
  const notes = new Map(trackDef.learnNotes.map((n) => [n.competency, n]))
  const compTitle = new Map(domains.flatMap((d) => d.competencies).map((c) => [c.id, c.title]))
  const refsById = new Map(trackDef.refs.map((r) => [r.id, r]))
  const cov = competencyCoverage(reviews, domains)

  if (queue) {
    return (
      <div className="mx-auto max-w-2xl">
        <DrillRunner queue={queue} onExit={() => setQueue(null)} />
      </div>
    )
  }

  if (selected) {
    const note = notes.get(selected)
    const refs = trackDef.refs.filter((r) => r.competency === selected)
    const anchor = note?.anchorCase ? refsById.get(note.anchorCase) : undefined
    const startChecks = () => {
      const q = buildQueue(items, srs, reviews, { competency: selected, size: 5, includeNew: true })
      if (q.length) setQueue(q)
    }
    return (
      <div className="mx-auto max-w-2xl">
        <PageHeader
          kicker={`${trackDef.label} · Learn · ${selected}`}
          title={compTitle.get(selected) ?? selected}
        >
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
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Governing {trackDef.referenceNoun}
            </div>
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
  for (const d of domains) for (const c of d.competencies) counts[cov[c.id].status]++

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader kicker={`${trackDef.label} · Learn`} title="Concepts & coverage" />
      <Card className="mb-6">
        <p className="text-sm leading-relaxed text-muted">
          Concept-first study across the {trackDef.label} blueprint. Each topic gives a short
          explanation, the governing {trackDef.referenceNoun}, and a few practice checks that enter
          your spaced-repetition schedule. Badges show your coverage:{' '}
          <span className="font-medium text-accent">{counts.mastered} mastered</span>, {counts.seen}{' '}
          seen, {counts.untouched} untouched.
        </p>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold">AI &amp; Governance module</h2>
            <p className="mt-0.5 text-xs text-muted">
              EU AI Act · GDPR × AI · ethics frameworks · DPIA methodology · NIST AI RMF · ISO/IEC
              42001 — notes, case files and quizzes, shared by both tracks.
            </p>
          </div>
          <Link
            to="/aigov"
            className="shrink-0 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-fg"
          >
            Open →
          </Link>
        </div>
      </Card>

      <div className="space-y-4">
        {domains.map((d) => (
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
