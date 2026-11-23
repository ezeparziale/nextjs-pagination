import type {
  PokemonFilters,
  PokemonPageResult,
  PokemonQuery,
  PokemonRow,
  StatField,
} from "@/app/pagination-advance/types"
import { STAT_FIELDS } from "@/app/pagination-advance/types"
import { Prisma } from "@/generated/prisma/client"
import { db } from "@/lib/db"
import type { PokemonCardData } from "@/lib/pokemon"
import "server-only"

export {
  type PokemonRow,
  type PokemonQuery,
  type PokemonPageResult,
} from "@/app/pagination-advance/types"
export { STAT_FIELDS } from "@/app/pagination-advance/types"

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

  const orderBy: Prisma.PokemonOrderByWithRelationInput[] = [
    { [query.sort]: query.order } as Prisma.PokemonOrderByWithRelationInput,
  ]
  if (query.sort !== "id") orderBy.push({ id: "asc" })

  const [rows, totalCount] = await Promise.all([
    db.pokemon.findMany({
      where,
      orderBy,
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
}): Promise<{ data: PokemonCardData[]; totalCount: number; totalPages: number }> {
  const where: Prisma.PokemonWhereInput = {
    name: { contains: search, mode: "insensitive" },
  }

  const [data, totalCount] = await Promise.all([
    db.pokemon.findMany({
      where,
      select: { id: true, name: true },
      orderBy: { id: "asc" },
      skip: offset,
      take: limit,
    }),
    db.pokemon.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / limit)

  return { data, totalCount, totalPages }
}
