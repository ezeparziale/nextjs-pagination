"use server"

import { db } from "@/lib/db"
import { DEFAULT_PAGE_SIZE, clampLimit, clampOffset } from "@/lib/pagination"

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
  const where = { name: { contains: search, mode: "insensitive" as const } }

  const data = await db.pokemon.findMany({
    where,
    orderBy: { id: "asc" },
    skip: safeOffset,
    take: safeLimit,
  })

  const totalCount = await db.pokemon.count({ where })
  const totalPages = Math.ceil(totalCount / safeLimit)

  return { data, totalCount, totalPages }
}
