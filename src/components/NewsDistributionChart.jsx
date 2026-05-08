import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { useElementSize } from '../hooks/useElementSize'

const COLORS = ['#0891b2', '#16a34a', '#f59e0b', '#e11d48', '#7c3aed', '#2563eb', '#0f766e', '#db2777']

function NewsDistributionChart({ data }) {
  const [chartRef, chartSize] = useElementSize()
  const canRenderChart = data.length > 0 && chartSize.width > 0

  return (
    <div className="min-h-56 min-w-0 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-2">
        <h3 className="text-sm font-semibold">News Distribution</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">Article count by source</p>
      </div>
      <div ref={chartRef} className="h-40 min-w-0">
        {canRenderChart ? (
            <PieChart width={chartSize.width} height={160}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={70}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} article${value === 1 ? '' : 's'}`, name]} />
            </PieChart>
        ) : (
          <div className="grid h-full place-items-center rounded-md border border-dashed border-slate-300 text-sm text-slate-500 dark:border-neutral-700 dark:text-slate-400">
            No article sources loaded yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsDistributionChart
