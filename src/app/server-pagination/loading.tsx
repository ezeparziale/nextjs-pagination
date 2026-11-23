import SkeletonCardList from "../_components/skeleton"

export default function Loading() {
  return (
    <div className="space-y-3">
      <div
        className="bg-primary/10 h-8 w-full max-w-sm animate-pulse rounded-md"
        aria-hidden="true"
      />
      <SkeletonCardList />
    </div>
  )
}
