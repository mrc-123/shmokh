'use client';

import { useState } from 'react';
import { localize } from './localize';

function Arrow() { return <svg className="arrow" viewBox="0 0 32 24" fill="none" aria-hidden="true"><path d="M2 12h26M20 4l8 8-8 8" stroke="currentColor" strokeWidth="1.5" /></svg>; }

export function ServicePreview({ index, locale = 'en' }) {
  return localize(<div className={`service-preview preview-${index}`} aria-hidden="true">
    <span className="preview-label">{['INTERFACE STUDY', 'IDENTITY SYSTEM', 'INTERACTION STUDY'][index]}</span>
    {index === 0 ? <div className="mini-interface"><span>Y / DIGITAL</span><strong>Less friction.<br />More possibility.</strong><div className="mini-bars"><i/><i/><i/></div><span className="mini-action">Explore →</span></div> : index === 1 ? <><img src="/brand/yemm.png" alt="" width="210" height="44" loading="lazy"/><div className="mini-swatches"><i/><i/><i/></div></> : <div className="tech-orbit"><i/><i/><i/><span>Y</span></div>}
  </div>, locale);
}

export function Philosophy({ locale = 'en' }) {
  return localize(<section className="section philosophy" aria-labelledby="philosophy-title">
    <div className="section-top"><p className="eyebrow">03 / Our philosophy</p><span className="philosophy-arabic" lang="ar" dir="rtl">جذور راسخة. آفاق مفتوحة.</span></div>
    <h2 id="philosophy-title">The future is open.<br /><em>Our roots give it meaning.</em></h2>
    <div className="principle-grid">{[
      ['01', 'Meaning before form.', 'Every choice starts with a reason. We look for the story, the people and the purpose behind an idea.'],
      ['02', 'Craft in every detail.', 'A clear structure, a thoughtful interaction, a precise finish. Small decisions shape the whole experience.'],
      ['03', 'Curiosity moves us forward.', 'We explore technology with an open mind, turning new possibilities into experiences that feel human.'],
    ].map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
  </section>, locale);
}

const study = [
  { title: 'The idea', description: 'Bring heritage and future technology into one visual language. The ambition is a digital identity that feels personal in origin and global in expression.', caption: 'ORIGIN → POSSIBILITY' },
  { title: 'The visual language', description: 'Angular marks, open space and a restrained teal palette create a coherent system. Arabic and English share the same presence without losing their individual character.', caption: 'GEOMETRY → IDENTITY' },
  { title: 'The digital experience', description: 'The identity becomes an interface: clear navigation, deliberate typography and gentle depth. Interaction adds character while keeping the content easy to explore.', caption: 'IDENTITY → EXPERIENCE' },
];

export function Spotlight({ locale = 'en' }) {
  const [chapter, setChapter] = useState(0);
  return localize(<section id="spotlight" className="section spotlight" aria-labelledby="spotlight-title">
    <div className="section-top"><p className="eyebrow">04 / In focus</p><span className="section-note">YEMM identity · Studio concept</span></div>
    <div className="spotlight-heading"><h2 id="spotlight-title">One origin.<br /><em>A whole new expression.</em></h2><p>A closer look at how YEMM’s identity moves from a meaningful name into a digital world.</p></div>
    <div className="spotlight-stage">
      <span className="stage-label">YEMM — BRAND & DIGITAL EXPLORATION</span>
      <div className="brand-poster"><span>ROOTED / FORWARD</span><img src="/brand/yemm-arabic.png" alt="YEMM Arabic identity" width="360" height="115" loading="lazy"/><small>TECHNOLOGY BY HERITAGE</small><i/></div>
      <div className="spotlight-browser"><div className="browser-chrome"><span><i/><i/><i/></span><span>YEMM / DIGITAL CONCEPT</span><span>↗</span></div><div className="browser-content"><img src="/brand/yemm.png" alt="YEMM English identity" width="170" height="36" loading="lazy"/><span className="browser-menu">DESIGN & TECHNOLOGY</span><div className="browser-sculpture" aria-hidden="true"><i/><i/><i/></div><p>Built on roots.<br /><em>Made for tomorrow.</em></p><span className="browser-pill">EXPLORE THE POSSIBILITIES ↗</span></div></div>
      <div className="stage-swatches" aria-label="Brand colors"><span>TEAL / #168783</span><i/><i/><i/></div><span className="stage-caption" aria-live="polite">{study[chapter].caption}</span>
    </div>
    <div className="study-details"><div className="study-tabs" role="group" aria-label="Explore the concept">{study.map((item, index) => <button key={item.title} aria-pressed={chapter === index} onClick={() => setChapter(index)}><span>0{index + 1}</span>{item.title}<span className="study-indicator" aria-hidden="true">↗</span></button>)}</div><div className="study-copy" aria-live="polite" aria-atomic="true"><p className="eyebrow">The thinking behind the concept</p><h3>{study[chapter].title}</h3><p>{study[chapter].description}</p><span>YEMM / A studio concept in identity and digital craft.</span></div></div>
  </section>, locale);
}

const palettes = [
  { name: 'Heritage teal', color: '#95ddd1', background: '#123d3e', accent: '#45aaa3' },
  { name: 'Soft jade', color: '#dcf0db', background: '#2d4a40', accent: '#94c5a3' },
  { name: 'Warm stone', color: '#eee4d1', background: '#45453e', accent: '#b5a484' },
];

export function StudioLab({ locale = 'en' }) {
  const [spread, setSpread] = useState(18);
  const [rotation, setRotation] = useState(0);
  const [palette, setPalette] = useState(0);
  const [mode, setMode] = useState('form');
  const theme = palettes[palette];
  function reset() { setSpread(18); setRotation(0); setPalette(0); setMode('form'); }
  return localize(<section id="lab" className="section studio-lab" aria-labelledby="lab-title">
    <div className="section-top"><p className="eyebrow">06 / YEMM Lab</p><span className="lab-status"><i/> A space for curiosity</span></div>
    <div className="section-heading"><h2 id="lab-title">Don’t just imagine.<br /><em>Experiment.</em></h2><p>Explore the geometry behind our visual world. Change the form, shift the palette and make the idea your own.</p></div>
    <div className="lab-layout">
      <div className="lab-canvas" style={{ '--lab-color': theme.color, '--lab-bg': theme.background, '--lab-accent': theme.accent }}>
        <div className="lab-canvas-top"><span>EXPERIMENT / 001</span><span>{mode === 'form' ? 'GEOMETRIC COMPOSITION' : 'IDENTITY COMPOSITION'}</span></div>
        <div className={`lab-art ${mode}`} style={{ '--spread': `${spread}px`, '--rotation': `${rotation}deg` }} aria-hidden="true"><svg viewBox="0 0 440 360" fill="none"><path className="lab-wing left-wing" d="M35 62H122L211 151 166 196Z"/><path className="lab-wing right-wing" d="M229 151 319 62H406L274 196Z"/><path className="lab-wing center-wing" d="m218 176 49 46v68l-91 67V218Z"/></svg>{mode === 'identity' && <span>TECHNOLOGY BY HERITAGE</span>}</div>
        <div className="lab-canvas-bottom"><span>FORM × LIGHT × POSSIBILITY</span><span>Y / LAB</span></div>
      </div>
      <div className="lab-controls"><p className="eyebrow">Your creative playground</p><h3>A small shift. <br />A new perspective.</h3><div className="lab-mode" role="group" aria-label="Composition mode"><button aria-pressed={mode === 'form'} onClick={() => setMode('form')}>Form</button><button aria-pressed={mode === 'identity'} onClick={() => setMode('identity')}>Identity</button></div>
        <label className="range-label" htmlFor="lab-spread">Space between shapes <output htmlFor="lab-spread">{spread}</output><input id="lab-spread" type="range" min="0" max="45" value={spread} onChange={event => setSpread(Number(event.target.value))}/></label>
        <label className="range-label" htmlFor="lab-rotation">Perspective <output htmlFor="lab-rotation">{rotation}°</output><input id="lab-rotation" type="range" min="-25" max="25" value={rotation} onChange={event => setRotation(Number(event.target.value))}/></label>
        <fieldset className="palette-controls"><legend>Color direction</legend>{palettes.map((item, index) => <button key={item.name} aria-label={item.name} aria-pressed={palette === index} onClick={() => setPalette(index)} style={{ '--swatch': item.color }}><span aria-hidden="true"/></button>)}<span className="palette-name" aria-live="polite">{theme.name}</span></fieldset>
        <button className="lab-reset" onClick={reset}>Reset experiment <span aria-hidden="true">↺</span></button><p className="lab-note">An interactive studio study. Built to explore, made to play.</p>
      </div>
    </div>
  </section>, locale);
}

export function ClosingStatement({ locale = 'en' }) {
  return localize(<section className="section closing-statement" aria-labelledby="closing-title"><p className="eyebrow">An idea worth pursuing.</p><h2 id="closing-title">Let’s make something<br /><em>worth seeing.</em></h2><a className="button primary" href="#contact">Start a project <Arrow/></a><div className="closing-signature"><img src="/brand/yemm.png" alt="YEMM" width="280" height="60" loading="lazy"/><span aria-hidden="true">×</span><img src="/brand/yemm-arabic.png" alt="يَمّ" width="230" height="74" loading="lazy"/></div><p className="closing-tagline">ONE ORIGIN. OPEN POSSIBILITIES.</p></section>, locale);
}
