import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DOMAINS } from '../lib/blueprint'
import { COMPETENCY_NODES, LAW_REFS, questionsForCompetency, lawRefsForCompetency } from '../data'
import { PageHeader, Card, Chip } from '../components/ui'

export function Reference() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (el) {
      if (el instanceof HTMLDetailsElement) el.open = true
      el.scrollIntoView({ block: 'center' })
    }
  }, [hash])

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader kicker="Reference library" title="Competency tree & law" />

      <Card className="mb-6">
        <p className="text-sm leading-relaxed text-muted">
          The IAPP CIPP/E blueprint spine (v1.3.3): {DOMAINS.length} domains, {COMPETENCY_NODES.length}{' '}
          competencies, {LAW_REFS.length} law references. Expand a competency for its performance
          indicators, the governing articles and cases with plain-language summaries, and how many
          practice items touch it. Ranges are the blueprint’s min–max questions.
        </p>
      </Card>

      <div className="space-y-4">
        {DOMAINS.map((d) => (
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
                const node = COMPETENCY_NODES.find((n) => n.id === c.id)
                const qs = questionsForCompetency(c.id)
                const refs = lawRefsForCompetency(c.id)
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
