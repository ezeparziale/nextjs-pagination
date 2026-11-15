"use client"

import type { ReactNode } from "react"

import type { ReactTable, RowData } from "@tanstack/react-table"

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table as TableRoot,
  TableRow,
} from "@/components/ui/table"

import type { DataTableFeatures } from "./data-table-features"
import { DataTablePagination } from "./data-table-pagination"

interface DataTableProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>
  toolbar?: ReactNode
  emptyMessage?: string
  isLoading?: boolean
}

const STICKY_COLUMN_ID = "actions"
const STICKY_CLASS = "sticky right-0 z-10 border-l bg-inherit"

export function DataTable<TData extends RowData>({
  table,
  toolbar,
  emptyMessage = "No results.",
  isLoading = false,
}: DataTableProps<TData>) {
  const columnCount = table.getVisibleLeafColumns().length
  const rows = table.getRowModel().rows

  return (
    <div className="space-y-2">
      {toolbar}
      <div className="relative overflow-hidden rounded-md border">
        <TableRoot>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-background">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.id === STICKY_COLUMN_ID ? STICKY_CLASS : undefined
                    }
                  >
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row.id} className="bg-background">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === STICKY_COLUMN_ID ? STICKY_CLASS : undefined
                      }
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-24 text-center">
                  {isLoading ? "Loading..." : emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableRoot>
        {isLoading ? (
          <div className="bg-background/60 absolute inset-0" aria-hidden="true" />
        ) : null}
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
