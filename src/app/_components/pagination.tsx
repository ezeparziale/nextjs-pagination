"use client"

import { Route } from "next"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import { cn } from "cn"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

interface IPagination {
  totalPages: number
}

export default function Pagination({ totalPages }: IPagination) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages

  return (
    <nav className="flex items-center justify-between gap-1" aria-label="Pagination">
      <span className="sr-only" aria-live="polite">
        Page {currentPage} of {Math.max(totalPages, 1)}
      </span>
      <Link
        href={createPageURL(currentPage - 1) as Route}
        className={cn(
          buttonVariants({ size: "icon-sm" }),
          isFirstPage && "pointer-events-none opacity-50",
        )}
        prefetch={true}
        aria-label="Previous page"
        aria-disabled={isFirstPage}
        tabIndex={isFirstPage ? -1 : undefined}
      >
        <ChevronLeft aria-hidden="true" />
      </Link>
      <Link
        href={createPageURL(currentPage + 1) as Route}
        className={cn(
          buttonVariants({ size: "icon-sm" }),
          isLastPage && "pointer-events-none opacity-50",
        )}
        prefetch={true}
        aria-label="Next page"
        aria-disabled={isLastPage}
        tabIndex={isLastPage ? -1 : undefined}
      >
        <ChevronRight aria-hidden="true" />
      </Link>
    </nav>
  )
}
