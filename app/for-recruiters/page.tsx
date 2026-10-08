import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Award, ChevronLeft, FileText, FolderLock, Linkedin, Mail, MessageCircle, type LucideIcon } from "lucide-react"

import { certificatesLatestFirst, siteConfig } from "@/lib/site-content"
import { formatWhatsapp, privateContact, verifyRecruiterKey } from "@/lib/private-contact"

// The key is checked on every request; this page must never be cached or prerendered.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "For Recruiters",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  referrer: "no-referrer",
}

type ForRecruitersPageProps = {
  searchParams: { key?: string | string[] }
}

type Item = { label: string; value: string; href: string; icon: LucideIcon; external?: boolean }

function Row({ item }: { item: Item }) {
  const Icon = item.icon
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 no-underline transition hover:border-gold-400/50 hover:bg-white/[0.05]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{item.label}</span>
        <span className="mt-0.5 block break-words text-sm font-medium text-slate-100">{item.value}</span>
      </span>
      <span aria-hidden="true" className="text-gold-400 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100">
        →
      </span>
    </a>
  )
}

export default function ForRecruitersPage({ searchParams }: ForRecruitersPageProps) {
  const key = Array.isArray(searchParams.key) ? searchParams.key[0] : searchParams.key
  const access = verifyRecruiterKey(key)

  // Same response as any unknown URL, so the page's existence isn't confirmed to guessers.
  if (!access) notFound()

  const contacts: Item[] = [
    privateContact.email && {
      label: "Email",
      value: privateContact.email,
      href: `mailto:${privateContact.email}`,
      icon: Mail,
    },
    privateContact.whatsapp && {
      label: "WhatsApp",
      value: formatWhatsapp(privateContact.whatsapp),
      href: `https://wa.me/${privateContact.whatsapp}`,
      icon: MessageCircle,
      external: true,
    },
    {
      label: "LinkedIn",
      value: "jasonvianneysugiarto",
      href: siteConfig.contacts.linkedin,
      icon: Linkedin,
      external: true,
    },
  ].filter(Boolean) as Item[]

  const documents: Item[] = [
    privateContact.fullResumeUrl && {
      label: "Full resume",
      value: "Complete CV with contact details",
      href: privateContact.fullResumeUrl,
      icon: FileText,
      external: true,
    },
    privateContact.documentsUrl && {
      label: "Original certificates",
      value: "Unredacted copies, for verification",
      href: privateContact.documentsUrl,
      icon: FolderLock,
      external: true,
    },
  ].filter(Boolean) as Item[]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060D1C] py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,169,110,0.12),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-3xl px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-400 no-underline transition hover:text-gold-400"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <header className="mt-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400/70">For Recruiters</p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-tight text-gold-100">
            Jason Vianney Sugiarto
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
            {siteConfig.headline}. Thank you for your interest — here are my direct contacts and full documents.
            Please keep this link within your hiring team.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Prepared for <span className="font-semibold text-slate-300">{access.company}</span>
            {access.expiresAt && (
              <>
                {" "}· valid until{" "}
                {access.expiresAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
              </>
            )}
          </p>
        </header>

        <section className="mt-10" data-allow-copy>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Contact</h2>
          <div className="grid gap-3">
            {contacts.map((item) => (
              <Row key={item.label} item={item} />
            ))}
          </div>
        </section>

        {documents.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Documents</h2>
            <div className="grid gap-3">
              {documents.map((item) => (
                <Row key={item.label} item={item} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Certificates</h2>
          <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
            {certificatesLatestFirst.map((certificate) => (
              <li key={certificate.slug} className="flex items-start gap-3 px-5 py-4">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <div>
                  <p className="text-sm font-medium text-slate-100">{certificate.title}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {certificate.issuer} · {certificate.date}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/certificates"
            className="mt-4 inline-block text-sm font-semibold text-gold-400 no-underline underline-offset-4 hover:underline"
          >
            View the certificate images →
          </Link>
        </section>
      </div>
    </main>
  )
}
