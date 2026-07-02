import { Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import { DOMAINS, BLOOMS, domainWeight, maxDomainWeight } from '../lib/blueprint'
import {
  byDomain,
  byBloom,
  rate,
  readiness,
  streak,
  dueLoad,
  dueCount,
  confidentlyWrong,
  competencyCoverage,
  readinessProjection,
} from '../lib/stats'
import { PageHeader, Card, Meter } from '../components/ui'
import { DueLoadChart } from '../components/charts'

const maxW = maxDomainWeight()
const TOTAL_COMPS = DOMAINS.reduce((n, d) => n + d.competencies.length, 0)

export function Dashboard() {
  const reviews = useStore((s) => s.reviews)
  const srs = useStore((s) => s.srs)
  const srsArr = Object.values(srs)

  const dom = byDomain(reviews)
  const bloom = byBloom(reviews)
  const r = readiness(reviews)
  const due = dueCount(srsArr)
  const cw = confidentlyWrong(reviews)
  const load = dueLoad(srsArr)
  const hasData = reviews.length > 0

  const cov = competencyCoverage(reviews)
  const covCounts = { untouched: 0, seen: 0, mastered: 0 }
  for (const d of DOMAINS) for (const c of d.competencies) covCounts[cov[c.id].status]++
  const proj = readinessProjection(reviews)

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader kicker="Today" title="Dashboard">
        <Link
          to="/session"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
        >
          Start today’s drill
        </Link>
      </PageHeader>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <Card><Stat value={String(due)} label="Due today" /></Card>
        <Card><Stat value={String(reviews.length)} label="Reviews logged" /></Card>
        <Card><Stat value={String(streak(reviews))} label="Day streak" /></Card>
      </div>

      <Card className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Mastery by domain</h2>
          <span className="text-xs text-muted">bar width = exam weight · fill = accuracy</span>
        </div>
        <div className="space-y-3">
          {DOMAINS.map((d) => {
            const w = domainWeight(d.id)
            const acc = dom[d.id]
            return (
              <div key={d.id} className="flex items-center gap-3">
                <span className="w-9 shrink-0 text-xs font-semibold text-accent">{d.id}</span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="truncate text-sm">{d.shortTitle}</span>
                    <span className="shrink-0 text-xs text-muted">
                      {acc ? `${Math.round(rate(acc) * 100)}%` : '—'} · {Math.round(w * 100)}%
                    </span>
                  </div>
                  <div style={{ width: `${(w / maxW) * 100}%` }}>
                    <Meter value={acc ? rate(acc) : 0} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {!hasData && (
          <p className="mt-4 text-xs text-muted">
            No reviews yet — bars fill as you study. Weights follow the IAPP CIPP/E blueprint
            (v1.3.3); Domain II is the heaviest at ~31%.
          </p>
        )}
      </Card>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-semibold">Recall vs. applied</h2>
          <div className="grid grid-cols-2 gap-4">
            {BLOOMS.map((b) => {
              const acc = bloom[b.id]
              return (
                <div key={b.id}>
                  <div className="mb-1 flex items-center justify-between text-xs text-muted">
                    <span>{b.label}</span>
                    <span>{acc ? `${Math.round(rate(acc) * 100)}%` : '—'}</span>
                  </div>
                  <Meter value={acc ? rate(acc) : 0} />
                </div>
              )
            })}
          </div>
          <p className="mt-4 text-xs text-muted">
            Splits factual recall from scenario reasoning — the two need different practice.
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-sm font-semibold">Due over the next 14 days</h2>
          <DueLoadChart data={load} />
        </Card>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Coverage</h2>
            <Link to="/learn" className="text-xs text-accent hover:underline">
              Open Learn →
            </Link>
          </div>
          <div className="mb-2 flex h-2 overflow-hidden rounded-full bg-surface-2">
            <div className="bg-accent" style={{ width: `${(covCounts.mastered / TOTAL_COMPS) * 100}%` }} />
            <div className="bg-accent-soft" style={{ width: `${(covCounts.seen / TOTAL_COMPS) * 100}%` }} />
          </div>
          <p className="text-xs text-muted">
            <span className="font-medium text-accent">{covCounts.mastered} mastered</span> ·{' '}
            {covCounts.seen} seen · {covCounts.untouched} untouched of {TOTAL_COMPS} competencies.
          </p>
        </Card>

        <Card>
          <h2 className="mb-2 text-sm font-semibold">Time to readiness</h2>
          {!hasData ? (
            <p className="text-xs text-muted">Study a little and a projection will appear here.</p>
          ) : (
            <>
              <p className="text-sm">
                {proj.daysToTarget === 0
                  ? 'You’re around the ~72% readiness mark.'
                  : proj.daysToTarget != null
                    ? `~${proj.daysToTarget} day${proj.daysToTarget === 1 ? '' : 's'} to ~72% at your recent pace.`
                    : 'Not enough recent progress to project — keep going.'}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {proj.perDomain.map((pd) => (
                  <span
                    key={pd.id}
                    className={
                      'rounded px-1.5 py-0.5 text-[10px] font-medium ' +
                      (pd.ready
                        ? 'bg-accent text-accent-fg'
                        : pd.started
                          ? 'bg-accent-soft text-accent'
                          : 'bg-surface-2 text-muted')
                    }
                  >
                    {pd.id} {pd.started ? `${Math.round(pd.mastery * 100)}%` : '—'}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted">
                Very rough — assumes your last 7 days’ pace holds. Indicative, not a guarantee.
              </p>
            </>
          )}
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold">Readiness estimate</h2>
            <span className="text-2xl font-semibold tabular-nums">
              {hasData ? `${Math.round(r.score * 100)}%` : '—'}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted">
            Based on {r.reviews} reviews over {r.days} day{r.days === 1 ? '' : 's'}. Indicative only —
            an internal study heuristic, not a prediction or a guarantee of passing the IAPP exam.
          </p>
        </Card>

        <Card>
          <h2 className="mb-1 text-sm font-semibold">Confidently wrong</h2>
          <div className="mb-1 text-2xl font-semibold tabular-nums">{cw.length}</div>
          <p className="text-xs text-muted">
            Items you were sure about but missed — your highest-value targets.{' '}
            {cw.length > 0 && (
              <Link to="/results" className="text-accent">
                Review →
              </Link>
            )}
          </p>
        </Card>
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  )
}
