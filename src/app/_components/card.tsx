'use client'

import Image from "next/image"
import { useState } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface IPokemon {
  id: number
  name: string
}

export default function PokemonCard({ id, name }: IPokemon) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Card>
      <CardHeader>
        <div className="mt-2 flex justify-center">
          <h2 className="text-2xl font-bold">{name}</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-24 w-24 mx-auto">
          {isLoading && (
            <div className="absolute inset-0 bg-primary/10 rounded-md animate-pulse" />
          )}
          <Image
            alt={name}
            className="mx-auto"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            width="100"
            height="100"
            quality={65}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
