import { create } from 'zustand'

export type Theme = 'light' | 'dark' | 'system'

const KEY = 'cippe-theme'

const systemPrefersDark = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches

function applyTheme(theme: Theme): void {
  const dark = theme === 'dark' || (theme === 'system' && systemPrefersDark())
  document.documentElement.classList.toggle('dark', dark)
}

function readInitial(): Theme {
  try {
    const saved = localStorage.getItem(KEY) as Theme | null
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
  } catch {
    /* localStorage unavailable — fall through to default */
  }
  return 'system'
}

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useTheme = create<ThemeState>((set) => ({
  theme: readInitial(),
  setTheme: (theme) => {
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* ignore persistence failure */
    }
    applyTheme(theme)
    set({ theme })
  },
}))

// Keep the DOM class in sync on load and when the OS theme changes in "system".
if (typeof window !== 'undefined') {
  applyTheme(useTheme.getState().theme)
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (useTheme.getState().theme === 'system') applyTheme('system')
    })
}
