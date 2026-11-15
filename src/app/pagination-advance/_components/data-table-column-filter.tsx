"use client"

import { useState } from "react"

import type { Column, RowData } from "@tanstack/react-table"
import { ListFilter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import type { RangeFilter } from "../types"
import type { DataTableFeatures } from "./data-table-features"

interface DataTableColumnFilterProps<TData extends RowData, TValue> {
  column: Column<DataTableFeatures, TData, TValue>
}

function toNumber(value: string): number | undefined {
  if (value.trim() === "") return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function DataTableColumnFilter<TData extends RowData, TValue>({
  column,
}: DataTableColumnFilterProps<TData, TValue>) {
  const variant = column.columnDef.meta?.filterVariant ?? "text"
  const filterValue = column.getFilterValue()
  const externalKey = JSON.stringify(filterValue ?? null)

  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [syncedKey, setSyncedKey] = useState<string | null>(null)

  if (syncedKey !== externalKey) {
    setSyncedKey(externalKey)
    if (variant === "number-range") {
      const range = (filterValue as RangeFilter | undefined) ?? {}
      setMin(range.min !== undefined ? String(range.min) : "")
      setMax(range.max !== undefined ? String(range.max) : "")
    } else {
      setText(typeof filterValue === "string" ? filterValue : "")
    }
  }

  const range = (filterValue as RangeFilter | undefined) ?? undefined
  const isActive =
    variant === "number-range"
      ? range?.min !== undefined || range?.max !== undefined
      : Boolean(filterValue)

  const apply = () => {
    if (variant === "number-range") {
      const next: RangeFilter = {}
      const parsedMin = toNumber(min)
      const parsedMax = toNumber(max)
      if (parsedMin !== undefined) next.min = parsedMin
      if (parsedMax !== undefined) next.max = parsedMax
      column.setFilterValue(
        next.min !== undefined || next.max !== undefined ? next : undefined,
      )
    } else {
      column.setFilterValue(text.trim() ? text.trim() : undefined)
    }
    setOpen(false)
  }

  const clear = () => {
    column.setFilterValue(undefined)
    setText("")
    setMin("")
    setMax("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Filter by ${column.id}`}
          />
        }
      >
        <ListFilter
          aria-hidden="true"
          className={isActive ? "text-foreground" : "text-muted-foreground"}
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 gap-3">
        {variant === "number-range" ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={min}
              onChange={(event) => setMin(event.target.value)}
              className="h-8"
              aria-label={`Minimum ${column.id}`}
            />
            <span className="text-muted-foreground" aria-hidden="true">
              –
            </span>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={max}
              onChange={(event) => setMax(event.target.value)}
              className="h-8"
              aria-label={`Maximum ${column.id}`}
            />
          </div>
        ) : (
          <Input
            placeholder="Filter..."
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="h-8"
            aria-label={`Filter by ${column.id}`}
          />
        )}
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear
          </Button>
          <Button size="sm" onClick={apply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
