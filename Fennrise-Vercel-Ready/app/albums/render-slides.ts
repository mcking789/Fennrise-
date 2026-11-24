import { editions, type Template } from "./collection";
import { editionFrames, slots } from "./edition-art";
import sets from "./photo-sets.json";
import { designFor,type Design,type SlideEdit } from "./design";
import { drawPage } from "./draw-page";
const originals:Template[] = [
  {
    id: "sunday-film", category:"Travel", signature:false,
    name: "Sunday Film",
    detail: "35mm film / warm borders",
    title: "Sunday",
    samples: ["coast", "drive", "dusk"],
  },
  {
    id: "birthday-notes", category:"Birthdays", signature:false,
    name: "Birthday Notes",
    detail: "Scrapbook / handwritten notes",
    title: "Birthday notes",
    samples: ["friends", "cake", "candles"],
  },
  {
    id: "city-grid", category:"Culture", signature:false,
    name: "City Grid",
    detail: "Editorial / architectural grids",
    title: "Mumbai",
    samples: ["market", "taxi", "station"],
  },
];
const photoSets:Record<string,string[]>=sets;
export const layouts=[...originals,...editions].map(t=>({...t,samples:t.art?photoSets[t.id]:[t.samples[0],t.samples[1],...photoSets[t.id],t.samples[2]]}));
const byId=new Map(layouts.map(t=>[t.id,t]));

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
  bounds?: Frame; shape?: "rectangle"|"arch"|"oval"; light?:number; saturation?:number; turn?:number; flip?:boolean;
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
  if(src.startsWith("https://"))image.crossOrigin="anonymous";
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

export function groupSlides<T>(photos:readonly T[],layout:Layout,style?:Design):T[][] {
  if(photos.length<2)return photos.length?[[photos[0]]]:[];
  const capacity=slots[(style??designFor(byId.get(layout)!)).spread];
  const groups=[[photos[0]]];
  for(let i=1;i<photos.length-1;i+=capacity)groups.push(photos.slice(i,Math.min(i+capacity,photos.length-1)));
  groups.push([photos[photos.length-1]]);return groups;
}
export function framesFor(layout:Layout,index:number,photos:Photo[],style?:Design):Frame[] {
  const defaults=editionFrames(style??designFor(byId.get(layout)!),index,photos.length);
  return photos.map((p,i)=>p.bounds??defaults[i]);
}
export function cropSize(p:Photo,f:Frame) {
  const odd=(p.turn??0)%2;
  const w=odd?f.h:f.w,h=odd?f.w:f.h;
  const scale=Math.max(w/p.image.naturalWidth,h/p.image.naturalHeight)*p.zoom;
  return {w:w/scale,h:h/scale};
}
export function paint(canvas:HTMLCanvasElement,photos:Photo[],layout:Layout,index:number,title:string,style?:Design,slide:SlideEdit={}) {
  const c=canvas.getContext("2d")!,s=style??designFor(byId.get(layout)!);
  c.save();c.scale(canvas.width/width,canvas.height/height);
  drawPage(c,photos,framesFor(layout,index,photos,s),s,slide,index,title);
  c.restore();
}
