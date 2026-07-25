import { useEffect, useMemo, useRef, useState } from 'react'
import type { MockForm, Question, StudyItem } from '../lib/types'
import type { DomainId } from '../lib/blueprint'
import { useStore } from '../lib/store'
import { buildMockForm, scoreMock, sameSet, FORM_MINUTES } from '../lib/mock'
import { QuestionView } from './QuestionView'
import { Meter } from '../components/ui'

type QItem = Extract<StudyItem, { kind: 'question' }>
const isQuestion = (it: StudyItem | undefined): it is QItem => !!it && it.kind === 'question'

export function MockRunner({
  form,
  focusDomain,
  onFinish,
}: {
  form: MockForm
  focusDomain?: DomainId
  onFinish: (mockId: number) => void
}) {
  const items = useStore((s) => s.items)
  const byId = useStore((s) => s.byId)
  const saveMock = useStore((s) => s.saveMock)
  const gradeItem = useStore((s) => s.gradeItem)

  const questionIds = useMemo(() => {
    const questions = items.filter(isQuestion) as Question[]
    return buildMockForm(questions, form, focusDomain)
  }, [items, form, focusDomain])

  const startedAt = useMemo(() => new Date().toISOString(), [])
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [remaining, setRemaining] = useState(FORM_MINUTES[form] * 60)
  const [submitting, setSubmitting] = useState(false)

  // Per-question time, accumulated across visits (prev/next revisits included).
  const timingsRef = useRef<Record<string, number>>({})
  const qStartRef = useRef(Date.now())
  const stamp = () => {
    const id = questionIds[i]
    if (id) {
      timingsRef.current[id] = (timingsRef.current[id] ?? 0) + (Date.now() - qStartRef.current)
    }
    qStartRef.current = Date.now()
  }
  const goTo = (n: number) => {
    stamp()
    setI(n)
  }

  useEffect(() => {
    const t = setInterval(() => setRemaining((r) => (r <= 1 ? 0 : r - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  const getQ = (id: string): Question | undefined => {
    const it = byId[id]
    return isQuestion(it) ? it : undefined
  }

  const submit = async () => {
    if (submitting) return
    setSubmitting(true)
    stamp()
    const timings = { ...timingsRef.current }
    const score = scoreMock(questionIds, answers, getQ)
    const durationMs = FORM_MINUTES[form] * 60000 - remaining * 1000
    const mockId = await saveMock({
      startedAt,
      finishedAt: new Date().toISOString(),
      durationMs,
      form,
      focusDomain,
      questionIds,
      answers,
      timings,
      scoreByDomain: score.scoreByDomain,
      scoreByBloom: score.scoreByBloom,
      overall: score.overall,
      readinessEstimate: score.readinessEstimate,
    })
    for (const id of questionIds) {
      const q = getQ(id)
      if (!q) continue
      const ok = sameSet(answers[id] ?? [], q.correct)
      await gradeItem({
        itemId: id,
        grade: ok ? 'good' : 'again',
        correct: ok,
        confidence: ok ? 'good' : 'again',
        mode: 'mock',
        elapsedMs: Math.round(timings[id] ?? 0),
      })
    }
    onFinish(mockId)
  }

  useEffect(() => {
    if (remaining === 0 && !submitting) void submit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining])

  const qid = questionIds[i]
  const q = qid ? getQ(qid) : undefined
  if (!q) return <div className="text-sm text-muted">No questions available for this form yet.</div>

  const toggle = (optId: string) => {
    setAnswers((a) => {
      const cur = a[qid] ?? []
      if (q.type === 'multiple') {
        return { ...a, [qid]: cur.includes(optId) ? cur.filter((x) => x !== optId) : [...cur, optId] }
      }
      return { ...a, [qid]: [optId] }
    })
  }

  const mm = Math.floor(remaining / 60)
  const ss = remaining % 60
  const answeredCount = Object.values(answers).filter((v) => v.length > 0).length
  const last = i + 1 >= questionIds.length

  // Pacing: compare answered count to where you'd be at an even per-item budget.
  const totalSec = FORM_MINUTES[form] * 60
  const budgetSec = totalSec / questionIds.length
  const paceDelta = answeredCount - (totalSec - remaining) / budgetSec
  const paceLabel =
    paceDelta <= -1.5
      ? `≈${Math.round(-paceDelta)} behind`
      : paceDelta >= 1.5
        ? `≈${Math.round(paceDelta)} ahead`
        : 'on pace'

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded bg-surface-2 px-2 py-1 text-xs font-medium tabular-nums">
          {mm}:{ss.toString().padStart(2, '0')}
        </span>
        <span
          title={`Even pace budget: ~${Math.round(budgetSec)}s per question`}
          className={
            'rounded px-2 py-1 text-xs font-medium ' +
            (paceDelta <= -1.5 ? 'bg-danger/10 text-danger' : 'bg-surface-2 text-muted')
          }
        >
          {paceLabel}
        </span>
        <div className="flex-1">
          <Meter value={(i + 1) / questionIds.length} />
        </div>
        <span className="text-xs tabular-nums text-muted">
          {i + 1}/{questionIds.length}
        </span>
      </div>

      <QuestionView q={q} selected={answers[qid] ?? []} revealed={false} onToggle={toggle} />

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => goTo(Math.max(0, i - 1))}
          disabled={i === 0}
          className="rounded-lg border border-border px-3 py-2 text-sm disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-xs text-muted">{answeredCount} answered</span>
        {last ? (
          <button
            onClick={submit}
            disabled={submitting}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => goTo(i + 1)}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
