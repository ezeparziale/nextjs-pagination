"use client"

import { useInfinitePokemons } from "@/hooks/use-infinite-pokemons"
import type { PokemonCardData } from "@/lib/pokemon"

import { Button } from "@/components/ui/button"

import PokemonCard from "./card"
import PokemonCardSkeleton from "./pokemon-card-skeleton"
import PokemonGrid from "./pokemon-grid"

interface IProps {
  initialData: PokemonCardData[]
  search: string
  limit: number
}

export default function InfiniteCardList({ initialData, search, limit }: IProps) {
  const { data, hasMore, isLoading, error, loadMore, ref, sentinelKey } =
    useInfinitePokemons({ initialData, search, limit })

  return (
    <>
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
        {isLoading &&
          hasMore &&
          Array.from({ length: limit }).map((_, index) => (
            <PokemonCardSkeleton key={`skeleton-${index}`} />
          ))}
      </PokemonGrid>
      {error ? (
        <div
          className="mt-6 flex flex-col items-center justify-center gap-2"
          role="alert"
        >
          <p className="text-muted-foreground text-sm">Failed to load more Pokemons.</p>
          <Button variant="outline" size="sm" onClick={() => loadMore()}>
            Retry
          </Button>
        </div>
      ) : hasMore ? (
        <div
          key={sentinelKey}
          ref={ref}
          className="mt-6 flex h-12 items-center justify-center"
          role="status"
        >
          {isLoading && <span className="sr-only">Loading more Pokemons</span>}
        </div>
      ) : (
        <p className="text-muted-foreground mt-6 text-center text-sm">
          No more results.
        </p>
      )}
    </>
  )
}
