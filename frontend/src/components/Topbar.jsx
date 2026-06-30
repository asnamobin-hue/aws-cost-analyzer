function Topbar() {

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (

    <div className="topbar">

      <div>

        <h1>AWS Cost Analyzer</h1>

        <p className="topbar-subtitle">
          Monitor your AWS spending in one place.
        </p>

      </div>

      <div className="date-box">

        <span className="today-label">
          Today
        </span>

        <h3>{today}</h3>

      </div>

    </div>

  );

}

export default Topbar;