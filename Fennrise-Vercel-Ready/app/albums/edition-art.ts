import type { Art, Template } from "./collection";
import { cropSize, type Frame, type Photo } from "./render-slides";

const box=(x:number,y:number,w:number,h:number):Frame=>({x,y,w,h});
export const slots = {diptych:2,feature:3,strips:3,columns:3,offset:2,mosaic:4};
export function editionFrames(art:Art,index:number,count:number):Frame[] {
  const m=art.inset;
  if(!index) {
    switch(art.frame) {
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

function motif(c:CanvasRenderingContext2D,a:Art) {
  c.save();c.strokeStyle=a.accent;c.fillStyle=a.accent;c.lineWidth=3;
  const x=70, y=1256;
  c.beginPath();
  switch(a.detail) {
    case "rail":
      c.moveTo(x,y);c.bezierCurveTo(230,y-54,379,y+25,500,y-15);c.stroke();
      for(const [i,k] of [0,1,2].entries()){c.beginPath();c.arc(x+k*211,y-i*7,7,0,2*Math.PI);c.fill();}break;
    case "postmark":
      c.ellipse(865,1216,100,45,-.16,0,2*Math.PI);c.stroke();c.beginPath();c.ellipse(865,1216,91,35,-.16,0,2*Math.PI);c.stroke();break;
    case "ribbon":c.moveTo(875,0);c.lineTo(931,0);c.lineTo(931,92);c.lineTo(905,72);c.lineTo(875,92);c.fill();break;
    case "perforation":c.setLineDash([9,15]);c.moveTo(30,1229);c.lineTo(1050,1229);c.stroke();break;
    case "stars": for(let i=0;i<3;i++){const cx=80+i*38,cy=y-i%2*14;c.beginPath();c.moveTo(cx,cy-15);c.quadraticCurveTo(cx,cy,cx+14,cy);c.quadraticCurveTo(cx,cy,cx,cy+15);c.quadraticCurveTo(cx,cy,cx-14,cy);c.quadraticCurveTo(cx,cy,cx,cy-15);c.fill();}break;
    case "petals":for(let i=0;i<7;i++){c.save();c.translate(906,y-10);c.rotate(i*2*Math.PI/7);c.beginPath();c.ellipse(0,-14,7,16,0,0,2*Math.PI);c.fill();c.restore();}break;
    case "ruled":for(let i=0;i<3;i++){c.moveTo(x,y+i*10);c.lineTo(410-i*50,y+i*10);}c.stroke();break;
    case "corners":for(const dx of [0,1]){c.save();c.translate(dx?1030:50,57);c.scale(dx?-1:1,1);c.beginPath();c.moveTo(0,36);c.lineTo(0,0);c.lineTo(58,0);c.stroke();c.restore();}break;
    case "waves":for(let i=0;i<3;i++){c.beginPath();c.moveTo(x,y+i*9);c.bezierCurveTo(152,y-25+i*9,220,y+27+i*9,300,y+i*9);c.stroke();}break;
    case "checker":for(let i=0;i<16;i++)c.fillRect(x+i*13,y+i%2*13,13,13);break;
  }
  c.restore();
}

export function paintEdition(c:CanvasRenderingContext2D,t:Template,photos:Photo[],index:number,title:string) {
  const a=t.art!;c.fillStyle=a.paper;c.fillRect(0,0,1080,1350);
  const frames=editionFrames(a,index,photos.length);
  frames.forEach((f,i)=>{
    const p=photos[i],sz=cropSize(p,f);
    c.save();c.beginPath();
    if(!index && a.frame==="oval") c.ellipse(f.x+f.w/2,f.y+f.h/2,f.w/2,f.h/2,0,0,2*Math.PI);
    else if(!index && a.frame==="arch") c.roundRect(f.x,f.y,f.w,f.h,[f.w/2,f.w/2,14,14]);
    else c.roundRect(f.x,f.y,f.w,f.h, a.frame==="cover" ? 0 : a.frame==="window" ? 34 : 9);
    if(a.frame==="instant"){c.fillStyle="#fff9eb";c.fillRect(f.x-14,f.y-14,f.w+28,f.h+57);}
    c.clip();c.drawImage(p.image,(p.image.naturalWidth-sz.w)*p.x,(p.image.naturalHeight-sz.h)*p.y,sz.w,sz.h,f.x,f.y,f.w,f.h);c.restore();
  });
  if(a.frame==="spine"){c.fillStyle=a.accent;c.fillRect(25,49,4,1180);c.save();c.translate(73,1025);c.rotate(-Math.PI/2);c.font="24px monospace";c.fillStyle=a.ink;c.fillText(t.name.toUpperCase(),0,0,830);c.restore();}
  if(!index){
    const topTitle=["index","band","window"].includes(a.frame);
    const center=["arch","oval","cinema","instant"].includes(a.frame);
    const y=topTitle?157:a.frame==="cinema"?1154:1192;
    if(a.frame==="cover"){const wash=c.createLinearGradient(0,820,0,1350);wash.addColorStop(0,"transparent");wash.addColorStop(1,"rgba(0,0,0,.87)");c.fillStyle=wash;c.fillRect(0,820,1080,530);}
    c.fillStyle=a.ink;c.textAlign=center?"center":"left";
    const word=title.trim()||t.title;
    const family=a.font.replace(/^(italic|bold) /,""), weight=a.font===family?"":a.font.split(" ")[0]+" ";
    let size=116;
    c.font=weight+size+"px "+family;
    while(size>34&&c.measureText(word).width>900){size-=2;c.font=weight+size+"px "+family;}
    c.fillText(word,center?540:Math.max(65,a.inset),y,900);c.textAlign="left";
  }
  motif(c,a);
  c.fillStyle=a.frame==="cover"&&!index?"#fff":a.ink;c.font="23px monospace";c.textAlign="right";c.fillText(String(index+1).padStart(2,"0"),1015,1306);c.textAlign="left";
}
