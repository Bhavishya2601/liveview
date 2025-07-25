import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import { LoadingProvider } from '@/contexts/LoadingContext';
import GlobalLoader from '@/components/GlobalLoader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LiveView - Create and Serve Single Page Code Snippets',
  description:
    'Create, preview, and host your HTML, CSS, and JavaScript snippets with a unique URL in seconds.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased select-none`}>
          <LoadingProvider>
            {children}
            <GlobalLoader />
            <Toaster />
            <Analytics />
          </LoadingProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
