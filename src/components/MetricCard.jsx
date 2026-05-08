function MetricCard({ label, value, detail }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-950">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-950 dark:text-white">{value}</p>
      {detail ? <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{detail}</p> : null}
    </div>
  )
}

export default MetricCard
