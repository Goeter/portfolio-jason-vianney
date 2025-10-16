"use client"

import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const certificates = [
  {
    id: 1,
    title: "UI/UX Webinar Participation",
    description:
      "Certificate of participation in 'Ngulik UI/UX' webinar held by Program Studi Sistem Informasi UBAYA, focusing on modern UI/UX design principles, user research methodologies, and practical design implementation strategies.",
    image: "/assets/certificates/ui-ux-webinar-ubaya.png",
    issuer: "Universitas Surabaya (UBAYA)",
    date: "May 2025",
  },
  {
    id: 1,
    title: "UI/UX Webinar Participation",
    description:
      "Certificate of participation in 'Ngulik UI/UX' webinar held by Program Studi Sistem Informasi UBAYA, focusing on modern UI/UX design principles, user research methodologies, and practical design implementation strategies.",
    image: "/assets/certificates/ui-ux-webinar-ubaya.png",
    issuer: "Universitas Surabaya (UBAYA)",
    date: "May 2025",
  },
  {
    id: 2,
    title: "Data Analyst Python & SQL Certification",
    description:
      "Comprehensive 21-hour course covering Python for data analysis, SQL database management, data visualization techniques, and hands-on projects. Includes practical implementation of data cleaning, analysis, and reporting workflows.",
    image: "/assets/certificates/data-analyst-udemy.jpeg",
    issuer: "Udemy",
    date: "August 2025",
  },
  {
    id: 3,
    title: "Intro to Data Analytics",
    description:
      "Intensive 1-week certified online course covering fundamental data analytics concepts, statistical analysis methods, data interpretation techniques, and practical applications in business intelligence and decision-making processes.",
    image: "/assets/certificates/data-analyst-revou.jpeg",
    issuer: "RevoU",
    date: "July 2025",
  },
]

export default function AllCertificates() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 relative overflow-x-hidden">
      <div className="fixed inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <svg className="w-full h-full opacity-30" viewBox="0 0 400 800" fill="none" aria-hidden="true">
            <path
              d="M200 0L350 100L300 200L400 300L250 400L350 500L200 600L300 700L150 800"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 bg-green-400 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Link href="/#certificates">
              <Button variant="ghost" size="sm" className="text-black hover:bg-green-300 flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-white text-3xl font-bold mb-8">All my certificates</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <Card
              key={certificate.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 h-full"
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="aspect-video bg-gray-300 rounded-t-lg flex-shrink-0 overflow-hidden">
                  <Image
                    src={certificate.image || "/placeholder.svg"}
                    alt={`${certificate.title} certificate`}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-green-200 p-4 rounded-b-lg flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-800 text-xs font-medium">{certificate.issuer}</span>
                    <span className="text-gray-600 text-xs">•</span>
                    <span className="text-gray-600 text-xs">{certificate.date}</span>
                  </div>
                  <h3 className="text-black font-bold text-lg mb-2">{certificate.title}</h3>
                  <p className="text-black text-sm">{certificate.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
