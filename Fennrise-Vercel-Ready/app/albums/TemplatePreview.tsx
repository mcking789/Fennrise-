"use client";
import { useEffect,useRef } from "react";
import type { Template } from "./collection";
import { paint,loadPhoto,type Photo } from "./render-slides";

const samples=new Map<string,Promise<Photo>>();
function sample(name:string) {
  let value=samples.get(name);
  if(!value){value=loadPhoto("/albums/"+name+".webp",name).catch(error=>{samples.delete(name);throw error;});samples.set(name,value);}
  return value;
}
export default function TemplatePreview({template}:{template:Template}){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current!;
    let alive=true;
    async function draw(){
      const photos=await Promise.all(template.samples.map(sample));
      if(!alive)return;
      const context=canvas.getContext("2d")!;
      const tile=document.createElement("canvas");tile.width=240;tile.height=300;
      [[photos[0]],photos.slice(1,3),[photos[photos.length-1]]].forEach((group,i)=>{
        paint(tile,group,template.id,i,template.title);context.drawImage(tile,i*244,0);
      });
    }
    const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();draw().catch(()=>{});}},{rootMargin:"400px"});
    observer.observe(canvas);
    return ()=>{alive=false;observer.disconnect();};
  },[template]);
  return <canvas ref={ref} width={728} height={300} aria-label={template.name+" sample slides"}/>;
}
