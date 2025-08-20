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
    <div className="relative flex h-8 items-center">
      {isSearching ? (
        <Loader2 className="text-muted-foreground absolute top-2 left-2 size-4 animate-spin" />
      ) : (
        <SearchIcon className="text-muted-foreground absolute top-2 left-2 size-4" />
      )}
      <Input
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
        <Button
          className="absolute top-2 right-2 h-4 w-4"
          onClick={handleClearInput}
          variant={"ghost"}
          size={"icon"}
        >
          <XCircleIcon className="text-muted-foreground size-5" />
        </Button>
      )}
    </div>
  )
}
