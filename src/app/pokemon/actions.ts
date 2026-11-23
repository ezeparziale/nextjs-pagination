"use server"

import { getPokemonsList } from "@/data/pokemons"
import { getPokemonsInputSchema } from "@/lib/validation"

export async function getPokemons(input: {
  search?: string
  offset?: number
  limit?: number
}) {
  const { search, offset, limit } = getPokemonsInputSchema.parse(input)

  return getPokemonsList({ search, offset, limit })
}
