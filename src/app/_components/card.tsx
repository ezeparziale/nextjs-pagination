'use client'

import Image from "next/image"
import { useState } from "react"

interface IPokemon {
  id: number
  name: string
}

export default function PokemonCard({ id, name }: IPokemon) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="group perspective">
      {/* Efecto 3D retro con borde elevado */}
      <div className="relative bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-50 rounded-lg p-3 shadow-lg border-4 border-amber-800 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{
          boxShadow: '0 8px 0 rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6), inset -1px -1px 2px rgba(0,0,0,0.1)'
        }}>
        
        {/* Esquinas decorativas retro */}
        <div className="absolute top-1 left-1 w-3 h-3 bg-amber-900/20 rounded-full" />
        <div className="absolute top-1 right-1 w-3 h-3 bg-amber-900/20 rounded-full" />
        <div className="absolute bottom-1 left-1 w-3 h-3 bg-amber-900/20 rounded-full" />
        <div className="absolute bottom-1 right-1 w-3 h-3 bg-amber-900/20 rounded-full" />

        {/* Número en esquina superior izquierda */}
        <div className="absolute top-2 left-2 text-xs font-bold text-amber-900 bg-yellow-200 px-1.5 py-0.5 rounded border border-amber-800 z-10">
          #{id.toString().padStart(3, '0')}
        </div>

        {/* Número en esquina inferior derecha */}
        <div className="absolute bottom-2 right-2 text-xs font-bold text-amber-900 bg-yellow-200 px-1.5 py-0.5 rounded border border-amber-800 z-10">
          #{id.toString().padStart(3, '0')}
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col items-center justify-center p-2">
          {/* Área de imagen con línea superior decorativa */}
          <div className="w-full mb-3 pb-3 border-b-2 border-dashed border-amber-800/30">
            <div className="relative w-24 h-24 flex items-center justify-center mx-auto">
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-yellow-100 rounded animate-pulse" />
              )}
              <Image
                alt={name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                width="96"
                height="96"
                quality={65}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                className="relative z-10 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Nombre con estilo retro */}
          <h2 className="text-base font-black text-amber-900 text-center uppercase tracking-wide truncate w-full group-hover:text-orange-700 transition-colors duration-300">
            {name}
          </h2>

          {/* Línea inferior decorativa */}
          <div className="w-full mt-2 pt-2 border-t border-dashed border-amber-800/30" />
        </div>
      </div>
    </div>
  )
}
