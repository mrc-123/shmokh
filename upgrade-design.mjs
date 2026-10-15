import fs from 'node:fs';
for(const [file,locale] of [['app/home.js','en'],['app/home-ar.js','ar']]){
let s=fs.readFileSync(file,'utf8');s=s.replace("import { useState } from 'react';","import { useState } from 'react';\nimport { Atmosphere, BrandExperience } from './brand-experience';");
s=s.replace('<section className="hero" id="home">','<section className="hero" id="home"><Atmosphere />');
s=s.replaceAll('/brand/shumokh-en.png','/brand/shumokh-full.png').replaceAll('/brand/shumokh.png','/brand/shumokh-full.png');
s=s.replace('<section className="statement">',`<BrandExperience locale="${locale}" /><section className="statement">`);
const wordmark=locale==='en'?'/brand/shumokh-en.png':'/brand/shumokh.png';
s=s.replace('<h1>',`<img className="hero-wordmark" src="${wordmark}" alt="${locale==='en'?'SHUMOKH':'شموخ'}" width="1000" height="300"/><h1>`);
fs.writeFileSync(file,s);
}
