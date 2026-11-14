import type { Pokemon } from "@/generated/prisma/client"

import PokemonCard from "./card"
import PokemonGrid from "./pokemon-grid"

export default async function CardList({ data }: { data: Pokemon[] }) {
  return (
    <PokemonGrid>
      {data.map((p) => (
        <PokemonCard key={p.id} id={p.id} name={p.name} />
      ))}
    </PokemonGrid>
  )
}
