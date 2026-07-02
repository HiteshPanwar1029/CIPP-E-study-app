import { useCallback, useEffect, useRef, useState } from 'react'
import type { StudyItem, Grade } from '../lib/types'
import { useStore } from '../lib/store'
import { sameSet } from '../lib/mock'
import { QuestionView } from './QuestionView'
import { CardView } from './CardView'
import { Meter } from '../components/ui'

const GRADES: { g: Grade; label: string; key: string }[] = [
  { g: 'again', label: 'Again', key: '1' },
  { g: 'hard', label: 'Hard', key: '2' },
  { g: 'good', label: 'Good', key: '3' },
  { g: 'easy', label: 'Easy', key: '4' },
]

export function DrillRunner({ queue, onExit }: { queue: StudyItem[]; onExit: () => void }) {
  const gradeItem = useStore((s) => s.gradeItem)
  const setFlag = useStore((s) => s.setFlag)
  const meta = useStore((s) => s.meta)

  const [i, setI] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const startRef = useRef(Date.now())

  const item = queue[i]

  const advance = useCallback(() => {
    if (i + 1 >= queue.length) {
      setDone(true)
    } else {
      setI(i + 1)
      setSelected([])
      setRevealed(false)
      startRef.current = Date.now()
    }
  }, [i, queue.length])

  const reveal = useCallback(() => {
    if (!item) return
    if (item.kind === 'question' && selected.length === 0) return
    setRevealed(true)
  }, [item, selected])

  const grade = useCallback(
    async (g: Grade) => {
      if (!item) return
      const correct = item.kind === 'question' ? sameSet(selected, item.correct) : g !== 'again'
      if (correct) setCorrectCount((c) => c + 1)
      await gradeItem({
        itemId: item.id,
        grade: g,
        correct,
        confidence: g,
        mode: 'drill',
        elapsedMs: Date.now() - startRef.current,
      })
      advance()
    },
    [item, selected, gradeItem, advance],
  )

  const toggle = useCallback(
    (optId: string) => {
      if (!item || item.kind !== 'question' || revealed) return
      if (item.type === 'multiple') {
        setSelected((s) => (s.includes(optId) ? s.filter((x) => x !== optId) : [...s, optId]))
      } else {
        setSelected([optId])
      }
    },
    [item, revealed],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done || !item) return
      if (e.key.toLowerCase() === 'f') {
        setFlag(item.id, !meta[item.id]?.flagged)
        return
      }
      if (!revealed) {
        if (item.kind === 'question' && /^[1-9]$/.test(e.key)) {
          const opt = item.options[parseInt(e.key, 10) - 1]
          if (opt) toggle(opt.id)
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          reveal()
        }
      } else {
        const g = GRADES.find((x) => x.key === e.key)
        if (g) grade(g.g)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, revealed, done, toggle, reveal, grade, setFlag, meta])

  if (done) return <Summary total={queue.length} correct={correctCount} onExit={onExit} />
  if (!item) return null
  const flagged = meta[item.id]?.flagged

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button onClick={onExit} className="text-xs text-muted hover:text-fg">
          ← End
        </button>
        <div className="flex-1">
          <Meter value={i / queue.length} />
        </div>
        <span className="text-xs tabular-nums text-muted">
          {i + 1}/{queue.length}
        </span>
        <button
          onClick={() => setFlag(item.id, !flagged)}
          title="Flag (F)"
          className={`text-sm ${flagged ? 'text-danger' : 'text-muted hover:text-fg'}`}
        >
          ⚑
        </button>
      </div>

      {item.kind === 'question' ? (
        <QuestionView q={item} selected={selected} revealed={revealed} onToggle={toggle} />
      ) : (
        <CardView card={item} revealed={revealed} />
      )}

      <div className="mt-6">
        {!revealed ? (
          <button
            onClick={reveal}
            disabled={item.kind === 'question' && selected.length === 0}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg disabled:opacity-40"
          >
            {item.kind === 'question' ? 'Check answer' : 'Reveal'}{' '}
            <span className="opacity-70">(Space)</span>
          </button>
        ) : (
          <div>
            <div className="mb-2 text-xs text-muted">How well did you know it?</div>
            <div className="flex gap-2">
              {GRADES.map((x) => (
                <button
                  key={x.g}
                  onClick={() => grade(x.g)}
                  className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm hover:border-accent"
                >
                  {x.label} <span className="text-xs text-muted">{x.key}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Summary({
  total,
  correct,
  onExit,
}: {
  total: number
  correct: number
  onExit: () => void
}) {
  const pct = total ? Math.round((correct / total) * 100) : 0
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mb-2 text-4xl font-semibold tabular-nums">{pct}%</div>
      <p className="mb-1 text-sm text-muted">
        {correct} of {total} correct this session
      </p>
      <p className="mb-6 text-xs text-muted">
        Your grades were fed into the spaced-repetition schedule.
      </p>
      <button
        onClick={onExit}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
      >
        Done
      </button>
    </div>
  )
}
