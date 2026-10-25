import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Syne } from 'next/font/google';
import NavbarContainer from '@/components/NavbarContainer';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-syne' });

export const metadata: Metadata = {
  metadataBase: new URL('https://techblog-six-gamma.vercel.app'),
  title: 'Tech Blog - Latest Technology News & Tutorials',
  description: 'A modern tech blog covering AI, programming, gadgets, and industry news with in-depth tutorials and reviews.',
  applicationName: 'TechBlog',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'TechBlog' }],
  keywords: ['technology blog', 'AI blog', 'programming tutorials', 'gadget reviews', 'tech news'],
  openGraph: {
    title: 'Tech Blog - Latest Technology News & Tutorials',
    description: 'A modern tech blog covering AI, programming, gadgets, and industry news with in-depth tutorials and reviews.',
    url: 'https://techblog-six-gamma.vercel.app',
    siteName: 'TechBlog',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'TechBlog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Blog - Latest Technology News & Tutorials',
    description: 'A modern tech blog covering AI, programming, gadgets, and industry news with in-depth tutorials and reviews.',
    images: ['/logo.svg'],
    creator: '@techblog',
    site: '@techblog',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo-icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${inter.className}`}>
      <body className="overflow-x-hidden bg-white text-slate-900 antialiased">
        <NavbarContainer />
        <main className="min-h-screen overflow-x-hidden pb-16">{children}</main>
        <Footer />
        <Script
          strategy="afterInteractive"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RTZMZ4VEPD"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RTZMZ4VEPD');
          `}
        </Script>
        <Script
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3517858716332831"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
