import { NextRequest } from "next/server"

import { getPokemonsPage } from "@/data/pokemons"
import { parseTableQuery } from "@/data/pokemon-table-params"

export async function GET(request: NextRequest) {
  const query = parseTableQuery(request.nextUrl.searchParams)

  try {
    const result = await getPokemonsPage(query)
    return Response.json(result)
  } catch (error) {
    console.error("GET /api/pokemons failed", error)
    return Response.json({ error: "Failed to load pokemons" }, { status: 500 })
  }
}
