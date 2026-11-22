"use server"

import { DEFAULT_PAGE_SIZE, clampLimit, clampOffset } from "@/lib/pagination"
import { getPokemonsList } from "@/data/pokemons"

export async function GetPokemons({
  search,
  offset = 0,
  limit = DEFAULT_PAGE_SIZE,
}: {
  search?: string | undefined
  offset?: number
  limit?: number
}) {
  const safeLimit = clampLimit(limit)
  const safeOffset = clampOffset(offset)

  return getPokemonsList({ search, offset: safeOffset, limit: safeLimit })
}
