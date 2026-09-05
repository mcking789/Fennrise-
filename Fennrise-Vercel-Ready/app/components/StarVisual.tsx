import styles from "./StarVisual.module.css";

export default function StarVisual() {
  return (
    <div className={styles.shell} aria-label="STAR assistant visual">
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.aura} />
        <div className={`${styles.ring} ${styles.ringOne}`} />
        <div className={`${styles.ring} ${styles.ringTwo}`} />

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
    </div>
  );
}
