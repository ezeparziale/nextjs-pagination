"use client"

import { useCallback, useRef, useState } from "react"

import type { Pokemon } from "@/generated/prisma/client"
import { Loader2 } from "lucide-react"
import { useOnInView } from "react-intersection-observer"

import { GetPokemons } from "../_actions"
import PokemonCard from "./card"

interface IProps {
  initialData: Pokemon[]
  search: string
  limit: number
}

export default function InfiniteCardList({ initialData, search, limit }: IProps) {
  const [data, setData] = useState(initialData)
  const [page, setPage] = useState(1)
  const [isDisable, setDisable] = useState(false)
  const isLoadingRef = useRef(false)

  const loadMoreData = useCallback(async () => {
    if (isLoadingRef.current || isDisable) return
    isLoadingRef.current = true

    try {
      const next = page + 1
      const offset = page * limit
      const { data: newData } = await GetPokemons({ search, offset, limit })

      if (newData.length) {
        setPage(next)
        setData((prev: Pokemon[]) => [...prev, ...newData])
      } else {
        setDisable(true)
      }
    } finally {
      isLoadingRef.current = false
    }
  }, [isDisable, page, limit, search])

  const ref = useOnInView((inView) => {
    if (inView) {
      loadMoreData()
    }
  })

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
        {data.map((p) => (
          <PokemonCard key={p.id} id={p.id} name={p.name} />
        ))}
      </div>
      {!isDisable ? (
        <div ref={ref} className="mt-6 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin" size={48} />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
