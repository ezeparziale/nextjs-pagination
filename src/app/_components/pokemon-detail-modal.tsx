"use client"

import type { ReactNode } from "react"

import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { POKEMON_DETAIL_TITLE_ID } from "@/lib/pokemon"

export default function PokemonDetailModal({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent
        aria-labelledby={POKEMON_DETAIL_TITLE_ID}
        showCloseButton
        className="max-h-[min(90vh,48rem)] max-w-lg overflow-y-auto"
      >
        <DialogHeader className="sr-only">
          <DialogTitle id={POKEMON_DETAIL_TITLE_ID}>Pokemon details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected Pokemon.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
