import "server-only"

import { db } from "@/lib/db"
import { Prisma } from "@/generated/prisma/client"

export { type PokemonRow, type PokemonQuery, type PokemonPageResult } from "@/app/pagination-advance/types"
export { STAT_FIELDS } from "@/app/pagination-advance/types"

import type {
  PokemonFilters,
  PokemonQuery,
  PokemonPageResult,
  PokemonRow,
  StatField,
} from "@/app/pagination-advance/types"
import { STAT_FIELDS } from "@/app/pagination-advance/types"

function buildPokemonWhere(filters: PokemonFilters): Prisma.PokemonWhereInput {
  const where: Prisma.PokemonWhereInput = {}
  const name = filters.name?.trim()

  if (name) {
    where.name = { contains: name, mode: "insensitive" }
  }

  for (const stat of STAT_FIELDS) {
    const range = filters[stat as StatField]
    if (!range) continue
    if (range.min === undefined && range.max === undefined) continue

    const condition: Prisma.IntFilter<"Pokemon"> = {}
    if (range.min !== undefined) condition.gte = range.min
    if (range.max !== undefined) condition.lte = range.max
    where[stat as keyof Prisma.PokemonWhereInput] = condition as never
  }

  return where
}

export async function getPokemonsPage(query: PokemonQuery): Promise<PokemonPageResult> {
  const where = buildPokemonWhere(query.filters)
  const skip = (query.page - 1) * query.pageSize

  const [rows, totalCount] = await Promise.all([
    db.pokemon.findMany({
      where,
      orderBy: {
        [query.sort]: query.order,
      } as Prisma.PokemonOrderByWithRelationInput,
      skip,
      take: query.pageSize,
    }),
    db.pokemon.count({ where }),
  ])

  const pageCount = Math.max(1, Math.ceil(totalCount / query.pageSize))

  return {
    rows: rows as PokemonRow[],
    totalCount,
    pageCount,
    page: query.page,
    pageSize: query.pageSize,
  }
}

export async function getAllPokemons(limit = 1000): Promise<PokemonRow[]> {
  return (await db.pokemon.findMany({
    orderBy: { id: "asc" },
    take: limit,
  })) as PokemonRow[]
}

export async function getPokemonsList({
  search,
  offset,
  limit,
}: {
  search?: string | undefined
  offset: number
  limit: number
}): Promise<{ data: PokemonRow[]; totalCount: number; totalPages: number }> {
  const where: Prisma.PokemonWhereInput = {
    name: { contains: search, mode: "insensitive" },
  }

  const [data, totalCount] = await Promise.all([
    db.pokemon.findMany({
      where,
      orderBy: { id: "asc" },
      skip: offset,
      take: limit,
    }),
    db.pokemon.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / limit)

  return { data: data as PokemonRow[], totalCount, totalPages }
}
