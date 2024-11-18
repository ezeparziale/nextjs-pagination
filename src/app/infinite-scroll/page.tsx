import { Suspense } from "react"

import { GetPokemons } from "../_actions"
import InfiniteCardList from "../_components/infinite-card-list"
import SearchPokemon from "../_components/search"
import SkeletonCardList from "../_components/skeleton"

export default async function InfiniteScrollPage(
  props: {
    searchParams?: Promise<{
      query?: string
    }>
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams?.query || ""
  const limit = 20

  const { data: initialData } = await GetPokemons({ search, limit })

  return (
    <>
      <div className="mb-3">
        <SearchPokemon />
      </div>
      <Suspense key={search} fallback={<SkeletonCardList />}>
        <InfiniteCardList search={search} initialData={initialData} limit={limit} />
      </Suspense>
    </>
  )
}
