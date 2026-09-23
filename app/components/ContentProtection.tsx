"use client"

import { useEffect } from "react"

/**
 * Deterrent layer against casual copying of text and images.
 *
 * Anything a browser can display can still be captured by a determined visitor
 * (screenshots, network tab), so this only raises the effort. Form fields and the
 * chat box stay fully usable: typing, selecting, copying and pasting still work there.
 */

const isEditable = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(target.closest("input, textarea, select, [contenteditable='true'], [data-allow-copy]"))

export default function ContentProtection() {
  useEffect(() => {
    const blockUnlessEditable = (event: Event) => {
      if (!isEditable(event.target)) event.preventDefault()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      const mod = event.ctrlKey || event.metaKey

      const opensDevTools =
        key === "f12" ||
        (mod && event.shiftKey && ["i", "j", "c", "k"].includes(key)) ||
        (event.metaKey && event.altKey && ["i", "j", "c", "u"].includes(key))
      // Save page, view source, print.
      const savesPage = mod && ["s", "u", "p"].includes(key)
      // Copy / cut / select-all outside form fields.
      const copiesText = mod && ["c", "x", "a"].includes(key) && !isEditable(event.target)

      if (opensDevTools || savesPage || copiesText) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    document.addEventListener("contextmenu", blockUnlessEditable)
    document.addEventListener("copy", blockUnlessEditable)
    document.addEventListener("cut", blockUnlessEditable)
    document.addEventListener("selectstart", blockUnlessEditable)
    document.addEventListener("dragstart", blockUnlessEditable)
    window.addEventListener("keydown", handleKeyDown, true)

    return () => {
      document.removeEventListener("contextmenu", blockUnlessEditable)
      document.removeEventListener("copy", blockUnlessEditable)
      document.removeEventListener("cut", blockUnlessEditable)
      document.removeEventListener("selectstart", blockUnlessEditable)
      document.removeEventListener("dragstart", blockUnlessEditable)
      window.removeEventListener("keydown", handleKeyDown, true)
    }
  }, [])

  return null
}
