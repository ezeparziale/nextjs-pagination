"use client"

import { Route } from "next"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useCallback, useEffect, useId, useRef, useState, useTransition } from "react"

import { getSearchError } from "@/lib/search"
import { SearchIcon, XIcon } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

export default function SearchPokemon() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)
  const errorId = useId()

  const q = searchParams.get("query") ?? ""
  const [value, setValue] = useState(q)
  const [prevQuery, setPrevQuery] = useState(q)
  const [error, setError] = useState<string | null>(null)

  if (q !== prevQuery) {
    setPrevQuery(q)
    setValue(q)
    setError(null)
  }

  const updateUrl = useCallback(
    (query: string) => {
      const validationError = getSearchError(query)
      setError(validationError)
      if (validationError) return

      startTransition(() => {
        const params = new URLSearchParams(searchParams)
        if (query) {
          params.set("query", query)
          params.set("page", "1")
        } else {
          params.delete("query")
          params.delete("page")
        }
        replace(`${pathname}?${params.toString()}` as Route)
      })
    },
    [pathname, replace, searchParams],
  )

  const handleSearch = useDebouncedCallback(updateUrl, 300)

  useEffect(() => () => handleSearch.cancel(), [handleSearch])

  const isSearching = !error && (isPending || value !== q)
  const status = isSearching ? "Searching…" : q ? `Results for ${q}` : ""

  const handleClearInput = () => {
    handleSearch.cancel()
    setError(null)
    setValue("")
    updateUrl("")
    inputRef.current?.focus()
  }

  return (
    <div className="w-full max-w-sm flex-1">
      <InputGroup className="h-8 w-full">
        <InputGroupAddon align="inline-start" className="cursor-default">
          {isSearching ? <Spinner /> : <SearchIcon aria-hidden="true" />}
        </InputGroupAddon>
        <InputGroupInput
          className="h-8 pl-8 text-sm"
          placeholder="Search..."
          aria-label="Search Pokemon"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(getSearchError(e.target.value))
            handleSearch(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              inputRef.current?.blur()
            }
          }}
          ref={inputRef}
        />
        {(value || q) && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              variant="ghost"
              onClick={handleClearInput}
              aria-label="Clear search"
            >
              <XIcon className="text-muted-foreground size-4" aria-hidden="true" />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      <span className="sr-only" aria-live="polite">
        {status}
      </span>
      {error ? (
        <p id={errorId} role="alert" className="text-destructive mt-1 text-xs">
          {error}
        </p>
      ) : null}
    </div>
  )
}
