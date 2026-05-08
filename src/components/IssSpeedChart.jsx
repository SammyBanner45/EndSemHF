import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { useElementSize } from '../hooks/useElementSize'

function IssSpeedChart({ data }) {
  const [chartRef, chartSize] = useElementSize()
  const hasData = data.length > 1
  const canRenderChart = hasData && chartSize.width > 0

  return (
    <div className="min-h-64 min-w-0 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-3">
        <h3 className="text-sm font-semibold">ISS Speed Trend</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">Last 30 calculated values</p>
      </div>
      <div ref={chartRef} className="h-48 min-w-0">
        {canRenderChart ? (
            <LineChart data={data} width={chartSize.width} height={192}>
              <XAxis dataKey="time" tick={{ fontSize: 11 }} minTickGap={24} />
              <YAxis tick={{ fontSize: 11 }} width={56} />
              <Tooltip
                formatter={(value) => [`${Number(value).toLocaleString()} km/h`, 'Speed']}
                contentStyle={{ borderRadius: 8, borderColor: '#cbd5e1' }}
              />
              <Line type="monotone" dataKey="speed" stroke="#0891b2" strokeWidth={2.5} dot={false} />
            </LineChart>
        ) : (
          <div className="grid h-full place-items-center rounded-md border border-dashed border-slate-300 text-sm text-slate-500 dark:border-neutral-700 dark:text-slate-400">
            Waiting for another ISS position to calculate speed.
          </div>
        )}
      </div>
    </div>
  )
}

export default IssSpeedChart
