"use server"

import prismadb from "@/lib/prismadb"

export async function GetPokemons({
  search,
  offset = 0,
  limit = 20,
}: {
  search?: string | undefined
  offset?: number
  limit?: number
}) {
  const data = await prismadb.pokemon.findMany({
    where: { name: { contains: search } },
    skip: offset,
    take: limit,
  })

  const totalCount = await prismadb.pokemon.count({
    where: { name: { contains: search } },
  })
  const totalPages = Math.ceil(totalCount / limit)

  return { data, totalCount, totalPages }
}
