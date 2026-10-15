import sharp from 'sharp';
const base='public/brand/';
const {data,info}=await sharp('IMAGE/5.png').extract({left:880,top:75,width:2330,height:1040}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
for(let i=0;i<data.length;i+=4){if(data[i]<100 && data[i+1]<180 && data[i+2]<180)data[i+3]=0;}
await sharp(data,{raw:info}).trim().resize({width:1000}).png().toFile(base+'shumokh.png');
await sharp('IMAGE/1.png').extract({left:1520,top:0,width:1450,height:1187}).resize({width:1400}).webp({quality:90}).toFile(base+'residence.webp');
