import { useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import { useStore } from '../lib/store'
import { exportAll, importAll, type ExportBundle } from '../lib/db'
import { PageHeader, Card, ThemeToggle } from '../components/ui'

function Row({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted">{desc}</div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export function Settings() {
  const settings = useStore((s) => s.settings)
  const updateSettings = useStore((s) => s.updateSettings)
  const resetAll = useStore((s) => s.resetAll)
  const [msg, setMsg] = useState('')

  const doExport = async () => {
    const data: ExportBundle = await exportAll()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cippe-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    try {
      await importAll(JSON.parse(await f.text()) as ExportBundle)
      await useStore.getState().init()
      setMsg('Import complete.')
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Import failed.')
    }
    e.target.value = ''
  }

  const doReset = async () => {
    if (window.confirm('Erase all study progress (reviews, schedule, mocks, flags)? This cannot be undone.')) {
      await resetAll()
      setMsg('Progress reset.')
    }
  }

  const retentionPct = Math.round(settings.targetRetention * 100)

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <PageHeader kicker="Settings" title="Settings" />

      <Card>
        <Row title="Appearance" desc="Light, dark, or match your system.">
          <ThemeToggle />
        </Row>
      </Card>

      <Card>
        <Row
          title="Target retention"
          desc="FSRS schedules each review for this predicted recall. Lower it (~85%) in the final week to widen intervals."
        >
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={80}
              max={95}
              step={1}
              value={retentionPct}
              onChange={(e) => updateSettings({ targetRetention: Number(e.target.value) / 100 })}
              aria-label="Target retention"
            />
            <span className="w-9 text-right text-sm tabular-nums">{retentionPct}%</span>
          </div>
        </Row>
      </Card>

      <Card>
        <Row title="Export data" desc="Download a one-file JSON backup of all progress and notes.">
          <button
            onClick={doExport}
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-accent"
          >
            Export
          </button>
        </Row>
        <hr className="my-1 border-border" />
        <Row title="Import data" desc="Restore from a backup file. Replaces current progress.">
          <label className="cursor-pointer rounded-lg border border-border px-3 py-1.5 text-sm hover:border-accent">
            Import
            <input type="file" accept="application/json" className="hidden" onChange={onFile} />
          </label>
        </Row>
        <hr className="my-1 border-border" />
        <Row title="Reset progress" desc="Clear reviews, schedule, mocks and flags. Content stays.">
          <button
            onClick={doReset}
            className="rounded-lg border border-danger px-3 py-1.5 text-sm text-danger hover:bg-danger/10"
          >
            Reset
          </button>
        </Row>
        {msg && <p className="mt-2 text-xs text-accent">{msg}</p>}
      </Card>

      <p className="px-1 text-xs text-muted">
        Local-first: no account, no server. Your study data lives only in this browser until you
        export it.
      </p>
    </div>
  )
}
