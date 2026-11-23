import { cache } from "react"

import { db } from "@/lib/db"
import "server-only"

export const getPokemonById = cache(async (id: number) => {
  return db.pokemon.findUnique({ where: { id } })
})

export const getAllPokemonIds = cache(async () => {
  const pokemons = await db.pokemon.findMany({
    select: { id: true },
    orderBy: { id: "asc" },
  })

  return pokemons.map(({ id }) => id)
})
