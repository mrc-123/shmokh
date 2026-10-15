import { SITE_URL } from './seo.js';
export const dynamic = 'force-static';
export default function robots() {
 // No private/admin/API routes currently exist; allow public pages and assets.
 return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE_URL}/sitemap.xml` };
}
