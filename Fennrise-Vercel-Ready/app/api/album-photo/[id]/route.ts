import sets from "../../../albums/photo-sets.json";
const allowed=new Set([...Object.values(sets).flat(),"40536246","37003338","18205633","5804893","9627770","30401226"]);
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  if(!allowed.has(id))return new Response(null,{status:404});
  const size=new URL(request.url).searchParams.get("preview")==="1"?440:1440;
  const response=await fetch("https://images.pexels.com/photos/"+id+"/pexels-photo-"+id+".jpeg?auto=compress&cs=tinysrgb&w="+size,{next:{revalidate:2592000}});
  if(!response.ok||!response.headers.get("content-type")?.startsWith("image/"))return new Response(null,{status:502});
  return new Response(response.body,{headers:{"Content-Type":response.headers.get("content-type")!,"Cache-Control":"public, max-age=2592000, s-maxage=2592000"}});
}
