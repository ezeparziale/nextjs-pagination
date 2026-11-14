import { Route } from "next"
import { redirect } from "next/navigation"

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
  const parsedPage = Number(searchParams?.page)
  const currentPage = clampPage(parsedPage)
  const limit = clampLimit(Number(searchParams?.limit))
  const offset = (currentPage - 1) * limit

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams()
    if (search) params.set("query", search)
    if (searchParams?.limit) params.set("limit", String(limit))
    params.set("page", String(page))

    return `/server-pagination?${params.toString()}` as Route
  }

  if (searchParams?.page !== undefined && currentPage !== parsedPage) {
    redirect(buildPageUrl(1))
  }

  const { data, totalPages } = await GetPokemons({ offset, limit, search })

  if (totalPages > 0 && currentPage > totalPages) {
    redirect(buildPageUrl(totalPages))
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-2">
        <SearchPokemon />
        <Pagination totalPages={totalPages} />
      </div>
      <Suspense
        key={search + currentPage}
        fallback={<SkeletonCardList count={limit} />}
      >
        <CardList data={data} />
      </Suspense>
    </>
  )
}
