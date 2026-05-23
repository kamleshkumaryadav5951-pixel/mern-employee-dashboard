import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      className="text-xs font-bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-2.5">
        {label && <p className="text-gray-500 text-xs mb-1">{label}</p>}
        {payload.map((entry, i) => (
          <p key={i} className="text-sm font-semibold" style={{ color: entry.color || entry.fill }}>
            {entry.name}: <span className="text-gray-900">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const TaskStatusPieChart = ({ data = [] }) => (
  <div className="card p-6">
    <h3 className="text-base font-semibold text-gray-800 mb-4">Task Status Distribution</h3>
    {data.every((d) => d.value === 0) ? (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No tasks yet</div>
    ) : (
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={90}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-gray-600 text-sm">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    )}
  </div>
);

export const DepartmentBarChart = ({ data = [] }) => (
  <div className="card p-6">
    <h3 className="text-base font-semibold text-gray-800 mb-4">Employees by Department</h3>
    {data.length === 0 ? (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No data yet</div>
    ) : (
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Bar dataKey="employees" fill="#6366f1" radius={[6, 6, 0, 0]} name="Employees" />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
);
