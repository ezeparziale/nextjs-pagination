export const POKEMON_DETAIL_TITLE_ID = "pokemon-detail-title"

interface PokeApiPokemon {
  types?: { type: { name: string } }[]
}

export function parsePokemonId(value: string | number): number | null {
  const id = typeof value === "number" ? value : Number(value)
  return Number.isSafeInteger(id) && id > 0 ? id : null
}

export function getPokemonArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export async function getPokemonTypes(id: number): Promise<string[]> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      return []
    }

    const data = (await response.json()) as PokeApiPokemon
    return data.types?.map((slot) => slot.type.name) ?? []
  } catch {
    return []
  }
}
