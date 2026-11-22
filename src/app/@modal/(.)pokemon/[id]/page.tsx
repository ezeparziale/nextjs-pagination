import { notFound } from "next/navigation"

import PokemonDetailModal from "@/app/_components/pokemon-detail-modal"
import PokemonDetail from "@/app/pokemon/_components/pokemon-detail"
import { getPokemonById } from "@/data/pokemon"
import { getPokemonTypes, parsePokemonId } from "@/lib/pokemon"

export default async function PokemonModalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: rawId } = await params
  const id = parsePokemonId(rawId)
  const [pokemon, types] = id
    ? await Promise.all([getPokemonById(id), getPokemonTypes(id)])
    : [null, []]

  if (!pokemon) {
    notFound()
  }

  return (
    <PokemonDetailModal>
      <PokemonDetail pokemon={pokemon} types={types} showBackLink={false} />
    </PokemonDetailModal>
  )
}
