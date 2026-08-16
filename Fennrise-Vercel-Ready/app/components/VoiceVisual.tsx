"use client";

import SoftAurora from "./SoftAurora/SoftAurora";
import styles from "./RelayVisual.module.css";

export default function RelayVisual() {
  return (
    <div className={styles.shell} aria-label="Fennrise Relay SoftAurora visual">
      <div className={styles.auroraFrame}>
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={0.78}
          color1="#ffe082"
          color2="#f4b400"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0.12}
          colorSpeed={0.42}
          enableMouseInteraction={true}
          mouseInfluence={0.08}
        />
      </div>
    </div>
  );
}
