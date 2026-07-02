import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../lib/store'
import { buildQueue } from '../lib/queue'
import { dueCount } from '../lib/stats'
import { DOMAINS } from '../lib/blueprint'
import type { DomainId, BloomLevel } from '../lib/blueprint'
import type { MockForm, StudyItem } from '../lib/types'
import { DrillRunner } from '../session/DrillRunner'
import { MockRunner } from '../session/MockRunner'
import { PageHeader, Card } from '../components/ui'

type Active =
  | { kind: 'drill'; queue: StudyItem[] }
  | { kind: 'mock'; form: MockForm; focusDomain?: DomainId }

const selectCls = 'mt-1 w-full rounded-md border border-border bg-surface px-2 py-1.5 text-sm'

export function Session() {
  const navigate = useNavigate()
  const items = useStore((s) => s.items)
  const srs = useStore((s) => s.srs)
  const reviews = useStore((s) => s.reviews)

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

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader kicker="Session" title="Study session" />

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
            Full · 90 / 150 min
          </button>
          <button
            onClick={() => setActive({ kind: 'mock', form: 'half-45' })}
            className="rounded-lg border border-border px-4 py-2 text-sm"
          >
            Half · 45 / 75 min
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
