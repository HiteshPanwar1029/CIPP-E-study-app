import { useCallback, useEffect, useState } from 'react'
import { useStore } from '../lib/store'
import { AIGOV_SECTIONS, AIGOV_QUESTION_COUNT, type AiGovSection } from '../data/aiGov'
import type { Question } from '../lib/types'
import { QuestionView } from '../session/QuestionView'
import { PageHeader, Card, Meter } from '../components/ui'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function AiGov() {
  const moduleStats = useStore((s) => s.moduleStats)
  const [selected, setSelected] = useState<AiGovSection | null>(null)
  const [quiz, setQuiz] = useState<Question[] | null>(null)

  if (selected && quiz) {
    return (
      <div className="mx-auto max-w-2xl">
        <SectionQuiz
          sectionId={selected.id}
          title={selected.title}
          questions={quiz}
          onExit={() => setQuiz(null)}
        />
      </div>
    )
  }

  if (selected) {
    const s = selected
    return (
      <div className="mx-auto max-w-2xl">
        <PageHeader kicker="AI & Governance" title={s.title}>
          <button onClick={() => setSelected(null)} className="text-xs text-muted hover:text-fg">
            ← All sections
          </button>
        </PageHeader>

        <Card className="mb-4">
          <p className="prose-legal text-[15px] leading-relaxed">{s.summary}</p>
        </Card>

        <Card className="mb-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Key points
          </div>
          <ul className="list-disc space-y-1 pl-4 text-sm">
            {s.keyPoints.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </Card>

        {s.caseStudies.length > 0 && (
          <Card className="mb-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Case files
            </div>
            <div className="space-y-4">
              {s.caseStudies.map((c, i) => (
                <div key={i} className={i > 0 ? 'border-t border-border pt-4' : ''}>
                  <div className="mb-1 text-sm font-semibold">{c.title}</div>
                  <p className="text-sm leading-relaxed text-muted">{c.facts}</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                      Lesson ·{' '}
                    </span>
                    {c.lesson}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <button
          onClick={() => setQuiz(shuffle(s.questions))}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
        >
          Quiz this section · {s.questions.length} →
        </button>
        <p className="mt-2 text-xs text-muted">
          Module quizzes track their own accuracy and stay out of your blueprint readiness stats.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader kicker="Module" title="AI & Governance" />
      <Card className="mb-6">
        <p className="text-sm leading-relaxed text-muted">
          A combined section on the EU AI Act, GDPR × AI, ethics frameworks, DPIA methodology and
          AI governance frameworks — {AIGOV_QUESTION_COUNT} questions across{' '}
          {AIGOV_SECTIONS.length} topics. Some of this reaches beyond the CIPP/E blueprint, so it is
          tracked separately and never skews your mock or readiness analytics.
        </p>
      </Card>
      <div className="space-y-3">
        {AIGOV_SECTIONS.map((s) => {
          const st = moduleStats[s.id]
          const pct = st && st.attempts > 0 ? Math.round((st.correct / st.attempts) * 100) : null
          return (
            <Card key={s.id}>
              <button
                onClick={() => setSelected(s)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="mt-0.5 text-xs text-muted">{s.tagline}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div
                    className={
                      'text-sm font-semibold tabular-nums ' +
                      (pct !== null && pct < 70 ? 'text-danger' : pct !== null ? 'text-accent' : 'text-muted')
                    }
                  >
                    {pct !== null ? `${pct}%` : '—'}
                  </div>
                  <div className="text-[10px] text-muted">
                    {st ? `${st.attempts} answered` : `${s.questions.length} questions`}
                  </div>
                </div>
              </button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function SectionQuiz({
  sectionId,
  title,
  questions,
  onExit,
}: {
  sectionId: string
  title: string
  questions: Question[]
  onExit: () => void
}) {
  const recordModuleAnswer = useStore((s) => s.recordModuleAnswer)

  const [i, setI] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  const item = questions[i]

  const toggle = useCallback(
    (optId: string) => {
      if (revealed) return
      setSelected([optId])
    },
    [revealed],
  )

  const check = useCallback(() => {
    if (!item || selected.length === 0 || revealed) return
    const ok = selected.length === item.correct.length && item.correct.every((c) => selected.includes(c))
    if (ok) setCorrectCount((c) => c + 1)
    void recordModuleAnswer(sectionId, ok)
    setRevealed(true)
  }, [item, selected, revealed, recordModuleAnswer, sectionId])

  const advance = useCallback(() => {
    if (i + 1 >= questions.length) setDone(true)
    else {
      setI(i + 1)
      setSelected([])
      setRevealed(false)
    }
  }, [i, questions.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done || !item) return
      if (!revealed) {
        if (/^[1-9]$/.test(e.key)) {
          const opt = item.options[parseInt(e.key, 10) - 1]
          if (opt) toggle(opt.id)
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          check()
        }
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, revealed, done, toggle, check, advance])

  if (done) {
    const pct = questions.length ? Math.round((correctCount / questions.length) * 100) : 0
    return (
      <div className="mx-auto max-w-md text-center">
        <div className="mb-2 text-4xl font-semibold tabular-nums">{pct}%</div>
        <p className="mb-1 text-sm text-muted">
          {correctCount} of {questions.length} correct — {title}
        </p>
        <p className="mb-6 text-xs text-muted">
          Section accuracy updated. Re-read the note for anything that surprised you.
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

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button onClick={onExit} className="text-xs text-muted hover:text-fg">
          ← End
        </button>
        <div className="flex-1">
          <Meter value={i / questions.length} />
        </div>
        <span className="text-xs tabular-nums text-muted">
          {i + 1}/{questions.length}
        </span>
      </div>

      <QuestionView q={item} selected={selected} revealed={revealed} onToggle={toggle} />

      <div className="mt-6">
        {!revealed ? (
          <button
            onClick={check}
            disabled={selected.length === 0}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg disabled:opacity-40"
          >
            Check answer <span className="opacity-70">(Space)</span>
          </button>
        ) : (
          <button
            onClick={advance}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
          >
            {i + 1 >= questions.length ? 'Finish' : 'Next'}{' '}
            <span className="opacity-70">(Space)</span>
          </button>
        )}
      </div>
    </div>
  )
}
