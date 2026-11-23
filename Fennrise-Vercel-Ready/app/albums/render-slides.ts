export const layouts = [
  { id: "sunday-film", name: "Sunday Film", description: "A film-strip cover, contact prints and wide black borders." },
  { id: "birthday-notes", name: "Birthday Notes", description: "Pink note paper, handwritten titles and overlapping prints." },
  { id: "city-grid", name: "City Grid", description: "Bold headlines, an architectural grid and red rules." },
] as const;

export type Layout = typeof layouts[number]["id"];
type Frame = [number, number, number, number];

async function place(context: CanvasRenderingContext2D, file: File, [x,y,w,h]: Frame) {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.max(w / bitmap.width, h / bitmap.height);
    const sw = w / scale, sh = h / scale;
    context.drawImage(bitmap, (bitmap.width-sw)/2, (bitmap.height-sh)/2, sw, sh, x, y, w, h);
  } finally { bitmap.close(); }
}

export async function renderSlides(files: File[], layout: Layout, title: string) {
  const slides: Blob[] = [];
  let offset = 0;
  while (offset < files.length) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const c = canvas.getContext("2d");
    if (!c) throw new Error("Canvas is unavailable");
    const cover = offset === 0;
    const film = layout === "sunday-film";
    const notes = layout === "birthday-notes";
    const count = Math.min(cover ? 1 : film ? 3 : notes ? 2 : 4, files.length-offset);
    c.fillStyle = film ? "#151310" : notes ? "#f7cfd6" : "#faf9f5";
    c.fillRect(0,0,1080,1350);
    const frames: Frame[] = [];
    for (let i=0;i<count;i++) {
      if (film) {
        const h = (1176 - (count-1)*15)/count;
        frames.push([42,74+i*(h+15),996,h]);
      } else if (notes) {
        const h = cover ? 872 : count === 1 ? 1030 : 514;
        frames.push([i%2 ? 152 : 80, (cover ? 270 : 84)+i*551,850,h]);
      } else {
        const cols = count > 2 ? 2 : 1, rows = Math.ceil(count/cols);
        const top = cover ? 250 : 72, h = (1280-top-12*(rows-1))/rows;
        const w = (1000-12*(cols-1))/cols;
        frames.push([40+(i%cols)*(w+12),top+Math.floor(i/cols)*(h+12),w,h]);
      }
    }
    for (const [index,frame] of frames.entries()) {
      if (notes) {
        c.fillStyle = "#fffcf2";
        c.fillRect(frame[0]-14,frame[1]-14,frame[2]+28,frame[3]+48);
      }
      await place(c,files[offset+index],frame);
    }
    if (cover) {
      c.font = film ? "100px Georgia" : notes ? "italic 94px Georgia" : "bold 105px Arial";
      if (film) { c.fillStyle="rgba(0,0,0,.45)"; c.fillRect(42,74,996,148); }
      c.fillStyle = film ? "#fffaf1" : notes ? "#a3233c" : "#151515";
      c.fillText(title,72,film ? 187 : 170,930);
    }
    c.fillStyle = film ? "#edb553" : notes ? "#a3233c" : "#c73524";
    if (!film && !notes) c.fillRect(40,cover ? 202 : 40,160,8);
    c.font="24px monospace";
    c.fillText(String(slides.length+1).padStart(2,"0"),52,1310);
    const image = await new Promise<Blob>((resolve,reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("Export failed")), "image/jpeg", .92));
    slides.push(image);
    offset += count;
  }
  return slides;
}
