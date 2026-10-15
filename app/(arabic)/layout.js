import SiteDocument, { siteMetadata } from '../site-document';
export const metadata = siteMetadata('ar');
export default function ArabicLayout({ children }) { return <SiteDocument locale="ar">{children}</SiteDocument>; }
