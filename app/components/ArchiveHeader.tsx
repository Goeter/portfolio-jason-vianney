"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ArchiveHeaderProps {
  title: string
  backHref: string
}

export default function ArchiveHeader({ title, backHref }: ArchiveHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black shadow-[0_12px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="relative mx-auto flex h-[68px] w-full max-w-7xl items-center px-4 sm:px-8 lg:px-12">
        <Link href={backHref} className="relative z-10 shrink-0">
          <Button className="group rounded-full border border-white/10 bg-zinc-950 px-4 py-5 text-sm font-semibold text-zinc-100 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:border-white hover:bg-white hover:text-black">
            <ChevronLeft className="h-5 w-5 transition group-hover:-translate-x-1 sm:mr-2" />
            <span className="hidden text-[13px] sm:inline">Back</span>
          </Button>
        </Link>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-24 text-center">
          <p className="truncate pb-0.5 text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.28em] text-white">
            {title}
          </p>
        </div>
      </div>
    </header>
  )
}
