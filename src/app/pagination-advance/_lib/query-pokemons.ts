import { Prisma } from "@/generated/prisma/client"
import { db } from "@/lib/db"

import {
  type PokemonFilters,
  type PokemonPageResult,
  type PokemonQuery,
  type PokemonRow,
  STAT_FIELDS,
} from "../types"

export function buildPokemonWhere(filters: PokemonFilters): Prisma.PokemonWhereInput {
  const where: Prisma.PokemonWhereInput = {}

  const name = filters.name?.trim()
  if (name) {
    where.name = { contains: name, mode: "insensitive" }
  }

  for (const stat of STAT_FIELDS) {
    const range = filters[stat]
    if (!range) continue
    if (range.min === undefined && range.max === undefined) continue

    const condition: Prisma.IntFilter<"Pokemon"> = {}
    if (range.min !== undefined) condition.gte = range.min
    if (range.max !== undefined) condition.lte = range.max
    where[stat] = condition
  }

  return where
}

export async function getPokemonsPage(query: PokemonQuery): Promise<PokemonPageResult> {
  const where = buildPokemonWhere(query.filters)
  const skip = (query.page - 1) * query.pageSize

  const [rows, totalCount] = await Promise.all([
    db.pokemon.findMany({
      where,
      orderBy: { [query.sort]: query.order } as Prisma.PokemonOrderByWithRelationInput,
      skip,
      take: query.pageSize,
    }),
    db.pokemon.count({ where }),
  ])

  const pageCount = Math.max(1, Math.ceil(totalCount / query.pageSize))

  return {
    rows,
    totalCount,
    pageCount,
    page: query.page,
    pageSize: query.pageSize,
  }
}

export async function getAllPokemons(limit = 1000): Promise<PokemonRow[]> {
  return db.pokemon.findMany({
    orderBy: { id: "asc" },
    take: limit,
  })
}
