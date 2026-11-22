import type { Route } from "next"
import Image from "next/image"
import Link from "next/link"

import { getPokemonArtworkUrl } from "@/lib/pokemon"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface IPokemon {
  id: number
  name: string
  priority?: boolean
}

export default function PokemonCard({ id, name, priority = false }: IPokemon) {
  return (
    <Link
      href={`/pokemon/${id}` as Route}
      aria-label={`View ${name} details`}
      className="focus-visible:ring-ring/50 block rounded-lg focus-visible:ring-3 focus-visible:outline-none"
    >
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="mt-2 flex justify-center">
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>
        </CardHeader>
        <CardContent>
          <Image
            alt=""
            className="mx-auto"
            src={getPokemonArtworkUrl(id)}
            width={100}
            height={100}
            sizes="100px"
            quality={75}
            priority={priority}
          />
        </CardContent>
      </Card>
    </Link>
  )
}
