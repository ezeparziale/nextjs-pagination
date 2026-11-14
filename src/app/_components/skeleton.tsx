import PokemonCardSkeleton from "./pokemon-card-skeleton"
import PokemonGrid from "./pokemon-grid"

export default function SkeletonCardList({ count = 20 }: { count?: number }) {
  return (
    <PokemonGrid aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </PokemonGrid>
  )
}
