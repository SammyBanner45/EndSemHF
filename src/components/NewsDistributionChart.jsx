import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#0891b2', '#16a34a', '#f59e0b', '#e11d48', '#7c3aed', '#2563eb', '#0f766e', '#db2777']

function NewsDistributionChart({ data }) {
  return (
    <div className="h-56 rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-2">
        <h3 className="text-sm font-semibold">News Distribution</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">Article count by source</p>
      </div>
      <ResponsiveContainer width="100%" height="78%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={44} outerRadius={72} paddingAngle={2}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} article${value === 1 ? '' : 's'}`, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default NewsDistributionChart
