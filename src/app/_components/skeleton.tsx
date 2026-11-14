import { Card, CardContent, CardHeader } from "@/components/ui/card"

import PokemonGrid from "./pokemon-grid"

export default function SkeletonCardList({ count = 20 }: { count?: number }) {
  return (
    <PokemonGrid aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader>
            <div className="mt-2 flex justify-center">
              <div className="bg-primary/10 h-8 w-32 rounded-md" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/10 mx-auto size-[100px] rounded-md" />
          </CardContent>
        </Card>
      ))}
    </PokemonGrid>
  )
}
