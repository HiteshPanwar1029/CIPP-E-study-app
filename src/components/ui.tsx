import type { ReactNode } from 'react'
import { useTheme, type Theme } from '../lib/theme'
import { useStore } from '../lib/store'
import { TRACKS, TRACK_IDS } from '../lib/tracks'

export function PageHeader({
  title,
  kicker,
  children,
}: {
  title: string
  kicker?: string
  children?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {kicker && (
          <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">
            {kicker}
          </div>
        )}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      </div>
      {children}
    </div>
  )
}

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-xl border border-border bg-surface p-5 ${className}`}>
      {children}
    </section>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="cite">{children}</span>
}

export function Meter({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value * 100))
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return <p className="max-w-prose text-sm leading-relaxed text-muted">{children}</p>
}

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

export function ThemeToggle() {
  const theme = useTheme((s) => s.theme)
  const setTheme = useTheme((s) => s.setTheme)
  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="inline-flex rounded-lg border border-border bg-surface p-0.5 text-xs"
    >
      {THEME_OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={theme === o.value}
          onClick={() => setTheme(o.value)}
          className={
            'rounded-md px-2.5 py-1 transition-colors ' +
            (theme === o.value
              ? 'bg-accent-soft text-accent font-medium'
              : 'text-muted hover:text-fg')
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/**
 * Certification-track picker. Switching swaps the entire content set,
 * blueprint and analytics scope — see src/lib/tracks.ts.
 */
export function TrackSwitcher({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  const track = useStore((s) => s.track)
  const setTrack = useStore((s) => s.setTrack)
  const big = size === 'lg'
  return (
    <div
      role="radiogroup"
      aria-label="Certification track"
      className={
        'inline-flex rounded-xl border border-border bg-surface p-1 ' + (big ? 'text-sm' : 'text-xs')
      }
    >
      {TRACK_IDS.map((id) => {
        const t = TRACKS[id]
        const active = track === id
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => void setTrack(id)}
            title={t.tagline}
            className={
              'rounded-lg transition-colors ' +
              (big ? 'px-4 py-2 ' : 'px-2.5 py-1 ') +
              (active
                ? 'bg-accent text-accent-fg font-semibold'
                : 'text-muted hover:bg-surface-2 hover:text-fg')
            }
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
