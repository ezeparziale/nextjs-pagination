"use client"

import type { ReactTable, RowData } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
} from "@/data/pokemon-table-params"
import type { DataTableFeatures } from "./data-table-features"

interface DataTablePaginationProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>
}

function getPageItems(
  current: number,
  pageCount: number,
  window = 1,
): (number | "ellipsis")[] {
  const items: (number | "ellipsis")[] = []
  const push = (value: number | "ellipsis") => {
    if (items[items.length - 1] !== value) items.push(value)
  }

  const start = Math.max(2, current - window)
  const end = Math.min(pageCount - 1, current + window)

  push(1)
  if (start > 2) push("ellipsis")
  for (let page = start; page <= end; page += 1) push(page)
  if (end < pageCount - 1) push("ellipsis")
  if (pageCount > 1) push(pageCount)

  return items
}

export function DataTablePagination<TData extends RowData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.state.pagination
  const pageCount = table.getPageCount()
  const currentPage = pageIndex + 1
  const rowCount = table.getRowCount()
  const pageItems = getPageItems(currentPage, pageCount)

  return (
    <div className="flex justify-center py-4 lg:justify-end">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <label className="text-sm whitespace-nowrap" htmlFor="rows-per-page">
            Rows per page
          </label>
          <Select
            value={String(pageSize)}
            onValueChange={(value) =>
              table.setPageSize(Number(value ?? DEFAULT_PAGE_SIZE))
            }
          >
            <SelectTrigger id="rows-per-page" size="sm" className="w-[72px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size: number) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm whitespace-nowrap">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{Math.max(pageCount, 1)}</span>
          <span className="text-muted-foreground"> · {rowCount} results</span>
        </p>

        <nav className="flex items-center gap-1" aria-label="Pagination">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to first page"
          >
            <ChevronsLeft aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to previous page"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>

          <span className="hidden items-center gap-1 sm:flex">
            {pageItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="text-muted-foreground px-1 text-sm"
                  aria-hidden="true"
                >
                  …
                </span>
              ) : (
                <Button
                  key={item}
                  variant={item === currentPage ? "default" : "outline"}
                  size="icon-sm"
                  onClick={() => table.setPageIndex(item - 1)}
                  aria-label={`Go to page ${item}`}
                  aria-current={item === currentPage ? "page" : undefined}
                >
                  {item}
                </Button>
              ),
            )}
          </span>

          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to next page"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to last page"
          >
            <ChevronsRight aria-hidden="true" />
          </Button>
        </nav>
      </div>
    </div>
  )
}
