import styles from "./FennFocusVisual.module.css";

export default function FennFocusVisual() {
  return (
    <div className={styles.stage} role="img" aria-label="Fenn daily focus interface visual">
      <div className={styles.glow} />
      <div className={styles.window}>
        <div className={styles.bar}><i /><i /><i /><span>Today</span></div>
        <div className={styles.body}>
          <p>Good morning.</p>
          <div className={styles.progressLabel}><span>Daily progress</span><b>72%</b></div>
          <div className={styles.progress}><i /></div>
          <div className={styles.task}><i>✓</i><span>Plan the next milestone</span></div>
          <div className={styles.task}><i /><span>45 min focus session</span></div>
        </div>
      </div>
      <div className={`${styles.echo} ${styles.echoOne}`} />
      <div className={`${styles.echo} ${styles.echoTwo}`} />
    </div>
  );
}
