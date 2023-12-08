import Link from "next/link"

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/">
        <div className="flex items-center space-x-2">
          <span className="sr-only">Pokemon</span>
          <p className="hidden font-extrabold tracking-tight antialiased sm:text-sm md:block md:text-3xl lg:text-5xl">
            Pokemon
          </p>
        </div>
      </Link>
    </div>
  )
}
