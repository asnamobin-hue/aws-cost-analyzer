// MonthlyChart.jsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function MonthlyChart({ monthlyTrend }) {
  const chartData = monthlyTrend.map((item) => ({
    month: new Date(item.month).toLocaleDateString("en-US", {
      month: "short",
    }),
    amount: Number(item.amount),
  }));

  return (
    <div className="chart-card">
      <h3>Monthly AWS Cost</h3>

      <ResponsiveContainer width="100%" height={145}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="var(--border)" />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "var(--text-muted)" }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "var(--text-muted)" }}
            tickFormatter={(value) => `$${value}`}
          />

          <Tooltip
            formatter={(value) => [`$${Number(value).toFixed(2)}`, "Cost"]}
            contentStyle={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              borderRadius: 8,
            }}
            cursor={{ fill: "var(--track-bg)", opacity: 0.4 }}
          />

          <Bar
            dataKey="amount"
            fill="var(--chart-1)"
            radius={[4, 4, 0, 0]}
            barSize={40}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;