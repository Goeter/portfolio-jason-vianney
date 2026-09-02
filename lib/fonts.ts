import { Cormorant_Garamond, DM_Sans } from "next/font/google"

/**
 * Two families only, self-hosted by next/font so no request ever leaves the origin.
 * `display: swap` keeps text painted immediately while the file streams in.
 */
export const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-display",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
})

export const fontBody = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
})
