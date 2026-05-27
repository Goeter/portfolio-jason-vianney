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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-2 backdrop-blur-md sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`relative flex max-h-[94vh] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-slate-950/90 p-1.5 shadow-2xl shadow-black/70 backdrop-blur-xl sm:rounded-[24px] sm:p-2 ${
          isGallery
            ? "w-[min(96vw,1040px)]"
            : "w-fit max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)]"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image preview"
          className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/90 text-white shadow-lg backdrop-blur-md transition hover:bg-slate-800 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="min-h-0 max-w-full rounded-[16px] bg-[#050816] p-1.5 sm:rounded-[18px] sm:p-2">
          {isGallery ? (
            <div className="portfolio-preview-scroll no-card-scrollbar flex max-h-[90vh] gap-3 overflow-x-auto pb-2 pr-9 sm:gap-4 sm:pr-11">
              {images.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="flex min-w-[82vw] items-center justify-center rounded-2xl bg-slate-950/70 p-1.5 sm:min-w-[430px] sm:p-2 lg:min-w-[470px]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1100}
                    height={1600}
                    sizes="(max-width: 768px) 82vw, 470px"
                    className="block h-auto max-h-[86vh] w-auto max-w-full rounded-xl object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex max-h-[90vh] max-w-full items-center justify-center">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={1800}
                height={1200}
                sizes="(max-width: 768px) 96vw, 1200px"
                className="block h-auto max-h-[88vh] w-auto max-w-[calc(100vw-1.75rem)] rounded-xl object-contain sm:max-w-[calc(100vw-3rem)] lg:max-w-[1200px]"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
