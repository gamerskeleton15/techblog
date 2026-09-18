import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Syne } from 'next/font/google';
import NavbarContainer from '@/components/NavbarContainer';
import Footer from '@/components/Footer';

// AdSense publisher ID. When unset, the adsbygoogle script is not loaded and
// AdSlot components render as placeholders. Set NEXT_PUBLIC_ADSENSE_CLIENT
// (e.g. "ca-pub-XXXXXXXXXXXX") after your AdSense account is approved.
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-syne' });

export const metadata: Metadata = {
  title: 'Tech Blog - Latest Technology News & Tutorials',
  description: 'A modern tech blog covering AI, programming, gadgets, and industry news with in-depth tutorials and reviews.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${inter.className}`}>
      <body>
        <NavbarContainer />
        <main className="min-h-screen pb-16">{children}</main>
        <Footer />
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Script
          id="monetag-in-page-push"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11830257',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        />
        <Script
          id="monetag-zone-282471"
          src="https://quge5.com/88/tag.min.js"
          data-zone="282471"
          data-cfasync="false"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
