"use client"

import { useCallback, useRef, useState } from "react"

import type { Pokemon } from "@/generated/prisma/client"
import { Loader2 } from "lucide-react"
import { useOnInView } from "react-intersection-observer"

import { Button } from "@/components/ui/button"

import { GetPokemons } from "../_actions"
import PokemonCard from "./card"
import PokemonGrid from "./pokemon-grid"

interface IProps {
  initialData: Pokemon[]
  search: string
  limit: number
}

export default function InfiniteCardList({ initialData, search, limit }: IProps) {
  const [data, setData] = useState(initialData)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialData.length >= limit)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sentinelKey, setSentinelKey] = useState(0)
  const isFetchingRef = useRef(false)

  const loadMoreData = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return
    isFetchingRef.current = true
    setIsLoading(true)
    setError(false)

    try {
      const next = page + 1
      const offset = page * limit
      const { data: newData } = await GetPokemons({ search, offset, limit })

      if (newData.length < limit) {
        setHasMore(false)
      }

      if (newData.length) {
        setPage(next)
        setData((prev: Pokemon[]) => [...prev, ...newData])
        setSentinelKey((key) => key + 1)
      }
    } catch {
      setError(true)
    } finally {
      isFetchingRef.current = false
      setIsLoading(false)
    }
  }, [hasMore, page, limit, search])

  const ref = useOnInView((inView) => {
    if (inView) {
      loadMoreData()
    }
  })

  return (
    <>
      <PokemonGrid>
        {data.map((p, index) => (
          <PokemonCard key={p.id} id={p.id} name={p.name} priority={index < 5} />
        ))}
      </PokemonGrid>
      {error ? (
        <div
          className="mt-6 flex flex-col items-center justify-center gap-2"
          role="alert"
        >
          <p className="text-muted-foreground text-sm">Failed to load more Pokemons.</p>
          <Button variant="outline" size="sm" onClick={() => loadMoreData()}>
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
          {isLoading && (
            <>
              <Loader2 className="animate-spin" size={32} aria-hidden="true" />
              <span className="sr-only">Loading more Pokemons</span>
            </>
          )}
        </div>
      ) : (
        <p className="text-muted-foreground mt-6 text-center text-sm">
          No more results.
        </p>
      )}
    </>
  )
}
