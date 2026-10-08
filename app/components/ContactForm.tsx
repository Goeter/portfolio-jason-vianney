"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { CheckCircle2, Loader2, Send } from "lucide-react"

import { siteConfig } from "@/lib/site-content"

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string
  reset: (widgetId?: string) => void
  remove: (widgetId?: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

type Status = "idle" | "sending" | "sent" | "error"

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "Please fill in your name, a valid email, and a message of at least 10 characters.",
  captcha: "The spam check didn't pass. Please complete it and try again.",
  rate_limited: "That's a few messages in a short time. Please wait a few minutes and try again.",
  disabled: "The form isn't available right now. Please reach me on LinkedIn instead.",
  error: "Something went wrong sending your message. Please try again, or reach me on LinkedIn.",
}

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  return new Promise<TurnstileApi>((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT}"]`)
    if (!script) {
      script = document.createElement("script")
      script.src = TURNSTILE_SCRIPT
      script.async = true
      document.head.appendChild(script)
    }
    script.addEventListener("load", () => (window.turnstile ? resolve(window.turnstile) : reject()))
    script.addEventListener("error", () => reject())
  })
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-gold-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-gold-400/20"

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorKey, setErrorKey] = useState("error")
  const [token, setToken] = useState("")
  const widgetRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string>()

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !widgetRef.current) return
    let cancelled = false

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !widgetRef.current) return
        widgetId.current = turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
          callback: (value: string) => setToken(value),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        })
      })
      .catch(() => {})

    return () => {
      cancelled = true
      if (widgetId.current) window.turnstile?.remove(widgetId.current)
      widgetId.current = undefined
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "sending") return

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    if (TURNSTILE_SITE_KEY && !token) {
      setErrorKey("captcha")
      setStatus("error")
      return
    }

    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: token }),
      })
      const result = (await res.json().catch(() => ({}))) as { status?: string }

      if (res.ok && result.status === "sent") {
        form.reset()
        setStatus("sent")
      } else {
        setErrorKey(result.status && result.status in ERROR_MESSAGES ? result.status : "error")
        setStatus("error")
      }
    } catch {
      setErrorKey("error")
      setStatus("error")
    } finally {
      // A Turnstile token is single-use, so get a fresh one for the next attempt.
      setToken("")
      if (widgetId.current) window.turnstile?.reset(widgetId.current)
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-gold-400/25 bg-white/[0.03] px-6 py-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold-400" />
        <p className="mt-4 font-serif text-xl font-semibold text-gold-100">Message sent — thank you!</p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
          It went straight to {siteConfig.shortName}&apos;s inbox. He usually replies the same day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-gold-400 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Name</span>
          <input name="name" required minLength={2} maxLength={80} autoComplete="name" className={inputClass} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Email</span>
          <input name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} placeholder="you@company.com" />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
          Company <span className="normal-case tracking-normal text-slate-500">(optional)</span>
        </span>
        <input name="company" maxLength={100} autoComplete="organization" className={inputClass} placeholder="Where you're hiring for" />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className={`${inputClass} resize-y`}
          placeholder="The role or project, and how best to reach you"
        />
      </label>

      {/* Honeypot: off-screen for people, tempting for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {TURNSTILE_SITE_KEY && <div ref={widgetRef} className="mt-4 min-h-[65px]" />}

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {ERROR_MESSAGES[errorKey]}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-[#060D1C] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
