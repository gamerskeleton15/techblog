import './globals.css';
import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import NavbarContainer from '@/components/NavbarContainer';
import Footer from '@/components/Footer';

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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3517858716332831"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
