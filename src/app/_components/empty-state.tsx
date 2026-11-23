import type { ReactNode } from "react"

export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div
      className="border-border/70 rounded-lg border border-dashed px-4 py-12 text-center"
      role="status"
    >
      <p className="text-lg font-semibold">{title}</p>
      {description ? (
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  )
}
