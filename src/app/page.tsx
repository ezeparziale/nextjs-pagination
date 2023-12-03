import { Suspense } from "react"

import prismadb from "@/lib/prismadb"

import CardList from "./_components/card-list"
import Pagination from "./_components/pagination"
import SearchPokemon from "./_components/search"
import SkeletonCardList from "./_components/skeleton"

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    limit?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || 20
  const offset = (currentPage - 1) * limit

  const data = await prismadb.pokemon.findMany({
    where: { name: { contains: query } },
    skip: offset,
    take: limit,
  })

  const totalCount = await prismadb.pokemon.count({
    where: { name: { contains: query } },
  })
  const totalPages = Math.ceil(totalCount / limit)

  return (
    <main className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Pokemon
      </h1>
      <div className="mb-3 flex items-center justify-between">
        <div className="grow">
          <SearchPokemon />
        </div>
        <div className="flex">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
      <Suspense key={query + currentPage} fallback={<SkeletonCardList />}>
        <CardList data={data} />
      </Suspense>
    </main>
  )
}
