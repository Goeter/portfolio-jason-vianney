"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, m } from "framer-motion"
import { Download, ExternalLink, FileText, Loader2, X } from "lucide-react"
import { siteConfig } from "@/lib/site-content"

interface ResumePreviewDialogProps {
  open: boolean
  onClose: () => void
}

const fileId = siteConfig.contacts.resumeFileId
const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`

export default function ResumePreviewDialog({ open, onClose }: ResumePreviewDialogProps) {
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Portal to <body> so <main>'s stacking context can't trap the dialog; it sits below the fixed nav.
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
      setLoaded(false)
    }
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-x-0 bottom-0 top-[54px] z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:top-[60px] sm:p-5 lg:top-[64px]"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <m.div
            className="flex h-full max-h-[1000px] w-[min(96vw,900px)] flex-col overflow-hidden rounded-[18px] border border-[#C8A96E]/25 bg-[#0B1724] shadow-2xl shadow-black/70 sm:rounded-[22px]"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <FileText className="h-5 w-5 shrink-0 text-[#C8A96E]" />
              <p
                className="min-w-0 flex-1 truncate text-sm font-semibold text-[#F4EDD8] sm:text-base"
                style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
              >
                {siteConfig.shortName} — Resume
              </p>

              <a
                href={siteConfig.contacts.resumeDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in Google Drive"
                className="hidden items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white no-underline transition hover:bg-white/10 sm:inline-flex"
              >
                <ExternalLink className="h-4 w-4" />
                Open in Drive
              </a>

              <a
                href={downloadUrl}
                aria-label="Download resume"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#C8A96E] px-3 py-2 text-xs font-bold text-[#060D1C] no-underline transition hover:brightness-110"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close resume preview"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drive preview */}
            <div className="relative flex-1 bg-[#1f1f1f]">
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white/70">
                  <Loader2 className="h-8 w-8 animate-spin text-[#C8A96E]" />
                </div>
              )}
              <iframe
                src={previewUrl}
                title="Resume preview"
                className="h-full w-full border-0"
                allow="autoplay"
                onLoad={() => setLoaded(true)}
              />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
