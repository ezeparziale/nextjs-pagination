"use client"

import Image from "next/image"

import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type PokemonRow, STAT_FIELDS, type StatField } from "../types"
import { DataTableColumnHeader } from "./data-table-column-header"
import type { DataTableFeatures } from "./data-table-features"

const columnHelper = createColumnHelper<DataTableFeatures, PokemonRow>()

const STAT_LABELS: Record<StatField, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  specialAttack: "Sp. Atk",
  specialDefense: "Sp. Def",
  speed: "Speed",
}

function artworkUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground tabular-nums">#{getValue()}</span>
    ),
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    filterFn: "includesString",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          alt={row.original.name}
          className="size-8 shrink-0"
          src={artworkUrl(row.original.id)}
          width={32}
          height={32}
          sizes="32px"
        />
        <span className="font-medium capitalize">{row.original.name}</span>
      </div>
    ),
  }),
  columnHelper.accessor("height", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Height" />,
    cell: ({ getValue }) => <span className="tabular-nums">{getValue()}</span>,
  }),
  columnHelper.accessor("weight", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Weight" />,
    cell: ({ getValue }) => <span className="tabular-nums">{getValue()}</span>,
  }),
  ...STAT_FIELDS.map((stat) =>
    columnHelper.accessor(stat, {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={STAT_LABELS[stat]} />
      ),
      filterFn: "inNumberRange",
      meta: { filterVariant: "number-range" },
      cell: ({ getValue }) => <span className="tabular-nums">{getValue()}</span>,
    }),
  ),
  columnHelper.accessor(
    (row) =>
      row.hp +
      row.attack +
      row.defense +
      row.specialAttack +
      row.specialDefense +
      row.speed,
    {
      id: "total",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
      cell: ({ getValue }) => (
        <span className="font-semibold tabular-nums">{getValue()}</span>
      ),
    },
  ),
  columnHelper.display({
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const pokemon = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon-sm" className="ml-auto" />}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(String(pokemon.id))}
              >
                Copy ID
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
])
