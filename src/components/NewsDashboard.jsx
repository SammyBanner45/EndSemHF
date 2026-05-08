import { Loader2, Newspaper, RotateCcw, Search } from 'lucide-react'
import NewsCard from './NewsCard'
import NewsDistributionChart from './NewsDistributionChart'

function NewsDashboard({
  filteredArticles,
  distribution,
  query,
  setQuery,
  sortBy,
  setSortBy,
  isLoading,
  error,
  refetch,
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Newspaper size={20} className="text-cyan-600" aria-hidden="true" />
              <h2 className="text-lg font-semibold">News Dashboard</h2>
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Ten space-focused articles cached for 15 minutes.</p>
          </div>
          <button
            type="button"
            onClick={refetch}
            className="grid size-9 place-items-center rounded-md border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-slate-200 dark:hover:bg-neutral-800"
            aria-label="Retry news fetch"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} aria-hidden="true" /> : <RotateCcw size={16} aria-hidden="true" />}
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px]">
          <label className="relative block">
            <span className="sr-only">Search articles</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search news"
              className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            />
          </label>
          <label>
            <span className="sr-only">Sort articles</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            >
              <option value="date-desc">Newest</option>
              <option value="date-asc">Oldest</option>
              <option value="source">Source</option>
            </select>
          </label>
        </div>
      </div>

      <NewsDistributionChart data={distribution} />

      {error ? (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-100">
          {error}
        </div>
      ) : null}

      <div className="mt-4 grid gap-3">
        {isLoading && !filteredArticles.length ? (
          <div className="grid min-h-48 place-items-center rounded-md border border-dashed border-slate-300 text-sm text-slate-500 dark:border-neutral-700 dark:text-slate-400">
            <Loader2 className="mb-2 animate-spin" size={20} aria-hidden="true" />
            Loading articles...
          </div>
        ) : null}

        {!isLoading && !filteredArticles.length ? (
          <div className="grid min-h-48 place-items-center rounded-md border border-dashed border-slate-300 text-sm text-slate-500 dark:border-neutral-700 dark:text-slate-400">
            No articles match the current filter.
          </div>
        ) : null}

        {filteredArticles.map((article) => (
          <NewsCard key={`${article.source}-${article.title}`} article={article} />
        ))}
      </div>
    </section>
  )
}

export default NewsDashboard
