import { Route } from "next"
import { redirect } from "next/navigation"

export default function PaginationAdvancePage() {
  redirect("/pagination-advance/server" as Route)
}
