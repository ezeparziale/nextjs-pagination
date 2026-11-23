import type { PokemonCardData } from "@/lib/pokemon"

import PokemonCard from "./card"
import PokemonGrid from "./pokemon-grid"

export default function CardList({ data }: { data: PokemonCardData[] }) {
  return (
    <PokemonGrid>
      {data.map((p, index) => (
        <PokemonCard
          key={p.id}
          id={p.id}
          name={p.name}
          priority={index < 5}
          staggerIndex={index % 20}
        />
      ))}
    </PokemonGrid>
  )
}
