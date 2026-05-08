import { Activity, Moon, RefreshCw, Sun } from 'lucide-react'
import Chatbot from './components/Chatbot'
import ErrorState from './components/ErrorState'
import IssTracker from './components/IssTracker'
import NewsDashboard from './components/NewsDashboard'
import { useIssTracker } from './hooks/useIssTracker'
import { useNews } from './hooks/useNews'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()
  const iss = useIssTracker()
  const news = useNews()

  const isDark = theme === 'dark'

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 transition-colors dark:bg-neutral-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-lg bg-cyan-600 text-white shadow-sm">
              <Activity aria-hidden="true" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">ISS Operations Dashboard</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Live orbital telemetry, current space news, and a grounded data assistant.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-slate-200 dark:hover:bg-neutral-800"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:px-8">
        <section className="space-y-5">
          <IssTracker {...iss} />
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">System Status</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Telemetry and article feeds with retry controls.</p>
              </div>
              <RefreshCw size={18} className="text-slate-500" aria-hidden="true" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ErrorState
                label="ISS feed"
                isLoading={iss.isLoading}
                error={iss.error}
                onRetry={iss.refetch}
                healthyText={`${iss.positions.length} tracked positions`}
              />
              <ErrorState
                label="News feed"
                isLoading={news.isLoading}
                error={news.error}
                onRetry={news.refetch}
                healthyText={`${news.articles.length} cached articles`}
              />
            </div>
          </section>
        </section>

        <NewsDashboard {...news} />
      </main>

      <Chatbot issData={iss} newsData={news} />
    </div>
  )
}

export default App
