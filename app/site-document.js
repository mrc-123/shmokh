import './globals.css';
import { SITE_URL, PAGE_URLS, LANGUAGE_URLS, pageSeo, structuredData } from './seo.js';
export function siteMetadata(locale = 'en') {
 const { title, description } = pageSeo(locale);
 const image = { url: `${SITE_URL}/brand/residence.png`, width: 1448, height: 1086, alt: 'مبنى سكني من الصور التعريفية لشموخ الرفاهية في جدة' };
 return {
 metadataBase: new URL(SITE_URL), title, description,
 alternates: { canonical: PAGE_URLS[locale], languages: LANGUAGE_URLS },
 robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
 openGraph: { title, description, url: PAGE_URLS[locale], siteName: 'شموخ الرفاهية', locale: locale === 'ar' ? 'ar_SA' : 'en_US', alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_SA'], type: 'website', images: [image] },
 twitter: { card: 'summary_large_image', title, description, images: [{ url: image.url, alt: image.alt }] },
 };
}
export default function SiteDocument({ children, locale = 'en' }) {
 return <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, '\\u003c') }} /></body></html>;
}
