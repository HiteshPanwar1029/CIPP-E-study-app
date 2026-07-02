import { useEffect, useMemo, useState } from 'react'
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
        elapsedMs: 0,
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

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded bg-surface-2 px-2 py-1 text-xs font-medium tabular-nums">
          {mm}:{ss.toString().padStart(2, '0')}
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
          onClick={() => setI(Math.max(0, i - 1))}
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
            onClick={() => setI(i + 1)}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
