function BudgetProgress({ budget }) {
  const hasRealData =
    budget &&
    Number(budget.budget) > 0 &&
    Number(budget.spent) >= 0;

  const data = hasRealData
    ? {
        budget: Number(budget.budget),
        spent: Number(budget.spent),
        remaining: Number(budget.remaining),
        forecast: Number(budget.forecast),
        status: budget.status,
        unit: budget.unit,
      }
    : {
        budget: 15,
        spent: 9.5,
        remaining: 5.5,
        forecast: 10.2,
        status: "Healthy",
        unit: "USD",
      };

  const percentage = Math.min(
    (data.spent / data.budget) * 100,
    100
  );

  const getColor = () => {
    const status = data.status.toLowerCase();

    if (
      status.includes("healthy") ||
      status.includes("good") ||
      status.includes("within")
    ) {
      return "#16a34a";
    }

    if (status.includes("warning")) {
      return "#f59e0b";
    }

    return "#dc2626";
  };

  const color = getColor();

  return (
    <div className="budget-card">
      <h3>Budget Overview</h3>

      <div className="budget-grid">
        <div className="budget-box">
          <h4>Budget</h4>
          <p>${data.budget.toFixed(2)}</p>
        </div>

        <div className="budget-box">
          <h4>Spent</h4>
          <p>${data.spent.toFixed(2)}</p>
        </div>

        <div className="budget-box">
          <h4>Remaining</h4>
          <p>${data.remaining.toFixed(2)}</p>
        </div>

        <div className="budget-box">
          <h4>Forecast</h4>
          <p>${data.forecast.toFixed(2)}</p>
        </div>

        <div className="budget-box">
          <h4>Status</h4>
          <p style={{ color }}>{data.status}</p>
        </div>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

export default BudgetProgress;