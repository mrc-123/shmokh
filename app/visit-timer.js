'use client';

import { useEffect, useState } from 'react';
import { localize } from './localize';

const storageKey = 'yemm-visit-time';

export default function VisitTimer({ locale = 'en' }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let elapsed = 0;
    try { const saved = Number(sessionStorage.getItem(storageKey)); if (Number.isFinite(saved) && saved > 0) elapsed = saved; } catch {}
    let started = document.visibilityState === 'visible' ? performance.now() : null;
    const total = () => elapsed + (started === null ? 0 : performance.now() - started);
    const save = () => { try { sessionStorage.setItem(storageKey, String(total())); } catch {} };
    const update = () => setSeconds(Math.floor(total() / 1000));
    const visibility = () => {
      if (document.visibilityState === 'hidden' && started !== null) { elapsed += performance.now() - started; started = null; }
      else if (document.visibilityState === 'visible' && started === null) started = performance.now();
      update(); save();
    };
    update();
    const interval = setInterval(() => { update(); save(); }, 1000);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('pagehide', save);
    return () => { save(); clearInterval(interval); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('pagehide', save); };
  }, []);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  const remainder = seconds % 60;
  const time = [ ...(hours ? [hours] : []), minutes, remainder ].map(value => String(value).padStart(2, '0')).join(':');
  return localize(<aside className="visit-badge" aria-label="Time spent viewing this website" title="Your time on YEMM · pauses when this tab is hidden"><svg className="visit-mark" viewBox="0 0 48 44" fill="none" aria-hidden="true"><path d="M1 3h10l12 12-7 7L1 3Z" fill="currentColor" opacity=".65"/><path d="M25 15 37 3h10L32 22l-7-7Z" fill="currentColor"/><path d="m24 19 7 7v8L17 44V26l7-7Z" fill="currentColor" opacity=".85"/></svg><span className="visit-copy"><span className="visit-label">YOUR TIME / YEMM</span><span className="visit-time" dir="ltr" role="timer" aria-live="off">{time}</span></span><span className="visit-detail" aria-hidden="true"><i/><i/><i/></span></aside>, locale);
}
