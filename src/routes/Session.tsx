import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../lib/store'
import { buildQueue } from '../lib/queue'
import { dueCount } from '../lib/stats'
import type { DomainId, BloomLevel } from '../lib/blueprint'
import type { MockForm, StudyItem } from '../lib/types'
import { DrillRunner } from '../session/DrillRunner'
import { MockRunner } from '../session/MockRunner'
import { PairRunner, pairRound, mixedRound, type PairPrompt } from '../session/PairRunner'
import { PageHeader, Card } from '../components/ui'

type Active =
  | { kind: 'drill'; queue: StudyItem[] }
  | { kind: 'mock'; form: MockForm; focusDomain?: DomainId }
  | { kind: 'pairs'; queue: PairPrompt[]; title: string }

const selectCls = 'mt-1 w-full rounded-md border border-border bg-surface px-2 py-1.5 text-sm'

export function Session() {
  const navigate = useNavigate()
  const items = useStore((s) => s.items)
  const srs = useStore((s) => s.srs)
  const reviews = useStore((s) => s.reviews)
  const pairStats = useStore((s) => s.pairStats)
  const trackDef = useStore((s) => s.trackDef)
  const DOMAINS = trackDef.domains
  const PAIRS = trackDef.confusionPairs
  const CASES = trackDef.cases

  const startCase = (caseId: string) => {
    const qs = items.filter((it) => it.kind === 'question' && it.caseId === caseId)
    if (qs.length) setActive({ kind: 'drill', queue: qs })
  }

  const [active, setActive] = useState<Active | null>(null)
  const [domain, setDomain] = useState<DomainId | ''>('')
  const [bloom, setBloom] = useState<BloomLevel | ''>('')
  const [size, setSize] = useState(15)

  const due = dueCount(Object.values(srs))

  const startDrill = (onlyDue: boolean) => {
    const queue = buildQueue(items, srs, reviews, {
      size,
      onlyDue,
      includeNew: !onlyDue,
      domain: domain || undefined,
      bloom: bloom || undefined,
    })
    if (queue.length) setActive({ kind: 'drill', queue })
  }

  if (active?.kind === 'drill') {
    return (
      <div className="mx-auto max-w-2xl">
        <DrillRunner queue={active.queue} onExit={() => setActive(null)} />
      </div>
    )
  }
  if (active?.kind === 'mock') {
    return (
      <div className="mx-auto max-w-2xl">
        <MockRunner
          form={active.form}
          focusDomain={active.focusDomain}
          onFinish={(id) => navigate(`/results?mock=${id}`)}
        />
      </div>
    )
  }
  if (active?.kind === 'pairs') {
    return (
      <div className="mx-auto max-w-2xl">
        <PairRunner queue={active.queue} title={active.title} onExit={() => setActive(null)} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader kicker={`${trackDef.label} · Session`} title="Study session" />

      <Card className="mb-4">
        <h2 className="mb-1 text-sm font-semibold">Drill</h2>
        <p className="mb-4 text-xs text-muted">
          Adaptive spaced-repetition practice, one item at a time, with confidence grading.{' '}
          <span className="text-fg">{due} due now.</span>
        </p>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <label className="text-xs text-muted">
            Domain
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value as DomainId | '')}
              className={selectCls}
            >
              <option value="">All</option>
              {DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.id} — {d.shortTitle}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-muted">
            Tier
            <select
              value={bloom}
              onChange={(e) => setBloom(e.target.value as BloomLevel | '')}
              className={selectCls}
            >
              <option value="">All</option>
              <option value="remember">Remember</option>
              <option value="understand">Understand</option>
              <option value="apply">Apply</option>
              <option value="analyze">Analyze</option>
            </select>
          </label>
          <label className="text-xs text-muted">
            Length
            <select value={size} onChange={(e) => setSize(Number(e.target.value))} className={selectCls}>
              {[10, 15, 20, 30].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => startDrill(false)}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
          >
            Start drill
          </button>
          <button
            onClick={() => startDrill(true)}
            disabled={due === 0}
            className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40"
          >
            Due only ({due})
          </button>
        </div>
      </Card>

      {CASES.length > 0 && (
        <Card className="mb-4">
          <h2 className="mb-1 text-sm font-semibold">Case studies</h2>
          <p className="mb-4 text-xs text-muted">
            One scenario, several linked questions — the format the real exam uses. Each case is
            modelled on a documented real-world governance failure. Answers feed your
            spaced-repetition schedule like any other item.
          </p>
          <div className="space-y-2">
            {CASES.map((c) => {
              const n = items.filter((it) => it.kind === 'question' && it.caseId === c.id).length
              return (
                <button
                  key={c.id}
                  onClick={() => startCase(c.id)}
                  className="flex w-full items-start justify-between gap-3 rounded-lg border border-border px-3 py-2.5 text-left hover:border-accent"
                >
                  <span className="min-w-0">
                    <span className="text-sm font-medium">{c.title}</span>
                    <span className="mt-0.5 block text-xs text-muted">{c.premise}</span>
                    <span className="mt-1 block text-[11px] italic text-muted">{c.groundedIn}</span>
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted">{n} q</span>
                </button>
              )
            })}
          </div>
        </Card>
      )}

      <Card className="mb-4">
        <h2 className="mb-1 text-sm font-semibold">Confusion pairs</h2>
        <p className="mb-4 text-xs text-muted">
          Rapid discrimination rounds on classically confused concepts — press 1 or 2 to answer.
          Weak pairs surface more often in mixed rounds.
        </p>
        <button
          onClick={() =>
            setActive({
              kind: 'pairs',
              queue: mixedRound(PAIRS, pairStats),
              title: 'Mixed round',
            })
          }
          className="mb-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
        >
          Mixed round · 12
        </button>
        <div className="flex flex-wrap gap-1.5">
          {PAIRS.map((p) => {
            const s = pairStats[p.id]
            const pct = s && s.attempts > 0 ? Math.round((s.correct / s.attempts) * 100) : null
            return (
              <button
                key={p.id}
                onClick={() =>
                  setActive({ kind: 'pairs', queue: pairRound(p), title: `${p.a} vs ${p.b}` })
                }
                title={p.contrast}
                className="rounded-md border border-border px-2.5 py-1 text-xs hover:border-accent"
              >
                {p.a} vs {p.b}
                <span className={'ml-1.5 tabular-nums ' + (pct !== null && pct < 80 ? 'text-danger' : 'text-muted')}>
                  {pct !== null ? `${pct}%` : '—'}
                </span>
              </button>
            )
          })}
        </div>
      </Card>

      <Card>
        <h2 className="mb-1 text-sm font-semibold">Mock exam</h2>
        <p className="mb-4 text-xs text-muted">
          Timed, blueprint-weighted, Bloom-mixed, no feedback until you submit. Forms are currently
          capped by the size of the seed bank.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActive({ kind: 'mock', form: 'full-90' })}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
          >
            {trackDef.exam.formLabel['full-90']}
          </button>
          <button
            onClick={() => setActive({ kind: 'mock', form: 'half-45' })}
            className="rounded-lg border border-border px-4 py-2 text-sm"
          >
            {trackDef.exam.formLabel['half-45']}
          </button>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 text-xs text-muted">Domain-focused mock</div>
          <div className="flex flex-wrap gap-1.5">
            {DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActive({ kind: 'mock', form: 'domain-focus', focusDomain: d.id })}
                title={d.title}
                className="rounded-md border border-border px-2.5 py-1 text-xs hover:border-accent"
              >
                {d.id}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
