export const layouts = [
  {
    id: "sunday-film",
    name: "Sunday Film",
    detail: "35mm film · warm borders",
    title: "Sunday",
    samples: ["coast", "drive", "dusk"],
  },
  {
    id: "birthday-notes",
    name: "Birthday Notes",
    detail: "Scrapbook · handwritten notes",
    title: "Birthday notes",
    samples: ["friends", "cake", "candles"],
  },
  {
    id: "city-grid",
    name: "City Grid",
    detail: "Editorial · architectural grids",
    title: "Mumbai",
    samples: ["market", "taxi", "station"],
  },
] as const;

export type Layout = (typeof layouts)[number]["id"];
export type Photo = {
  id: string;
  name: string;
  src: string;
  image: HTMLImageElement;
  file?: File;
  x: number;
  y: number;
  zoom: number;
};
export type Frame = { x: number; y: number; w: number; h: number };
export const width = 1080,
  height = 1350;

export async function loadPhoto(
  src: string,
  name: string,
  file?: File,
): Promise<Photo> {
  const image = new Image();
  image.src = src;
  await image.decode();
  return {
    id: crypto.randomUUID(),
    name,
    src,
    image,
    file,
    x: 0.5,
    y: 0.5,
    zoom: 1,
  };
}

export async function fromFile(file: File) {
  // Keep the original for ZIP download, retaining only an editor-sized raster in memory.
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return await loadPhoto(
      canvas.toDataURL("image/jpeg", 0.94),
      file.name,
      file,
    );
  } finally {
    bitmap.close();
  }
}

export function groupSlides(photos: Photo[], layout: Layout) {
  if (photos.length < 2) return photos.length ? [photos] : [];
  const groups = [photos.slice(0, 1)];
  const slots =
    layout === "city-grid" ? 4 : layout === "birthday-notes" ? 2 : 3;
  for (let i = 1; i < photos.length - 1; i += slots)
    groups.push(photos.slice(i, Math.min(i + slots, photos.length - 1)));
  groups.push(photos.slice(-1));
  return groups;
}

export function framesFor(
  layout: Layout,
  index: number,
  count: number,
): Frame[] {
  const notes = layout === "birthday-notes",
    grid = layout === "city-grid";
  const left = notes ? 78 : 38;
  const top = index === 0 && (notes || grid) ? 275 : notes ? 95 : 63;
  const bottom = notes ? 1220 : 1285;
  const cols = grid && count > 2 ? 2 : 1;
  const rows = Math.ceil(count / cols);
  const gap = notes ? 66 : 15;
  const w =
    (width - left * 2 - (cols - 1) * gap) / cols -
    (notes && count > 1 ? 55 : 0);
  const h = (bottom - top - (rows - 1) * gap) / rows;
  return Array.from({ length: count }, (_, i) => ({
    x: left + (i % cols) * (w + gap) + (notes && i % 2 ? 55 : 0),
    y: top + Math.floor(i / cols) * (h + gap),
    w,
    h,
  }));
}

export function cropSize(p: Photo, frame: Frame) {
  const scale =
    Math.max(frame.w / p.image.naturalWidth, frame.h / p.image.naturalHeight) *
    p.zoom;
  return { w: frame.w / scale, h: frame.h / scale };
}

export function paint(
  canvas: HTMLCanvasElement,
  photos: Photo[],
  layout: Layout,
  index: number,
  title: string,
) {
  const c = canvas.getContext("2d")!;
  const film = layout === "sunday-film",
    notes = layout === "birthday-notes";
  c.save();
  c.scale(canvas.width / width, canvas.height / height);
  c.fillStyle = film ? "#151412" : notes ? "#f4cbd0" : "#f2efe6";
  c.fillRect(0, 0, width, height);
  const frames = framesFor(layout, index, photos.length);
  photos.forEach((p, i) => {
    const f = frames[i],
      size = cropSize(p, f);
    if (notes) {
      c.fillStyle = "#fff9e9";
      c.fillRect(f.x - 15, f.y - 15, f.w + 30, f.h + 47);
    }
    c.drawImage(
      p.image,
      (p.image.naturalWidth - size.w) * p.x,
      (p.image.naturalHeight - size.h) * p.y,
      size.w,
      size.h,
      f.x,
      f.y,
      f.w,
      f.h,
    );
    if (notes) {
      c.save();
      c.translate(f.x + f.w * 0.47, f.y - 7);
      c.rotate(i % 2 ? 0.065 : -0.09);
      c.fillStyle = "rgba(217,187,132,.84)";
      c.fillRect(-65, -12, 130, 26);
      c.restore();
    }
  });
  if (film) {
    c.fillStyle = "#a27a42";
    for (let i = 0; i < 14; i++)
      for (const y of [21, 1305]) {
        c.beginPath();
        c.roundRect(44 + i * 75, y, 32, 16, 4);
        c.fill();
      }
  }
  if (!index) {
    c.textAlign = film ? "center" : "left";
    const words = title.trim() || layouts.find((v) => v.id === layout)!.title;
    let size = film ? 154 : notes ? 119 : 152;
    const face = film ? "Georgia" : notes ? "italic" : "bold";
    const font = () =>
      film
        ? size + "px Georgia"
        : face + " " + size + "px " + (notes ? "Georgia" : "Arial");
    c.font = font();
    while (size > 30 && c.measureText(words).width > 930) {
      size -= 2;
      c.font = font();
    }
    if (film) {
      const shade = c.createLinearGradient(0, 63, 0, 435);
      shade.addColorStop(0, "rgba(0,0,0,.46)");
      shade.addColorStop(1, "transparent");
      c.fillStyle = shade;
      c.fillRect(38, 63, 1004, 372);
    }
    c.fillStyle = film ? "#fff7e7" : notes ? "#a32d43" : "#141412";
    c.fillText(words, film ? 540 : 57, film ? 240 : 194, 940);
    c.textAlign = "left";
  }
  c.fillStyle = film ? "#e6ac59" : notes ? "#983544" : "#26241e";
  c.font = "22px monospace";
  c.fillText(
    String(index + 1).padStart(2, "0"),
    film ? 1000 : 55,
    film ? 1272 : 1320,
  );
  if (!film && !notes) {
    c.fillStyle = "#dc3f27";
    c.fillRect(40, index === 0 ? 225 : 33, 130, 10);
  }
  c.restore();
}
