"use client";

import Image from "next/image";
import { useState } from "react";
import { layouts, renderSlides, type Layout } from "./render-slides";
import css from "./albums.module.css";

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

async function archive(entries: { name: string; blob: Blob }[], name: string) {
  const { zipSync } = await import("fflate");
  const files: Record<string, Uint8Array> = {};
  for (const entry of entries) files[entry.name] = new Uint8Array(await entry.blob.arrayBuffer());
  const bytes = zipSync(files, { level: 0 });
  download(new Blob([new Uint8Array(bytes)], { type: "application/zip" }), name);
}

function preview(blob: Blob): Promise<string> {
  return new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function AlbumDesk() {
  const [layout, setLayout] = useState<Layout>("sunday-film");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [slides, setSlides] = useState<{ blob: Blob; src: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const active = layouts.find(item => item.id === layout)!;
  async function run(task: () => Promise<void>) {
    setError("");
    setBusy(true);
    try { await task(); }
    catch { setError("This file could not be processed. Try a smaller set of JPG or PNG photos."); }
    finally { setBusy(false); }
  }
  return <>
    <fieldset disabled={busy} className={css.gallery}>
      <legend className={css.sr}>Choose an album layout</legend>
      {layouts.map(item => <button key={item.id} aria-pressed={item.id === layout} className={css.sample} onClick={() => {
        setLayout(item.id); setSlides([]); setError("");
      }}>
        <span><b>{item.name}</b><small>{item.id === layout ? "Selected" : "Select layout"}</small></span>
        <Image src={'/albums/' + item.id + '.webp'} alt={item.description} width={1077} height={336} sizes="(max-width: 650px) 100vw, 75vw" priority={item.id === "sunday-film"} />
      </button>)}
    </fieldset>
    <form className={css.desk} onSubmit={e => { e.preventDefault(); void run(async () => {
      const blobs = await renderSlides(files,layout,title.trim() || active.name);
      setSlides(await Promise.all(blobs.map(async blob => ({ blob, src: await preview(blob) }))));
    }); }}>
      <h2>Make your album</h2>
      <fieldset disabled={busy}>
        <label>Cover title<input placeholder={active.name} maxLength={80} value={title} onChange={e => { setTitle(e.target.value); setSlides([]); }} /></label>
        <label>Photos<input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={e => { setFiles(Array.from(e.target.files || [])); setSlides([]); setError(""); }} /></label>
        <button className={css.action} disabled={!files.length}>{busy ? "Working…" : "Preview slides"}</button>
      </fieldset>
      <p>Photos are processed on this device.</p>
    </form>
    {error && <p role="alert">{error}</p>}
    {!!slides.length && <section className={css.results} aria-label="Finished slides">
      <h2>Your slides</h2>
      <div className={css.strip}>{slides.map((slide,i) => <button key={i} onClick={() => download(slide.blob,'slide-' + (i+1) + '.jpg')} aria-label={'Download slide ' + (i+1)}>
        {/* Data URLs let the preview work under the site's existing image policy. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={slide.src} alt={'Slide ' + (i+1)} />
      </button>)}</div>
      <div className={css.downloads}>
        <button disabled={busy} onClick={() => void run(() => archive(slides.map((slide,i) => ({ name: String(i+1).padStart(3,"0") + ".jpg", blob: slide.blob })), "fennrise-slides.zip"))}>Download slides</button>
        <button disabled={busy} onClick={() => void run(() => archive(files.map((file,i) => ({ name: String(i+1).padStart(3,"0") + "-" + file.name.replace(/[/\\]/g,"_"), blob: file })), "original-photos.zip"))}>Download original photos</button>
      </div>
    </section>}
  </>;
}
