// A local, deterministic concept generator. No user text is interpreted as SVG.
export const escapeXml = text => String(text).replace(/[<>&"']/g, character => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&apos;' }[character]));
export const safeColor = value => /^#[0-9a-f]{6}$/i.test(value) ? value : '#95ddd1';
const luminance = color => {
  const channels = safeColor(color).slice(1).match(/../g).map(value=>parseInt(value,16)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4);
  return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
};
export function previewSurface(primary, secondary) {
  const contrast=(a,b)=>(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
  const colors=[luminance(primary),luminance(secondary)];
  return Math.min(...colors.map(c=>contrast(c,.025))) >= Math.min(...colors.map(c=>contrast(c,.88))) ? '#102e32' : '#f0f1e9';
}
const hash = text => Array.from(text).reduce((result, letter) => Math.imul(result ^ letter.codePointAt(0), 16777619) >>> 0, 2166136261);
export function logoConcept(brief, variant = 0) {
  const name = brief.name.trim().slice(0, 32);
  const idea = brief.idea.trim().slice(0, 240);
  const seed = hash(`${name}|${idea}|${brief.style}|${variant}`);
  const category = /طبيع|بيئ|نبات|زراع|ورود|حديق|nature|plant|eco|flower|farm/i.test(idea) ? 'nature' : /عمار|عقار|بناء|منزل|هندس|arch|home|build|estate/i.test(idea) ? 'structure' : /تقن|برمج|ذكاء|تطبيق|شبك|tech|code|data|app|digital|software/i.test(idea) ? 'technology' : 'creative';
  const primary = safeColor(brief.primary);
  const secondary = safeColor(brief.secondary);
  const soft = brief.style === 'soft';
  const angle = ((seed % 5) - 2) * 8;
  const weight = 13 + seed % 7;
  const radius = 66 + seed % 18;
  let shape;
  if (brief.style === 'monogram') {
    const initial = Array.from(name.replace(/[^\p{L}\p{N}]/gu, ''))[0] || 'Y';
    shape = `<rect x="85" y="55" width="230" height="230" rx="${soft ? 65 : 20 + seed % 25}" transform="rotate(${angle} 200 170)" stroke="${secondary}" stroke-width="8" fill="none"/><text x="200" y="215" text-anchor="middle" font-family="Mar,Arial,sans-serif" font-size="145" fill="${primary}">${escapeXml(initial.toUpperCase())}</text>`;
  } else if (category === 'nature') {
    const petals = 4 + seed % 3;
    shape = Array.from({length:petals}, (_, i) => `<ellipse cx="200" cy="122" rx="${soft ? 30 : 20}" ry="65" fill="${i % 2 ? secondary : primary}" transform="rotate(${i * 360 / petals + angle} 200 170)" opacity=".9"/>`).join('') + `<circle cx="200" cy="170" r="22" fill="${secondary}"/>`;
  } else if (category === 'structure') {
    shape = `<path d="M90 278V116L200 48 310 116V278H${200+weight}V155H${200-weight}V278Z" fill="${primary}"/><path d="M125 255V139L200 94 275 139V255" fill="none" stroke="${secondary}" stroke-width="${weight}" stroke-linejoin="${soft ? 'round' : 'miter'}"/><path d="M75 292h250" stroke="${secondary}" stroke-width="7"/>`;
  } else if (category === 'technology') {
    shape = `<path d="M110 100 200 55 290 100v140l-90 45-90-45Z" fill="none" stroke="${primary}" stroke-width="${weight}" stroke-linejoin="${soft ? 'round' : 'miter'}"/><path d="m110 100 90 70 90-70M200 170v115" fill="none" stroke="${secondary}" stroke-width="${weight}"/>` + [[110,100],[200,170],[290,100]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${12+seed%6}" fill="${secondary}"/>`).join('');
  } else {
    shape = `<g transform="rotate(${angle} 200 170)"><path d="m200 45 115 125-115 125L85 170Z" fill="none" stroke="${primary}" stroke-width="${weight}" stroke-linejoin="${soft ? 'round' : 'miter'}"/><circle cx="200" cy="170" r="${radius}" fill="none" stroke="${secondary}" stroke-width="${weight}"/><path d="M170 170h60M200 140v60" stroke="${primary}" stroke-width="${weight}" stroke-linecap="${soft ? 'round' : 'square'}"/></g>`;
  }
  shape = `<g transform="rotate(${(variant % 5) * 3} 200 170)">${shape}</g>`;
  return { name, idea, primary, secondary, category, shape, surface:previewSurface(primary,secondary), id: seed.toString(16).slice(0, 6).toUpperCase(), arabic: /[\u0600-\u06ff]/.test(name+idea) };
}

export function createConceptSvg(concept, { card = false, font = '', signature = '' } = {}) {
  const {name, idea, primary, secondary, shape, arabic, id} = concept;
  const width = card ? 1200 : 900;
  const height = card ? 800 : 650;
  const titleSize = Math.min(56, 650 / Math.max(Array.from(name).length * .65, 1));
  const fontRule = font ? `@font-face{font-family:Mar;src:url('${font}')}` : '';
  const cardBackground = concept.surface;
  const ink = cardBackground === '#102e32' ? '#eff8ef' : '#153a36';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><title>${escapeXml(name)}</title><desc>${escapeXml(idea)}</desc><defs><style>${fontRule}text{font-family:Mar,Arial,sans-serif}</style></defs>${card ? `<rect width="1200" height="800" fill="${cardBackground}"/><rect x="35" y="35" width="1130" height="730" fill="none" stroke="${secondary}" opacity=".5"/><text x="80" y="110" fill="${ink}" font-size="16">YEMM / CONCEPT ${id}</text>` : ''}<g transform="translate(${width/2-200} ${card?115:30})">${shape}</g><text x="${width/2}" y="${card?535:450}" text-anchor="middle" direction="${arabic?'rtl':'ltr'}" font-size="${titleSize}" fill="${card?ink:primary}">${escapeXml(name)}</text>${card ? `<text x="600" y="600" text-anchor="middle" direction="${arabic?'rtl':'ltr'}" fill="${ink}" font-size="24">${escapeXml(Array.from(idea).slice(0,65).join(''))}${Array.from(idea).length>65?'…':''}</text><text x="600" y="715" text-anchor="middle" direction="${/[\u0600-\u06ff]/.test(signature)?'rtl':'ltr'}" fill="${ink}" font-size="24">${escapeXml(signature)}</text>` : ''}</svg>`;
}
