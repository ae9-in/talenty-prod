import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { OrganizationSchema, WebSiteSchema } from '@/components/landing/json-ld'
import './globals.css'
import { SiteLoader } from '@/components/landing/site-loader'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F7F2E4',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.talentyconsulting.in'),
  title: 'Talenty Consulting | HR & Recruitment Consultancy in Bengaluru',
  description: 'Talenty Consulting is a Bengaluru-based HR and recruitment consultancy providing recruitment, staffing, talent screening and workforce solutions.',
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.talentyconsulting.in',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Talenty Consulting | HR & Recruitment Consultancy in Bengaluru',
    description: 'Talenty Consulting is a Bengaluru-based HR and recruitment consultancy providing recruitment, staffing, talent screening and workforce solutions.',
    url: 'https://www.talentyconsulting.in',
    siteName: 'Talenty Consulting',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Talenty Consulting - HR & Recruitment Consultancy',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talenty Consulting | HR & Recruitment Consultancy in Bengaluru',
    description: 'Talenty Consulting is a Bengaluru-based HR and recruitment consultancy providing recruitment, staffing, talent screening and workforce solutions.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-sans antialiased">
        <OrganizationSchema />
        <WebSiteSchema />
        <SiteLoader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
