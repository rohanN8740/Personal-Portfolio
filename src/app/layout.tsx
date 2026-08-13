import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  title: 'Rohan Nandavdekar — Full Stack Developer',
  description: 'Rohan Nandavdekar — Full Stack Developer building web platforms and fintech products with React, Node.js and PostgreSQL. Based in Pune, India.',
  keywords: [
    'Rohan Nandavdekar',
    'Full Stack Developer',
    'React Developer',
    'Node.js Developer',
    'PostgreSQL',
    'Fintech Developer',
    'Pune Developer',
    'India Developer',
    'Software Engineer Portfolio',
    'Web Developer'
  ],
  authors: [{ name: 'Rohan Nandavdekar' }],
  creator: 'Rohan Nandavdekar',
  metadataBase: new URL('https://rohannandavdekar.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rohan Nandavdekar — Full Stack Developer',
    description: 'Rohan Nandavdekar — Full Stack Developer building web platforms and fintech products with React, Node.js and PostgreSQL. Based in Pune, India.',
    url: 'https://rohannandavdekar.com',
    siteName: 'Rohan Nandavdekar Portfolio',
    images: [
      {
        url: '/neo_wallet.png',
        width: 1200,
        height: 630,
        alt: 'Rohan Nandavdekar Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohan Nandavdekar — Full Stack Developer',
    description: 'Rohan Nandavdekar — Full Stack Developer building web platforms and fintech products with React, Node.js and PostgreSQL. Based in Pune, India.',
    images: ['/neo_wallet.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  category: 'technology',
  classification: 'Software Engineering & Web Development Portfolio',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0D0F12',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body id="root" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
