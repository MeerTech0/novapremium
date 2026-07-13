import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NovaPremium - Ultimate AI Streaming Platform',
  description: 'Experience premium streaming with world-class cinematic design. Movies, TV Shows, and more.',
  keywords: 'streaming, movies, tv shows, entertainment, premium, cinema',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#0a0e27',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://novapremium.com',
    title: 'NovaPremium - Ultimate AI Streaming Platform',
    description: 'Experience premium streaming with world-class cinematic design',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NovaPremium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NovaPremium',
    description: 'Ultimate AI Streaming Platform',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
