import styles from "./RelayVisual.module.css";

export default function RelayVisual() {
  return (
    <div className={styles.shell} aria-label="Fennrise Relay AI calling assistant aurora visual">
      <div className={styles.haze} />
      <div className={styles.hazeTwo} />

      <svg className={styles.auroraSvg} viewBox="0 0 760 420" aria-hidden="true">
        <defs>
          <linearGradient id="relayAuroraMain" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f4b400" stopOpacity="0" />
            <stop offset="18%" stopColor="#f4b400" stopOpacity="0.38" />
            <stop offset="46%" stopColor="#ffe083" stopOpacity="0.95" />
            <stop offset="72%" stopColor="#f4b400" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#f4b400" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="relayAuroraSoft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffd45a" stopOpacity="0" />
            <stop offset="30%" stopColor="#ffd45a" stopOpacity="0.28" />
            <stop offset="58%" stopColor="#fff0b1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f4b400" stopOpacity="0" />
          </linearGradient>
          <filter id="relayGlowLarge" x="-40%" y="-80%" width="180%" height="260%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
          <filter id="relayGlowMedium" x="-30%" y="-70%" width="160%" height="240%">
            <feGaussianBlur stdDeviation="11" />
          </filter>
        </defs>

        <g className={styles.auroraBack}>
          <path
            d="M-70 248 C 55 86, 150 332, 276 190 S 500 82, 824 192"
            fill="none"
            stroke="url(#relayAuroraMain)"
            strokeWidth="86"
            strokeLinecap="round"
            filter="url(#relayGlowLarge)"
          />
        </g>

        <g className={styles.auroraMid}>
          <path
            d="M-55 244 C 72 106, 157 314, 282 188 S 512 92, 810 186"
            fill="none"
            stroke="url(#relayAuroraMain)"
            strokeWidth="42"
            strokeLinecap="round"
            filter="url(#relayGlowMedium)"
          />
          <path
            d="M-42 287 C 92 156, 181 338, 325 225 S 555 122, 806 230"
            fill="none"
            stroke="url(#relayAuroraSoft)"
            strokeWidth="25"
            strokeLinecap="round"
            opacity="0.68"
            filter="url(#relayGlowMedium)"
          />
        </g>

        <g className={styles.auroraFront}>
          <path
            d="M-35 233 C 79 122, 167 286, 291 177 S 522 98, 804 175"
            fill="none"
            stroke="url(#relayAuroraMain)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M-18 270 C 118 176, 201 310, 339 211 S 566 137, 790 215"
            fill="none"
            stroke="url(#relayAuroraSoft)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        <g className={styles.wisps}>
          <path d="M160 78 C 188 148, 133 219, 184 286" />
          <path d="M302 56 C 335 132, 281 218, 324 312" />
          <path d="M447 79 C 478 147, 430 218, 470 295" />
          <path d="M586 90 C 617 149, 579 209, 607 267" />
        </g>
      </svg>

      <div className={styles.signalLine} />
      <div className={styles.signalLineTwo} />

      <div className={styles.meta}>
        <strong>Fennrise Relay</strong>
        <span>AI calling assistant · in development</span>
      </div>
    </div>
  );
}
