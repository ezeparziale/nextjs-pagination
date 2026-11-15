"use client"

import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "cn"

const tabs = [
  { label: "Server-side", href: "/pagination-advance/server" },
  { label: "Client-side", href: "/pagination-advance/client" },
  { label: "Mix", href: "/pagination-advance/mix" },
] as const

export function SectionTabs() {
  const pathname = usePathname()

  return (
    <div
      className="bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1"
      role="tablist"
      aria-label="Pagination modes"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href as Route}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
