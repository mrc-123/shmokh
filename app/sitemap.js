import { PAGE_URLS, LANGUAGE_URLS } from './seo.js';
export const dynamic = 'force-static';
export default function sitemap() {
 // Section anchors and error pages are not independent indexable pages.
 return Object.values(PAGE_URLS).map(url => ({ url, alternates: { languages: LANGUAGE_URLS } }));
}
