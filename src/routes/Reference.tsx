import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '../lib/store'
import { PageHeader, Card, Chip } from '../components/ui'

export function Reference() {
  const { hash } = useLocation()
  const trackDef = useStore((s) => s.trackDef)
  const domains = trackDef.domains

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (el) {
      if (el instanceof HTMLDetailsElement) el.open = true
      el.scrollIntoView({ block: 'center' })
    }
  }, [hash])

  const totalComps = domains.reduce((n, d) => n + d.competencies.length, 0)

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader kicker={`${trackDef.label} · Reference library`} title="Competency tree & sources" />

      <Card className="mb-6">
        <p className="text-sm leading-relaxed text-muted">
          The {trackDef.blueprintVersion} spine: {domains.length} domains, {totalComps} competencies,{' '}
          {trackDef.refs.length} {trackDef.referenceNoun}. Expand a competency for its performance
          indicators, the governing sources with plain-language summaries, and how many practice
          items touch it. Ranges are the blueprint’s min–max questions.
        </p>
      </Card>

      <div className="space-y-4">
        {domains.map((d) => (
          <Card key={d.id}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="font-semibold">
                <span className="text-accent">{d.id}.</span> {d.title}
              </h2>
              <span className="shrink-0 text-xs text-muted">
                {d.minQ}–{d.maxQ} q
              </span>
            </div>
            <div className="space-y-2">
              {d.competencies.map((c) => {
                const node = trackDef.competencyNodes.find((n) => n.id === c.id)
                const qs = trackDef.questions.filter((q) => q.competency === c.id)
                const refs = trackDef.refs.filter((r) => r.competency === c.id)
                return (
                  <details key={c.id} id={c.id} className="scroll-mt-20 rounded-lg border border-border">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm">
                      <span>
                        <span className="font-medium text-accent">{c.id}</span> · {c.title}
                      </span>
                      <span className="shrink-0 text-xs text-muted">
                        {qs.length} q · {c.minQ}–{c.maxQ}
                      </span>
                    </summary>
                    <div className="space-y-3 border-t border-border px-3 py-3">
                      {node && (
                        <ul className="list-disc space-y-1 pl-4 text-sm text-muted">
                          {node.performanceIndicators.map((p, idx) => (
                            <li key={idx}>{p}</li>
                          ))}
                        </ul>
                      )}
                      {refs.length > 0 && (
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
                      )}
                    </div>
                  </details>
                )
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
