import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { ThemeToggle } from './ui'
import { useStore } from '../lib/store'
import { dueCount } from '../lib/stats'

const NAV = [
  { to: '/', label: 'Dashboard', short: 'Home', icon: 'home', end: true },
  { to: '/learn', label: 'Learn', short: 'Learn', icon: 'learn', end: false },
  { to: '/session', label: 'Session', short: 'Drill', icon: 'drill', end: false },
  { to: '/results', label: 'Results', short: 'Review', icon: 'review', end: false },
  { to: '/reference', label: 'Reference', short: 'Refs', icon: 'refs', end: false },
  { to: '/settings', label: 'Settings', short: 'Settings', icon: 'settings', end: false },
]

const ICON = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

function NavIcon({ name }: { name: string }) {
  switch (name) {
    case 'home':
      return (
        <svg {...ICON}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v9h14v-9" />
        </svg>
      )
    case 'learn':
      return (
        <svg {...ICON}>
          <path d="M12 4 2 9l10 5 10-5-10-5Z" />
          <path d="M6 11.5V16c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-4.5" />
        </svg>
      )
    case 'drill':
      return (
        <svg {...ICON}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M10 8.5l5.5 3.5L10 15.5v-7Z" />
        </svg>
      )
    case 'review':
      return (
        <svg {...ICON}>
          <path d="M4.5 4.5v15h15" />
          <path d="M8 15v-2.5M12 15V9M16 15v-4.5" />
        </svg>
      )
    case 'refs':
      return (
        <svg {...ICON}>
          <path d="M6 4h11a1.5 1.5 0 0 1 1.5 1.5V20H7.5A1.5 1.5 0 0 1 6 18.5V4Z" />
          <path d="M9.5 8.5h5.5M9.5 12h5.5" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...ICON}>
          <path d="M4 8h8M16 8h4M4 16h4M12 16h8" />
          <circle cx="14" cy="8" r="2.3" />
          <circle cx="8" cy="16" r="2.3" />
        </svg>
      )
    default:
      return null
  }
}

export function Layout() {
  const init = useStore((s) => s.init)
  const srs = useStore((s) => s.srs)
  useEffect(() => {
    void init()
  }, [init])
  const due = dueCount(Object.values(srs))

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-screen max-w-6xl">
        {/* Desktop / tablet sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-border px-4 py-6 sm:block">
          <div className="mb-8 px-2">
            <div className="text-sm font-semibold tracking-tight">CIPP/E Prep</div>
            <div className="text-xs text-muted">Blueprint-aligned trainer</div>
          </div>
          <nav className="flex flex-col gap-1" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  'flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ' +
                  (isActive
                    ? 'bg-accent-soft text-accent font-medium'
                    : 'text-muted hover:bg-surface-2 hover:text-fg')
                }
              >
                {n.label}
                {n.to === '/session' && due > 0 && (
                  <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-fg">
                    {due}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div className="text-xs text-muted">
              <span className="font-semibold text-fg sm:hidden">CIPP/E Prep · </span>
              Local-first · no login · your data stays on this device
            </div>
            <ThemeToggle />
          </header>
          {/* extra bottom padding on mobile so the fixed bar never covers content */}
          <main id="main" className="flex-1 px-5 pt-8 pb-28 sm:px-6 sm:pb-8">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile bottom navigation — taller, icon + label, thumb-reachable */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-border bg-surface shadow-[0_-1px_8px_rgba(0,0,0,0.06)] sm:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              'flex min-h-[58px] flex-col items-center justify-center gap-1 py-2 text-xs transition-colors ' +
              (isActive ? 'text-accent font-medium' : 'text-muted')
            }
          >
            <span className="relative">
              <NavIcon name={n.icon} />
              {n.to === '/session' && due > 0 && (
                <span className="absolute -right-1.5 -top-1 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface" />
              )}
            </span>
            <span className="leading-none">{n.short}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
