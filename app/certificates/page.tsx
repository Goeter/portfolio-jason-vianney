import type { Metadata } from "next"

import CertificatesArchiveClient from "./CertificatesArchiveClient"
import { certificatesCollectionStructuredData, siteConfig } from "@/lib/site-content"

export const metadata: Metadata = {
  title: `Certificates | ${siteConfig.shortName} Portfolio`,
  description:
    "A complete archive of Jason Vianney Sugiarto's certificates, professional training, and learning achievements in English, teaching, data analytics, and UI/UX design.",
  alternates: { canonical: "/certificates" },
  openGraph: {
    title: `Certificates | ${siteConfig.shortName} Portfolio`,
    description:
      "Explore Jason Vianney Sugiarto's certificate archive and professional learning achievements.",
    url: `${siteConfig.url}/certificates`,
    images: [siteConfig.defaultOgImage],
  },
}

export default function CertificatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(certificatesCollectionStructuredData) }}
      />
      <CertificatesArchiveClient />
    </>
  )
}
