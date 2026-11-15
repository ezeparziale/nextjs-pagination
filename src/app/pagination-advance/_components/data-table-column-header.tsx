"use client"

import type { Column, RowData } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"

import { DataTableColumnFilter } from "./data-table-column-filter"
import type { DataTableFeatures } from "./data-table-features"

interface DataTableColumnHeaderProps<TData extends RowData, TValue> {
  column: Column<DataTableFeatures, TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted()

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className="data-[sorted=true]:text-foreground -ml-2"
        data-sorted={Boolean(sorted)}
        onClick={() => column.toggleSorting(sorted === "asc")}
        disabled={!column.getCanSort()}
      >
        {title}
        {sorted === "asc" ? (
          <ArrowUp aria-hidden="true" />
        ) : sorted === "desc" ? (
          <ArrowDown aria-hidden="true" />
        ) : (
          <ArrowUpDown aria-hidden="true" className="text-muted-foreground" />
        )}
      </Button>
      {column.getCanFilter() ? <DataTableColumnFilter column={column} /> : null}
    </div>
  )
}
