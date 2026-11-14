export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

export function clampPage(page: number): number {
  return Number.isInteger(page) && page > 0 ? page : 1
}

export function clampLimit(limit: number): number {
  return Number.isInteger(limit) && limit > 0
    ? Math.min(limit, MAX_PAGE_SIZE)
    : DEFAULT_PAGE_SIZE
}

export function clampOffset(offset: number): number {
  return Number.isInteger(offset) && offset >= 0 ? offset : 0
}
