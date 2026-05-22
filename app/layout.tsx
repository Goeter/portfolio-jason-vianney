import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { siteConfig } from "@/lib/site-content"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.owner} - Portfolio`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.owner,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.owner} - Portfolio`,
    description: siteConfig.description,
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: `${siteConfig.shortName} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.owner} - Portfolio`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
