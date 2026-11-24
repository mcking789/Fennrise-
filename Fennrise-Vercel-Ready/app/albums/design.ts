import type { Template, Spread, FrameStyle } from "./collection";
export type Cover = FrameStyle | "film" | "notes" | "city";
export const treatments = {none:"Unruled", folio:"Folio divider", keyline:"Gallery mat", ticket:"Ticket perforation", spine:"Binding seam", masthead:"Masthead rule"};
export type Rule=keyof typeof treatments;
export type Design={paper:string;ink:string;accent:string;font:string;frame:Cover;spread:Spread;inset:number;rule:Rule;weight:number;numbers:boolean;titleSize:number;titleX:number;titleY:number;align:"left"|"center"|"right"};
export type Layer={id:string;text:string;x:number;y:number;size:number;font:string;color:string;angle:number;align:"left"|"center"|"right"};
export type SlideEdit={paper?:string;layers?:Layer[]};
export const faces=["Georgia","italic Georgia","bold Georgia","Arial","bold Arial","monospace"];
const series:Record<Exclude<Rule,"none">,string[]>={
  masthead:["city-grid","birthday-gazette","the-monthly-issue","street-type","the-wedding-issue"],
  spine:["monsoon-journal","campus-diary","soundcheck","menu-notes","then-and-now"],
  ticket:["passport-chapters","fest-pass","ticket-stubs","first-date","coffee-run"],
  folio:["postcard-home","class-notes","set-list","yearbook-edition","museum-catalogue"],
  keyline:["mountain-pass","four-corners","gallery-walk","family-frames","opening-night"]
};
const rules=new Map(Object.entries(series).flatMap(([r,ids])=>ids.map(id=>[id,r as Rule] as const)));
export function designFor(t:Template):Design {
  const film=t.id==="sunday-film",notes=t.id==="birthday-notes",a=t.art;
  const frame=a?.frame??(film?"film":notes?"notes":"city");
  const center=["film","arch","oval","instant","cinema"].includes(frame);
  const high=["city","notes","index","window","band","film"].includes(frame);
  return {frame,spread:a?.spread??(film?"strips":notes?"offset":"mosaic"),inset:a?.inset??(notes?78:38),
    paper:a?.paper??(film?"#181713":notes?"#f2cbd0":"#f3f0e8"),ink:a?.ink??(film?"#fff4e1":notes?"#932d42":"#171815"),
    accent:a?.accent??(film?"#ae8549":notes?"#ab4858":"#d84931"),font:a?.font??(film?"Georgia":notes?"italic Georgia":"bold Arial"),
    rule:rules.get(t.id)??"none",weight:4,numbers:true,titleSize:a?116:notes?122:154,
    titleX:center?540:Math.max(57,a?.inset??57),titleY:high?(film?240:180):1164,align:center?"center":"left"};
}
export function fontAt(face:string,size:number) {
  const family=face.replace(/^(italic|bold) /,"");
  return (face===family?"":face.split(" ")[0]+" ")+size+"px "+family;
}

export const ruledFilter=(id:string)=>rules.has(id);
