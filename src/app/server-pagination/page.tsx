import { Route } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Suspense } from "react"

import { getEmptySearchMessage } from "@/lib/search"
import { pokemonSearchParamsSchema } from "@/lib/validation"

import { buttonVariants } from "@/components/ui/button"

import CardList from "../_components/card-list"
import EmptyState from "../_components/empty-state"
import Pagination from "../_components/pagination"
import SearchPokemon from "../_components/search"
import SkeletonCardList from "../_components/skeleton"
import { getPokemons } from "../pokemon/actions"

export default async function ServerPaginationPage(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
    limit?: string
  }>
}) {
  const searchParams = await props.searchParams
  const {
    query,
    page: currentPage,
    limit,
  } = pokemonSearchParamsSchema.parse(searchParams ?? {})
  const search = query ?? ""
  const parsedPage = Number(searchParams?.page)
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

  const { data, totalPages } = await getPokemons({ offset, limit, search })

  if (totalPages > 0 && currentPage > totalPages) {
    redirect(buildPageUrl(totalPages))
  }

  if (data.length === 0) {
    return (
      <>
        <div className="mb-3 flex items-center justify-between gap-2">
          <SearchPokemon />
        </div>
        <EmptyState
          title="No Pokemons found"
          description={getEmptySearchMessage(search)}
          action={
            search ? (
              <Link
                href={"/server-pagination" as Route}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Clear search
              </Link>
            ) : undefined
          }
        />
      </>
    )
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
