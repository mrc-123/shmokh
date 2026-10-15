'use client';

import { useEffect, useRef, useState } from 'react';
import { createConceptSvg, logoConcept, safeColor } from './logo-engine';

const copy = {
  en: {
    eyebrow: 'YEMM / EXPERIENCE', title: 'Every world starts', emphasis: 'with one idea.', intro: 'Choose a direction. Watch a spark become an identity, an interface and something you can actually touch.',
    options: ['A new brand', 'A digital product', 'An unexpected experience'], hints: ['Give an idea its own voice.', 'Turn a purpose into a useful tool.', 'Make curiosity feel tangible.'], enter: 'Bring the idea to life', skip: 'Continue exploring ↓', choose: 'Choose your starting point', close: 'Leave experience', scroll: 'Scroll to shape the idea',
    steps: ['Identity', 'Interface', 'Interaction'], titles: ['First, a character.', 'Then, a digital world.', 'Finally, a little magic.'], descriptions: ['A direction takes shape through geometry, color and a distinctive point of view.', 'The same visual language becomes a space to explore. Identity turns into a usable experience.', 'Try the prototype. One small action makes the idea respond — the moment design becomes technology.'], next: 'Next chapter', finish: 'See your creation', demo: 'Try the interaction', resetDemo: 'Try again', response: 'Your idea is taking shape.',
    ending: 'You just saw an idea transform.', endEmphasis: 'Imagine what we could make of yours.', download: 'Keep your creation', contact: 'Let’s build your idea', restart: 'Try another direction', saved: 'Your concept card is ready as an SVG image.', error: 'The card could not be downloaded. Please try again.', saving: 'Preparing your card…', cardLine: 'Your first idea, shaped with YEMM.', prototype: 'INTERACTIVE CONCEPT', view: 'VIEW /', downloadNote: 'A little piece of the experience to take with you.',
    names: ['ORIGIN', 'NEXUS', 'BEYOND'], headlines: ['A story with a new voice.', 'A simpler way forward.', 'Curiosity opens new worlds.'], labels: ['Discover the identity', 'Explore the product', 'Open the possibilities'], pulses: ['Identity unlocked.', 'Connection established.', 'A new perspective unlocked.'], sample: 'A creative demonstration, shaped by your choice.'
  },
  ar: {
    eyebrow: 'يَمّ / التجربة', title: 'كل عالم يبدأ', emphasis: 'بفكرة واحدة.', intro: 'اختر اتجاهًا، وشاهد شرارة تتحوّل إلى هوية وواجهة وتجربة يمكنك التفاعل معها.',
    options: ['علامة جديدة', 'منتج رقمي', 'تجربة غير مألوفة'], hints: ['امنح الفكرة صوتها الخاص.', 'حوّل الغاية إلى أداة مفيدة.', 'امنح الفضول شكلًا ملموسًا.'], enter: 'امنح الفكرة حياة', skip: 'تابع استكشاف الموقع ↓', choose: 'اختر نقطة البداية', close: 'غادر التجربة', scroll: 'مرّر لتشكّل الفكرة',
    steps: ['الهوية', 'الواجهة', 'التفاعل'], titles: ['أولًا، شخصية.', 'ثم، عالم رقمي.', 'وأخيرًا، لمسة تُدهش.'], descriptions: ['يتشكّل الاتجاه من الهندسة واللون ورؤية تحمل شخصيتها الخاصة.', 'تتحوّل اللغة البصرية نفسها إلى مساحة للاستكشاف. تصبح الهوية تجربة قابلة للاستخدام.', 'جرّب النموذج. حركة بسيطة تجعل الفكرة تستجيب؛ هنا يتحوّل التصميم إلى تقنية.'], next: 'الفصل التالي', finish: 'شاهد ما صنعت', demo: 'جرّب التفاعل', resetDemo: 'جرّب مجددًا', response: 'فكرتك تتشكّل أمامك.',
    ending: 'رأيت فكرة تتحوّل أمامك.', endEmphasis: 'تخيّل ما يمكن أن نصنعه لفكرتك.', download: 'احتفظ بما صنعت', contact: 'لنصنع فكرتك', restart: 'جرّب اتجاهًا آخر', saved: 'بطاقة فكرتك جاهزة كصورة SVG قابلة للتنزيل.', error: 'تعذّر تنزيل البطاقة. جرّب مجددًا.', saving: 'نجهّز بطاقتك…', cardLine: 'صُنعت فكرتك الأولى مع يَمّ.', prototype: 'تصوّر تفاعلي', view: 'المشهد /', downloadNote: 'تفصيلة من التجربة، لتأخذها معك.',
    names: ['الجذور', 'صلة', 'آفاق'], headlines: ['قصة تجد صوتًا جديدًا.', 'طريق أبسط إلى الأمام.', 'الفضول يفتح عوالم جديدة.'], labels: ['اكتشف الهوية', 'استكشف المنتج', 'افتح الإمكانات'], pulses: ['هوية جديدة ترى النور.', 'اتصال يفتح الإمكانات.', 'رؤية جديدة أصبحت ممكنة.'], sample: 'تجربة إبداعية تتشكّل باختيارك.'
  },
};
const themes = [
  { name: 'origin', accent: '#b4e7d0', secondary: '#54aaa0' },
  { name: 'nexus', accent: '#abdee4', secondary: '#61acb7' },
  { name: 'beyond', accent: '#e1e8bd', secondary: '#a3b684' },
];

function Mark({ type = 0, concept }) {
  if (concept) return <svg className="experience-mark generated-mark" viewBox="0 0 400 340" aria-hidden="true" style={{ background:concept.surface }}><g dangerouslySetInnerHTML={{ __html: concept.shape }}/></svg>;
  return <svg className={`experience-mark mark-${type}`} viewBox="0 0 400 340" fill="none" aria-hidden="true"><path className="mark-piece piece-a" d="M30 40h85l76 86-45 49Z"/><path className="mark-piece piece-b" d="m213 126 79-86h84L257 175Z"/><path className="mark-piece piece-c" d="m201 150 43 45v72l-85 62V195Z"/>{type === 1 && <path className="mark-link" d="M50 218h66m169 0h65M200 5v25"/>}{type === 2 && <circle className="mark-ring" cx="201" cy="165" r="150"/>}</svg>;
}

function BrandBrief({brief,update,copy}) {
  return <div className="experience-brief"><p className="eyebrow">{copy.title}</p><label>{copy.name}<input name="name" required maxLength={32} value={brief.name} onChange={update} placeholder={copy.nameHint} autoComplete="organization" dir="auto"/></label><label>{copy.idea}<textarea name="idea" required minLength={10} maxLength={240} rows={3} value={brief.idea} onChange={update} placeholder={copy.ideaHint} dir="auto"/></label><div className="brief-colors"><label>{copy.primary}<input type="color" name="primary" value={safeColor(brief.primary)} onChange={update}/><input className="brief-hex" type="text" name="primary" aria-label={`${copy.primary} HEX`} dir="ltr" pattern="#[0-9a-fA-F]{6}" required maxLength={7} value={brief.primary} onChange={update}/></label><label>{copy.secondary}<input type="color" name="secondary" value={safeColor(brief.secondary)} onChange={update}/><input className="brief-hex" type="text" name="secondary" aria-label={`${copy.secondary} HEX`} dir="ltr" pattern="#[0-9a-fA-F]{6}" required maxLength={7} value={brief.secondary} onChange={update}/></label></div><label>{copy.style}<select name="style" value={brief.style} onChange={update}>{['geometric','soft','monogram'].map((value,index)=><option key={value} value={value}>{copy.styles[index]}</option>)}</select></label><p className="brief-note">{copy.note}</p></div>;
}

function dataUrl(blob) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(blob); }); }
const escapeXml = text => text.replace(/[<>&"']/g, character => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&apos;' }[character]));

export default function Experience({ locale = 'en' }) {
  const c = copy[locale];
  const [choice, setChoice] = useState(0);
  const [entered, setEntered] = useState(false);
  const [phase, setPhase] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [brief, setBrief] = useState({name:'',idea:'',primary:'#95ddd1',secondary:'#54aaa0',style:'geometric'});
  const [variant, setVariant] = useState(0);
  const section = useRef(null);
  const chapters = useRef([]);
  const final = useRef(null);
  const selectedChapter = useRef(null);
  const theme = themes[choice];
  const concept = brief.name.trim() && brief.idea.trim() ? logoConcept(brief,variant) : null;
  const ar = locale === 'ar';
  const personal = ar ? {
    title:'فكرتك هي نقطة البداية',name:'اسم مشروعك',nameHint:'مثلًا: مدار',idea:'صف فكرتك',ideaHint:'ما الذي تقدّمه، ولمن؟ مثلًا: منصة تقنية تربط المبدعين بالعملاء',primary:'اللون الأساسي',secondary:'اللون المساند',style:'أسلوب الشعار',styles:['هندسي','ناعم','حرف من الاسم'],note:'تصوّر أولي يُنشأ محليًا من الاسم وكلمات الفكرة وألوانك، دون إرسالها إلى أي خدمة.',regenerate:'اقترح شكلًا آخر',edit:'عدّل فكرتك وألوانك',logo:'نزّل الشعار SVG',explain:'اتجاه التصميم',categories:{nature:'شكل عضوي مستوحى من الطبيعة',structure:'بنية مستوحاة من العمارة',technology:'روابط هندسية مستوحاة من التقنية',creative:'تكوين إبداعي من الدائرة والهندسة'},preview:'معاينة مباشرة',generated:'شعارك الأولي',ready:'ملفك جاهز للتنزيل.'
  } : {title:'Your idea is the starting point',name:'Project name',nameHint:'For example: Orbit',idea:'Describe your idea',ideaHint:'What do you offer, and for whom? For example: a digital platform connecting creatives with clients',primary:'Primary color',secondary:'Supporting color',style:'Logo style',styles:['Geometric','Soft','Name initial'],note:'A local concept built from your name, idea keywords and colors. Your brief stays in this browser.',regenerate:'Explore another form',edit:'Edit your idea & colors',logo:'Download logo SVG',explain:'Design direction',categories:{nature:'Organic forms inspired by nature',structure:'A structure inspired by architecture',technology:'Geometric connections inspired by technology',creative:'A creative balance of circles and geometry'},preview:'Live preview',generated:'Your logo concept',ready:'Your file is ready to download.'};
  function updateBrief(event) { setBrief(current=>({...current,[event.target.name]:event.target.value}));setVariant(0); }
  function begin(event) { event.preventDefault();setEntered(true);selectedChapter.current=null;setPhase(0);setStatus('');setInteracted(false); }
  useEffect(() => {
    if (!entered) return;
    section.current?.querySelector('.experience-toolbar button')?.focus({ preventScroll: true });
    const observer = new IntersectionObserver(entries => {
      if (selectedChapter.current !== null) return;
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setPhase(Number(visible[0].target.dataset.chapter));
    }, { rootMargin: '-25% 0px -35% 0px', threshold: [0, .2, .5] });
    chapters.current.forEach(chapter => chapter && observer.observe(chapter));
    return () => observer.disconnect();
  }, [entered]);
  function scrollTo(element) { element?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }); }
  function goTo(index) { selectedChapter.current = null; setPhase(index); scrollTo(chapters.current[index]); }
  function selectChapter(index) { selectedChapter.current = index; setPhase(index); }
  function leave() { setEntered(false); setInteracted(false); setStatus(''); requestAnimationFrame(() => { scrollTo(section.current); section.current?.querySelector('.experience-enter')?.focus({ preventScroll:true }); }); }
  async function download(mode = 'card') {
    setSaving(true); setStatus('');
    try {
      if (concept) {
        let font = '';
        if (concept.arabic || ar || brief.style==='monogram') { const response=await fetch('/fonts/mar.ttf');if(!response.ok)throw new Error('Font unavailable');font=await dataUrl(await response.blob()); }
        const svg=createConceptSvg(concept,{card:mode!=='logo',font,signature:c.cardLine});
        const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
        const link=document.createElement('a');link.href=url;link.download=`YEMM-${mode}-${concept.id}.svg`;link.click();setTimeout(()=>URL.revokeObjectURL(url),10000);setStatus(personal.ready);return;
      }
      const logoResponse = await fetch('/brand/yemm.png');
      if (!logoResponse.ok) throw new Error('Asset unavailable');
      const logo = await dataUrl(await logoResponse.blob());
      let font = '';
      if (locale === 'ar') { const response = await fetch('/fonts/mar.ttf'); if (!response.ok) throw new Error('Font unavailable'); font = await dataUrl(await response.blob()); }
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#1d7773"/><stop offset="1" stop-color="#092f32"/></linearGradient><style>${font ? `@font-face{font-family:Mar;src:url('${font}')} ` : ''}text{font-family:${font ? 'Mar' : 'Arial'},sans-serif;fill:#eff8ef}</style></defs><rect width="1200" height="800" fill="url(#bg)"/><path d="M0 650 650 0h350L350 800H0Z" fill="${theme.secondary}" opacity=".08"/><rect x="35" y="35" width="1130" height="730" fill="none" stroke="${theme.accent}" opacity=".35"/><image href="${logo}" x="80" y="85" width="240" height="51"/><text x="1110" y="122" text-anchor="end" font-size="16">YEMM / EXPERIENCE / 0${choice+1}</text><g transform="translate(400 160)" fill="${theme.accent}"><path opacity=".65" d="M30 40h85l76 86-45 49Z"/><path d="m213 126 79-86h84L257 175Z"/><path opacity=".85" d="m201 150 43 45v72l-85 62V195Z"/></g><text x="600" y="565" text-anchor="middle" direction="${locale === 'ar' ? 'rtl' : 'ltr'}" font-size="52">${escapeXml(c.names[choice])}</text><text x="600" y="625" text-anchor="middle" direction="${locale === 'ar' ? 'rtl' : 'ltr'}" font-size="28">${escapeXml(c.cardLine)}</text><text x="600" y="710" text-anchor="middle" direction="${locale === 'ar' ? 'rtl' : 'ltr'}" font-size="18" opacity=".7">${escapeXml(c.options[choice])}</text></svg>`;
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
      const link = document.createElement('a'); link.href = url; link.download = `YEMM-${theme.name}-${locale}.svg`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 10000); setStatus(c.saved);
    } catch { setStatus(c.error); }
    finally { setSaving(false); }
  }
  return <section id="experience" ref={section} className={`section experience ${entered ? 'is-entered' : ''}`} aria-labelledby="experience-title" style={{ '--experience-accent': theme.accent, '--experience-secondary': theme.secondary }}>
    <div className="experience-top"><p className="eyebrow">{c.eyebrow}</p><span className="experience-edition">01 — 03 / {locale === 'ar' ? 'من الفكرة إلى عالم رقمي' : 'FROM IDEA TO DIGITAL WORLD'}</span></div>
    {!entered ? <div className="experience-entry"><form onSubmit={begin}><h2 id="experience-title">{c.title}<br/><em>{c.emphasis}</em></h2><p className="experience-intro">{c.intro}</p><BrandBrief brief={brief} update={updateBrief} copy={personal}/><fieldset className="experience-choices"><legend>{c.choose}</legend>{c.options.map((option,index) => <label key={option} className={choice===index ? 'chosen' : ''}><input type="radio" name="experience-choice" value={index} checked={choice===index} onChange={()=>setChoice(index)}/><span className="choice-number">0{index+1}</span><span><strong>{option}</strong><small>{c.hints[index]}</small></span><span className="choice-arrow" aria-hidden="true">↗</span></label>)}</fieldset><button type="submit" className="button primary experience-enter">{c.enter}<span aria-hidden="true">↗</span></button><a className="experience-skip" href="#lab">{c.skip}</a></form><div className="experience-spark" aria-hidden="true"><div className="spark-orbit"/><Mark type={choice} concept={concept}/><span>{concept ? personal.preview : `Y / 00${choice+1}`}</span>{concept && <strong className="concept-preview-name" dir="auto">{concept.name}</strong>}</div></div> : <>
      <div className="experience-toolbar"><h2 id="experience-title" dir="auto">{concept?.name || c.options[choice]}</h2><button className="experience-follow" onClick={()=>goTo(phase)}>{c.scroll} ↓</button><button onClick={leave}>{c.close} ×</button></div>
      <div className="experience-journey"><div className="experience-sticky"><div className="experience-view-top"><span>{c.prototype}</span><span>{c.view} 0{phase+1}</span></div><div className={`experience-scene phase-${phase} ${interacted ? 'has-interacted' : ''}`}>
        <div className="scene-identity" aria-hidden={phase!==0}><Mark type={choice} concept={concept}/><strong dir="auto">{concept?.name || c.names[choice]}</strong><div className="scene-swatches"><i/><i/><i/></div></div>
        <div className="scene-interface" aria-hidden={phase===0}><div className="scene-window-top"><span>Y / {concept?.id || themes[choice].name.toUpperCase()}</span><i/><i/><i/></div><div className="scene-window-body"><Mark type={choice} concept={concept}/><h3 dir="auto">{concept?.name || c.headlines[choice]}</h3>{concept && <p className="concept-interface-idea" dir="auto">{concept.idea}</p>}{choice===1 && <div className="product-signals" aria-hidden="true"><i/><i/><i/><i/></div>}<span className="scene-caption">{c.labels[choice]}</span>{phase===2 && <button className="scene-demo" aria-pressed={interacted} onClick={()=>setInteracted(!interacted)}>{interacted ? c.resetDemo : c.demo}<span aria-hidden="true">↗</span></button>}{phase===2 && <p className="scene-response" role="status">{interacted ? c.pulses[choice] : c.response}</p>}</div></div>
      </div><nav className="experience-phases" aria-label={locale==='ar' ? 'فصول التجربة' : 'Experience chapters'}>{c.steps.map((step,index)=><button key={step} aria-current={phase===index?'step':undefined} onClick={()=>selectChapter(index)}><span>0{index+1}</span>{step}<i/></button>)}</nav></div>
      <div className="experience-chapters">{c.titles.map((title,index)=><article key={title} ref={element=>{chapters.current[index]=element;}} data-chapter={index} className="experience-chapter"><span className="chapter-number">0{index+1}</span><p className="eyebrow">{c.steps[index]}</p><h3>{title}</h3><p>{c.descriptions[index]}</p><button className="chapter-next" onClick={()=> index<2 ? goTo(index+1) : scrollTo(final.current)}>{index<2 ? c.next : c.finish}<span aria-hidden="true">↓</span></button></article>)}</div></div>
      <div className="experience-finale" ref={final}><p className="eyebrow">{c.sample}</p><h3>{c.ending}<br/><em>{c.endEmphasis}</em></h3><div className="experience-finale-actions"><button className="button primary" onClick={()=>download()} disabled={saving}>{saving?c.saving:c.download}<span aria-hidden="true">↓</span></button><button className="button concept-logo-download" onClick={()=>download('logo')} disabled={saving}>{personal.logo}<span aria-hidden="true">↓</span></button><a href="#contact" className="button">{c.contact}<span aria-hidden="true">↗</span></a></div><p className="experience-download-note">{concept ? `${personal.explain}: ${personal.categories[concept.category]}` : c.downloadNote}</p><p className="experience-download-status" role="status">{status}</p><div className="concept-refine"><button className="experience-restart" onClick={()=>{setVariant(current=>current+1);setInteracted(false);setStatus('');selectChapter(0);}}>{personal.regenerate} ↺</button><button className="experience-restart" onClick={leave}>{personal.edit} ↗</button></div></div>
    </>}
  </section>;
}
