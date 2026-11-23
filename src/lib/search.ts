export const MAX_SEARCH_LENGTH = 100

export function getSearchError(value: string): string | null {
  return value.trim().length > MAX_SEARCH_LENGTH
    ? `Search is limited to ${MAX_SEARCH_LENGTH} characters.`
    : null
}

export function getEmptySearchMessage(value: string): string {
  const search = value.trim()
  return search
    ? `No results for "${search}". Try another search.`
    : "No results found."
}
