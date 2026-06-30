

function SummaryCards({ totalCost, services, budget }) {

  const topService =
    services.length > 0
      ? [...services].sort((a, b) => b.amount - a.amount)[0]
      : null;

  return (
    <div className="summary-cards">

      <div className="summary-card">

        <p className="card-title">
          Total Cost
        </p>

        <h2>
          {totalCost
            ? `${Number(totalCost.amount).toFixed(2)} ${totalCost.unit}`
            : "--"}
        </h2>

        <span>
          Current AWS Spending
        </span>

      </div>

      <div className="summary-card">


        <p className="card-title">
          Top Service
        </p>

        <h2 style={{fontSize:"22px"}}>

          {topService
            ? topService.service
            : "--"}

        </h2>

        <span>
          Highest Cost Service
        </span>

      </div>

      <div className="summary-card">

        <p className="card-title">
          Forecast
        </p>

        <h2>

          {budget
            ? `${budget.forecast} ${budget.unit}`
            : "--"}

        </h2>

        <span>
          Estimated Monthly Cost
        </span>

      </div>

      <div className="summary-card">


        <p className="card-title">
          Budget Status
        </p>

        <h2>

          {budget
            ? budget.status
            : "--"}

        </h2>

        <span>
          Current Budget Health
        </span>

      </div>

    </div>
  );
}

export default SummaryCards;