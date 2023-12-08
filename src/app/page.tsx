export default function Home() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
            Demo pagination{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-600 bg-clip-text text-transparent">
              Pokemon
            </span>
          </h1>
          <p className="max-w-[600px] text-foreground md:text-xl">Test all variants</p>
        </div>
      </div>
    </section>
  )
}
