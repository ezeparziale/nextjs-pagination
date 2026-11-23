export default function PokemonDetailSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6" aria-hidden="true">
      <div className="bg-primary/10 mx-auto size-48 rounded-2xl" />
      <div className="mx-auto flex items-center gap-2">
        <div className="bg-primary/10 h-9 w-40 rounded-md" />
        <div className="bg-primary/10 h-6 w-12 rounded-md" />
      </div>
      <div className="bg-primary/10 h-7 w-36 rounded-md" />
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-primary/10 h-20 rounded-lg" />
        <div className="bg-primary/10 h-20 rounded-lg" />
      </div>
      <div className="bg-primary/10 h-7 w-24 rounded-md" />
      <div className="flex gap-2">
        <div className="bg-primary/10 h-6 w-16 rounded-md" />
        <div className="bg-primary/10 h-6 w-20 rounded-md" />
      </div>
      <div className="bg-primary/10 h-7 w-32 rounded-md" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="bg-primary/10 h-20 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
