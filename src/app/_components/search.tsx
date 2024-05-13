"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useRef, useTransition } from "react"

import { Loader2, SearchIcon, XCircleIcon } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
      replace(`${pathname}?${params.toString()}`)
    })
  }, 300)

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
      handleSearch("")
    }
  }

  return (
    <div className="min-w-40 relative flex w-2/3 items-center gap-1.5">
      {isSearching ? (
        <Loader2 className="size-5 absolute left-4 animate-spin text-muted-foreground" />
      ) : (
        <SearchIcon className="size-5 absolute left-4 text-muted-foreground" />
      )}
      <Input
        className="w-2/3 p-5 pl-12"
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
        <Button
          className="ml-1"
          onClick={handleClearInput}
          variant={"ghost"}
          size={"icon"}
        >
          <XCircleIcon className="size-5 text-muted-foreground" />
        </Button>
      )}
    </div>
  )
}
