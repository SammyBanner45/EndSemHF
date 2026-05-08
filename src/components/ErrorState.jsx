import { AlertCircle, CheckCircle2, Loader2, RotateCcw } from 'lucide-react'

function ErrorState({ label, isLoading, error, onRetry, healthyText }) {
  if (isLoading) {
    return (
      <div className="flex min-h-24 items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-950">
        <Loader2 className="animate-spin text-cyan-600" size={20} aria-hidden="true" />
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Loading latest data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-24 items-center justify-between gap-3 rounded-md border border-rose-200 bg-rose-50 p-3 text-rose-950 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-100">
        <div className="flex items-center gap-3">
          <AlertCircle size={20} aria-hidden="true" />
          <div>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-sm opacity-85">{error}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="grid size-9 shrink-0 place-items-center rounded-md border border-rose-300 bg-white/75 text-rose-700 transition hover:bg-white dark:border-rose-800 dark:bg-rose-950 dark:text-rose-100"
          aria-label={`Retry ${label}`}
        >
          <RotateCcw size={16} aria-hidden="true" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-24 items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-emerald-950 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-100">
      <CheckCircle2 size={20} aria-hidden="true" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm opacity-85">{healthyText}</p>
      </div>
    </div>
  )
}

export default ErrorState
