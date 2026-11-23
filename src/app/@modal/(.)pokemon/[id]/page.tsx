import { notFound } from "next/navigation"

import { Suspense } from "react"

import PokemonDetailModal from "@/app/_components/pokemon-detail-modal"
import PokemonDetail from "@/app/pokemon/_components/pokemon-detail"
import PokemonDetailSkeleton from "@/app/pokemon/_components/pokemon-detail-skeleton"
import { getPokemonById } from "@/data/pokemon"
import { getPokemonTypes, parsePokemonId } from "@/lib/pokemon"

async function PokemonDetailData({ id }: { id: number }) {
  const [pokemon, types] = await Promise.all([getPokemonById(id), getPokemonTypes(id)])

  if (!pokemon) {
    notFound()
  }

  return <PokemonDetail pokemon={pokemon} types={types} showBackLink={false} />
}

export default async function PokemonModalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: rawId } = await params
  const id = parsePokemonId(rawId)

  if (!id) {
    notFound()
  }

  return (
    <PokemonDetailModal>
      <Suspense fallback={<PokemonDetailSkeleton />}>
        <PokemonDetailData id={id} />
      </Suspense>
    </PokemonDetailModal>
  )
}
