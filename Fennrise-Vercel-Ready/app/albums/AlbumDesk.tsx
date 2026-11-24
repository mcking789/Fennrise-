"use client";

import { useEffect, useRef, useState } from "react";
import {
  layouts,
  fromFile,
  framesFor,
  groupSlides,
  type Photo,
} from "./render-slides";
import { jpeg, archive, download } from "./album-files";
import FeaturedSlideshow from "./FeaturedSlideshow";
import TemplatePreview from "./TemplatePreview";
import { collectionNames } from "./collection";
import AlbumCanvas from "./AlbumCanvas";
import {designFor,ruledFilter,type Design,type SlideEdit} from "./design";
import {sampleBook} from "./sample-book";
import DesignControls from "./DesignControls";
import c from "./albums.module.css";

type Template = (typeof layouts)[number];
type Draft={template:Template;title:string;style:Design;pages:Record<number,SlideEdit>;photos:Photo[];selected:string;order:string[][]|null};
const serial = (i: number) => String(i + 1).padStart(2, "0");

export default function AlbumDesk() {
  const [template, setTemplate] = useState<Template>(layouts[0]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [category,setCategory]=useState("All");
  const [search,setSearch]=useState("");
  const [limit,setLimit]=useState(12);
  const [ruled,setRuled]=useState(false);
  const visible=layouts.filter(t=>(!ruled||ruledFilter(t.id))&&(category==="All"||t.category===category)&&(t.name+" "+t.category).toLowerCase().includes(search.trim().toLowerCase()));
  const [studio, setStudio] = useState(false);
  const [title, setTitle] = useState(layouts[0].title);
  const [style,setStyle]=useState<Design>(()=>designFor(layouts[0]));
  const [pages,setPages]=useState<Record<number,SlideEdit>>({});
  const [opened,setOpened]=useState(false);
  const drafts=useRef(new Map<string,Draft>());
  const [latest,setLatest]=useState("");
  const replacement=useRef<HTMLInputElement>(null);
  const wantedSlide=useRef(0);
  const [samples, setSamples] = useState<Photo[]>([]);
  const [order,setOrder]=useState<string[][]|null>(null);
  const [items,setItems]=useState<Photo[]|null>(null);
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
    if (!studio || items!==null) return;
    let current = true;
    setSamples([]);
    sampleBook(template)
      .then((result) => {
        if(current){setSamples(result);const g=groupSlides(result,template.id);setSelected(g[wantedSlide.current]?.[0]?.id??result[0]?.id??"");}
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
  }, [studio, template,items===null]);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    if (studio) titleRef.current?.focus({ preventScroll: true });
    else galleryButton.current?.focus({ preventScroll: true });
  }, [studio]);

  const active=items??samples;
  const photos=active.filter(p=>p.file);
  const byPhoto=new Map(active.map(p=>[p.id,p]));
  const groups=order?order.map(ids=>ids.flatMap(id=>byPhoto.get(id)??[])).filter(g=>g.length):groupSlides(active,template.id,style);
  const photo = active.find((p) => p.id === selected) || active[0];
  const slideIndex = Math.max(
    0,
    groups.findIndex((g) => g.some((p) => p.id === photo?.id)),
  );
  const group = groups[slideIndex] || [];
  const heading=title;
  const slide=pages[slideIndex]??{};
  const frame=photo?framesFor(template.id,slideIndex,group,style)[group.indexOf(photo)]:undefined;
  const position=groups.flat().findIndex(p=>p.id===photo?.id);
  function open(t:Template,initialSlide=0){
    wantedSlide.current=initialSlide;setSelected("");setOrder(null);setItems(null);setSamples([]);
    setTemplate(t);setStyle(designFor(t));setPages({});setTitle(t.title);setOpened(false);setStudio(true);setNotice("");
  }
  function back(){
    if(opened){drafts.current.set(template.id,{template,title,style,pages,photos:active,selected,order});setLatest(template.id);}
    setStudio(false);
  }
  function resume(id:string){
    const d=drafts.current.get(id);
    if(!d){open(layouts[featuredIndex]);return;}
    setTemplate(d.template);setTitle(d.title);setStyle(d.style);setPages(d.pages);setItems(d.photos);setSelected(d.selected);setOrder(d.order);
    setStudio(true);setOpened(true);setNotice("");
  }
  function edit(id:string,changes:Partial<Photo>){
    setOpened(true);setItems(active.map(p=>p.id===id?{...p,...changes}:p));
  }
  async function replacePhoto(file?:File){
    if(!file||!photo||busy)return;
    setBusy(true);
    try{
      const next=await fromFile(file);
      edit(photo.id,{image:next.image,src:next.src,name:next.name,file,id:photo.id,x:.5,y:.5,zoom:1});
    }catch{setNotice("Could not open that photo.");}
    finally{setBusy(false);if(replacement.current)replacement.current.value="";}
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
    if(added.length){setOpened(true);setItems([...(photos.length||order?active:[]),...added]);if(order)setOrder([...order,...groupSlides(added,template.id,style).map(g=>g.map(v=>v.id))]);}
    if (added.length) setSelected(added[0].id);
    if (added.length < files.length)
      setNotice("Some photos could not be opened. Try JPG, PNG or WebP.");
    setBusy(false);
    if (input.current) input.current.value = "";
  }
  function move(offset: number) {
    const flat=groups.flat();const pos=flat.findIndex(p=>p.id===photo.id);
    const next = [...flat];
    [next[pos], next[pos + offset]] = [
      next[pos + offset],
      next[pos],
    ];
    if(order){let n=0;setOrder(groups.map(g=>g.map(()=>next[n++].id)));}
    setOpened(true);setItems(next);
    setSelected(photo.id);
  }
  function changePage(action:"copy"|"delete"|"earlier"|"later"){
    const list=groups.map((g,i)=>({photos:g,edit:pages[i]??{}}));
    let target=slideIndex;
    if(action==="copy"){
      list.splice(slideIndex+1,0,{photos:group.map(p=>({...p,id:crypto.randomUUID()})),edit:structuredClone(slide)});
      target++;
    }else if(action==="delete"){
      if(list.length<=1)return;
      list.splice(slideIndex,1);target=Math.min(slideIndex,list.length-1);
    }else{
      target+=action==="earlier"?-1:1;
      if(target<0||target>=list.length)return;
      [list[target],list[slideIndex]]=[list[slideIndex],list[target]];
    }
    setItems(list.flatMap(p=>p.photos));setOrder(list.map(p=>p.photos.map(v=>v.id)));
    setPages(Object.fromEntries(list.map((p,i)=>[i,p.edit])));setSelected(list[target].photos[0].id);setOpened(true);
  }
  async function save(kind: "slides" | "originals" | "slide") {
    setBusy(true);
    setNotice("");
    try {
      const slug =
        heading.replace(/[^\p{L}\p{N}]+/gu, "-").slice(0, 60) || "album";
      if (kind === "slide")
        download(
          await jpeg(group, template.id, slideIndex, heading,style,slide),
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
            blob: await jpeg(g, template.id, i, heading,style,pages[i]),
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
                onClick={() => latest?resume(latest):open(layouts[featuredIndex])}
              >
                {latest ? "Resume album" : "Create an album"}{" "}
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
          <FeaturedSlideshow index={featuredIndex} onSelect={setFeaturedIndex}
            onOpen={() => open(layouts[featuredIndex])} />
        </section>
        <section
          id="album-templates"
          ref={libraryRef}
          tabIndex={-1}
          className={c.collection}
        >
          <div className={c.collectionHead}>
            <h2>The templates</h2>
            <span>{layouts.length} layouts</span>
          </div>
          <div className={c.filters}>
            <button className={c.ruleFilter} aria-pressed={ruled} onClick={()=>{setRuled(!ruled);setLimit(12);}}>Line editions · 25</button>
            <input type="search" aria-label="Search templates" placeholder="Search templates" value={search} onChange={e=>{setSearch(e.target.value);setLimit(12);}} />
            <select aria-label="Collection" value={category} onChange={e=>{setCategory(e.target.value);setLimit(12);}}>{["All",...collectionNames].map(n=><option key={n} value={n}>{n==="All"?"All collections":n}</option>)}</select>
          </div>
          <div className={c.cards}>
            {visible.slice(0,limit).map((t) => (
              <article className={c.card} key={t.id}>
                <div className={c.cardTriptych}>
                  {[0,1,2].map(i=><button key={i} aria-label={"Edit "+t.name+", slide "+(i+1)} onClick={()=>open(t,i)}><TemplatePreview template={t} slide={i}/></button>)}
                </div>
                <button className={c.cardLabel} onClick={()=>open(t)}><strong>{t.name}</strong><span aria-hidden="true">↗</span></button>
                <small>{t.detail}{t.signature?" · Signature":""}</small>
                {drafts.current.has(t.id)&&<button className={c.draft} onClick={()=>resume(t.id)}>Resume edits</button>}
              </article>
            ))}
          </div>
          {!visible.length && <p>No layouts match your search.</p>}
          {visible.length>limit && <button className={c.more} onClick={()=>setLimit(limit+12)}>Show more templates ({visible.length-limit})</button>}
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
          onClick={back}
        >
          ← Albums
        </button>
        <h1 tabIndex={-1} ref={titleRef}>
          {template.name}
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
              title={heading} style={style} slide={slide}
              selected={photo.id}
              onSelect={setSelected}
              onEdit={edit}
            />
          ) : (
            <div className={c.empty}>{items===null&&!notice?"Loading sample photos…":"Add photos to begin"}</div>
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
                <input ref={replacement} className={c.hiddenInput} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Replace selected photo" onChange={e=>void replacePhoto(e.target.files?.[0])}/>
                <button disabled={busy} onClick={()=>replacement.current?.click()}>Replace photo</button>
                <button disabled={position <= 0} onClick={() => move(-1)}>
                  Move earlier
                </button>
                <button
                  disabled={position === active.length - 1}
                  onClick={() => move(1)}
                >
                  Move later
                </button>
                {photo && (
                  <button
                    disabled={busy}
                    onClick={() =>
                      (setOpened(true),setItems(active.filter((p) => p.id !== photo.id)))
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
                disabled={busy} onChange={e=>{
                  const t=layouts.find(v=>v.id===e.target.value)!;
                  if(items===null){setSamples([]);wantedSlide.current=0;}
                  setTemplate(t);setStyle(designFor(t));setTitle(t.title);setPages({});setOrder(null);setOpened(true);
                }}
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
                onChange={e=>{setTitle(e.target.value);setOpened(true);}}
              />
            </label>
          </div>
          {groups.length>0&&<div className={c.panelSection}><h2>Slide {slideIndex+1}</h2><div className={c.photoControls}>
            <button disabled={busy||slideIndex===0} onClick={()=>changePage("earlier")}>Move slide earlier</button>
            <button disabled={busy||slideIndex===groups.length-1} onClick={()=>changePage("later")}>Move slide later</button>
            <button disabled={busy} onClick={()=>changePage("copy")}>Duplicate slide</button>
            <button disabled={busy||groups.length===1} onClick={()=>changePage("delete")}>Remove slide</button>
          </div></div>}
          <DesignControls s={style} set={v=>{if(v.spread)setOrder(null);setStyle({...style,...v});setOpened(true);}} slide={slide}
            setSlide={v=>{setPages({...pages,[slideIndex]:v});setOpened(true);}} p={photo} frame={frame} edit={v=>photo&&edit(photo.id,v)}/>
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
