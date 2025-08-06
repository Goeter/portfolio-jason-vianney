"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectCardModal() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        Buka Modal Gambar
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative w-full max-w-[85vw] max-h-[85vh] bg-white rounded-xl shadow-xl p-4 animate-fade-in-up overflow-auto">
            {/* Tombol Close (X) */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-800"
            >
              <X size={28} />
            </button>

            {/* Judul & Link */}
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold text-gray-800">
                PT Topas Website
              </h2>
              <a
                href="https://frontend.topasmultifinance.co.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                https://frontend.topasmultifinance.co.id
              </a>
            </div>

            {/* Gambar */}
            <div className="flex flex-wrap justify-center gap-4">
              <Image
                src="/images/project-topas-1.png"
                alt="Topas App Screen 1"
                width={300}
                height={600}
                className="rounded-md object-contain max-w-full max-h-[70vh]"
              />
              <Image
                src="/images/project-topas-2.png"
                alt="Topas App Screen 2"
                width={300}
                height={600}
                className="rounded-md object-contain max-w-full max-h-[70vh]"
              />
              <Image
                src="/images/project-topas-3.png"
                alt="Topas App Screen 3"
                width={300}
                height={600}
                className="rounded-md object-contain max-w-full max-h-[70vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
