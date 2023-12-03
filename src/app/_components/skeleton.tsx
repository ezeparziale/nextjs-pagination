import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SkeletonCardList() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {[...Array(20)].map((p, index) => (
        <Card key={index} className="h-[200px] w-[200px] animate-pulse">
          <CardHeader>
            <div className="h-6 rounded bg-gray-300" />
          </CardHeader>
          <CardContent>
            <div className="h-24 rounded bg-gray-300" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
