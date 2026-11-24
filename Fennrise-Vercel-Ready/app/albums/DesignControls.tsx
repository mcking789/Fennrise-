"use client";
import {useState} from "react";
import type {EditorTool} from "./AlbumDesk";
import {faces,treatments,type Design,type SlideEdit,type Layer,type Cover} from "./design";
import type {Frame,Photo} from "./render-slides";
import type {Spread} from "./collection";
import c from "./albums.module.css";

type Props={tool:EditorTool;s:Design;set:(v:Partial<Design>)=>void;slide:SlideEdit;setSlide:(v:SlideEdit)=>void;p?:Photo;frame?:Frame;edit:(v:Partial<Photo>)=>void};
function Slider({name,v,min,max,step=1,on}:{name:string;v:number;min:number;max:number;step?:number;on:(n:number)=>void}){
  return <label className={c.slider}>{name}<input aria-label={name} type="range" min={min} max={max} step={step} value={v} onChange={e=>on(Number(e.target.value))}/></label>;
}
function Palette({name,v,on}:{name:string;v:string;on:(v:string)=>void}){
  return <label>{name}<input type="color" value={v} onChange={e=>on(e.target.value)}/></label>;
}
function Choice({name,v,options,on}:{name:string;v:string;options:readonly string[];on:(v:string)=>void}){
  return <label>{name}<select value={v} onChange={e=>on(e.target.value)}>{options.map(n=><option key={n}>{n}</option>)}</select></label>;
}
export default function DesignControls({tool,s,set,slide,setSlide,p,frame,edit}:Props){
  const layers=slide.layers??[];
  const [layerId, setLayerId] = useState("");
  const layer = layers.find(item => item.id === layerId) ?? layers[0];
  function addLayer() {
    const id = crypto.randomUUID();
    setSlide({...slide, layers: [...layers, {id, text:"Your caption", font:s.font, x:540, y:1230, size:54, color:s.ink, align:"center", angle:0}]});
    setLayerId(id);
  }
  function change(id:string,v:Partial<Layer>){setSlide({...slide,layers:layers.map(l=>l.id===id?{...l,...v}:l)});}
  return <div className={c.inspector}>
    {tool === "Palette" && <>
      <div className={c.swatches}>
        <Palette name="Paper" v={s.paper} on={paper=>set({paper})}/>
        <Palette name="Ink" v={s.ink} on={ink=>set({ink})}/>
        <Palette name="Accent" v={s.accent} on={accent=>set({accent})}/>
      </div>
      <Palette name="This slide’s paper" v={slide.paper??s.paper} on={paper=>setSlide({...slide,paper})}/>
      {slide.paper&&<button className={c.textLink} onClick={()=>setSlide({...slide,paper:undefined})}>Use album paper</button>}
    </>}
    {tool === "Layout" && <>
      <div className={c.fieldPair}>
      <Choice name="Cover frame" v={s.frame} options={["film","notes","city","arch","oval","instant","band","cinema","spine","ticket","cover","window","index"]} on={frame=>set({frame:frame as Cover})}/>
      <Choice name="Inside layout" v={s.spread} options={["diptych","feature","strips","columns","offset","mosaic"]} on={spread=>set({spread:spread as Spread})}/>
      </div>
      <Slider name="Frame margin" v={s.inset} min={12} max={155} on={inset=>set({inset})}/>
    </>}
    {tool === "Lines" && <>
      <label>Line treatment<select value={s.rule} onChange={e=>set({rule:e.target.value as Design["rule"]})}>{Object.entries(treatments).map(([v,n])=><option key={v} value={v}>{n}</option>)}</select></label>
      {s.rule!=="none"&&<Slider name="Line weight" v={s.weight} min={1} max={14} on={weight=>set({weight})}/>}
      <label className={c.check}><input type="checkbox" checked={s.numbers} onChange={e=>set({numbers:e.target.checked})}/>Page numbers</label>
    </>}
    {tool === "Cover" && <>
      <Choice name="Cover typeface" v={s.font} options={faces} on={font=>set({font})}/>
      <Choice name="Cover alignment" v={s.align} options={["left","center","right"]} on={v=>set({align:v as Design["align"]})}/>
      <Slider name="Title size" v={s.titleSize} min={24} max={240} on={titleSize=>set({titleSize})}/>
      <Slider name="Title horizontal position" v={s.titleX} min={0} max={1080} on={titleX=>set({titleX})}/>
      <Slider name="Title vertical position" v={s.titleY} min={30} max={1330} on={titleY=>set({titleY})}/>
    </>}
    {tool === "Finish" && p && <>
      <div className={c.photoControls}><button onClick={()=>edit({turn:((p.turn??0)+1)%4})}>Rotate 90°</button><button aria-pressed={!!p.flip} onClick={()=>edit({flip:!p.flip})}>Mirror</button></div>
      <Slider name="Brightness" v={p.light??1} min={.4} max={1.8} step={.02} on={light=>edit({light})}/>
      <Slider name="Saturation" v={p.saturation??1} min={0} max={2} step={.02} on={saturation=>edit({saturation})}/>
    </>}
    {tool === "Frame" && p && frame && <>
      <Choice name="Photo shape" v={p.shape??"Template"} options={["Template","rectangle","arch","oval"]} on={n=>edit({shape:n==="Template"?undefined:n as Photo["shape"]})}/>
      {(["x","y","w","h"] as const).map((k,i)=><Slider key={k} name={["Frame left","Frame top","Frame width","Frame height"][i]} v={frame[k]} min={i<2?0:40} max={i%2?1350:1080} on={v=>edit({bounds:{...frame,[k]:v}})}/>)}
      <button className={c.textLink} onClick={()=>edit({bounds:undefined,shape:undefined,turn:0,flip:false,light:1,saturation:1,x:.5,y:.5,zoom:1})}>Reset photo & frame</button>
    </>}
    {(tool === "Text" || tool === "Style" || tool === "Position") && <>
      {layer && <label>Text layer<select value={layer.id} onChange={e=>setLayerId(e.target.value)}>
        {layers.map((item,index)=><option key={item.id} value={item.id}>{index+1}. {item.text.slice(0,32) || "Untitled"}</option>)}
      </select></label>}
      {layer && tool === "Text" && <>
        <label>Caption<textarea rows={2} aria-label="Layer text" value={layer.text} onChange={e=>change(layer.id,{text:e.target.value})}/></label>
        <button className={c.textLink} onClick={()=>setSlide({...slide,layers:layers.filter(item=>item.id!==layer.id)})}>Remove text</button>
      </>}
      {layer && tool === "Style" && <>
        <div className={c.fieldPair}>
          <Choice name="Typeface" v={layer.font} options={faces} on={font=>change(layer.id,{font})}/>
          <Choice name="Alignment" v={layer.align} options={["left","center","right"]} on={v=>change(layer.id,{align:v as Layer["align"]})}/>
        </div>
        <Palette name="Text colour" v={layer.color} on={color=>change(layer.id,{color})}/>
        <Slider name="Text size" min={12} max={230} v={layer.size} on={size=>change(layer.id,{size})}/>
      </>}
      {layer && tool === "Position" && <>
        <Slider name="Text left" min={0} max={1080} v={layer.x} on={x=>change(layer.id,{x})}/>
        <Slider name="Text top" min={0} max={1350} v={layer.y} on={y=>change(layer.id,{y})}/>
        <Slider name="Text angle" min={-180} max={180} v={layer.angle} on={angle=>change(layer.id,{angle})}/>
      </>}
      {(tool === "Text" || !layer) && <button className={c.add} onClick={addLayer}>Add text layer</button>}
    </>}
  </div>;
}
