"use client";
import {faces,treatments,type Design,type SlideEdit,type Layer,type Cover} from "./design";
import type {Frame,Photo} from "./render-slides";
import type {Spread} from "./collection";
import c from "./albums.module.css";

type Props={s:Design;set:(v:Partial<Design>)=>void;slide:SlideEdit;setSlide:(v:SlideEdit)=>void;p?:Photo;frame?:Frame;edit:(v:Partial<Photo>)=>void};
function Slider({name,v,min,max,step=1,on}:{name:string;v:number;min:number;max:number;step?:number;on:(n:number)=>void}){
  return <label className={c.slider}>{name}<input aria-label={name} type="range" min={min} max={max} step={step} value={v} onChange={e=>on(Number(e.target.value))}/></label>;
}
function Palette({name,v,on}:{name:string;v:string;on:(v:string)=>void}){
  return <label>{name}<input type="color" value={v} onChange={e=>on(e.target.value)}/></label>;
}
function Choice({name,v,options,on}:{name:string;v:string;options:readonly string[];on:(v:string)=>void}){
  return <label>{name}<select value={v} onChange={e=>on(e.target.value)}>{options.map(n=><option key={n}>{n}</option>)}</select></label>;
}
export default function DesignControls({s,set,slide,setSlide,p,frame,edit}:Props){
  const layers=slide.layers??[];
  function change(id:string,v:Partial<Layer>){setSlide({...slide,layers:layers.map(l=>l.id===id?{...l,...v}:l)});}
  return <div className={c.inspector}>
    <details><summary>Album design</summary>
      <div className={c.swatches}>
        <Palette name="Paper" v={s.paper} on={paper=>set({paper})}/>
        <Palette name="Ink" v={s.ink} on={ink=>set({ink})}/>
        <Palette name="Accent" v={s.accent} on={accent=>set({accent})}/>
      </div>
      <Choice name="Cover frame" v={s.frame} options={["film","notes","city","arch","oval","instant","band","cinema","spine","ticket","cover","window","index"]} on={frame=>set({frame:frame as Cover})}/>
      <Choice name="Inside layout" v={s.spread} options={["diptych","feature","strips","columns","offset","mosaic"]} on={spread=>set({spread:spread as Spread})}/>
      <Slider name="Frame margin" v={s.inset} min={12} max={155} on={inset=>set({inset})}/>
      <label>Line treatment<select value={s.rule} onChange={e=>set({rule:e.target.value as Design["rule"]})}>{Object.entries(treatments).map(([v,n])=><option key={v} value={v}>{n}</option>)}</select></label>
      {s.rule!=="none"&&<Slider name="Line weight" v={s.weight} min={1} max={14} on={weight=>set({weight})}/>}
      <label className={c.check}><input type="checkbox" checked={s.numbers} onChange={e=>set({numbers:e.target.checked})}/>Page numbers</label>
    </details>
    <details><summary>Cover typography</summary>
      <Choice name="Cover typeface" v={s.font} options={faces} on={font=>set({font})}/>
      <Choice name="Cover alignment" v={s.align} options={["left","center","right"]} on={v=>set({align:v as Design["align"]})}/>
      <Slider name="Title size" v={s.titleSize} min={24} max={240} on={titleSize=>set({titleSize})}/>
      <Slider name="Title horizontal position" v={s.titleX} min={0} max={1080} on={titleX=>set({titleX})}/>
      <Slider name="Title vertical position" v={s.titleY} min={30} max={1330} on={titleY=>set({titleY})}/>
    </details>
    {p&&frame&&<details><summary>Selected photo & frame</summary>
      <div className={c.photoControls}><button onClick={()=>edit({turn:((p.turn??0)+1)%4})}>Rotate 90°</button><button aria-pressed={!!p.flip} onClick={()=>edit({flip:!p.flip})}>Mirror</button></div>
      <Slider name="Brightness" v={p.light??1} min={.4} max={1.8} step={.02} on={light=>edit({light})}/>
      <Slider name="Saturation" v={p.saturation??1} min={0} max={2} step={.02} on={saturation=>edit({saturation})}/>
      <Choice name="Photo shape" v={p.shape??"Template"} options={["Template","rectangle","arch","oval"]} on={n=>edit({shape:n==="Template"?undefined:n as Photo["shape"]})}/>
      {(["x","y","w","h"] as const).map((k,i)=><Slider key={k} name={["Frame left","Frame top","Frame width","Frame height"][i]} v={frame[k]} min={i<2?0:40} max={i%2?1350:1080} on={v=>edit({bounds:{...frame,[k]:v}})}/>)}
      <button className={c.textLink} onClick={()=>edit({bounds:undefined,shape:undefined,turn:0,flip:false,light:1,saturation:1,x:.5,y:.5,zoom:1})}>Reset photo & frame</button>
    </details>}
    <details><summary>This slide · text & paper</summary>
      <Palette name="Slide paper" v={slide.paper??s.paper} on={paper=>setSlide({...slide,paper})}/>
      {slide.paper&&<button className={c.textLink} onClick={()=>setSlide({...slide,paper:undefined})}>Use album paper</button>}
      {layers.map((l,i)=><fieldset key={l.id}><legend>Text {i+1}</legend>
        <label>Text<textarea aria-label="Layer text" value={l.text} onChange={e=>change(l.id,{text:e.target.value})}/></label>
        <Choice name="Text typeface" v={l.font} options={faces} on={font=>change(l.id,{font})}/>
        <Palette name="Text colour" v={l.color} on={color=>change(l.id,{color})}/>
        <Choice name="Text alignment" v={l.align} options={["left","center","right"]} on={n=>change(l.id,{align:n as Layer["align"]})}/>
        <Slider name="Text size" min={12} max={230} v={l.size} on={size=>change(l.id,{size})}/>
        <Slider name="Text left" min={0} max={1080} v={l.x} on={x=>change(l.id,{x})}/>
        <Slider name="Text top" min={0} max={1350} v={l.y} on={y=>change(l.id,{y})}/>
        <Slider name="Text angle" min={-180} max={180} v={l.angle} on={angle=>change(l.id,{angle})}/>
        <button className={c.textLink} onClick={()=>setSlide({...slide,layers:layers.filter(v=>v.id!==l.id)})}>Remove text</button>
      </fieldset>)}
      <button className={c.add} onClick={()=>setSlide({...slide,layers:[...layers,{id:crypto.randomUUID(),text:"Your caption",font:s.font,x:540,y:1230,size:54,color:s.ink,align:"center",angle:0}]})}>Add text layer</button>
    </details>
  </div>;
}
