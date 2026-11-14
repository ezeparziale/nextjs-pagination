import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function PokemonCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="mt-2 flex justify-center">
          <div className="bg-primary/10 h-8 w-32 rounded-md" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-primary/10 mx-auto size-[100px] rounded-md" />
      </CardContent>
    </Card>
  )
}
