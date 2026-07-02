import type { Flashcard } from '../lib/types'
import { lawRefsById } from '../data'
import { Chip } from '../components/ui'

export function CardView({ card, revealed }: { card: Flashcard; revealed: boolean }) {
  return (
    <div>
      <div className="mb-3 text-xs text-muted">
        <span className="font-semibold text-accent">{card.competency}</span> · flashcard
      </div>
      <p className="mb-6 text-lg leading-relaxed">{card.front}</p>
      {revealed ? (
        <div className="rounded-lg border border-border bg-surface-2 p-4">
          <p className="text-sm leading-relaxed">{card.back}</p>
          {card.lawRefs && card.lawRefs.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {card.lawRefs.map((r) => {
                const ref = lawRefsById.get(r)
                return <Chip key={r}>{ref ? `${ref.instrument} ${ref.citation}` : r}</Chip>
              })}
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-muted">Press Space to reveal the answer.</p>
      )}
    </div>
  )
}
