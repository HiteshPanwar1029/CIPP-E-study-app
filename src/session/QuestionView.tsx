import type { Question } from '../lib/types'
import { lawRefsById } from '../data'
import { Chip } from '../components/ui'

export function QuestionView({
  q,
  selected,
  revealed,
  onToggle,
}: {
  q: Question
  selected: string[]
  revealed: boolean
  onToggle: (optId: string) => void
}) {
  const isMulti = q.type === 'multiple'
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="font-semibold text-accent">{q.competency}</span>
        <span>·</span>
        <span className="capitalize">{q.bloomLevel}</span>
        {isMulti && (
          <span className="rounded bg-surface-2 px-1.5 py-0.5">select all that apply</span>
        )}
      </div>
      <p className="mb-5 text-lg leading-relaxed">{q.stem}</p>
      <div className="space-y-2">
        {q.options.map((o, i) => {
          const chosen = selected.includes(o.id)
          const correct = q.correct.includes(o.id)
          let cls = 'border-border bg-surface hover:border-accent'
          if (revealed) {
            if (correct) cls = 'border-accent bg-accent-soft'
            else if (chosen) cls = 'border-danger bg-danger/10'
            else cls = 'border-border opacity-60'
          } else if (chosen) {
            cls = 'border-accent bg-accent-soft'
          }
          return (
            <button
              key={o.id}
              type="button"
              disabled={revealed}
              onClick={() => onToggle(o.id)}
              className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${cls}`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border text-xs font-semibold">
                {i + 1}
              </span>
              <span className="flex-1">{o.text}</span>
              {revealed && correct && <span className="text-xs font-semibold text-accent">✓</span>}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div className="mt-5 space-y-3 rounded-lg border border-border bg-surface-2 p-4">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Why</div>
            <p className="text-sm leading-relaxed">{q.explanation}</p>
          </div>
          {q.distractorRationale && (
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
                Why the others are wrong
              </div>
              <ul className="space-y-1 text-sm text-muted">
                {q.options
                  .filter((o) => q.distractorRationale?.[o.id])
                  .map((o) => (
                    <li key={o.id}>
                      <span className="font-medium text-fg">{o.text}:</span>{' '}
                      {q.distractorRationale?.[o.id]}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {q.lawRefs.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {q.lawRefs.map((r) => {
                const ref = lawRefsById.get(r)
                return <Chip key={r}>{ref ? `${ref.instrument} ${ref.citation}` : r}</Chip>
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
