import {fontAt,type Design,type SlideEdit} from "./design";
import {cropSize,type Photo,type Frame} from "./render-slides";

let grain:HTMLCanvasElement|undefined;
function paper(c:CanvasRenderingContext2D,color:string) {
  c.fillStyle=color;c.fillRect(0,0,1080,1350);
  if(!grain){
    grain=document.createElement("canvas");grain.width=grain.height=96;
    const g=grain.getContext("2d")!,tile=g.createImageData(96,96);let seed=71;
    for(let i=0;i<tile.data.length;i+=4){
      seed=(Math.imul(seed,1664525)+1013904223)>>>0;
      tile.data[i]=tile.data[i+1]=tile.data[i+2]=(seed>>>8)&255;tile.data[i+3]=11;
    }
    g.putImageData(tile,0,0);
  }
  const pat=c.createPattern(grain,"repeat");if(pat){c.fillStyle=pat;c.fillRect(0,0,1080,1350);}
}
function photograph(c:CanvasRenderingContext2D,p:Photo,f:Frame,s:Design,cover:boolean,i:number) {
  const {x,y,w,h}=f;
  c.save();
  if(s.frame==="instant"||s.frame==="notes"){
    c.shadowColor="#24160a46";c.shadowBlur=20;c.shadowOffsetY=9;c.fillStyle="#fffaf0";
    c.fillRect(x-12,y-12,w+24,h+44);c.shadowColor="transparent";
  }
  const shape=p.shape??(cover && s.frame==="oval"?"oval":cover && s.frame==="arch"?"arch":"rectangle");
  c.beginPath();
  if(shape==="oval")c.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,2*Math.PI);
  else if(shape==="arch"){const r=Math.min(w,h)/2;c.roundRect(x,y,w,h,[r,r,2,2]);}
  else c.rect(x,y,w,h);
  c.clip();c.translate(x+w/2,y+h/2);
  if(p.flip)c.scale(-1,1);
  const q=p.turn??0;c.rotate(q*Math.PI/2);
  const dw=q%2?h:w,dh=q%2?w:h,sz=cropSize(p,f);
  c.filter="brightness("+(p.light??1)+") saturate("+(p.saturation??1)+")";
  c.drawImage(p.image,(p.image.naturalWidth-sz.w)*p.x,(p.image.naturalHeight-sz.h)*p.y,sz.w,sz.h,-dw/2,-dh/2,dw,dh);c.restore();
  if(s.frame==="notes"){
    c.save();c.translate(x+w*.46,y-6);c.rotate(i%2?.05:-.08);c.fillStyle="#ceb67bd6";c.fillRect(-63,-10,126,24);c.restore();
  }
}
function finish(c:CanvasRenderingContext2D,s:Design,frames:Frame[],index:number){
  if(s.rule==="none")return;
  c.save();c.lineWidth=s.weight;c.strokeStyle=s.accent;c.beginPath();
  switch(s.rule){
    case "folio":c.moveTo(s.inset,1269);c.lineTo(1080-s.inset,1269);break;
    case "spine":c.moveTo(34,52);c.lineTo(34,1298);break;
    case "ticket":c.setLineDash([11,14]);c.moveTo(36,1236);c.lineTo(1044,1236);break;
    case "keyline":for(const f of frames)c.rect(f.x-7,f.y-7,f.w+14,f.h+14);break;
    case "masthead":{
      const y=index?1266:Math.max(20,(frames[0]?.y??248)-16);
      c.moveTo(s.inset,y);c.lineTo(s.inset+(index?140:235),y);break;
    }
  }
  c.stroke();c.restore();
}
export function drawPage(c:CanvasRenderingContext2D,photos:Photo[],frames:Frame[],s:Design,ed:SlideEdit,index:number,title:string){
  paper(c,ed.paper??s.paper);
  photos.forEach((p,i)=>photograph(c,p,frames[i],s,index===0,i));
  if(s.frame==="film"){c.fillStyle=s.accent;for(let i=0;i<14;i++)for(const y of [20,1307]){c.beginPath();c.roundRect(40+i*76,y,32,15,3);c.fill();}}
  if(!index && title){
    if((s.frame==="cover"||s.frame==="film") && frames[0]){
      const f=frames[0],film=s.frame==="film",a=film?f.y:770,b=film?f.y+360:1350;
      const g=c.createLinearGradient(0,a,0,b);g.addColorStop(0,film?"#0006":"transparent");g.addColorStop(1,film?"transparent":"#000b");
      c.fillStyle=g;c.fillRect(f.x,a,f.w,b-a);
    }
    c.fillStyle=s.ink;c.textAlign=s.align;c.font=fontAt(s.font,s.titleSize);
    c.fillText(title,s.titleX,s.titleY,960);
  }
  finish(c,s,frames,index);
  if(s.numbers){c.fillStyle=s.frame==="film"?s.accent:s.ink;c.font="21px monospace";c.textAlign="right";c.fillText(String(index+1).padStart(2,"0"),1038,1315);}
  for(const l of ed.layers??[]){
    c.save();c.translate(l.x,l.y);c.rotate(l.angle*Math.PI/180);c.fillStyle=l.color;c.font=fontAt(l.font,l.size);c.textAlign=l.align;
    l.text.split("\n").forEach((line,i)=>c.fillText(line,0,i*l.size*1.14,1020));c.restore();
  }
}
