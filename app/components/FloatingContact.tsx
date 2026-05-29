const WHATSAPP_URL = "https://wa.me/"

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-7 w-7"
      fill="currentColor"
    >
      <path d="M16.02 3C8.86 3 3.04 8.82 3.04 15.98c0 2.28.6 4.52 1.73 6.5L3 29l6.68-1.75a12.86 12.86 0 0 0 6.34 1.62h.01c7.15 0 12.97-5.82 12.97-12.98C29 8.82 23.18 3 16.02 3Zm0 23.68h-.01a10.7 10.7 0 0 1-5.46-1.5l-.39-.23-3.96 1.04 1.06-3.86-.25-.4a10.76 10.76 0 1 1 9.01 4.95Zm5.9-8.05c-.32-.16-1.91-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.21.32-.84 1.05-1.03 1.26-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.6-1.91-1.79-2.23-.19-.32-.02-.5.14-.66.15-.14.32-.38.48-.57.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.74-1.79-1.01-2.45-.27-.64-.54-.55-.74-.56h-.63c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.67 0 1.57 1.15 3.1 1.31 3.31.16.21 2.27 3.46 5.49 4.86.77.33 1.37.53 1.84.68.77.25 1.47.21 2.02.13.62-.09 1.91-.78 2.18-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  )
}

export default function FloatingContact() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open WhatsApp"
      className="fixed bottom-7 right-7 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-[0_18px_42px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-110 hover:bg-emerald-300 active:scale-95"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-400/40 blur-xl animate-ping" />
      <span className="absolute inset-0 rounded-full animate-[contactFloat_3s_ease-in-out_infinite]" />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/45 bg-emerald-400 text-slate-950 shadow-inner shadow-white/25">
        <WhatsAppIcon />
      </span>
    </a>
  )
}
