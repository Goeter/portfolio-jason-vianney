"use client"

import { useEffect, useState } from "react"

interface TypedTextProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export default function TypedText({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2200,
  className = "",
}: TypedTextProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words || words.length === 0) return

    const currentWord = words[wordIndex % words.length]

    let timer: NodeJS.Timeout

    if (isDeleting) {
      // Deleting character by character
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1))
      }, deletingSpeed)

      if (text === "") {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    } else {
      // Typing character by character
      timer = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1))
      }, typingSpeed)

      if (text === currentWord) {
        // Pause when full word is typed
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      }
    }

    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{text}</span>
      <span className="ml-1 inline-block h-[1.05em] w-[2.5px] animate-pulse bg-[#C8A96E] align-middle shadow-[0_0_10px_rgba(200,169,110,0.8)]" />
    </span>
  )
}
