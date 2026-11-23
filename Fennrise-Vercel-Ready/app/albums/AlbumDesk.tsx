"use client";

import { useEffect, useRef, useState } from "react";
import {
  layouts,
  fromFile,
  loadPhoto,
  groupSlides,
  type Photo,
} from "./render-slides";
import { jpeg, archive, download } from "./album-files";
import AlbumCanvas from "./AlbumCanvas";
import c from "./albums.module.css";

type Template = (typeof layouts)[number];
const sampleSrc = (name: string) => "/albums/" + name + ".webp";
const serial = (i: number) => String(i + 1).padStart(2, "0");

function Stack({ template }: { template: Template }) {
  return (
    <div className={c.stack} aria-hidden="true" data-style={template.id}>
      {[2, 1, 0].map((i) => (
        <div key={i} className={c.print} data-layer={i}>
          <img src={sampleSrc(template.samples[i])} alt="" draggable={false} />
          {!i && <strong>{template.title}</strong>}
        </div>
      ))}
    </div>
  );
}

export default function AlbumDesk() {
  const [template, setTemplate] = useState<Template>(layouts[0]);
  const [studio, setStudio] = useState(false);
  const [title, setTitle] = useState("");
  const [samples, setSamples] = useState<Photo[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryButton = useRef<HTMLButtonElement>(null);
  const libraryRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    if (!studio) return;
    let current = true;
    setSamples([]);
    Promise.all(
      template.samples.map((n) => loadPhoto(sampleSrc(n), n + ".webp")),
    )
      .then((result) => {
        if (current) setSamples(result);
      })
      .catch(() => {
        if (current)
          setNotice(
            "Sample photos could not load. You can still add your photos.",
          );
      });
    return () => {
      current = false;
    };
  }, [studio, template]);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    if (studio) titleRef.current?.focus({ preventScroll: true });
    else galleryButton.current?.focus({ preventScroll: true });
  }, [studio]);

  const active = photos.length ? photos : samples;
  const groups = groupSlides(active, template.id);
  const photo = active.find((p) => p.id === selected) || active[0];
  const slideIndex = Math.max(
    0,
    groups.findIndex((g) => g.some((p) => p.id === photo?.id)),
  );
  const group = groups[slideIndex] || [];
  const heading = title.trim() || template.title;
  const position = active.indexOf(photo);
  function open(t: Template) {
    setTemplate(t);
    setStudio(true);
    setNotice("");
  }
  function edit(id: string, changes: Partial<Pick<Photo, "x" | "y" | "zoom">>) {
    const update = photos.length ? setPhotos : setSamples;
    update((items) =>
      items.map((p) => (p.id === id ? { ...p, ...changes } : p)),
    );
  }
  async function add(files: File[]) {
    if (!files.length || busy) return;
    setBusy(true);
    setNotice("");
    const added: Photo[] = [];
    for (const file of files) {
      try {
        added.push(await fromFile(file));
      } catch {
        /* Remaining photos can still be imported. */
      }
    }
    setPhotos((prev) => [...prev, ...added]);
    if (added.length) setSelected(added[0].id);
    if (added.length < files.length)
      setNotice("Some photos could not be opened. Try JPG, PNG or WebP.");
    setBusy(false);
    if (input.current) input.current.value = "";
  }
  function move(offset: number) {
    const next = [...active];
    [next[position], next[position + offset]] = [
      next[position + offset],
      next[position],
    ];
    (photos.length ? setPhotos : setSamples)(next);
    setSelected(photo.id);
  }
  async function save(kind: "slides" | "originals" | "slide") {
    setBusy(true);
    setNotice("");
    try {
      const slug =
        heading.replace(/[^\p{L}\p{N}]+/gu, "-").slice(0, 60) || "album";
      if (kind === "slide")
        download(
          await jpeg(group, template.id, slideIndex, heading),
          slug + "-" + serial(slideIndex) + ".jpg",
        );
      else if (kind === "originals")
        await archive(
          photos.map((p, i) => ({
            name: serial(i) + "-" + p.name.replace(/[/\\]/g, "_"),
            blob: p.file!,
          })),
          slug + "-originals.zip",
        );
      else {
        const entries = [];
        for (const [i, g] of groups.entries())
          entries.push({
            name: serial(i) + ".jpg",
            blob: await jpeg(g, template.id, i, heading),
          });
        await archive(entries, slug + "-slides.zip");
      }
    } catch {
      setNotice(
        "Could not finish that download. Try downloading the current slide.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (!studio)
    return (
      <div className={c.page}>
        <section className={c.hero}>
          <div className={c.heroCopy}>
            <span className={c.kicker}>Fennrise Albums</span>
            <h1>
              Camera roll
              <br />
              <em>to carousel.</em>
            </h1>
            <p>
              Give your photos a place together. Turn a trip, a birthday or an
              ordinary Sunday into slides you can share.
            </p>
            <div className={c.actions}>
              <button
                ref={galleryButton}
                className={c.primary}
                onClick={() => open(template)}
              >
                {photos.length ? "Resume album" : "Create an album"}{" "}
                <span aria-hidden="true">↗︎</span>
              </button>
              <a
                href="#album-templates"
                onClick={() =>
                  libraryRef.current?.focus({ preventScroll: true })
                }
              >
                Browse templates ↓
              </a>
            </div>
          </div>
          <div className={c.feature}>
            <button
              className={c.featureArt}
              onClick={() => open(template)}
              aria-label={"Try " + template.name}
            >
              <Stack template={template} />
            </button>
            <div className={c.featureCaption}>
              <span>{template.name}</span>
              <div>
                {layouts.map((t) => (
                  <button
                    key={t.id}
                    aria-label={"Preview " + t.name}
                    aria-pressed={t.id === template.id}
                    onClick={() => setTemplate(t)}
                  >
                    <i />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="album-templates"
          ref={libraryRef}
          tabIndex={-1}
          className={c.collection}
        >
          <div className={c.collectionHead}>
            <h2>The templates</h2>
            <span>3 free layouts</span>
          </div>
          <div className={c.cards}>
            {layouts.map((t) => (
              <button className={c.card} key={t.id} onClick={() => open(t)}>
                <div className={c.cardImage}>
                  <img src={sampleSrc(t.id)} alt="" />
                </div>
                <div className={c.cardTitle}>
                  <strong>{t.name}</strong>
                  <span aria-hidden="true">↗︎</span>
                </div>
                <small>{t.detail}</small>
              </button>
            ))}
          </div>
        </section>
      </div>
    );

  return (
    <div
      className={c.workspace}
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes("Files")) {
          e.preventDefault();
          setDragging(true);
        }
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        void add(Array.from(e.dataTransfer.files));
      }}
    >
      {dragging && <div className={c.drop}>Drop photos to add them</div>}
      <div className={c.toolbar}>
        <button
          className={c.back}
          disabled={busy}
          onClick={() => setStudio(false)}
        >
          ← Albums
        </button>
        <h1 tabIndex={-1} ref={titleRef}>
          Album studio
        </h1>
        <button
          className={c.primary}
          disabled={busy || !groups.length}
          onClick={() => save("slides")}
        >
          Download slides <span aria-hidden="true">↓</span>
        </button>
      </div>
      <div className={c.workgrid}>
        <section className={c.stage} aria-label="Slide preview">
          <div className={c.stageHeader}>
            <span>{photos.length ? "Your album" : "Sample album"}</span>
            <span>4:5 · 1080 × 1350</span>
          </div>
          {group.length > 0 && photo ? (
            <AlbumCanvas
              photos={group}
              layout={template.id}
              index={slideIndex}
              title={heading}
              selected={photo.id}
              onSelect={setSelected}
              onEdit={edit}
            />
          ) : (
            <div className={c.empty}>Add photos to begin</div>
          )}
          <div className={c.pager}>
            <button
              disabled={slideIndex === 0}
              onClick={() => setSelected(groups[slideIndex - 1][0].id)}
              aria-label="Previous slide"
            >
              ←
            </button>
            <span aria-live="polite">
              Slide {groups.length ? slideIndex + 1 : 0} of {groups.length}
            </span>
            <button
              disabled={slideIndex >= groups.length - 1}
              onClick={() => setSelected(groups[slideIndex + 1][0].id)}
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </section>
        <aside className={c.panel}>
          <div className={c.panelSection}>
            <h2>Photos</h2>
            <input
              ref={input}
              className={c.hiddenInput}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              aria-label="Choose photos"
              onChange={(e) => void add(Array.from(e.target.files || []))}
            />
            <button
              disabled={busy}
              className={c.add}
              onClick={() => input.current?.click()}
            >
              <b>＋</b>{" "}
              {busy
                ? "Working…"
                : photos.length
                  ? "Add more photos"
                  : "Add your photos"}
            </button>
            <p>
              {photos.length
                ? "Select a photo, then drag it in the preview to adjust the crop."
                : "Try the sample, or add photos from your device."}
            </p>
            <div className={c.thumbs}>
              {active.map((p, i) => (
                <button
                  key={p.id}
                  aria-label={"Select photo " + (i + 1)}
                  aria-pressed={p.id === photo?.id}
                  onClick={() => setSelected(p.id)}
                >
                  <img src={p.src} alt="" />
                </button>
              ))}
            </div>
            {photo && (
              <div className={c.photoControls}>
                <button disabled={position <= 0} onClick={() => move(-1)}>
                  Move earlier
                </button>
                <button
                  disabled={position === active.length - 1}
                  onClick={() => move(1)}
                >
                  Move later
                </button>
                {!!photos.length && (
                  <button
                    disabled={busy}
                    onClick={() =>
                      setPhotos(photos.filter((p) => p.id !== photo.id))
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>
          <div className={c.panelSection}>
            <label>
              Layout
              <select aria-label="Layout"
                value={template.id}
                onChange={(e) =>
                  setTemplate(layouts.find((t) => t.id === e.target.value)!)
                }
              >
                {layouts.map((t) => (
                  <option value={t.id} key={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Cover title
              <input
                maxLength={80}
                value={title}
                placeholder={template.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          {photo && (
            <div className={c.panelSection}>
              <div className={c.cropHead}>
                <h2>Crop</h2>
                <button
                  onClick={() => edit(photo.id, { x: 0.5, y: 0.5, zoom: 1 })}
                >
                  Reset
                </button>
              </div>
              <label className={c.slider}>
                Zoom
                <input
                  type="range"
                  step=".05"
                  min="1"
                  max="3"
                  value={photo.zoom}
                  onChange={(e) =>
                    edit(photo.id, { zoom: Number(e.target.value) })
                  }
                />
              </label>
              <details>
                <summary>Position</summary>
                {(["x", "y"] as const).map((axis) => (
                  <label className={c.slider} key={axis}>
                    {axis === "x" ? "Horizontal" : "Vertical"}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step=".01"
                      value={photo[axis]}
                      onChange={(e) =>
                        edit(photo.id, { [axis]: Number(e.target.value) })
                      }
                    />
                  </label>
                ))}
              </details>
            </div>
          )}
          <div className={c.panelSection}>
            <button
              className={c.textLink}
              disabled={busy || !group.length}
              onClick={() => save("slide")}
            >
              Save current slide ↓
            </button>
            {!!photos.length && (
              <button
                className={c.textLink}
                disabled={busy}
                onClick={() => save("originals")}
              >
                Download original photos ↓
              </button>
            )}
            <p>Your photos stay on this device.</p>
          </div>
        </aside>
      </div>
      {notice && (
        <p role="alert" className={c.notice}>
          {notice}
        </p>
      )}
    </div>
  );
}
