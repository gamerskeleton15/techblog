import './globals.css';
import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import NavbarContainer from '@/components/NavbarContainer';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-syne' });

export const metadata: Metadata = {
  metadataBase: new URL('https://techblog-example.com'),
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
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3517858716332831"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NavbarContainer />
        <main className="min-h-screen pb-16">{children}</main>
        <Footer />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RTZMZ4VEPD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RTZMZ4VEPD');
          `}
        </Script>
      </body>
    </html>
  );
}
