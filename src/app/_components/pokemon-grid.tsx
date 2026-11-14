import { cn } from "cn"

export default function PokemonGrid({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6",
        className,
      )}
      {...props}
    />
  )
}
