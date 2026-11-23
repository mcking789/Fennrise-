import { paint, width, height, type Photo, type Layout } from "./render-slides";

export function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

export async function jpeg(
  photos: Photo[],
  layout: Layout,
  index: number,
  title: string,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  paint(canvas, photos, layout, index, title);
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Export failed"))),
      "image/jpeg",
      0.94,
    ),
  );
}

export async function archive(
  entries: { name: string; blob: Blob }[],
  filename: string,
) {
  const { zipSync } = await import("fflate");
  const files: Record<string, Uint8Array> = {};
  for (const e of entries)
    files[e.name] = new Uint8Array(await e.blob.arrayBuffer());
  download(
    new Blob([new Uint8Array(zipSync(files, { level: 0 }))], {
      type: "application/zip",
    }),
    filename,
  );
}
