import type { Pokemon } from "@prisma/client"

import PokemonCard from "./card"

export default async function CardList({ data }: { data: Pokemon[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data.map((p) => (
        <PokemonCard key={p.id} id={p.id} name={p.name} />
      ))}
    </div>
  )
}
