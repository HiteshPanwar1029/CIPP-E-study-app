import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { ThemeToggle } from './ui'
import { useStore } from '../lib/store'
import { dueCount } from '../lib/stats'

const NAV = [
  { to: '/', label: 'Dashboard', short: 'Home', end: true },
  { to: '/learn', label: 'Learn', short: 'Learn', end: false },
  { to: '/session', label: 'Session', short: 'Drill', end: false },
  { to: '/results', label: 'Results', short: 'Review', end: false },
  { to: '/reference', label: 'Reference', short: 'Refs', end: false },
  { to: '/settings', label: 'Settings', short: 'Settings', end: false },
]

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
          <main id="main" className="flex-1 px-5 pt-8 pb-24 sm:px-6 sm:pb-8">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile bottom navigation (thumb-reachable); hidden from ~640px up */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-border bg-surface sm:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              'flex flex-col items-center justify-center py-2 text-[10px] transition-colors ' +
              (isActive ? 'text-accent font-medium' : 'text-muted')
            }
          >
            <span className="relative leading-none">
              {n.short}
              {n.to === '/session' && due > 0 && (
                <span className="absolute -right-2 -top-1 h-1.5 w-1.5 rounded-full bg-accent" />
              )}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
