import { Suspense } from "react"

import { GetPokemons } from "../_actions"
import InfiniteCardList from "../_components/infinite-card-list"
import SearchPokemon from "../_components/search"
import SkeletonCardList from "../_components/skeleton"

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
  }
}) {
  const search = searchParams?.query || ""
  const limit = 20

  const { data: initialData } = await GetPokemons({ search, limit })

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className="grow">
          <SearchPokemon />
        </div>
      </div>
      <Suspense key={search} fallback={<SkeletonCardList />}>
        <InfiniteCardList search={search} initialData={initialData} limit={limit} />
      </Suspense>
    </>
  )
}
