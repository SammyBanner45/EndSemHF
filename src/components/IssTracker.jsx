import { Loader2, MapPin, RotateCcw } from 'lucide-react'
import { formatTime } from '../utils/dates'
import IssMap from './IssMap'
import IssSpeedChart from './IssSpeedChart'
import MetricCard from './MetricCard'

function IssTracker({ positions, latest, speedChartData, isLoading, error, refetch }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-cyan-600" aria-hidden="true" />
            <h2 className="text-lg font-semibold">ISS Tracker</h2>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Refreshes every 15 seconds and keeps the last 15 visible positions.</p>
        </div>
        <button
          type="button"
          onClick={refetch}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-slate-200 dark:hover:bg-neutral-800"
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} aria-hidden="true" /> : <RotateCcw size={16} aria-hidden="true" />}
          Refresh
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard label="Latitude" value={latest ? latest.latitude.toFixed(4) : '--'} detail={`Updated ${formatTime(latest?.timestamp)}`} />
        <MetricCard label="Longitude" value={latest ? latest.longitude.toFixed(4) : '--'} detail={`${positions.length} positions visible`} />
        <MetricCard label="Speed" value={latest ? `${Math.round(latest.speed).toLocaleString()} km/h` : '--'} detail="Calculated with Haversine distance" />
      </div>

      {error ? (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-100">
          {error}
        </div>
      ) : null}

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
        <IssMap positions={positions} latest={latest} />
        <IssSpeedChart data={speedChartData} />
      </div>
    </section>
  )
}

export default IssTracker
