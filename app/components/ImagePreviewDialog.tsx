"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface PreviewImage {
  src: string
  alt: string
}

interface ImagePreviewDialogProps {
  images: PreviewImage[] | null
  title?: string
  onClose: () => void
}

export default function ImagePreviewDialog({
  images,
  title = "Image preview",
  onClose,
}: ImagePreviewDialogProps) {
  useEffect(() => {
    if (!images?.length) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [images, onClose])

  if (!images?.length) return null

  const isGallery = images.length > 1

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/15 bg-slate-950/90 p-3 shadow-2xl shadow-black/70 backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image preview"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/90 text-white shadow-lg backdrop-blur-md transition hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="rounded-[22px] bg-[#050816] p-3">
          {isGallery ? (
            <div className="portfolio-preview-scroll flex max-h-[82vh] gap-4 overflow-x-auto pb-2 pr-10">
              {images.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="flex min-w-[78vw] items-center justify-center rounded-2xl bg-slate-950/70 p-2 sm:min-w-[360px]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={900}
                    height={1200}
                    sizes="(max-width: 768px) 78vw, 420px"
                    className="max-h-[78vh] w-auto rounded-xl object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex max-h-[82vh] items-center justify-center pr-10">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={1600}
                height={1000}
                sizes="90vw"
                className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
