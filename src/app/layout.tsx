import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/navigation/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savlune-mitsubishi-samarinda.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SAVLUNE × Mitsubishi — Digital Automotive Showroom Samarinda',
    template: '%s — SAVLUNE × Mitsubishi',
  },
  description:
    'Konsultasi pembelian kendaraan Mitsubishi, simulasi pembiayaan, test drive, trade-in, dan layanan kunjungan area Samarinda serta Kalimantan Timur.',
  keywords: [
    'Mitsubishi Samarinda',
    'showroom Mitsubishi Kalimantan Timur',
    'kredit mobil Mitsubishi',
    'SAVLUNE',
  ],
  openGraph: {
    title: 'SAVLUNE × Mitsubishi — Digital Automotive Showroom Samarinda',
    description:
      'Jelajahi Mitsubishi dari setiap sudut. Simulasi pembiayaan, test drive, dan konsultasi bersama Sales Consultant Mitsubishi Samarinda.',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sans.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
