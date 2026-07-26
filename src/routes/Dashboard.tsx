import { Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import { BLOOMS, domainWeight, maxDomainWeight } from '../lib/blueprint'
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
  examPlan,
} from '../lib/stats'
import { PageHeader, Card, Meter, TrackSwitcher } from '../components/ui'
import { DueLoadChart } from '../components/charts'

export function Dashboard() {
  const reviews = useStore((s) => s.reviews)
  const srs = useStore((s) => s.srs)
  const settings = useStore((s) => s.settings)
  const items = useStore((s) => s.items)
  const track = useStore((s) => s.track)
  const trackDef = useStore((s) => s.trackDef)
  const srsArr = Object.values(srs)

  const domains = trackDef.domains
  const maxW = maxDomainWeight(domains)
  const totalComps = domains.reduce((n, d) => n + d.competencies.length, 0)

  const dom = byDomain(reviews)
  const bloom = byBloom(reviews)
  const r = readiness(reviews, domains)
  const due = dueCount(srsArr)
  const cw = confidentlyWrong(reviews)
  const load = dueLoad(srsArr)
  const hasData = reviews.length > 0

  const cov = competencyCoverage(reviews, domains)
  const covCounts = { untouched: 0, seen: 0, mastered: 0 }
  for (const d of domains) for (const c of d.competencies) covCounts[cov[c.id].status]++
  const proj = readinessProjection(reviews, domains)

  const examDate = settings.examDates?.[track]
  const plan = examDate ? examPlan(examDate, items.length, srsArr.length) : null
  const suggestLowerRetention = !!plan && plan.finalWeek && settings.targetRetention > 0.86

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface-2/50 p-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-muted">
            Studying for
          </div>
          <div className="text-sm text-muted">{trackDef.tagline}</div>
        </div>
        <TrackSwitcher />
      </div>

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
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Exam plan</h2>
          <Link to="/settings" className="text-xs text-accent hover:underline">
            {examDate ? 'Change date →' : 'Set exam date →'}
          </Link>
        </div>
        {!plan ? (
          <p className="text-xs text-muted">
            Set your {trackDef.label} exam date in Settings and a daily pace plan appears here.
          </p>
        ) : plan.daysLeft < 0 ? (
          <p className="text-sm text-muted">
            Your exam date has passed — update it in Settings to keep planning.
          </p>
        ) : plan.daysLeft === 0 ? (
          <p className="text-sm">
            Exam day. No new material — clear the due queue and skim your confidently-wrong list.
            Good luck.
          </p>
        ) : (
          <>
            <p className="text-sm">
              <span className="font-semibold tabular-nums">{plan.daysLeft}</span> day
              {plan.daysLeft === 1 ? '' : 's'} to{' '}
              {new Date(`${examDate}T00:00:00`).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
              })}
              {plan.unseen === 0 ? (
                <> — all {items.length} items introduced. Review-only from here: keep the due queue at zero.</>
              ) : (
                <>
                  {' '}
                  — {plan.unseen} of {items.length} items not yet introduced. Learn{' '}
                  <span className="font-semibold">~{plan.newPerDay} new/day</span>
                  {plan.bufferDays > 0 &&
                    ` to finish ${plan.bufferDays} day${plan.bufferDays === 1 ? '' : 's'} early for a review-only run-in`}
                  .
                </>
              )}
            </p>
            {suggestLowerRetention && (
              <p className="mt-2 text-xs text-muted">
                Final week: consider lowering target retention to ~85% in Settings — wider intervals,
                more breadth before exam day.
              </p>
            )}
          </>
        )}
      </Card>

      <Card className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Mastery by domain</h2>
          <span className="text-xs text-muted">bar width = exam weight · fill = accuracy</span>
        </div>
        <div className="space-y-3">
          {domains.map((d) => {
            const w = domainWeight(domains, d.id)
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
            No reviews yet — bars fill as you study. Weights follow the {trackDef.blueprintVersion}.
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
            <div className="bg-accent" style={{ width: `${(covCounts.mastered / totalComps) * 100}%` }} />
            <div className="bg-accent-soft" style={{ width: `${(covCounts.seen / totalComps) * 100}%` }} />
          </div>
          <p className="text-xs text-muted">
            <span className="font-medium text-accent">{covCounts.mastered} mastered</span> ·{' '}
            {covCounts.seen} seen · {covCounts.untouched} untouched of {totalComps} competencies.
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
            Based on {r.reviews} reviews over {r.days} day{r.days === 1 ? '' : 's'} in {trackDef.label}.
            Indicative only — an internal study heuristic, not a prediction or a guarantee of passing
            the IAPP exam.
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
