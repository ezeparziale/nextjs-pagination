import { Route } from "next"
import { redirect } from "next/navigation"

import { buildTableSearchParams, parseTableQuery } from "@/data/pokemon-table-params"
import { getPokemonsPage } from "@/data/pokemons"
import { createPageMetadata } from "@/lib/metadata"

import { ServerDataTable } from "../_components/server-data-table"

export const metadata = createPageMetadata({
  title: "Server-side table",
  description: "Server-side sorting, filters and pagination with a shareable URL.",
  path: "/pagination-advance/server",
})

export default async function ServerPaginationAdvancePage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const searchParams = (await props.searchParams) ?? {}
  const query = parseTableQuery(searchParams)
  const result = await getPokemonsPage(query)

  if (result.totalCount > 0 && query.page > result.pageCount) {
    const params = buildTableSearchParams({
      ...query,
      page: result.pageCount,
    }).toString()
    redirect(`/pagination-advance/server?${params}` as Route)
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Server-side pagination: the URL is the source of truth and the server only
        queries the requested page, order, and filters.
      </p>
      <ServerDataTable query={query} result={result} />
    </div>
  )
}
