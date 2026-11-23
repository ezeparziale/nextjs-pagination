import type { MetadataRoute } from "next"

import { getAllPokemonIds } from "@/data/pokemon"
import { SITE_URL } from "@/lib/site"

const staticPaths = [
  "/",
  "/server-pagination",
  "/infinite-scroll",
  "/pagination-advance/server",
  "/pagination-advance/client",
  "/pagination-advance/mix",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pokemonIds = await getAllPokemonIds()

  return [
    ...staticPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...pokemonIds.map((id) => ({
      url: `${SITE_URL}/pokemon/${id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
