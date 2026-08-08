import './globals.css';
import './highlight.css';
import Header from '../components/Header';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import { Metadata } from 'next/types';
import { siteConfig, siteUrl } from '@/constants/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author.name, url: siteUrl }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: `${siteConfig.name} - Blog` }],
    },
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: '/',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto flex w-full max-w-4xl flex-col justify-between px-5 py-4 2xl:py-12">
          <div>
            <Header />
            <main className="mt-16 mb-16">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
