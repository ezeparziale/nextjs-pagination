import { Suspense } from "react"

import prismadb from "@/lib/prismadb"

import { GetPokemons } from "../_actions"
import CardList from "../_components/card-list"
import Pagination from "../_components/pagination"
import SearchPokemon from "../_components/search"
import SkeletonCardList from "../_components/skeleton"

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    limit?: string
  }
}) {
  const search = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || 20
  const offset = (currentPage - 1) * limit

  const { data, totalPages } = await GetPokemons({ offset, limit, search })

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className="grow">
          <SearchPokemon />
        </div>
        <div className="flex">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
      <Suspense key={search + currentPage} fallback={<SkeletonCardList />}>
        <CardList data={data} />
      </Suspense>
    </>
  )
}
