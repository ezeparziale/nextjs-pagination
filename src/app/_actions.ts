"use server"

import { db } from "@/lib/db"

export async function GetPokemons({
  search,
  offset = 0,
  limit = 20,
}: {
  search?: string | undefined
  offset?: number
  limit?: number
}) {
  const data = await db.pokemon.findMany({
    where: { name: { contains: search } },
    skip: offset,
    take: limit,
  })

  const totalCount = await db.pokemon.count({
    where: { name: { contains: search } },
  })
  const totalPages = Math.ceil(totalCount / limit)

  return { data, totalCount, totalPages }
}
