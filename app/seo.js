// Fixed production origin; preview hosts must never replace the canonical host.
export const SITE_URL = 'https://shmokh.masaken-rc.com.sa';
export const PAGE_URLS = { en: `${SITE_URL}/`, ar: `${SITE_URL}/ar/` };
export const LANGUAGE_URLS = { en: PAGE_URLS.en, ar: PAGE_URLS.ar, 'x-default': PAGE_URLS.en };
export function pageSeo(locale = 'en') {
 return locale === 'ar' ? {
 title: 'شقق مفروشة وغير مفروشة للإيجار في جدة | شموخ الرفاهية',
 description: 'شموخ الرفاهية: شقق مفروشة للإيجار الشهري في الصفا والنزهة بجدة، وشقق غير مفروشة للإيجار السنوي في النزهة. تعرّف على الخيارات والأسعار واستفسر عن التوفر.',
 } : {
 title: 'شموخ الرفاهية | شقق للإيجار الشهري والسنوي في جدة',
 description: 'اكتشف شقق مساكن الرفاهية في جدة عبر موقع شموخ الرفاهية: إيجار شهري مفروش بالصفا والنزهة، وإيجار سنوي غير مفروش بالنزهة، مع تفاصيل الخيارات والتواصل.',
 };
}
export function structuredData(locale = 'en') {
 const organization = `${SITE_URL}/#organization`, website = `${SITE_URL}/#website`;
 const area = { '@type': 'City', name: 'جدة', alternateName: 'Jeddah' };
 const { title, description } = pageSeo(locale);
 return { '@context': 'https://schema.org', '@graph': [
 { '@type': 'Organization', '@id': organization, name: 'شموخ الرفاهية', alternateName: 'Shumokh Al Rafahiyah', url: `${SITE_URL}/`,
 logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/shumokh-full.png`, width: 1500, height: 429 },
 telephone: ['+966508847996', '+966538159915'],
 sameAs: ['https://www.tiktok.com/@shmokhalrfahya', 'https://haraj.com.sa/@shmokhR'] },
 { '@type': 'WebSite', '@id': website, url: `${SITE_URL}/`, name: 'شموخ الرفاهية', publisher: { '@id': organization }, inLanguage: ['ar', 'en'] },
 { '@type': 'WebPage', '@id': `${PAGE_URLS[locale]}#webpage`, url: PAGE_URLS[locale], name: title, description, inLanguage: locale, isPartOf: { '@id': website }, about: { '@id': organization } },
 { '@type': 'Service', '@id': `${SITE_URL}/#monthly-rentals`, name: 'شقق مساكن الرفاهية المفروشة للإيجار الشهري', serviceType: 'تأجير شقق مفروشة شهريًا', provider: { '@id': organization }, areaServed: area, description: 'شقق مفروشة للإيجار الشهري في مشروع 114 بالصفا ومشروع 118 بالنزهة، جدة.', url: `${PAGE_URLS[locale]}#furnished` },
 { '@type': 'Service', '@id': `${SITE_URL}/#annual-rentals`, name: 'شقق مساكن الرفاهية غير المفروشة للإيجار السنوي', serviceType: 'تأجير شقق غير مفروشة سنويًا', provider: { '@id': organization }, areaServed: area, description: 'شقق غير مفروشة من 4 أو 5 غرف في حي النزهة، جدة، للإيجار السنوي.', url: `${PAGE_URLS[locale]}#unfurnished` }
 ] };
}
