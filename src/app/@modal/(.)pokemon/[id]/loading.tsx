import PokemonDetailModal from "@/app/_components/pokemon-detail-modal"
import PokemonDetailSkeleton from "@/app/pokemon/_components/pokemon-detail-skeleton"

export default function Loading() {
  return (
    <PokemonDetailModal>
      <PokemonDetailSkeleton />
    </PokemonDetailModal>
  )
}
