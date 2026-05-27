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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-1 backdrop-blur-md sm:p-2"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`relative flex max-h-[98dvh] flex-col overflow-hidden rounded-[18px] border border-white/10 bg-slate-950/90 p-1 shadow-2xl shadow-black/70 backdrop-blur-xl sm:rounded-[22px] sm:p-1.5 ${
          isGallery
            ? "w-[min(98vw,1320px)]"
            : "w-fit max-w-[98vw]"
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

        <div className="min-h-0 max-w-full rounded-[14px] bg-[#050816] p-1 sm:rounded-[18px] sm:p-1.5">
          {isGallery ? (
            <div className="portfolio-preview-scroll no-card-scrollbar flex max-h-[96dvh] gap-2 overflow-x-auto pb-1 pr-8 sm:gap-3 sm:pr-10">
              {images.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="flex min-w-[92vw] items-center justify-center rounded-2xl bg-slate-950/70 p-1 sm:min-w-[560px] sm:p-1.5 md:min-w-[640px] lg:min-w-[760px] xl:min-w-[860px]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={2200}
                    sizes="(max-width: 768px) 92vw, (max-width: 1024px) 640px, 860px"
                    className="block h-auto max-h-[94dvh] w-auto max-w-full rounded-xl object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex max-h-[96dvh] max-w-full items-center justify-center">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={2200}
                height={1600}
                sizes="(max-width: 768px) 98vw, (max-width: 1280px) 96vw, 1500px"
                className="block h-auto max-h-[94dvh] w-auto max-w-[98vw] rounded-xl object-contain lg:max-w-[1500px] 2xl:max-w-[1680px]"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
