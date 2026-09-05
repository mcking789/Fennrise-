import styles from "./StarVisual.module.css";

export default function StarVisual() {
  return (
    <div className={styles.shell} aria-label="STAR assistant product preview">
      <div className={styles.topbar}>
        <div className={styles.brand}><span className={styles.miniStar}>✦</span><strong>STAR</strong></div>
        <span className={styles.live}><i /> active</span>
      </div>

      <div className={styles.stage} aria-hidden="true">
        <div className={`${styles.ring} ${styles.ringOne}`} />
        <div className={`${styles.ring} ${styles.ringTwo}`} />
        <div className={`${styles.ring} ${styles.ringThree}`} />
        <div className={styles.starGlow} />

        <div className={styles.starWrap}>
          <svg className={styles.star} viewBox="0 0 240 240" role="presentation">
            <path
              d="M120 7 C128 76 164 112 233 120 C164 128 128 164 120 233 C112 164 76 128 7 120 C76 112 112 76 120 7Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <span className={`${styles.spark} ${styles.sparkOne}`} />
        <span className={`${styles.spark} ${styles.sparkTwo}`} />
        <span className={`${styles.spark} ${styles.sparkThree}`} />
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>STAR / intelligent assistant</span>
        <h3>Ready when<br />you are.</h3>
        <p>Talk naturally. Think, create, research, code, plan, and take action from one assistant.</p>
      </div>

      <div className={styles.prompt}>
        <span className={styles.voiceDot} />
        <span>Ask STAR anything…</span>
        <b>↗</b>
      </div>
    </div>
  );
}
