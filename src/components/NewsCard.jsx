import { ExternalLink } from 'lucide-react'
import { formatDateTime } from '../utils/dates'

function NewsCard({ article }) {
  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="aspect-[16/9] bg-slate-200 dark:bg-neutral-800">
        {article.image ? (
          <img src={article.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="grid h-full place-items-center text-sm text-slate-500 dark:text-slate-400">No image</div>
        )}
      </div>
      <div className="p-3">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <span className="rounded bg-cyan-50 px-2 py-1 font-medium text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">{article.source}</span>
          <time dateTime={article.date}>{formatDateTime(article.date)}</time>
        </div>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug">{article.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{article.description}</p>
        {article.url ? (
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cyan-700 hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-cyan-100"
          >
            Read article
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default NewsCard
