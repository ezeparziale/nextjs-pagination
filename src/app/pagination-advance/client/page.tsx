import { ClientDataTable } from "../_components/client-data-table"
import { getAllPokemons } from "@/data/pokemons"

export default async function ClientPaginationAdvancePage() {
  const data = await getAllPokemons()

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Client-side pagination: the server delivers the full dataset once and the table
        paginates, sorts, and filters in memory with TanStack Table.
      </p>
      <ClientDataTable data={data} />
    </div>
  )
}
