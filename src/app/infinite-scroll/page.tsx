import { Suspense } from "react"

import { pokemonSearchParamsSchema } from "@/lib/validation"

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

  return (
    <>
      <div className="mb-3">
        <SearchPokemon />
      </div>
      <Suspense key={search} fallback={<SkeletonCardList count={limit} />}>
        <InfiniteCardList search={search} initialData={initialData} limit={limit} />
      </Suspense>
    </>
  )
}
