import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useStore } from '../lib/store'
import { DOMAINS, BLOOMS } from '../lib/blueprint'
import { confidentlyWrong, latestPerItem } from '../lib/stats'
import { sameSet } from '../lib/mock'
import type { Question, StudyItem } from '../lib/types'
import { PageHeader, Card, Meter, Chip } from '../components/ui'

const isQuestion = (it: StudyItem | undefined): it is Extract<StudyItem, { kind: 'question' }> =>
  !!it && it.kind === 'question'

function formLabel(f: string): string {
  return f === 'full-90' ? 'Full mock (90)' : f === 'half-45' ? 'Half mock (45)' : 'Domain mock'
}

type Filter = 'incorrect' | 'confident' | 'flagged'

export function Results() {
  const mocks = useStore((s) => s.mocks)
  const reviews = useStore((s) => s.reviews)
  const byId = useStore((s) => s.byId)
  const meta = useStore((s) => s.meta)
  const srs = useStore((s) => s.srs)
  const requeue = useStore((s) => s.requeue)
  const [params] = useSearchParams()
  const [filter, setFilter] = useState<Filter>('incorrect')

  const mockParam = params.get('mock')
  const mock = mockParam ? mocks.find((m) => String(m.id) === mockParam) : mocks[mocks.length - 1]

  const getQ = (id: string): Question | undefined =>
    isQuestion(byId[id]) ? (byId[id] as Question) : undefined
  const itemText = (id: string): string => {
    const it = byId[id]
    return it ? (it.kind === 'question' ? it.stem : it.front) : id
  }
  const compOf = (id: string): string => byId[id]?.competency ?? ''
  const isQueued = (id: string): boolean => {
    const s = srs[id]
    return !!s && new Date(s.due).getTime() <= Date.now()
  }

  const incorrect = latestPerItem(reviews).filter((r) => !r.correct)
  const cw = confidentlyWrong(reviews)
  const flaggedIds = Object.values(meta)
    .filter((m) => m.flagged)
    .map((m) => m.itemId)

  const listIds =
    filter === 'incorrect'
      ? incorrect.map((r) => r.itemId)
      : filter === 'confident'
        ? cw.map((r) => r.itemId)
        : flaggedIds

  const TABS: { id: Filter; label: string; n: number }[] = [
    { id: 'incorrect', label: 'Incorrect', n: incorrect.length },
    { id: 'confident', label: 'Confidently wrong', n: cw.length },
    { id: 'flagged', label: 'Flagged', n: flaggedIds.length },
  ]
  const hasReviewData = incorrect.length + cw.length + flaggedIds.length > 0
  const empty = !mock && !hasReviewData

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader kicker="Results" title="Results & review" />

      {empty && (
        <Card>
          <p className="text-sm text-muted">
            No attempts recorded yet. Finish a drill or a mock and your per-domain and per-tier
            breakdown will land here.
          </p>
        </Card>
      )}

      {mock && (
        <Card className="mb-6">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-semibold">
              {formLabel(mock.form)} · {new Date(mock.startedAt).toLocaleString()}
            </h2>
            <span className="text-2xl font-semibold tabular-nums">
              {Math.round(mock.overall * 100)}%
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-2 text-xs font-semibold text-muted">By domain</div>
              <div className="space-y-2">
                {DOMAINS.map((d) =>
                  mock.scoreByDomain[d.id] === undefined ? null : (
                    <ScoreRow key={d.id} label={`${d.id} · ${d.shortTitle}`} value={mock.scoreByDomain[d.id]} />
                  ),
                )}
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold text-muted">By Bloom tier</div>
              <div className="space-y-2">
                {BLOOMS.map((b) =>
                  mock.scoreByBloom[b.id] === undefined ? null : (
                    <ScoreRow key={b.id} label={b.label} value={mock.scoreByBloom[b.id]} />
                  ),
                )}
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">
            Indicative readiness for this form: {Math.round(mock.readinessEstimate * 100)}% — not a
            pass guarantee. Missed items were queued into your reviews.
          </p>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium">Review missed questions</summary>
            <div className="mt-3 space-y-3">
              {mock.questionIds.map((id) => {
                const q = getQ(id)
                if (!q || sameSet(mock.answers[id] ?? [], q.correct)) return null
                const correctText = q.options
                  .filter((o) => q.correct.includes(o.id))
                  .map((o) => o.text)
                  .join('; ')
                return (
                  <div key={id} className="rounded-lg border border-border p-3 text-sm">
                    <div className="mb-1">{q.stem}</div>
                    <div className="text-xs">
                      <span className="text-danger">Missed.</span> Correct:{' '}
                      <span className="text-accent">{correctText}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted">{q.explanation}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs">
                      <Link to={`/reference#${q.competency}`} className="text-accent hover:underline">
                        ↗ Reference
                      </Link>
                      <button
                        onClick={() => requeue(id)}
                        disabled={isQueued(id)}
                        className="text-accent hover:underline disabled:text-muted disabled:no-underline"
                      >
                        {isQueued(id) ? 'Queued ✓' : 'Re-queue'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </details>
        </Card>
      )}

      {mocks.length > 0 && (
        <Card className="mb-6">
          <h2 className="mb-3 text-sm font-semibold">Mock history</h2>
          <div className="space-y-1">
            {[...mocks].reverse().map((m) => (
              <Link
                key={m.id}
                to={`/results?mock=${m.id}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-surface-2"
              >
                <span>
                  {formLabel(m.form)} · {new Date(m.startedAt).toLocaleDateString()}
                </span>
                <span className="tabular-nums text-muted">{Math.round(m.overall * 100)}%</span>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {hasReviewData && (
        <Card>
          <div className="mb-3 flex flex-wrap items-center gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={
                  'rounded-md px-2.5 py-1 text-xs font-medium transition-colors ' +
                  (filter === t.id ? 'bg-accent-soft text-accent' : 'text-muted hover:text-fg')
                }
              >
                {t.label} ({t.n})
              </button>
            ))}
          </div>
          {listIds.length === 0 ? (
            <p className="text-xs text-muted">Nothing in this list.</p>
          ) : (
            <div className="space-y-2">
              {listIds.map((id) => (
                <div
                  key={id}
                  className="flex items-start justify-between gap-3 rounded-md border border-border p-2.5 text-sm"
                >
                  <div className="min-w-0">
                    <Chip>{compOf(id)}</Chip>{' '}
                    <span className="text-muted">{itemText(id)}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-xs">
                    <Link to={`/reference#${compOf(id)}`} className="text-accent hover:underline" title="Jump to reference">
                      ↗
                    </Link>
                    <button
                      onClick={() => requeue(id)}
                      disabled={isQueued(id)}
                      className="text-accent hover:underline disabled:text-muted disabled:no-underline"
                    >
                      {isQueued(id) ? 'Queued' : 'Re-queue'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="mt-3 text-xs text-muted">
            Re-queue makes an item due now, so it appears in your next drill. ↗ jumps to the law
            reference.
          </p>
        </Card>
      )}
    </div>
  )
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-36 shrink-0 truncate text-xs">{label}</span>
      <div className="flex-1">
        <Meter value={value} />
      </div>
      <span className="w-9 text-right text-xs tabular-nums text-muted">
        {Math.round(value * 100)}%
      </span>
    </div>
  )
}
