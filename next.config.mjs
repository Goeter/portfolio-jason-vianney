/** @type {import("next").NextConfig} */

const isDev = process.env.NODE_ENV !== "production"

// Kept on one line per directive so the policy stays easy to audit.
const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js ships inline bootstrap scripts and the JSON-LD blocks, so 'unsafe-inline' is required.
  // 'unsafe-eval' is only needed by the dev server's hot reload, never in production.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  // Signed-in Google users are bounced through accounts/docs before the Drive viewer loads;
  // allowing only drive.google.com blanks the resume preview on their phones.
  "frame-src https://drive.google.com https://docs.google.com https://accounts.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
]

const nextConfig = {
  compress: true,
  poweredByHeader: false,
  // Ship only minified bundles, never source maps of the original code.
  productionBrowserSourceMaps: false,
  experimental: {
    // Certificates live outside /public and are read by this route at runtime.
    outputFileTracingIncludes: {
      "/api/certificate/[slug]": ["./private/certificates/**/*"],
    },
  },
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Analytics endpoints must never be cached or indexed.
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        // Images load only on this site; other sites can't hotlink or embed them.
        source: "/assets/:path*",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        // Personal documents and photos stay out of Google Images and other image search.
        source: "/assets/:folder(team|students)/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noimageindex",
          },
        ],
      },
      {
        source: "/(.*)\.(jpg|jpeg|png|webp|avif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\.(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\.(woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

export default nextConfig
