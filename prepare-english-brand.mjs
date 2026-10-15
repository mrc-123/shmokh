import sharp from 'sharp';
import fs from 'node:fs';
const {data,info}=await sharp('IMAGE/3.png').ensureAlpha().raw().toBuffer({resolveWithObject:true});
for(let i=0;i<data.length;i+=4)if(data[i+1]<190)data[i+3]=0;
await sharp(data,{raw:info}).trim().resize({width:1200}).png().toFile('public/brand/shumokh-en.png');
fs.writeFileSync('app/home.js',fs.readFileSync('app/home.js','utf8').replaceAll('/brand/shumokh.png','/brand/shumokh-en.png'));
