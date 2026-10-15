# شموخ الرفاهية — الموقع الرسمي

Next.js 16.4 App Router / React 19، مع تصدير ثابت إلى `out/`.
الإنجليزية في `/` والعربية في `/ar/`. الأقسام داخل الصفحة ليست صفحات منفصلة.

## التشغيل والتحقق

```sh
npm install
npm run dev
npm run build
npm test
```

`npm test` يفحص ملفات الإنتاج؛ شغّل البناء أولًا. الاختبارات تشمل اختبارات مولّد الشعارات الموجودة سابقًا واختبارات SEO الجديدة.

## SEO والاستضافة

- الدومين الأساسي ثابت في `app/seo.js`: https://shmokh.masaken-rc.com.sa
- `app/site-document.js`: Metadata API وJSON-LD.
- `app/sitemap.js` و`app/robots.js`: ملفات SEO تُولد وقت البناء، وتوجد في `out/` بعده.
- `netlify.toml`: أمر البناء `npm run build` ومجلد النشر `out`، دون SPA fallback.
- لا تستخدم متغيرات المعاينة أو netlify.app لتغيير canonical.
- `node scripts/prepare-seo-images.mjs` يعيد توليد مصغرات المعرض عند تغيير الصور؛ الملفات الناتجة محفوظة بالمشروع ولا يتطلب البناء تشغيل هذه الأداة.

راجع [SEO-REPORT.md](SEO-REPORT.md) للتغييرات والفحوص وحالة الدومين المنشور وخطوات Netlify وGoogle Search Console.

المعاينة المحلية لا تنشر التغييرات. لا تنفذ push أو deploy دون موافقة مالك الموقع.
