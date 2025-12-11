import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jason Vianney Sugiarto - Portfolio",
  description:
    "System Analyst, UI/UX Design, Data Analyst - Professional Portfolio showcasing experience in business analysis, system design, and data visualization.",
  keywords: ["System Analyst", "UI/UX Design", "Data Analyst", "Portfolio", "Jason Vianney Sugiarto"],
  authors: [{ name: "Jason Vianney Sugiarto" }],
  creator: "Jason Vianney Sugiarto",
  openGraph: {
    title: "Jason Vianney Sugiarto - Portfolio",
    description: "System Analyst, UI/UX Design, Data Analyst - Professional Portfolio",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
