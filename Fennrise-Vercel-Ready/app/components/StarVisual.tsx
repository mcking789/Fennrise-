import styles from "./StarVisual.module.css";

export default function StarVisual() {
  return (
    <div className={styles.shell} aria-label="STAR assistant product preview">
      <div className={styles.topbar}>
        <div className={styles.brand}><span className={styles.spark}>✦</span><strong>STAR</strong></div>
        <span className={styles.live}><i /> listening</span>
      </div>

      <div className={styles.aurora} aria-hidden="true">
        <div className={styles.orb} />
        <div className={styles.glow} />
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>Your intelligent assistant</span>
        <h3>What do you want<br />to get done?</h3>
        <p>Talk naturally. STAR can help you think, create, research, code, and take practical everyday actions.</p>
      </div>

      <div className={styles.prompt}>
        <span className={styles.mic}>●</span>
        <span>Ask STAR anything…</span>
        <b>↗</b>
      </div>

      <div className={styles.actions}>
        <span>Write</span><span>Research</span><span>Code</span><span>Plan</span>
      </div>
    </div>
  );
}
