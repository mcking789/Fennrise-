"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { layouts } from "./render-slides";
import c from "./albums.module.css";

const featured = layouts.slice(0, 3);
const slideInterval = 4000;
const artworkUrl = (id: string) => `/albums/featured/${id}.webp`;

// Each strip contains the first three pages rendered by the album editor.
const artwork = new Map<string, Promise<HTMLImageElement>>();
function loadArtwork(id: string) {
  const existing = artwork.get(id);
  if (existing) return existing;
  const image = new Image();
  image.src = artworkUrl(id);
  const loaded = image.decode().then(() => image).catch(error => {
    artwork.delete(id);
    throw error;
  });
  artwork.set(id, loaded);
  return loaded;
}

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
  const pendingChoice = useRef(0);
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
    featured.forEach(item => { void loadArtwork(item.id).catch(() => {}); });
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
      pendingChoice.current++;
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      preference.removeEventListener("change", syncMotion);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    let active = true;
    let timer: number;
    const next = (index + 1) % featured.length;
    async function play() {
      await loadArtwork(design.id);
      if (!active) return;
      timer = window.setTimeout(() => {
        void loadArtwork(featured[next].id).then(() => {
          if (active) {
            setDirection(1);
            onSelect(next);
          }
        }).catch(() => {});
      }, slideInterval);
    }
    void play().catch(() => {});
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [design.id, index, onSelect, playing]);

  function choose(step: number) {
    const next = (index + step + featured.length) % featured.length;
    const choice = ++pendingChoice.current;
    void loadArtwork(featured[next].id).then(() => {
      if (choice === pendingChoice.current) {
        setDirection(step);
        onSelect(next);
      }
    }).catch(() => {});
  }

  return (
    <div className={c.feature} ref={feature} role="region" aria-label="Featured album designs"
      aria-roledescription="carousel" data-floating={playing}
      onFocusCapture={e => { if (e.target.matches(":focus-visible")) setPaused(true); }}
      onBlurCapture={() => setPaused(false)}>
      <button type="button" className={c.featureArt} aria-label={"Try " + design.name}
        aria-keyshortcuts="ArrowLeft ArrowRight"
        onKeyDown={e => {
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
          e.preventDefault();
          choose(e.key === "ArrowRight" ? 1 : -1);
        }}
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
          choose(step);
        }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div key={design.id} className={c.slide} data-design={design.id}
            aria-hidden="true" custom={direction} variants={travel}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: reduced ? 0 : 0.48, ease: [0.45, 0, 0.18, 1] }}>
            <div className={c.stack} data-style={design.id}>
              {[2, 1, 0].map(layer => (
                <div key={layer} className={c.print} data-layer={layer}>
                  <img src={artworkUrl(design.id)} alt="" width={600} height={750}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    style={{objectPosition: `${layer * 50}% center`}} />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}
