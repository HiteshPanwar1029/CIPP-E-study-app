import { useCallback, useEffect, useState } from 'react'
import type { ConfusionPair, PairStat } from '../lib/types'
import { useStore } from '../lib/store'
import { Meter } from '../components/ui'

export interface PairPrompt {
  pairId: string
  a: string
  b: string
  contrast: string
  prompt: string
  answer: 'a' | 'b'
  note?: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const toPrompts = (p: ConfusionPair): PairPrompt[] =>
  p.items.map((it) => ({
    pairId: p.id,
    a: p.a,
    b: p.b,
    contrast: p.contrast,
    prompt: it.prompt,
    answer: it.answer,
    note: it.note,
  }))

/** All prompts of one pair, shuffled. */
export const pairRound = (p: ConfusionPair): PairPrompt[] => shuffle(toPrompts(p))

/**
 * A mixed round across all pairs, biased toward the pairs with the lowest
 * lifetime accuracy (unattempted pairs sort first).
 */
export function mixedRound(
  pairs: ConfusionPair[],
  stats: Record<string, PairStat>,
  size = 12,
): PairPrompt[] {
  const acc = (id: string): number => {
    const s = stats[id]
    return s && s.attempts > 0 ? s.correct / s.attempts : -1
  }
  const ordered = [...pairs].sort((x, y) => acc(x.id) - acc(y.id))
  const pools = ordered.map((p) => shuffle(toPrompts(p)))
  const out: PairPrompt[] = []
  let round = 0
  while (out.length < size && pools.some((p) => p.length > round)) {
    for (const pool of pools) {
      if (out.length >= size) break
      if (pool[round]) out.push(pool[round])
    }
    round += 1
  }
  return shuffle(out)
}

export function PairRunner({
  queue,
  title,
  onExit,
}: {
  queue: PairPrompt[]
  title: string
  onExit: () => void
}) {
  const recordPairAnswer = useStore((s) => s.recordPairAnswer)

  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<'a' | 'b' | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  const item = queue[i]

  const pick = useCallback(
    (side: 'a' | 'b') => {
      if (!item || picked) return
      setPicked(side)
      const ok = side === item.answer
      if (ok) setCorrectCount((c) => c + 1)
      void recordPairAnswer(item.pairId, ok)
    },
    [item, picked, recordPairAnswer],
  )

  const advance = useCallback(() => {
    if (i + 1 >= queue.length) setDone(true)
    else {
      setI(i + 1)
      setPicked(null)
    }
  }, [i, queue.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done || !item) return
      if (!picked) {
        if (e.key === '1' || e.key.toLowerCase() === 'a') pick('a')
        else if (e.key === '2' || e.key.toLowerCase() === 'b') pick('b')
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, picked, done, pick, advance])

  if (done) {
    const pct = queue.length ? Math.round((correctCount / queue.length) * 100) : 0
    return (
      <div className="mx-auto max-w-md text-center">
        <div className="mb-2 text-4xl font-semibold tabular-nums">{pct}%</div>
        <p className="mb-1 text-sm text-muted">
          {correctCount} of {queue.length} discriminations correct
        </p>
        <p className="mb-6 text-xs text-muted">
          Pair accuracy is tracked — weak pairs come up more often in mixed rounds.
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
  if (!item) return null

  const wasCorrect = picked === item.answer

  const optionCls = (side: 'a' | 'b'): string => {
    const base =
      'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors text-left '
    if (!picked) return base + 'border-border bg-surface hover:border-accent'
    if (side === item.answer) return base + 'border-accent bg-accent-soft text-accent'
    if (side === picked) return base + 'border-danger text-danger'
    return base + 'border-border opacity-50'
  }

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
      </div>

      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">{title}</div>
      <p className="mb-5 text-base leading-relaxed">{item.prompt}</p>

      <div className="flex gap-3">
        <button onClick={() => pick('a')} className={optionCls('a')}>
          {item.a} {!picked && <span className="text-xs text-muted">1</span>}
        </button>
        <button onClick={() => pick('b')} className={optionCls('b')}>
          {item.b} {!picked && <span className="text-xs text-muted">2</span>}
        </button>
      </div>

      {picked && (
        <div className="mt-5">
          <p className="text-sm">
            <span className={wasCorrect ? 'text-accent' : 'text-danger'}>
              {wasCorrect ? 'Right.' : 'Not this one.'}
            </span>{' '}
            <span className="text-muted">{item.note ?? item.contrast}</span>
          </p>
          <button
            onClick={advance}
            className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
          >
            Next <span className="opacity-70">(Space)</span>
          </button>
        </div>
      )}
    </div>
  )
}
