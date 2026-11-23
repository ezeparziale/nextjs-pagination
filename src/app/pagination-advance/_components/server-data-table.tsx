"use client"

import { Route } from "next"
import { usePathname, useRouter } from "next/navigation"

import { useCallback, useTransition } from "react"

import {
  buildTableSearchParams,
  columnFiltersToFilters,
  paginationToPage,
  queryToColumnFilters,
  queryToPagination,
  queryToSorting,
} from "@/data/pokemon-table-params"
import { getEmptySearchMessage } from "@/lib/search"
import { type SortingState, useTable } from "@tanstack/react-table"

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

interface ServerDataTableProps {
  query: PokemonQuery
  result: PokemonPageResult
}

function toSortField(id: string | undefined): SortField | undefined {
  return SORT_FIELDS.includes(id as SortField) ? (id as SortField) : undefined
}

export function ServerDataTable({ query, result }: ServerDataTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const navigate = useCallback(
    (next: PokemonQuery) => {
      const qs = buildTableSearchParams(next).toString()
      startTransition(() => {
        router.replace((qs ? `${pathname}?${qs}` : pathname) as Route, {
          scroll: false,
        })
      })
    },
    [pathname, router],
  )

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
      navigate({
        ...query,
        page: paginationToPage(next),
        pageSize: next.pageSize,
      })
    },
    onSortingChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(queryToSorting(query)) : updater
      const first = (next as SortingState)[0]
      const sort = toSortField(first?.id) ?? DEFAULT_SORT
      navigate({
        ...query,
        page: 1,
        sort,
        order: first ? (first.desc ? "desc" : "asc") : DEFAULT_ORDER,
      })
    },
    onColumnFiltersChange: (updater) => {
      const current = queryToColumnFilters(query)
      const next = typeof updater === "function" ? updater(current) : updater
      navigate({ ...query, page: 1, filters: columnFiltersToFilters(next) })
    },
  })

  return (
    <DataTable
      table={table}
      isLoading={isPending}
      emptyMessage={getEmptySearchMessage(query.filters.name ?? "")}
      toolbar={
        <DataTableToolbar
          table={table}
          debounceMs={300}
          searchValue={query.filters.name ?? ""}
          onSearchChange={(value) =>
            navigate({
              ...query,
              page: 1,
              filters: { ...query.filters, name: value.trim() || undefined },
            })
          }
          onReset={() =>
            navigate({
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
  )
}
