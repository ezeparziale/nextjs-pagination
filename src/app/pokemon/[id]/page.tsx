import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getPokemonTypes, parsePokemonId } from "@/lib/pokemon"

import PokemonDetail from "../_components/pokemon-detail"
import { getPokemonById } from "@/data/pokemon"

interface PokemonPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { id: rawId } = await params
  const id = parsePokemonId(rawId)
  const pokemon = id ? await getPokemonById(id) : null

  if (!pokemon) {
    return { title: "Pokemon not found" }
  }

  return {
    title: `${pokemon.name} | Pokemon details`,
    description: `Base stats, height, weight and types of ${pokemon.name}.`,
  }
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { id: rawId } = await params
  const id = parsePokemonId(rawId)
  const [pokemon, types] = id
    ? await Promise.all([getPokemonById(id), getPokemonTypes(id)])
    : [null, []]

  if (!pokemon) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-2xl py-4">
      <PokemonDetail pokemon={pokemon} types={types} />
    </main>
  )
}
