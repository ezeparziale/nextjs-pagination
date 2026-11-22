import type { Route } from "next"
import Image from "next/image"
import Link from "next/link"

import type { Pokemon } from "@/generated/prisma/client"
import { POKEMON_DETAIL_TITLE_ID, getPokemonArtworkUrl } from "@/lib/pokemon"
import { ArrowLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export default function PokemonDetail({
  pokemon,
  types,
  showBackLink = true,
}: {
  pokemon: Pokemon
  types: string[]
  showBackLink?: boolean
}) {
  const stats = [
    { label: "HP", value: pokemon.hp },
    { label: "Attack", value: pokemon.attack },
    { label: "Defense", value: pokemon.defense },
    { label: "Sp. Atk", value: pokemon.specialAttack },
    { label: "Sp. Def", value: pokemon.specialDefense },
    { label: "Speed", value: pokemon.speed },
  ]

  return (
    <article className="flex flex-col gap-6">
      {showBackLink && (
        <Link
          href={"/server-pagination" as Route}
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 inline-flex w-fit items-center gap-1.5 rounded-md text-sm focus-visible:ring-3 focus-visible:outline-none"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Pokemons
        </Link>
      )}

      <header className="flex flex-col items-center gap-3 text-center">
        <Image
          alt={`${pokemon.name} official artwork`}
          className="size-48 rounded-2xl object-contain"
          src={getPokemonArtworkUrl(pokemon.id)}
          width={192}
          height={192}
          sizes="192px"
          quality={75}
          priority
        />
        <div className="flex items-center gap-2">
          <h1 id={POKEMON_DETAIL_TITLE_ID} className="text-3xl font-bold capitalize">
            {pokemon.name}
          </h1>
          <Badge variant="outline">#{pokemon.id}</Badge>
        </div>
      </header>

      <section aria-labelledby="measurements-heading" className="flex flex-col gap-3">
        <h2 id="measurements-heading" className="text-lg font-semibold">
          Measurements
        </h2>
        <dl className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg border p-3">
            <dt className="text-muted-foreground text-xs">Height</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">
              {(pokemon.height / 10).toFixed(1)} m
            </dd>
          </div>
          <div className="bg-muted/50 rounded-lg border p-3">
            <dt className="text-muted-foreground text-xs">Weight</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">
              {(pokemon.weight / 10).toFixed(1)} kg
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="types-heading" className="flex flex-col gap-3">
        <h2 id="types-heading" className="text-lg font-semibold">
          Types
        </h2>
        {types.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {types.map((type) => (
              <li key={type}>
                <Badge variant="secondary" className="capitalize">
                  {type}
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">Unknown</p>
        )}
      </section>

      <section aria-labelledby="stats-heading" className="flex flex-col gap-3">
        <h2 id="stats-heading" className="text-lg font-semibold">
          Base stats
        </h2>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-muted/50 rounded-lg border p-3">
              <dt className="text-muted-foreground text-xs">{stat.label}</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  )
}
