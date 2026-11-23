"use client"

import { useEffect, useId, useState } from "react"

import { getSearchError } from "@/lib/search"
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
  const [error, setError] = useState<string | null>(null)
  const errorId = useId()

  if (searchValue !== prevSearchValue) {
    setPrevSearchValue(searchValue)
    setValue(searchValue)
    setError(null)
  }

  const debouncedSearch = useDebouncedCallback(onSearchChange, debounceMs)

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch])

  const isFiltered = table.state.columnFilters.length > 0
  const status = error
    ? ""
    : value !== searchValue
      ? "Filtering…"
      : searchValue
        ? `Filtered by ${searchValue}`
        : ""

  const handleReset = () => {
    debouncedSearch.cancel()
    setError(null)
    setValue("")
    onReset()
  }

  return (
    <div className="py-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter by name..."
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            setError(getSearchError(event.target.value))
            debouncedSearch(event.target.value)
          }}
          className="h-8 max-w-sm"
          aria-label="Filter by name"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        {isFiltered ? (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset
            <X aria-hidden="true" />
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
      <span className="sr-only" aria-live="polite">
        {status}
      </span>
      {error ? (
        <p id={errorId} role="alert" className="text-destructive mt-1 text-xs">
          {error}
        </p>
      ) : null}
    </div>
  )
}
