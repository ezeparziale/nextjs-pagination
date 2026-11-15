"use client"

import { useCallback, useRef, useState } from "react"

import { type SortingState, useTable } from "@tanstack/react-table"

import {
  buildTableSearchParams,
  columnFiltersToFilters,
  paginationToPage,
  queryToColumnFilters,
  queryToPagination,
  queryToSorting,
} from "../_lib/table-params"
import {
  DEFAULT_ORDER,
  DEFAULT_SORT,
  type PokemonPageResult,
  type PokemonQuery,
  SORT_FIELDS,
  type SortField,
} from "../types"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { features } from "./data-table-features"
import { DataTableToolbar } from "./data-table-toolbar"

interface MixDataTableProps {
  initialQuery: PokemonQuery
  initialResult: PokemonPageResult
}

function toSortField(id: string | undefined): SortField | undefined {
  return SORT_FIELDS.includes(id as SortField) ? (id as SortField) : undefined
}

export function MixDataTable({ initialQuery, initialResult }: MixDataTableProps) {
  const [query, setQuery] = useState<PokemonQuery>(initialQuery)
  const [result, setResult] = useState<PokemonPageResult>(initialResult)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestId = useRef(0)

  const load = useCallback((next: PokemonQuery) => {
    setQuery(next)

    const qs = buildTableSearchParams(next).toString()
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    window.history.replaceState(null, "", url)

    const id = requestId.current + 1
    requestId.current = id
    setIsLoading(true)
    setError(null)

    fetch(`/api/pokemons?${qs}`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json() as Promise<PokemonPageResult>
      })
      .then((json) => {
        if (id !== requestId.current) return
        setResult(json)
        setIsLoading(false)
      })
      .catch((err: unknown) => {
        if (id !== requestId.current) return
        console.error("Failed to load pokemons from /api", err)
        setError("Could not load the data. Please try again.")
        setIsLoading(false)
      })
  }, [])

  const table = useTable({
    features,
    columns,
    data: result.rows,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount: result.totalCount,
    state: {
      pagination: queryToPagination(query),
      sorting: queryToSorting(query),
      columnFilters: queryToColumnFilters(query),
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(queryToPagination(query)) : updater
      load({
        ...query,
        page: paginationToPage(next),
        pageSize: next.pageSize,
      })
    },
    onSortingChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(queryToSorting(query)) : updater
      const first = (next as SortingState)[0]
      load({
        ...query,
        page: 1,
        sort: toSortField(first?.id) ?? DEFAULT_SORT,
        order: first ? (first.desc ? "desc" : "asc") : DEFAULT_ORDER,
      })
    },
    onColumnFiltersChange: (updater) => {
      const current = queryToColumnFilters(query)
      const next = typeof updater === "function" ? updater(current) : updater
      load({ ...query, page: 1, filters: columnFiltersToFilters(next) })
    },
  })

  return (
    <div className="space-y-4">
      {error ? (
        <p
          role="alert"
          className="text-destructive border-destructive/30 bg-destructive/5 rounded-md border px-3 py-2 text-sm"
        >
          {error}
        </p>
      ) : null}
      <DataTable
        table={table}
        isLoading={isLoading}
        toolbar={
          <DataTableToolbar
            table={table}
            debounceMs={300}
            searchValue={query.filters.name ?? ""}
            onSearchChange={(value) =>
              load({
                ...query,
                page: 1,
                filters: { ...query.filters, name: value.trim() || undefined },
              })
            }
            onReset={() =>
              load({
                page: 1,
                pageSize: query.pageSize,
                sort: DEFAULT_SORT,
                order: DEFAULT_ORDER,
                filters: {},
              })
            }
          />
        }
      />
    </div>
  )
}
