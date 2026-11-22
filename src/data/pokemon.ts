import "server-only"

import { cache } from "react"

import { db } from "@/lib/db"

export const getPokemonById = cache(async (id: number) => {
  return db.pokemon.findUnique({ where: { id } })
})
