import SiteDocument, { siteMetadata } from '../site-document';
export const metadata = siteMetadata('en');
export default function EnglishLayout({ children }) { return <SiteDocument locale="en">{children}</SiteDocument>; }
