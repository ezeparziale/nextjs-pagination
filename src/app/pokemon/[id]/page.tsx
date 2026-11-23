import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getPokemonById } from "@/data/pokemon"
import { getPokemonMetadata } from "@/lib/metadata"
import { getPokemonTypes, parsePokemonId } from "@/lib/pokemon"

import PokemonDetail from "../_components/pokemon-detail"

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

  return getPokemonMetadata(pokemon)
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
