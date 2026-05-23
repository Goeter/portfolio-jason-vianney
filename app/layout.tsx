import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { siteConfig } from "@/lib/site-content"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seoTitle,
    template: `%s | ${siteConfig.shortName} Portfolio`,
  },
  description: siteConfig.seoDescription,
  keywords: siteConfig.keywords,
  applicationName: `${siteConfig.shortName} Portfolio`,
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.owner,
  publisher: siteConfig.owner,
  category: "Portfolio",
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: `${siteConfig.shortName} Portfolio`,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.shortName} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    images: [siteConfig.defaultOgImage],
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

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.owner,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.defaultOgImage}`,
    jobTitle: siteConfig.headline,
    description: siteConfig.description,
    email: siteConfig.contacts.email,
    sameAs: siteConfig.sameAs,
    knowsAbout: siteConfig.keywords,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.shortName} Portfolio`,
    url: siteConfig.url,
    description: siteConfig.seoDescription,
    author: {
      "@type": "Person",
      name: siteConfig.owner,
      url: siteConfig.url,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${siteConfig.shortName} Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    creator: {
      "@type": "Person",
      name: siteConfig.owner,
      url: siteConfig.url,
    },
  },
]

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  )
}
