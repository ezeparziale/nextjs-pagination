import { Route } from "next"
import Link from "next/link"

import {
  Infinity as InfinityIcon,
  ArrowRight,
  Server,
  Sparkles,
  Table2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const stack = ["Next.js 16", "TanStack Table v9", "Prisma", "shadcn/ui", "Tailwind v4"]

const demos = [
  {
    href: "/server-pagination",
    icon: Server,
    title: "Server pagination",
    tag: "RSC",
    description:
      "Classic offset pagination: the query runs on the server on every page change and the URL stays shareable.",
  },
  {
    href: "/infinite-scroll",
    icon: InfinityIcon,
    title: "Infinite scroll",
    tag: "Client",
    description:
      "Load the next batch of results automatically as you scroll, with an intersection observer.",
  },
  {
    href: "/pagination-advance/server",
    icon: Table2,
    title: "Pagination advance",
    tag: "3 modes",
    description:
      "A full-featured data table with sorting, range filters, column visibility, page numbers and page size.",
    links: [
      { label: "Server-side", href: "/pagination-advance/server" },
      { label: "Client-side", href: "/pagination-advance/client" },
      { label: "Hybrid", href: "/pagination-advance/mix" },
    ],
  },
] as const

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 py-8 sm:py-12">
      <section className="relative isolate flex flex-col items-center gap-6 text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] [background-size:16px_16px] opacity-50"
        />

        <Badge variant="secondary" className="gap-1.5">
          <Sparkles aria-hidden="true" />
          Next.js 16 · App Router
        </Badge>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Modern{" "}
          <span className="bg-linear-to-r from-yellow-400 via-blue-500 to-red-600 bg-clip-text text-transparent">
            pagination
          </span>{" "}
          patterns
        </h1>

        <p className="text-muted-foreground max-w-2xl text-lg text-pretty">
          Explore every flavor of pagination with real data — server-side, infinite
          scroll and a fully featured table. Built with TanStack Table, Prisma and
          shadcn/ui.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            render={<Link href={"/pagination-advance/server" as Route} />}
          >
            Explore the data table
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            render={<Link href={"/server-pagination" as Route} />}
          >
            Start simple
          </Button>
        </div>

        <ul className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {stack.map((item) => (
            <li key={item}>
              <Badge variant="outline">{item}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Demos</h2>
          <p className="text-muted-foreground text-sm">
            Three approaches to paginating the same dataset.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <Card
              key={demo.title}
              className="flex flex-col transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="bg-muted text-foreground flex size-10 items-center justify-center rounded-lg">
                    <demo.icon className="size-5" aria-hidden="true" />
                  </div>
                  <Badge variant="outline">{demo.tag}</Badge>
                </div>
                <CardTitle className="mt-2 text-lg">{demo.title}</CardTitle>
                <CardDescription>{demo.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col gap-3">
                {"links" in demo ? (
                  <div className="flex flex-wrap gap-2">
                    {demo.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href as Route}
                        className="hover:bg-muted focus-visible:ring-ring/50 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:ring-3 focus-visible:outline-none"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={demo.href as Route}
                    className="text-foreground inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    Open demo
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
