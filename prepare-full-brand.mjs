import sharp from 'sharp';
const {data,info}=await sharp('IMAGE/4.png').ensureAlpha().raw().toBuffer({resolveWithObject:true});
for(let i=0;i<data.length;i+=4){const r=data[i],g=data[i+1],b=data[i+2];if(r>140&&r>g*1.18&&g>b*1.10)data[i+3]=0;}
await sharp(data,{raw:info}).trim().resize({width:1500}).png().toFile('public/brand/shumokh-full.png');
