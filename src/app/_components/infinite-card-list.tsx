"use client"

import { useEffect, useState } from "react"

import type { Pokemon } from "@/generated/prisma/client"
import { Loader2 } from "lucide-react"
import { useInView } from "react-intersection-observer"

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
  const [ref, inView] = useInView()
  const [isDisable, setDisable] = useState(false)

  async function loadMoreData() {
    const next = page + 1
    const offset = next * limit
    const { data: newData } = await GetPokemons({ search, offset, limit })

    if (newData.length) {
      setPage(next)
      setData((prev: Pokemon[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...newData,
      ])
    } else {
      setDisable(true)
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

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
