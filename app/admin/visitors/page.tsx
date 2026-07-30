"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Activity,
  Copy,
  Check,
  Eye,
  Globe,
  Key,
  Laptop,
  Link as LinkIcon,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import type { VisitorLog } from "@/lib/visitor-store"

interface Stats {
  totalViews: number
  uniqueIps: number
  topReferrals: { ref: string; count: number }[]
  topLocations: { location: string; count: number }[]
  deviceCounts: Record<string, number>
}

export default function VisitorAnalyticsPage() {
  const [pin, setPin] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [logs, setLogs] = useState<VisitorLog[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Referral link generator state
  const [customRef, setCustomRef] = useState("")
  const [copiedLink, setCopiedLink] = useState(false)

  const fetchAnalytics = useCallback(async (accessPin: string) => {
    setIsLoading(true)
    setAuthError("")

    try {
      const res = await fetch(`/api/visitors?pin=${encodeURIComponent(accessPin)}`)
      const data = await res.json()

      if (data.success) {
        setLogs(data.logs)
        setStats(data.stats)
        setIsAuthenticated(true)
        sessionStorage.setItem("admin_visitor_pin", accessPin)
      } else {
        setAuthError(data.error || "Invalid PIN")
        setIsAuthenticated(false)
      }
    } catch {
      setAuthError("Connection error while fetching logs")
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const savedPin = sessionStorage.getItem("admin_visitor_pin")
    if (savedPin) {
      setPin(savedPin)
      fetchAnalytics(savedPin)
    }
  }, [fetchAnalytics])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pin.trim()) return
    fetchAnalytics(pin.trim())
  }

  const generateReferralUrl = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://jasonvianney.com"
    const cleaned = customRef.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-")
    return `${origin}/?ref=${cleaned || "sample-recruiter"}`
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generateReferralUrl())
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const filteredLogs = logs.filter((log) => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return true
    return (
      log.ip.toLowerCase().includes(term) ||
      (log.city && log.city.toLowerCase().includes(term)) ||
      (log.country && log.country.toLowerCase().includes(term)) ||
      (log.isp && log.isp.toLowerCase().includes(term)) ||
      log.ref.toLowerCase().includes(term) ||
      log.path.toLowerCase().includes(term) ||
      log.deviceType.toLowerCase().includes(term)
    )
  })

  return (
    <div className="min-h-screen bg-[#04130f] text-slate-100 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Background radial elements */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_15%,rgba(20,184,166,0.15),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(45,212,191,0.10),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-teal-200/20 bg-slate-900/60 px-3.5 py-2 text-xs font-medium text-teal-200 shadow-sm backdrop-blur-md transition hover:border-teal-300/40 hover:bg-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <div className="h-5 w-px bg-teal-500/20" />
            <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-50 via-teal-100 to-emerald-300 sm:text-2xl">
              Visitor Analytics & IP Tracker
            </h1>
          </div>

          {isAuthenticated && (
            <button
              onClick={() => fetchAnalytics(pin)}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-teal-300/30 bg-teal-500/10 px-4 py-2 text-xs font-semibold text-teal-100 shadow-md backdrop-blur-md transition hover:bg-teal-400 hover:text-slate-950 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh Data
            </button>
          )}
        </div>

        {/* PASSCODE MODAL */}
        {!isAuthenticated ? (
          <div className="mx-auto max-w-md my-16 rounded-3xl border border-teal-200/20 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-300/30 bg-teal-500/10 text-teal-300">
                <Key className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-50">Private Dashboard Access</h2>
              <p className="mt-1 text-xs text-slate-400">
                Masukkan PIN keamanan untuk melihat data analitik pengunjung.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">Passcode / PIN</label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Masukkan PIN (Default: 123456)"
                  className="w-full rounded-2xl border border-teal-200/20 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-300/20"
                />
              </div>

              {authError && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-center text-xs font-medium text-rose-300">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl border border-teal-300/40 bg-teal-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-teal-300 disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Unlock Dashboard"}
              </button>

              <p className="text-center text-[11px] text-slate-500">
                PIN bawaan adalah <code className="text-teal-300">123456</code>. Dapat diubah via environment variable <code className="text-slate-400">VISITOR_DASHBOARD_PIN</code>.
              </p>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            {/* STATS OVERVIEW CARDS */}
            {stats && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-teal-200/15 bg-slate-950/60 p-5 shadow-lg backdrop-blur-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium uppercase tracking-wider">Total Views</span>
                    <Eye className="h-5 w-5 text-teal-400" />
                  </div>
                  <div className="mt-3 text-3xl font-extrabold text-slate-50">{stats.totalViews}</div>
                  <div className="mt-1 text-[11px] text-slate-400">Total halaman dibaca</div>
                </div>

                <div className="rounded-2xl border border-teal-200/15 bg-slate-950/60 p-5 shadow-lg backdrop-blur-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium uppercase tracking-wider">Unique IPs</span>
                    <Users className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="mt-3 text-3xl font-extrabold text-slate-50">{stats.uniqueIps}</div>
                  <div className="mt-1 text-[11px] text-slate-400">Perangkat / IP unik</div>
                </div>

                <div className="rounded-2xl border border-teal-200/15 bg-slate-950/60 p-5 shadow-lg backdrop-blur-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium uppercase tracking-wider">Top Referral Source</span>
                    <LinkIcon className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="mt-3 text-xl font-bold truncate text-slate-50">
                    {stats.topReferrals[0]?.ref || "Direct / None"}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    {stats.topReferrals[0] ? `${stats.topReferrals[0].count} klik` : "Belum ada rujukan"}
                  </div>
                </div>

                <div className="rounded-2xl border border-teal-200/15 bg-slate-950/60 p-5 shadow-lg backdrop-blur-xl">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium uppercase tracking-wider">Top Location</span>
                    <MapPin className="h-5 w-5 text-sky-400" />
                  </div>
                  <div className="mt-3 text-lg font-bold truncate text-slate-50">
                    {stats.topLocations[0]?.location || "Unknown"}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    {stats.topLocations[0] ? `${stats.topLocations[0].count} sesi` : "Lokasi terbanyak"}
                  </div>
                </div>
              </div>
            )}

            {/* REFERRAL LINK GENERATOR TOOL */}
            <div className="rounded-3xl border border-teal-300/20 bg-slate-950/70 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2 text-teal-300">
                <ShieldCheck className="h-5 w-5" />
                <h2 className="text-base font-bold text-slate-100">Custom Recruiter Link Generator</h2>
              </div>
              <p className="mb-4 text-xs leading-relaxed text-slate-300">
                Buat tautan portofolio khusus untuk dikirimkan ke recruiter/perusahaan tertentu agar kamu bisa melacak kapan mereka membuka tautan kamu.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={customRef}
                  onChange={(e) => setCustomRef(e.target.value)}
                  placeholder="Contoh: recruiter-tokopedia atau hrd-shopee"
                  className="flex-1 rounded-2xl border border-teal-200/20 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-teal-300"
                />
                <div className="flex items-center gap-2">
                  <div className="flex-1 truncate rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-xs font-mono text-teal-200 sm:w-64">
                    {generateReferralUrl()}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 shrink-0 rounded-2xl border border-teal-300/40 bg-teal-400 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-teal-300"
                  >
                    {copiedLink ? <Check className="h-4 w-4 text-slate-950" /> : <Copy className="h-4 w-4" />}
                    {copiedLink ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>

            {/* LOGS TABLE & SEARCH */}
            <div className="rounded-3xl border border-teal-200/15 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-50 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-teal-400" />
                    Visitor Logs ({filteredLogs.length})
                  </h2>
                  <p className="text-xs text-slate-400">Riwayat IP & kunjungan terbaru secara real-time</p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search IP, City, Ref, or Path..."
                    className="w-full rounded-xl border border-teal-200/20 bg-slate-900/90 pl-9 pr-4 py-2 text-xs text-slate-100 outline-none transition focus:border-teal-300"
                  />
                </div>
              </div>

              {filteredLogs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-teal-300/20 p-8 text-center text-xs text-slate-400">
                  Belum ada log pengunjung yang sesuai dengan pencarian.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-teal-500/20 text-teal-200 uppercase font-mono text-[10px] tracking-wider">
                        <th className="pb-3 px-3">Timestamp</th>
                        <th className="pb-3 px-3">IP Address</th>
                        <th className="pb-3 px-3">Location</th>
                        <th className="pb-3 px-3">ISP / Network</th>
                        <th className="pb-3 px-3">Referral Parameter (?ref=)</th>
                        <th className="pb-3 px-3">Device / OS</th>
                        <th className="pb-3 px-3">Page Path</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-teal-500/5 transition duration-150">
                          <td className="py-3.5 px-3 font-mono text-[11px] whitespace-nowrap text-slate-400">
                            {new Date(log.timestamp).toLocaleString("id-ID", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </td>
                          <td className="py-3.5 px-3 font-mono font-medium text-teal-300 whitespace-nowrap">
                            {log.ip}
                          </td>
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5">
                              <Globe className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                              {log.city ? `${log.city}, ${log.country}` : "Unknown"}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 max-w-[180px] truncate text-slate-400" title={log.isp}>
                            {log.isp || log.org || "—"}
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                                log.ref && log.ref !== "Direct / None"
                                  ? "bg-amber-400/20 text-amber-200 border border-amber-400/40"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {log.ref}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 whitespace-nowrap text-slate-300">
                            <span className="inline-flex items-center gap-1">
                              <Laptop className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              {log.deviceType} • {log.os}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-mono text-[11px] text-teal-100 max-w-[140px] truncate">
                            {log.path}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
