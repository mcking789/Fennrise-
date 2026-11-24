import type { Design } from "./design";
import type { Frame } from "./render-slides";

const box=(x:number,y:number,w:number,h:number):Frame=>({x,y,w,h});
export const slots = {diptych:2,feature:3,strips:3,columns:3,offset:2,mosaic:4};
export function editionFrames(art:Design,index:number,count:number):Frame[] {
  const m=art.inset;
  if(!index && count===1) {
    switch(art.frame) {
      case "film":return [box(m,63,1080-2*m,1222)];
      case "city":return [box(m,246,1080-2*m,1010)];
      case "notes":return [box(m,276,1080-2*m,920)];
      case "cover": return [box(0,0,1080,1350)];
      case "oval": return [box(m+34,188,1012-m*2,875)];
      case "arch": return [box(m,124,1080-m*2,962)];
      case "spine": return [box(152+m,103,870-m,1005)];
      case "ticket": return [box(m,95,1080-2*m,908)];
      case "instant": return [box(m+22,107,1036-2*m,908)];
      case "band": return [box(0,320,1080,933)];
      case "cinema": return [box(0,238,1080,773)];
      case "index": return [box(m,291,1080-2*m,856)];
      default: return [box(m,200,1080-2*m,864)];
    }
  }
  const l=m,r=1080-m,w=r-l,top=100,bottom=1198,h=bottom-top,gap=22;
  if(count===1) return [box(l,top,w,h)];
  if(art.spread==="feature" || art.spread==="mosaic" && count===3) {
    const lead=Math.round(h*.62),thumb=(w-gap*(count-2))/(count-1);
    return [box(l,top,w,lead),...Array.from({length:count-1},(_,i)=>box(l+i*(thumb+gap),top+lead+gap,thumb,h-lead-gap))];
  }
  if(art.spread==="columns"||art.spread==="diptych") {
    const col=(w-gap*(count-1))/count;
    return Array.from({length:count},(_,i)=>box(l+i*(col+gap),top+(i%2)*56,col,h-(i%2)*56));
  }
  if(art.spread==="offset") return [box(l,top,w*.83,h*.49),box(l+w*.17,top+h*.52,w*.83,h*.48)];
  const cols=art.spread==="mosaic"?2:1,rows=Math.ceil(count/cols),cw=(w-gap*(cols-1))/cols,ch=(h-gap*(rows-1))/rows;
  return Array.from({length:count},(_,i)=>box(l+i%cols*(cw+gap),top+Math.floor(i/cols)*(ch+gap),cw,ch));
}

