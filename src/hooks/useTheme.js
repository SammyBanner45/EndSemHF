import { useEffect, useState } from 'react'
import { readLocalStorage, writeLocalStorage } from '../utils/storage'

const THEME_KEY = 'iss-dashboard-theme'

function getInitialTheme() {
  const stored = readLocalStorage(THEME_KEY, null)
  if (stored) return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    writeLocalStorage(THEME_KEY, theme)
  }, [theme])

  return {
    theme,
    toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  }
}
