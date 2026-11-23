import {
  DEFAULT_ORDER,
  DEFAULT_SORT,
  SORT_FIELDS,
} from "@/app/pagination-advance/types"
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/lib/pagination"
import { MAX_SEARCH_LENGTH } from "@/lib/search"
import { z } from "zod"

const searchSchema = z
  .string()
  .trim()
  .max(MAX_SEARCH_LENGTH)
  .optional()
  .catch(undefined)
const pageSchema = z.coerce.number().int().positive().catch(1)
const limitSchema = z.coerce
  .number()
  .int()
  .positive()
  .max(MAX_PAGE_SIZE)
  .catch(DEFAULT_PAGE_SIZE)
const offsetSchema = z.coerce.number().int().nonnegative().max(1_000_000).catch(0)

export const pokemonSearchParamsSchema = z.object({
  query: searchSchema,
  page: pageSchema,
  limit: limitSchema,
})

export const getPokemonsInputSchema = z.object({
  search: searchSchema,
  offset: offsetSchema,
  limit: limitSchema,
})

export const tableSearchParamsSchema = z.object({
  page: pageSchema,
  pageSize: z.coerce
    .number()
    .int()
    .refine((size) =>
      PAGE_SIZE_OPTIONS.includes(size as (typeof PAGE_SIZE_OPTIONS)[number]),
    )
    .catch(DEFAULT_PAGE_SIZE),
  sort: z.enum(SORT_FIELDS).catch(DEFAULT_SORT),
  order: z.enum(["asc", "desc"]).catch(DEFAULT_ORDER),
  q: searchSchema,
})

const optionalIntParam = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.coerce
    .number()
    .transform(Math.trunc)
    .pipe(z.number().int())
    .optional()
    .catch(undefined),
)

export const statRangeSchema = z
  .object({ min: optionalIntParam, max: optionalIntParam })
  .refine(({ min, max }) => min !== undefined || max !== undefined)
