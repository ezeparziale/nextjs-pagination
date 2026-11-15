"use client"

import { useState } from "react"

import type { ReactTable, RowData } from "@tanstack/react-table"
import { X } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import type { DataTableFeatures } from "./data-table-features"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>
  searchValue: string
  onSearchChange: (value: string) => void
  onReset: () => void
  debounceMs?: number
}

export function DataTableToolbar<TData extends RowData>({
  table,
  searchValue,
  onSearchChange,
  onReset,
  debounceMs = 0,
}: DataTableToolbarProps<TData>) {
  const [value, setValue] = useState(searchValue)
  const [prevSearchValue, setPrevSearchValue] = useState(searchValue)

  if (searchValue !== prevSearchValue) {
    setPrevSearchValue(searchValue)
    setValue(searchValue)
  }

  const debouncedSearch = useDebouncedCallback(onSearchChange, debounceMs)

  const isFiltered = table.state.columnFilters.length > 0

  const handleReset = () => {
    debouncedSearch.cancel()
    setValue("")
    onReset()
  }

  return (
    <div className="flex items-center gap-2 py-4">
      <Input
        placeholder="Filter by name..."
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          debouncedSearch(event.target.value)
        }}
        className="h-8 max-w-sm"
        aria-label="Filter by name"
      />
      {isFiltered ? (
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset
          <X aria-hidden="true" />
        </Button>
      ) : null}
      <DataTableViewOptions table={table} />
    </div>
  )
}
