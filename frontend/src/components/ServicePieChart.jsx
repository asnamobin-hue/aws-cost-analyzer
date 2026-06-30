// ServicePieChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

function ServicePieChart({ services }) {
  const sourceData = services.map((item) => ({
    service: item.service,
    amount: Number(item.amount),
  }));

  const sorted = [...sourceData].sort((a, b) => b.amount - a.amount);

  let displayData = sorted;

  if (sorted.length > 5) {
    const topFive = sorted.slice(0, 5);
    const others = sorted.slice(5).reduce((sum, item) => sum + item.amount, 0);
    displayData = [...topFive, { service: "Others", amount: others }];
  }

  return (
    <div className="pie-card">
      <h3>Service Breakdown</h3>

      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={displayData}
            dataKey="amount"
            nameKey="service"
            cx="50%"
            cy="42%"
            outerRadius={50}
            isAnimationActive={false}
            label={false}
          >
            {displayData.map((item, index) => (
              <Cell key={item.service} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [`$${Number(value).toFixed(2)}`, "Cost"]}
            contentStyle={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              borderRadius: 8,
            }}
          />

          <Legend
            iconType="circle"
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: 11, paddingTop: 10, color: "var(--text-primary)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ServicePieChart;