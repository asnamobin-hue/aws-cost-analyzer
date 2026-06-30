// Sidebar.jsx
function Sidebar({ theme, setTheme, demoMode, setDemoMode }) {
  return (
    <aside className="sidebar">

      <div>

        <div className="logo">
          <h2>AWS Cost</h2>
          <span>Analyzer</span>
        </div>

        <div className="menu">

          <div className="menu-item active">
            📊 Dashboard
          </div>

        </div>

        <div className="demo-toggle-wrap">
          <span className="demo-toggle-label">
            {demoMode ? "Demo Data" : "Live Data"}
          </span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={demoMode}
              onChange={(e) => setDemoMode(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

      </div>

      <div className="theme-switch">

        <p>Theme</p>

        <button
          className={`theme-btn ${theme === "light" ? "active" : ""}`}
          onClick={() => setTheme("light")}
        >
          ☀ Light
        </button>

        <button
          className={`theme-btn ${theme === "dark" ? "active" : ""}`}
          onClick={() => setTheme("dark")}
        >
          🌙 Dark
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;