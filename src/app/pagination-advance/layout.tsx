import type { ReactNode } from "react"

import { SectionTabs } from "./_components/section-tabs"

export default function PaginationAdvanceLayout({ children }: { children: ReactNode }) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Pagination advance</h1>
          <p className="text-muted-foreground text-sm">
            Server-side, client-side, and hybrid (API + shareable URL) modes with
            TanStack Table and the shadcn table primitives.
          </p>
        </div>
        <SectionTabs />
      </div>
      {children}
    </section>
  )
}
