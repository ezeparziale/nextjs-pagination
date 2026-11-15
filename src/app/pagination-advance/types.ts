export type PokemonRow = {
  id: number
  name: string
  height: number
  weight: number
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export const SORT_FIELDS = [
  "id",
  "name",
  "height",
  "weight",
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
] as const

export type SortField = (typeof SORT_FIELDS)[number]

export type SortDir = "asc" | "desc"

export const STAT_FIELDS = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
] as const

export type StatField = (typeof STAT_FIELDS)[number]

export type RangeFilter = {
  min?: number
  max?: number
}

export type PokemonFilters = {
  name?: string
} & {
  [K in StatField]?: RangeFilter
}

export type PokemonQuery = {
  page: number
  pageSize: number
  sort: SortField
  order: SortDir
  filters: PokemonFilters
}

export type PokemonPageResult = {
  rows: PokemonRow[]
  totalCount: number
  pageCount: number
  page: number
  pageSize: number
}

export const DEFAULT_SORT: SortField = "id"
export const DEFAULT_ORDER: SortDir = "asc"
