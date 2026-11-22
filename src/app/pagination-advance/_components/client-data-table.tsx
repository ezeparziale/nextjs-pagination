"use client"

import { useState } from "react"

import {
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table"

import { DEFAULT_PAGE_SIZE } from "@/data/pokemon-table-params"
import { DEFAULT_SORT, type PokemonRow } from "../types"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { features } from "./data-table-features"
import { DataTableToolbar } from "./data-table-toolbar"

interface ClientDataTableProps {
  data: PokemonRow[]
}

export function ClientDataTable({ data }: ClientDataTableProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: DEFAULT_SORT, desc: false },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useTable({
    features,
    columns,
    data,
    state: { pagination, sorting, columnFilters },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  })

  const searchValue = (table.getColumn("name")?.getFilterValue() as string) ?? ""

  return (
    <DataTable
      table={table}
      toolbar={
        <DataTableToolbar
          table={table}
          searchValue={searchValue}
          onSearchChange={(value) =>
            setColumnFilters((prev) => {
              const others = prev.filter((filter) => filter.id !== "name")
              return value.trim()
                ? [...others, { id: "name", value: value.trim() }]
                : others
            })
          }
          onReset={() => {
            setColumnFilters([])
            setSorting([{ id: DEFAULT_SORT, desc: false }])
            setPagination({ pageIndex: 0, pageSize: pagination.pageSize })
          }}
        />
      }
    />
  )
}
