"use client"

import { Route } from "next"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"

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

  const q = searchParams.get("query") ?? ""
  const [value, setValue] = useState(q)
  const [prevQuery, setPrevQuery] = useState(q)

  if (q !== prevQuery) {
    setPrevQuery(q)
    setValue(q)
  }

  const updateUrl = useCallback(
    (query: string) => {
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

  const isSearching = isPending || value !== q

  const handleClearInput = () => {
    handleSearch.cancel()
    setValue("")
    updateUrl("")
    inputRef.current?.focus()
  }

  return (
    <InputGroup className="h-8 w-full max-w-sm">
      <InputGroupAddon align="inline-start" className="cursor-default">
        {isSearching ? <Spinner /> : <SearchIcon aria-hidden="true" />}
      </InputGroupAddon>
      <InputGroupInput
        className="h-8 pl-8"
        placeholder="Search..."
        aria-label="Search Pokemon"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
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
  )
}
