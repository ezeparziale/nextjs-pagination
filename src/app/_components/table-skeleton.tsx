import { DEFAULT_PAGE_SIZE } from "@/lib/pagination"

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table as TableRoot,
  TableRow,
} from "@/components/ui/table"

const COLUMNS = [
  { id: "id", width: "w-[92px]", header: "h-3 w-8", cell: "h-4 w-10" },
  { id: "name", width: "w-[139px]", header: "h-3 w-16", cell: "h-4 w-24" },
  { id: "height", width: "w-[122px]", header: "h-3 w-14", cell: "h-4 w-10" },
  { id: "weight", width: "w-[125px]", header: "h-3 w-14", cell: "h-4 w-10" },
  { id: "hp", width: "w-[97px]", header: "h-3 w-8", cell: "h-4 w-8" },
  { id: "attack", width: "w-[121px]", header: "h-3 w-12", cell: "h-4 w-8" },
  { id: "defense", width: "w-[134px]", header: "h-3 w-14", cell: "h-4 w-8" },
  {
    id: "specialAttack",
    width: "w-[126px]",
    header: "h-3 w-12",
    cell: "h-4 w-8",
  },
  {
    id: "specialDefense",
    width: "w-[127px]",
    header: "h-3 w-12",
    cell: "h-4 w-8",
  },
  { id: "speed", width: "w-[121px]", header: "h-3 w-10", cell: "h-4 w-8" },
  { id: "total", width: "w-[111px]", header: "h-3 w-10", cell: "h-4 w-10" },
  { id: "actions", width: "w-[49px]", header: "h-3 w-6", cell: "h-4 w-6" },
] as const

const STICKY_CLASS = "sticky right-0 z-10 border-l bg-inherit"

function columnClass(column: (typeof COLUMNS)[number]) {
  return column.id === "actions" ? `${column.width} ${STICKY_CLASS}` : column.width
}

function SkeletonBar({ className }: { className: string }) {
  return <div className={`bg-primary/10 rounded ${className}`} />
}

export default function TableSkeleton({ rows = DEFAULT_PAGE_SIZE }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-2" aria-hidden="true">
      <div className="py-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 h-8 w-full max-w-sm rounded-md" />
          <div className="bg-primary/10 ml-auto h-8 w-[100px] rounded-md" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-md border">
        <TableRoot className="table-fixed">
          <TableHeader>
            <TableRow className="bg-background">
              {COLUMNS.map((column) => (
                <TableHead key={column.id} className={columnClass(column)}>
                  {column.id === "actions" ? null : (
                    <SkeletonBar className={column.header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }, (_, row) => (
              <TableRow key={row} className="bg-background">
                {COLUMNS.map((column) => (
                  <TableCell key={column.id} className={columnClass(column)}>
                    {column.id === "name" ? (
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 size-8 shrink-0" />
                        <SkeletonBar className={column.cell} />
                      </div>
                    ) : column.id === "actions" ? (
                      <div className="bg-primary/10 ml-auto size-8 rounded-md" />
                    ) : (
                      <SkeletonBar className={column.cell} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </div>

      <div className="flex justify-end py-4">
        <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <SkeletonBar className="h-3 w-24" />
            <div className="bg-primary/10 h-8 w-[72px] rounded-md" />
          </div>
          <SkeletonBar className="h-3 w-40" />
          <div className="flex items-center gap-1">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="bg-primary/10 size-8 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
