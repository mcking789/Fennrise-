import styles from "./RelayVisual.module.css";

export default function RelayVisual() {
  return (
    <div className={styles.shell} aria-label="Fennrise Relay AI calling assistant visual">
      <div className={styles.ambient} />
      <div className={styles.ambientTwo} />
      <div className={styles.ambientThree} />

      <div className={styles.aurora} />

      <div className={styles.ring} />
      <div className={styles.ringTwo} />
      <div className={styles.ringThree} />

      <div className={styles.wave} />
      <div className={styles.waveTwo} />
      <div className={styles.waveThree} />

      <div className={styles.core} />

      <div className={styles.dot} />
      <div className={styles.dotTwo} />
      <div className={styles.dotThree} />
      <div className={styles.dotFour} />

      <div className={styles.meta}>
        <strong>Fennrise Relay</strong>
        <span>AI calling assistant · in development</span>
      </div>
    </div>
  );
}
