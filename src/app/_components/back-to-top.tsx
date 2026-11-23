"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "cn"
import { ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function BackToTop() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting)
    })
    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible && document.activeElement === buttonRef.current) {
      sentinelRef.current?.focus({ preventScroll: true })
    }
  }, [visible])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <>
      <div ref={sentinelRef} tabIndex={-1} className="h-0 w-0" />
      <Button
        ref={buttonRef}
        size="icon-lg"
        aria-label="Back to top"
        onClick={scrollToTop}
        className={cn(
          "fixed right-4 bottom-4 z-50 rounded-full shadow-md transition-all duration-200",
          visible
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0",
        )}
      >
        <ArrowUp aria-hidden="true" />
      </Button>
    </>
  )
}
