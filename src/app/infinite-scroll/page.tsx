import { Route } from "next"
import Link from "next/link"

import { Suspense } from "react"

import { getEmptySearchMessage } from "@/lib/search"
import { pokemonSearchParamsSchema } from "@/lib/validation"

import { buttonVariants } from "@/components/ui/button"

import BackToTop from "../_components/back-to-top"
import EmptyState from "../_components/empty-state"
import InfiniteCardList from "../_components/infinite-card-list"
import SearchPokemon from "../_components/search"
import SkeletonCardList from "../_components/skeleton"
import { getPokemons } from "../pokemon/actions"

export default async function InfiniteScrollPage(props: {
  searchParams?: Promise<{
    query?: string
  }>
}) {
  const searchParams = await props.searchParams
  const { query, limit } = pokemonSearchParamsSchema.parse(searchParams ?? {})
  const search = query ?? ""

  const { data: initialData } = await getPokemons({ search, limit })

  if (initialData.length === 0) {
    return (
      <>
        <div className="mb-3">
          <SearchPokemon />
        </div>
        <EmptyState
          title="No Pokemons found"
          description={getEmptySearchMessage(search)}
          action={
            search ? (
              <Link
                href={"/infinite-scroll" as Route}
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
    <div className="pb-20">
      <BackToTop />
      <div className="mb-3">
        <SearchPokemon />
      </div>
      <Suspense key={search} fallback={<SkeletonCardList count={limit} />}>
        <InfiniteCardList search={search} initialData={initialData} limit={limit} />
      </Suspense>
    </div>
  )
}
