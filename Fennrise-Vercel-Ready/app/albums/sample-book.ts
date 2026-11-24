import type {Template} from "./collection";
import {loadPhoto,type Photo} from "./render-slides";

const covers:Record<string,string>={market:"40536246",taxi:"37003338",station:"18205633",friends:"5804893",cake:"9627770",candles:"30401226"};
const previews=new Map<string,Promise<Photo[]>>();
const editors=new Map<string,Promise<Photo[]>>();
export function sampleBook(t:Template,small=false){
  const cache=small?previews:editors;
  const saved=cache.get(t.id);
  if(saved)return saved;
  const result=Promise.all(t.samples.map(name=>{
    const id=covers[name]??name;
    if(!/^\d+$/.test(id))return loadPhoto("/albums/"+name+".webp",name+".webp");
    const url="https://images.pexels.com/photos/"+id+"/pexels-photo-"+id+".jpeg?auto=compress&cs=tinysrgb&w="+(small?440:1440);
    return loadPhoto(url,name+".jpg").catch(()=>loadPhoto("/api/album-photo/"+id+(small?"?preview=1":""),name+".jpg"));
  })).catch(error=>{cache.delete(t.id);throw error;});
  cache.set(t.id,result);
  if(cache.size>(small?15:2))cache.delete(cache.keys().next().value!);
  return result;
}
