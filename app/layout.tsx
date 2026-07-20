import React from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import { Toaster } from 'sonner';

// Optimasi Font Google
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata = {
  title: 'Gradivus Code — Jasa Pembuatan Landing Page & Branding UMKM',
  description: 'Gradivus Code menyediakan jasa pembuatan landing page estetis dan super cepat untuk UMKM. Paket lengkap termasuk branding, mulai Rp 1,5 juta.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-bg-primary text-text-primary min-h-screen selection:bg-accent-purple/30">
        <LanguageProvider>
          {children}
          <Toaster theme="dark" position="bottom-right" richColors />
        </LanguageProvider>
      </body>
    </html>
  );
}
