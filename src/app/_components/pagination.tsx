"use client"

import { Route } from "next"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

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
  return (
    <>
      <div className="flex items-center justify-between space-x-1">
        <Button size="icon" className="h-8 w-8" asChild>
          <Link
            href={createPageURL(currentPage - 1) as Route}
            className={currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""}
            prefetch={true}
          >
            <ChevronLeft />
          </Link>
        </Button>
        <Button size="icon" className="h-8 w-8" asChild>
          <Link
            href={createPageURL(currentPage + 1) as Route}
            className={
              currentPage >= totalPages ? `pointer-events-none opacity-50` : ""
            }
            prefetch={true}
          >
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </>
  )
}
