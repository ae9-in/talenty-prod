import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { OrganizationSchema, WebSiteSchema } from '@/components/landing/json-ld'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.talentyconsulting.in'),
  title: 'Talenty Consulting | HR & Recruitment Consultancy in Bengaluru',
  description: 'Talenty Consulting is a Bengaluru-based HR and recruitment consultancy providing recruitment, staffing, talent screening and workforce solutions.',
  alternates: {
    canonical: 'https://www.talentyconsulting.in',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' }
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

import { SiteLoader } from '@/components/landing/site-loader'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
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
