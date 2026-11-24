"use client";
import {useEffect,useRef,useState} from "react";
import type {Template} from "./collection";
import {sampleBook} from "./sample-book";
import {groupSlides,paint} from "./render-slides";

export default function TemplatePreview({template,slide}:{template:Template;slide?:number}){
  const ref=useRef<HTMLCanvasElement>(null),[failed,setFailed]=useState(false);
  useEffect(()=>{
    const canvas=ref.current!;let alive=true;
    async function draw(){
      const groups=groupSlides(await sampleBook(template,true),template.id);
      if(!alive)return;
      if(slide!==undefined)paint(canvas,groups[slide],template.id,slide,template.title);
      else{
        const c=canvas.getContext("2d")!,tile=document.createElement("canvas");tile.width=320;tile.height=400;
        groups.slice(0,3).forEach((g,i)=>{paint(tile,g,template.id,i,template.title);c.drawImage(tile,i*324,0);});
      }
    }
    const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();draw().catch(()=>{if(alive)setFailed(true);});}},{rootMargin:"220px"});
    observer.observe(canvas);return()=>{alive=false;observer.disconnect();};
  },[template,slide]);
  return <><canvas ref={ref} width={slide===undefined?968:432} height={slide===undefined?400:540} aria-label={template.name+(slide===undefined?" sample slides":", slide "+(slide+1))}/>{failed&&<span>Preview unavailable</span>}</>;
}
