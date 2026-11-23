import {
  DEFAULT_ORDER,
  DEFAULT_SORT,
  type PokemonFilters,
  type PokemonQuery,
  type RangeFilter,
  STAT_FIELDS,
  type StatField,
} from "@/app/pagination-advance/types"
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/lib/pagination"
import { statRangeSchema, tableSearchParamsSchema } from "@/lib/validation"
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table"

export { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS }

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

function isStatField(value: string): value is StatField {
  return (STAT_FIELDS as readonly string[]).includes(value)
}

export function parseTableQuery(input: SearchParamsInput): PokemonQuery {
  const params = toURLSearchParams(input)
  const parsed = tableSearchParamsSchema.parse({
    page: params.get("page") ?? undefined,
    pageSize: params.get("pageSize") ?? undefined,
    sort: params.get("sort") ?? undefined,
    order: params.get("order") ?? undefined,
    q: params.get("q") ?? undefined,
  })

  const filters: PokemonFilters = {}
  if (parsed.q) filters.name = parsed.q

  for (const stat of STAT_FIELDS) {
    const range = statRangeSchema.safeParse({
      min: params.get(`${stat}Min`) ?? undefined,
      max: params.get(`${stat}Max`) ?? undefined,
    })
    if (range.success) filters[stat] = range.data
  }

  return {
    page: parsed.page,
    pageSize: parsed.pageSize,
    sort: parsed.sort,
    order: parsed.order,
    filters,
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
