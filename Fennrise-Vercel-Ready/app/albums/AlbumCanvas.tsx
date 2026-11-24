"use client";
import { useEffect, useRef } from "react";
import {
  cropSize,
  framesFor,
  paint,
  width,
  height,
  type Photo,
  type Layout,
} from "./render-slides";
import type { Design,SlideEdit } from "./design";
import c from "./albums.module.css";

type Props = {
  photos: Photo[];
  layout: Layout;
  index: number;
  title: string;
  selected: string;
  style:Design;
  slide:SlideEdit;
  onSelect: (id: string) => void;
  onEdit: (id: string, changes: { x: number; y: number }) => void;
};
const clamp = (n: number) => Math.min(1, Math.max(0, n));

export default function AlbumCanvas({
  photos,
  layout,
  index,
  title,
  selected, style, slide,
  onSelect,
  onEdit,
}: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{
    id: string;
    left: number;
    top: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
  } | null>(null);
  const frames = framesFor(layout, index, photos, style);
  useEffect(() => {
    if (canvas.current) paint(canvas.current, photos, layout, index, title, style, slide);
  }, [photos, layout, index, title,style,slide]);
  return (
    <div className={c.canvasWrap}>
      <canvas
        ref={canvas}
        width={1080}
        height={1350}
        aria-label={"Preview of " + title + ", slide " + (index + 1)}
      />
      {frames.map((f, i) => (
        <button
          key={photos[i].id}
          type="button"
          className={c.cropTarget}
          data-selected={
            (selected === photos[i].id && photos.length > 1) || undefined
          }
          aria-label={"Adjust crop of " + photos[i].name}
          style={{
            left: (f.x / width) * 100 + "%",
            top: (f.y / height) * 100 + "%",
            width: (f.w / width) * 100 + "%",
            height: (f.h / height) * 100 + "%",
          }}
          onClick={() => onSelect(photos[i].id)}
          onPointerDown={(e) => {
            const p = photos[i],
              frame = e.currentTarget.getBoundingClientRect(),
              size = cropSize(p, f);
            onSelect(p.id);
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current = {
              id: p.id,
              left: e.clientX,
              top: e.clientY,
              x: p.x,
              y: p.y,
              dx: frame.width * (p.image.naturalWidth / size.w - 1),
              dy: frame.height * (p.image.naturalHeight / size.h - 1),
            };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || d.id !== photos[i].id) return;
            onEdit(d.id, {
              x: d.dx > 0.01 ? clamp(d.x - (e.clientX - d.left) / d.dx) : d.x,
              y: d.dy > 0.01 ? clamp(d.y - (e.clientY - d.top) / d.dy) : d.y,
            });
          }}
          onLostPointerCapture={() => {
            drag.current = null;
          }}
        />
      ))}
    </div>
  );
}
