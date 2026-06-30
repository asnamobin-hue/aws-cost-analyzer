// App.js
import { useState, useEffect } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import SummaryCards from "./components/SummaryCards";
import MonthlyChart from "./components/MonthlyChart";
import ServicePieChart from "./components/ServicePieChart";
import BudgetOverview from "./components/BudgetOverview";

function App() {
  const [totalCost, setTotalCost] = useState(null);
  const [services, setServices] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [budget, setBudget] = useState(null);
  const [theme, setTheme] = useState("light");
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/total-cost?demo=${demoMode}`)
      .then((res) => res.json())
      .then(setTotalCost);
  }, [demoMode]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/service-breakdown?demo=${demoMode}`)
      .then((res) => res.json())
      .then(setServices);
  }, [demoMode]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/monthly-trend?demo=${demoMode}`)
      .then((res) => res.json())
      .then(setMonthlyTrend);
  }, [demoMode]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/budget?demo=${demoMode}`)
      .then((res) => res.json())
      .then(setBudget);
  }, [demoMode]);

  return (
    <div className={`layout ${theme === "dark" ? "dark" : ""}`}>

      <Sidebar
        theme={theme}
        setTheme={setTheme}
        demoMode={demoMode}
        setDemoMode={setDemoMode}
      />

      <div className="main">

        <Topbar />

        <SummaryCards
          totalCost={totalCost}
          services={services}
          budget={budget}
        />

        <div className="charts-row">

          <MonthlyChart
            monthlyTrend={monthlyTrend}
          />

          <ServicePieChart
            services={services}
          />

        </div>

        <BudgetOverview
          budget={budget}
        />

      </div>

    </div>
  );
}

export default App;