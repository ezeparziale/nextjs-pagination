import TableSkeleton from "@/app/_components/table-skeleton"

export default function Loading() {
  return (
    <div className="space-y-4">
      <div
        className="bg-primary/10 h-5 w-full animate-pulse rounded-md"
        aria-hidden="true"
      />
      <TableSkeleton />
    </div>
  )
}
