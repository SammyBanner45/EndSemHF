import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function IssSpeedChart({ data }) {
  return (
    <div className="h-64 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-3">
        <h3 className="text-sm font-semibold">ISS Speed Trend</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">Last 30 calculated values</p>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fontSize: 11 }} minTickGap={24} />
          <YAxis tick={{ fontSize: 11 }} width={56} />
          <Tooltip
            formatter={(value) => [`${Number(value).toLocaleString()} km/h`, 'Speed']}
            contentStyle={{ borderRadius: 8, borderColor: '#cbd5e1' }}
          />
          <Line type="monotone" dataKey="speed" stroke="#0891b2" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default IssSpeedChart
