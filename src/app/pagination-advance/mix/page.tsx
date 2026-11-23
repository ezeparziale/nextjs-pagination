import { parseTableQuery } from "@/data/pokemon-table-params"
import { getPokemonsPage } from "@/data/pokemons"
import { createPageMetadata } from "@/lib/metadata"

import { MixDataTable } from "../_components/mix-data-table"

export const metadata = createPageMetadata({
  title: "Hybrid table",
  description:
    "Server-rendered first view with client-side API requests and a shareable URL.",
  path: "/pagination-advance/mix",
})

export default async function MixPaginationAdvancePage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const searchParams = (await props.searchParams) ?? {}
  const query = parseTableQuery(searchParams)
  const result = await getPokemonsPage(query)

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Hybrid mode: the server renders the first view and the client requests only the
        requested page, order, and filters from{" "}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">/api/pokemons</code>. The
        whole URL reflects the state and is shareable.
      </p>
      <MixDataTable initialQuery={query} initialResult={result} />
    </div>
  )
}
