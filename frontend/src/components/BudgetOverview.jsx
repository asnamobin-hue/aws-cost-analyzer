// BudgetOverview.jsx
function BudgetOverview({ budget }) {
  if (!budget) return null;

  const percentage = (budget.spent / budget.budget) * 100;

  const statusKey = budget.status?.toLowerCase().includes("healthy")
    ? "good"
    : budget.status?.toLowerCase().includes("warn")
    ? "warning"
    : "danger";

  return (
    <div className="budget-card">
      <div className="budget-card-header">
        <h3>Budget Overview</h3>
        <span className={`status-pill ${statusKey}`}>{budget.status}</span>
      </div>

      <div className="budget-stats-row">
        <div className="budget-stat">
          <h4>Budget</h4>
          <p>{budget.budget} {budget.unit}</p>
        </div>
        <div className="budget-stat">
          <h4>Spent</h4>
          <p>{budget.spent} {budget.unit}</p>
        </div>
        <div className="budget-stat">
          <h4>Forecast</h4>
          <p>{budget.forecast} {budget.unit}</p>
        </div>
        <div className="budget-stat">
          <h4>Remaining</h4>
          <p>{budget.remaining} {budget.unit}</p>
        </div>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${statusKey}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <div className="progress-percentage">{percentage.toFixed(1)}% used</div>
    </div>
  );
}

export default BudgetOverview;