"use client";

import { useEffect, useRef, useState } from "react";
import SoftAurora from "./SoftAurora/SoftAurora";
import styles from "./RelayVisual.module.css";

export default function RelayVisual() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = shellRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.28,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={shellRef}
      className={styles.shell}
      aria-label="Fennrise Relay SoftAurora visual"
    >
      <div
        className={`${styles.auroraFrame} ${isVisible ? styles.visible : ""}`}
      >
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={0.88}
          color1="#FFE34D"
          color2="#FFD000"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={0.9}
          octaveDecay={0.1}
          layerOffset={0.12}
          colorSpeed={0.32}
          enableMouseInteraction={true}
          mouseInfluence={0.08}
        />
      </div>
    </div>
  );
}
