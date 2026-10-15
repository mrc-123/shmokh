import './globals.css';
export function siteMetadata(locale = 'en') {
 const ar = locale === 'ar';
 const title = ar ? 'شموخ الرفاهية | التسويق والوساطة العقارية' : 'Shumokh Al Rafahiyah | Real Estate Marketing & Brokerage';
 const description = ar ? 'شموخ الرفاهية للتسويق العقاري، شركة مرخصة من الهيئة العامة للعقار وتحمل رخصة فال. تسويق ووساطة عقارية، وشقق مساكن الرفاهية المفروشة شهريًا وغير المفروشة سنويًا في جدة.' : 'FAL-licensed real estate marketing and brokerage, authorised by the Real Estate General Authority. Property marketing and brokerage by Shumokh, plus Masaken furnished monthly and unfurnished annual apartments in Jeddah.';
 return {title,description,openGraph:{title,description,locale:ar?'ar_SA':'en_SA',type:'website'}};
}
export default function SiteDocument({children,locale='en'}) {return <html lang={locale} dir={locale==='ar'?'rtl':'ltr'}><body>{children}</body></html>;}
