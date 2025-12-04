"use client"

import { Route } from "next"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useRef, useTransition } from "react"

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
  const [isSearching, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  const q = searchParams.get("query")?.toString()

  const handleSearch = useDebouncedCallback((query: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      if (query) {
        params.set("query", query)
        params.set("page", "1")
      } else {
        params.delete("query")
      }
      replace(`${pathname}?${params.toString()}` as Route)
    })
  }, 300)

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
      handleSearch("")
    }
  }

  return (
    <InputGroup className="h-8 max-w-sm min-w-[150px] flex-1 lg:w-[250px]">
      <InputGroupAddon align="inline-start" className="cursor-default">
        {isSearching ? <Spinner /> : <SearchIcon />}
      </InputGroupAddon>
      <InputGroupInput
        className="h-8 w-[160px] pl-8 lg:w-[250px]"
        placeholder="Search..."
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={q}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            inputRef?.current?.blur()
          }
        }}
        ref={inputRef}
      />
      {q && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" variant="ghost" onClick={handleClearInput}>
            <XIcon className="text-muted-foreground size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
