'use client'

import Image from "next/image"
import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"

interface IPokemon {
  id: number
  name: string
}

export default function PokemonCard({ id, name }: IPokemon) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-primary/5 border border-primary/10 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
      {/* Badge con ID */}
      <div className="absolute top-3 right-3 bg-primary/80 text-primary-foreground px-2.5 py-1 rounded-full text-xs font-semibold z-10">
        #{id.toString().padStart(3, '0')}
      </div>

      <CardContent className="p-6 flex flex-col items-center justify-center h-full">
        {/* Imagen con skeleton loading */}
        <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg animate-pulse" />
          )}
          <Image
            alt={name}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            width="112"
            height="112"
            quality={65}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            className="relative z-10 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
          />
        </div>

        {/* Nombre del Pokémon */}
        <h2 className="text-lg font-bold text-center text-foreground capitalize truncate w-full group-hover:text-primary transition-colors duration-300">
          {name}
        </h2>
      </CardContent>
    </Card>
  )
}
