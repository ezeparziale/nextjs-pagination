"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center" role="alert">
      <h2 className="text-lg font-semibold">Something went wrong.</h2>
      <p className="text-muted-foreground text-sm">
        We couldn&apos;t load this page. Please try again.
      </p>
      <Button variant="outline" onClick={retry}>
        Try again
      </Button>
    </div>
  )
}
