import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SITE_URL, PAGE_URLS, structuredData } from '../app/seo.js';
const read = path => fs.readFileSync(path, 'utf8');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1].toLowerCase(), m[2]]));
for (const [locale, file] of [['en','out/index.html'],['ar','out/ar/index.html']]) {
 test(`${locale}: production canonical, language alternates, Arabic metadata and social previews`, () => {
  const html=read(file), head=html.match(/<head>([\s\S]*?)<\/head>/)[1];
  const links=[...head.matchAll(/<link\b[^>]*>/g)].map(m=>attributes(m[0]));
  const meta=Object.fromEntries([...head.matchAll(/<meta\b[^>]*>/g)].map(m=>{const a=attributes(m[0]);return [a.name||a.property,a.content];}));
  assert.equal(links.filter(a=>a.rel==='canonical').length,1);
  assert.equal(links.find(a=>a.rel==='canonical').href,PAGE_URLS[locale]);
  for(const [lang,url] of Object.entries({...PAGE_URLS,'x-default':PAGE_URLS.en})) assert.ok(links.some(a=>a.hreflang===lang&&a.href===url));
  assert.match(head,/<title>[^<]*شموخ الرفاهية[^<]*<\/title>/);
  assert.ok(meta.description.includes('جدة'));
  assert.equal(meta['og:url'],PAGE_URLS[locale]);
  assert.equal(meta['og:image'],`${SITE_URL}/brand/residence.png`);
  assert.equal(meta['twitter:card'],'summary_large_image');
  assert.equal(meta['twitter:image'],meta['og:image']);
  assert.match(meta.robots,/index, follow/); assert.doesNotMatch(meta.robots,/noindex/);
  assert.doesNotMatch(head,/netlify\.app|localhost|127\.0\.0\.1/);
 });
 test(`${locale}: content and valid factual JSON-LD exist without browser JavaScript`,()=>{
  const html=read(file),visible=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
  assert.equal((visible.match(/<h1\b/g)||[]).length,1);
  for(const text of ['2,995','3,998','38,000','45,000','id="furnished"','id="unfurnished"'])assert.ok(visible.includes(text));
  assert.ok(visible.includes(locale==='ar'?'غرفة وصالة':'1 bedroom + living room'));
  const json=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const org=json['@graph'].find(n=>n['@type']==='Organization');
  assert.deepEqual(org.telephone,['+966508847996','+966538159915']);
  for(const field of ['address','aggregateRating','review','openingHours'])assert.equal(org[field],undefined);
  assert.equal(json['@graph'].filter(n=>n['@type']==='Service').length,2);
  assert.equal(json['@graph'].find(n=>n['@type']==='WebPage').inLanguage,locale);
 });
 test(`${locale}: all rendered images have alt and local files; small thumbnails are exported`,()=>{
  const html=read(file);
  for(const m of html.matchAll(/<img\b[^>]*>/g)){const a=attributes(m[0]);assert.ok('alt' in a);if(a.src.startsWith('/'))assert.ok(fs.existsSync(`out${a.src}`),a.src);}
  assert.match(html,/-thumb\.webp/);assert.match(html,/sizes="75px"/);
 });
}
test('Sitemap contains only the two public canonical pages',()=>{
 const xml=read('out/sitemap.xml');
 assert.deepEqual([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]),Object.values(PAGE_URLS));
 assert.doesNotMatch(xml,/netlify\.app|localhost|#|404|admin|private/);
 assert.equal((xml.match(/hreflang="ar"/g)||[]).length,2);
});
test('Robots permits public pages and assets and points to production sitemap',()=>{
 const txt=read('out/robots.txt');assert.match(txt,/User-Agent: \*/i);assert.match(txt,/Allow: \/\s/);assert.ok(txt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));assert.doesNotMatch(txt,/Disallow:\s*\/\s*(?:\r?\n|$)/i);
});
test('404 remains noindex and Netlify publishes the static export without a SPA rewrite',()=>{
 assert.match(read('out/404.html'),/name="robots" content="noindex"/);
 const config=read('netlify.toml');assert.match(config,/publish = "out"/);assert.match(config,/for = "\/404.html"[\s\S]*X-Robots-Tag = "noindex"/);assert.doesNotMatch(config,/\[\[redirects\]\]/);
});
