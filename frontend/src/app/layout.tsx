import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import '@/styles/globals.css';

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
  metadataBase: new URL('https://surlm.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'sURL',
    description: 'URL Shortener',
    url: 'https://surlm.vercel.app/',
    siteName: 'sURL',
    images: [
      {
        url: 'https://surlm.vercel.app/favicon.png',
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
    images: ['https://surlm.vercel.app/favicon.png'],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
