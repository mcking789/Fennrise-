import styles from "./ForgeDashboard.module.css";

const navItems = ["Overview", "Workflows", "Clients", "Reports"];
const systems = [
  { name: "Client portal", status: "Live" },
  { name: "Billing sync", status: "Active" },
  { name: "Lead routing", status: "Active" },
];

export default function ForgeDashboard() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.mark}>F</span>
          <span>Forge</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item, index) => (
            <div
              className={index === 0 ? `${styles.navItem} ${styles.navActive}` : styles.navItem}
              key={item}
            >
              <i />
              <span>{item}</span>
            </div>
          ))}
        </nav>

        <div className={styles.sideFooter}>
          <span>System</span>
          <b><i /> All services online</b>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <span className={styles.kicker}>Fennrise Forge</span>
            <h5>Operations</h5>
          </div>
          <div className={styles.topActions}>
            <span className={styles.search}>⌘ &nbsp; Search</span>
            <span className={styles.avatar}>FR</span>
          </div>
        </header>

        <div className={styles.metrics}>
          <div className={`${styles.metric} ${styles.metricPrimary}`}>
            <span>Automations</span>
            <strong>24</strong>
            <small>+6 this month</small>
          </div>
          <div className={styles.metric}>
            <span>Tasks processed</span>
            <strong>8.4K</strong>
            <small>98.7% success</small>
          </div>
          <div className={styles.metric}>
            <span>Active clients</span>
            <strong>12</strong>
            <small>3 portals live</small>
          </div>
        </div>

        <div className={styles.mainGrid}>
          <section className={styles.chartCard}>
            <div className={styles.cardHead}>
              <div>
                <span>Automation activity</span>
                <strong>+38%</strong>
              </div>
              <small>30 days</small>
            </div>

            <div className={styles.chart}>
              <span className={`${styles.gridLine} ${styles.gridOne}`} />
              <span className={`${styles.gridLine} ${styles.gridTwo}`} />
              <span className={`${styles.gridLine} ${styles.gridThree}`} />
              <svg viewBox="0 0 360 120" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="forgeArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f4b400" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#f4b400" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 94 C24 86 35 67 58 72 C78 77 89 53 112 58 C135 62 147 40 169 48 C194 57 204 28 229 34 C253 40 269 18 291 27 C318 38 333 17 360 13 L360 120 L0 120 Z"
                  fill="url(#forgeArea)"
                />
                <path
                  d="M0 94 C24 86 35 67 58 72 C78 77 89 53 112 58 C135 62 147 40 169 48 C194 57 204 28 229 34 C253 40 269 18 291 27 C318 38 333 17 360 13"
                  fill="none"
                  stroke="#f4b400"
                  strokeWidth="2.2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span className={styles.chartDot} />
            </div>

            <div className={styles.chartLabels}>
              <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Now</span>
            </div>
          </section>

          <section className={styles.systemCard}>
            <div className={styles.cardHead}>
              <div><span>Systems</span><strong>Healthy</strong></div>
              <small>Live</small>
            </div>
            <div className={styles.systemList}>
              {systems.map((system) => (
                <div key={system.name}>
                  <span><i />{system.name}</span>
                  <b>{system.status}</b>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
