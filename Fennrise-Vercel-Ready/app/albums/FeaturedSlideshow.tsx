"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { layouts } from "./render-slides";
import c from "./albums.module.css";

const featured = layouts.slice(0, 3);
const travel = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%" }),
  center: { x: "0%" },
  exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%" }),
};

export default function FeaturedSlideshow({ index, onSelect, onOpen }: {
  index: number;
  onSelect: (index: number) => void;
  onOpen: () => void;
}) {
  const feature = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const playing = visible && !paused && !reduced;
  const design = featured[index];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(preference.matches);
    syncMotion();
    preference.addEventListener("change", syncMotion);
    let inView = false;
    const syncVisibility = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncVisibility();
    }, { threshold: 0.25 });
    observer.observe(feature.current!);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      preference.removeEventListener("change", syncMotion);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setDirection(1);
      onSelect((index + 1) % featured.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [index, onSelect, playing]);

  function choose(next: number, step: number) {
    setPaused(true);
    setDirection(step);
    onSelect(next);
  }

  return (
    <div className={c.feature} ref={feature} role="region" aria-label="Featured album designs"
      aria-roledescription="carousel" data-floating={playing}
      onFocusCapture={e => { if (e.target.matches(":focus-visible")) setPaused(true); }}>
      <button type="button" className={c.featureArt} aria-label={"Try " + design.name}
        onClick={() => {
          if (!swiped.current) onOpen();
          swiped.current = false;
        }}
        onTouchStart={e => {
          swiped.current = false;
          const touch = e.touches[0];
          start.current = e.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
        }}
        onTouchCancel={() => { start.current = null; }}
        onTouchEnd={e => {
          const origin = start.current;
          start.current = null;
          if (!origin) return;
          const dx = e.changedTouches[0].clientX - origin.x;
          const dy = e.changedTouches[0].clientY - origin.y;
          if (Math.abs(dx) < 40 || Math.abs(dx) < 1.5 * Math.abs(dy)) return;
          swiped.current = true;
          const step = dx < 0 ? 1 : -1;
          choose((index + step + featured.length) % featured.length, step);
        }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div key={design.id} className={c.slide} data-design={design.id}
            aria-hidden="true" custom={direction} variants={travel}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: reduced ? 0 : 0.72, ease: [0.45, 0, 0.18, 1] }}>
            <div className={c.stack} data-style={design.id}>
              {[2, 1, 0].map(layer => (
                <div key={layer} className={c.print} data-layer={layer}>
                  <img src={"/albums/" + design.samples[layer] + ".webp"} alt="" draggable={false} />
                  {layer === 0 && <strong>{design.title}</strong>}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </button>
      <div className={c.featureCaption}>
        <span>{design.name}</span>
        <div>
          {!reduced && <button type="button" className={c.playback} onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}>
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          </button>}
          {featured.map((item, i) => (
            <button type="button" key={item.id} aria-label={"Preview " + item.name} aria-pressed={index === i}
              onClick={() => choose(i, i >= index ? 1 : -1)}><i /></button>
          ))}
        </div>
      </div>
    </div>
  );
}
