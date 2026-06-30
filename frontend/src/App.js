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
  const API_BASE = "https://aws-cost-analyzer-1.onrender.com";
  const [totalCost, setTotalCost] = useState(null);
  const [services, setServices] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [budget, setBudget] = useState(null);
  const [theme, setTheme] = useState("light");
  const [demoMode, setDemoMode] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/total-cost?demo=${demoMode}`)
      .then((res) => res.json())
      .then(setTotalCost);
  }, [demoMode]);

  useEffect(() => {
    fetch(`${API_BASE}/service-breakdown?demo=${demoMode}`)
      .then((res) => res.json())
      .then(setServices);
  }, [demoMode]);

  useEffect(() => {
    fetch(`${API_BASE}/monthly-trend?demo=${demoMode}`)
      .then((res) => res.json())
      .then(setMonthlyTrend);
  }, [demoMode]);

  useEffect(() => {
    fetch(`${API_BASE}/budget?demo=${demoMode}`)
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