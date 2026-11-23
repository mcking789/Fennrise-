export type FrameStyle = "arch"|"oval"|"instant"|"band"|"cinema"|"spine"|"ticket"|"cover"|"window"|"index";
export type Spread = "diptych"|"feature"|"strips"|"columns"|"offset"|"mosaic";
export type Detail = "postmark"|"rail"|"ribbon"|"perforation"|"stars"|"petals"|"ruled"|"corners"|"waves"|"checker";
export type Art = {frame:FrameStyle;spread:Spread;detail:Detail;paper:string;ink:string;accent:string;font:string;inset:number};
export type Template = {id:string;name:string;title:string;detail:string;category:string;samples:readonly string[];signature:boolean;art?:Art};
type Recipe = [name:string,frame:FrameStyle,spread:Spread,motif:Detail,paper:string,ink:string,accent:string,font:string,inset:number];
const serif="Georgia", italic="italic Georgia", sans="bold Arial", mono="monospace";
function collection(category:string,samples:string[],recipes:Recipe[]):Template[] {
  return recipes.map(([name,frame,spread,detail,paper,ink,accent,font,inset],i)=>({
    id:name.toLowerCase().replace(/[^a-z0-9]+/g,"-"), name,title:name,category,
    detail:category+" · "+({arch:"Arched portrait",oval:"Oval portrait",instant:"Instant prints",band:"Colour band",cinema:"Widescreen",spine:"Book spine",ticket:"Ticket stub",cover:"Full bleed",window:"Inset window",index:"Index card"}[frame]),
    samples:[...samples.slice(i%3),...samples.slice(0,i%3)],signature:i>=4,art:{frame,spread,detail,paper,ink,accent,font,inset}
  }));
}
export const editions:Template[]=[
...collection("Travel",["drive","coast","dusk"],[
["Window Seat","window","strips","rail","#dae4dd","#19372c","#6f8a55",serif,74],
["Postcard Home","index","columns","postmark","#f3e6ce","#522b24","#a43f38",italic,57],
["Beach Roll","cinema","strips","waves","#232b31","#fff1bb","#f8a75b",mono,26],
["Mountain Pass","arch","feature","corners","#d7d7c3","#303d29","#967846",sans,96],
["Monsoon Journal","spine","offset","rail","#bfcab1","#243b33","#a4482d",italic,69],
["Passport Chapters","ticket","mosaic","postmark","#172f3d","#fff1d0","#d6a755",serif,47]]),
...collection("Friends",["campus","friends","coast"],[
["Photo Booth","cinema","strips","perforation","#251e23","#f3ddd1","#db8e99",mono,48],
["Group Chat","band","offset","ruled","#e8eac6","#252f2b","#789134",sans,64],
["Disposable Camera","cover","columns","corners","#151e21","#fff0b8","#f28835",mono,30],
["At Our Place","arch","diptych","checker","#d7dce7","#302e49","#b57876",serif,83],
["Weekend Zine","index","mosaic","checker","#eacd59","#211f19","#bc4237",sans,40],
["The Reunion Issue","oval","feature","ribbon","#342a36","#ffeac6","#d7a46a",italic,87]]),
...collection("Birthdays",["party","candles","friends"],[
["Candle Count","band","columns","stars","#f2d298","#532728","#b54652",serif,54],
["Party Strip","cinema","strips","checker","#332443","#fdeed5","#f3a05c",sans,38],
["Wish List","index","offset","ruled","#e8ecda","#485e44","#ab7773",italic,95],
["Cherry on Top","oval","diptych","petals","#f4ccca","#602539","#ab3c54",serif,62],
["Birthday Gazette","spine","mosaic","ruled","#e9debd","#242724","#994630",sans,44],
["Midnight Invitation","arch","feature","stars","#191c39","#f1e4be","#d6ae67",italic,101]]),
...collection("Campus",["campus","station","friends"],[
["Campus Diary","spine","offset","ruled","#e2d4ba","#3c3529","#47766a",serif,61],
["Class Notes","index","columns","corners","#ecebd9","#26354c","#9d534f",mono,79],
["Fest Pass","ticket","strips","perforation","#232d35","#edfae5","#d4df44",sans,47],
["Hostel Wall","instant","mosaic","ribbon","#b58766","#241a19","#f3d3a4",italic,60],
["Yearbook Edition","oval","mosaic","rail","#23384c","#f2e6c5","#d1b377",serif,95],
["Backstage Pass","band","feature","perforation","#eb814e","#222224","#593a75",sans,39]]),
...collection("Music",["gig","dusk","campus"],[
["Set List","index","strips","ruled","#e8e3ca","#232b26","#bd6141",mono,61],
["Ticket Stubs","ticket","columns","postmark","#843542","#fff0c7","#e1aa63",serif,75],
["Flash Photos","cover","offset","stars","#27232b","#fff1dc","#c4a5ec",sans,41],
["Soundcheck","spine","diptych","waves","#24403f","#f2e8ca","#8dc0a5",mono,56],
["After Hours","cinema","feature","rail","#32181e","#f8dfb1","#b46358",italic,27],
["Tour Programme","band","mosaic","checker","#e4d1ac","#232131","#794677",sans,88]]),
...collection("Weddings",["marigold","party","roof"],[
["Haldi Hues","arch","offset","petals","#f5ce63","#582b19","#a8582e",serif,61],
["Mehendi Notes","spine","columns","petals","#d0d3a6","#2d452e","#9b6538",italic,73],
["Family Frames","instant","mosaic","corners","#e7d6b7","#452d28","#9d6357",serif,87],
["Flower Market","window","strips","waves","#e9ab82","#4a272a","#924559",italic,49],
["The Wedding Issue","index","feature","ribbon","#4b263b","#fae5bb","#dfa856",serif,55],
["Wedding Weekend","oval","offset","postmark","#fbebce","#57412c","#a26866",italic,110]]),
...collection("Couples",["roof","coast","dusk"],[
["Two of Us","window","diptych","ribbon","#eac9bd","#543637","#83546c",serif,47],
["First Date","ticket","feature","perforation","#e6c0a4","#542c32","#a45159",italic,74],
["Little Things","instant","offset","corners","#d2e0da","#2d4540","#859764",serif,96],
["Then and Now","spine","diptych","rail","#34322e","#f5e4ca","#d6a163",mono,63],
["Love Letters","index","offset","postmark","#ebd8c9","#582e3b","#9b5166",italic,88],
["Anniversary Book","arch","columns","ribbon","#3b2430","#f6dfc5","#e0b075",serif,103]]),
...collection("Everyday",["roof","drive","market"],[
["Lately","band","strips","corners","#d9d6c5","#2f3930","#718358",sans,40],
["Camera Roll","cinema","mosaic","perforation","#1f2829","#e4e8cf","#cca764",mono,55],
["One Good Day","cover","diptych","waves","#604b3d","#fff3d8","#efca7b",italic,40],
["Four Corners","window","mosaic","corners","#eeeada","#2c322e","#ae5e45",sans,104],
["The Monthly Issue","spine","feature","checker","#b9c5ca","#252a3b","#9a4544",serif,54],
["A Week in Objects","index","columns","rail","#f4deb4","#4b3b29","#bb8055",mono,77]]),
...collection("Food",["thali","market","party"],[
["Table for Two","oval","diptych","checker","#e9beaa","#6d302c","#a25638",serif,74],
["Menu Notes","spine","strips","ruled","#e8e5c9","#41492f","#a98547",italic,52],
["Coffee Run","ticket","offset","perforation","#c8a583","#3c2922","#82593d",mono,62],
["Street Eats","band","mosaic","rail","#ecc04f","#34291e","#a94b30",sans,36],
["Supper Club","arch","feature","checker","#403326","#f6e7c7","#d4a978",serif,89],
["Recipe Heirloom","instant","columns","ribbon","#e4d8bc","#47332a","#966547",italic,83]]),
...collection("Culture",["station","gig","taxi"],[
["Street Type","spine","mosaic","corners","#dcdad1","#191c20","#d34a38",sans,39],
["Gallery Walk","window","diptych","rail","#e9e4db","#242826","#929276",serif,118],
["Night Bus","cinema","offset","waves","#172333","#e4edf3","#8cb5c3",mono,36],
["Record Sleeve","oval","columns","waves","#c78683","#382936","#815466",sans,67],
["Museum Catalogue","index","feature","corners","#d4c6a9","#293632","#996b43",serif,106],
["Opening Night","cover","strips","stars","#241b2b","#fff0d9","#bd9ab3",italic,59]])
];
export const collectionNames=[...new Set(editions.map(item=>item.category))];
