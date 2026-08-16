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
          brightness={0.9}
          color1="#FFD84A"
          color2="#F4B400"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={0.9}
          octaveDecay={0.1}
          layerOffset={0.12}
          colorSpeed={0.38}
          enableMouseInteraction={true}
          mouseInfluence={0.08}
        />
      </div>
    </div>
  );
}
