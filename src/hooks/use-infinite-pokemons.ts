"use client"

import { useCallback, useRef, useState } from "react"

import { getPokemons } from "@/app/pokemon/actions"
import type { Pokemon } from "@/generated/prisma/client"
import { useOnInView } from "react-intersection-observer"

interface UseInfinitePokemonsOptions {
  initialData: Pokemon[]
  search: string
  limit: number
}

export function useInfinitePokemons({
  initialData,
  search,
  limit,
}: UseInfinitePokemonsOptions) {
  const [data, setData] = useState(initialData)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialData.length >= limit)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sentinelKey, setSentinelKey] = useState(0)
  const isFetchingRef = useRef(false)

  const loadMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return
    isFetchingRef.current = true
    setIsLoading(true)
    setError(false)

    try {
      const next = page + 1
      const offset = page * limit
      const { data: newData } = await getPokemons({ search, offset, limit })

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
      loadMore()
    }
  })

  return { data, hasMore, isLoading, error, loadMore, ref, sentinelKey }
}
