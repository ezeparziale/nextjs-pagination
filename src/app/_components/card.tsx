import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface IPokemon {
  id: number
  name: string
}

export default function PokemonCard({ id, name }: IPokemon) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="mt-2 flex justify-center">
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>
        </CardHeader>
        <CardContent>
          <Image
            alt={name}
            className="mx-auto"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            width="100"
            height="100"
          />
        </CardContent>
      </Card>
    </>
  )
}
