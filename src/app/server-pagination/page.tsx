import { Suspense } from "react"

import { clampLimit, clampPage } from "@/lib/pagination"

import { GetPokemons } from "../_actions"
import CardList from "../_components/card-list"
import Pagination from "../_components/pagination"
import SearchPokemon from "../_components/search"
import SkeletonCardList from "../_components/skeleton"

export default async function ServerPaginationPage(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
    limit?: string
  }>
}) {
  const searchParams = await props.searchParams
  const search = searchParams?.query || ""
  const currentPage = clampPage(Number(searchParams?.page))
  const limit = clampLimit(Number(searchParams?.limit))
  const offset = (currentPage - 1) * limit

  const { data, totalPages } = await GetPokemons({ offset, limit, search })

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-1">
        <SearchPokemon />
        <Pagination totalPages={totalPages} />
      </div>
      <Suspense key={search + currentPage} fallback={<SkeletonCardList />}>
        <CardList data={data} />
      </Suspense>
    </>
  )
}
