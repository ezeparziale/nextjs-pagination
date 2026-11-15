import { MixDataTable } from "../_components/mix-data-table"
import { getPokemonsPage } from "../_lib/query-pokemons"
import { parseTableQuery } from "../_lib/table-params"

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
