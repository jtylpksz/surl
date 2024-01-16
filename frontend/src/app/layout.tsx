import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'sURL',
  description: 'URL Shortener',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://surl.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'sURL',
    description: 'URL Shortener',
    url: 'https://surl.vercel.app',
    siteName: 'sURL',
    images: [
      {
        url: 'https://surl.vercel.app/favicon.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'sURL',
    description: 'URL Shortener',
    creator: '@martinval11_',
    images: ['https://surl.vercel.app/favicon.png'],
  },
};

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
