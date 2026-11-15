import { clampPage } from "@/lib/pagination"
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table"

import {
  DEFAULT_ORDER,
  DEFAULT_SORT,
  type PokemonFilters,
  type PokemonQuery,
  type RangeFilter,
  SORT_FIELDS,
  STAT_FIELDS,
  type SortDir,
  type SortField,
  type StatField,
} from "../types"

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const
export const DEFAULT_PAGE_SIZE = 20

export type SearchParamsInput =
  URLSearchParams | Record<string, string | string[] | undefined>

function toURLSearchParams(input: SearchParamsInput): URLSearchParams {
  if (input instanceof URLSearchParams) return input
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue
    if (Array.isArray(value)) {
      if (value[0] !== undefined) params.set(key, value[0])
    } else {
      params.set(key, value)
    }
  }
  return params
}

function toInt(value: string | null | undefined): number | undefined {
  if (value === null || value === undefined || value.trim() === "") return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.trunc(parsed) : undefined
}

function normalizePageSize(value: number | undefined): number {
  return PAGE_SIZE_OPTIONS.includes(value as (typeof PAGE_SIZE_OPTIONS)[number])
    ? (value as number)
    : DEFAULT_PAGE_SIZE
}

function normalizeSort(value: string | null): SortField {
  return SORT_FIELDS.includes(value as SortField) ? (value as SortField) : DEFAULT_SORT
}

function normalizeOrder(value: string | null): SortDir {
  return value === "desc" ? "desc" : DEFAULT_ORDER
}

function isStatField(value: string): value is StatField {
  return (STAT_FIELDS as readonly string[]).includes(value)
}

function parseFilters(params: URLSearchParams): PokemonFilters {
  const filters: PokemonFilters = {}

  const name = params.get("q")?.trim()
  if (name) filters.name = name

  for (const stat of STAT_FIELDS) {
    const min = toInt(params.get(`${stat}Min`))
    const max = toInt(params.get(`${stat}Max`))
    if (min !== undefined || max !== undefined) {
      const range: RangeFilter = {}
      if (min !== undefined) range.min = min
      if (max !== undefined) range.max = max
      filters[stat] = range
    }
  }

  return filters
}

export function parseTableQuery(input: SearchParamsInput): PokemonQuery {
  const params = toURLSearchParams(input)

  return {
    page: clampPage(toInt(params.get("page")) ?? 1),
    pageSize: normalizePageSize(toInt(params.get("pageSize"))),
    sort: normalizeSort(params.get("sort")),
    order: normalizeOrder(params.get("order")),
    filters: parseFilters(params),
  }
}

export function buildTableSearchParams(query: PokemonQuery): URLSearchParams {
  const params = new URLSearchParams()

  if (query.page > 1) params.set("page", String(query.page))
  if (query.pageSize !== DEFAULT_PAGE_SIZE) {
    params.set("pageSize", String(query.pageSize))
  }
  if (query.sort !== DEFAULT_SORT) params.set("sort", query.sort)
  if (query.order !== DEFAULT_ORDER) params.set("order", query.order)

  const name = query.filters.name?.trim()
  if (name) params.set("q", name)

  for (const stat of STAT_FIELDS) {
    const range = query.filters[stat]
    if (!range) continue
    if (range.min !== undefined) params.set(`${stat}Min`, String(range.min))
    if (range.max !== undefined) params.set(`${stat}Max`, String(range.max))
  }

  return params
}

export function tableQueryToURL(query: PokemonQuery): string {
  const params = buildTableSearchParams(query)
  const qs = params.toString()
  return qs ? `?${qs}` : ""
}

export function queryToPagination(query: PokemonQuery): PaginationState {
  return { pageIndex: query.page - 1, pageSize: query.pageSize }
}

export function queryToSorting(query: PokemonQuery): SortingState {
  return [{ id: query.sort, desc: query.order === "desc" }]
}

export function queryToColumnFilters(query: PokemonQuery): ColumnFiltersState {
  const filters: ColumnFiltersState = []

  if (query.filters.name) filters.push({ id: "name", value: query.filters.name })

  for (const stat of STAT_FIELDS) {
    const range = query.filters[stat]
    if (range && (range.min !== undefined || range.max !== undefined)) {
      filters.push({ id: stat, value: range })
    }
  }

  return filters
}

export function columnFiltersToFilters(
  columnFilters: ColumnFiltersState,
): PokemonFilters {
  const filters: PokemonFilters = {}

  for (const filter of columnFilters) {
    if (filter.id === "name") {
      const value = typeof filter.value === "string" ? filter.value.trim() : ""
      if (value) filters.name = value
      continue
    }

    if (isStatField(filter.id)) {
      const value = filter.value as RangeFilter | undefined
      if (value && (value.min !== undefined || value.max !== undefined)) {
        filters[filter.id] = value
      }
    }
  }

  return filters
}

export function paginationToPage(pagination: PaginationState): number {
  return pagination.pageIndex + 1
}
