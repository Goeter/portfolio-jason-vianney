import { readFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse, type NextRequest } from "next/server"

import { certificates } from "@/lib/site-content"

export const dynamic = "force-dynamic"

const CERTIFICATE_DIR = path.join(process.cwd(), "private", "certificates")

/**
 * Serves certificate images only to this site's own script.
 *
 * Sec-Fetch-* headers are set by the browser and can't be forged by page scripts,
 * so opening the URL in a new tab (dest "document"), embedding it as <img>
 * (dest "image"), or requesting it from another site all get a plain 404.
 */
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const isOwnFetch =
    req.headers.get("sec-fetch-site") === "same-origin" &&
    req.headers.get("sec-fetch-dest") === "empty" &&
    req.headers.get("x-certificate-view") === "1"

  const certificate = certificates.find((c) => c.slug === params.slug)

  if (!isOwnFetch || !certificate) {
    return new NextResponse("Not found", { status: 404 })
  }

  try {
    const file = await readFile(path.join(CERTIFICATE_DIR, path.basename(certificate.image)))

    return new NextResponse(file, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "private, max-age=3600",
        "Cross-Origin-Resource-Policy": "same-origin",
        "X-Robots-Tag": "noindex, noimageindex",
        Vary: "Sec-Fetch-Site, Sec-Fetch-Dest, X-Certificate-View",
      },
    })
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }
}
