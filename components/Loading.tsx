export function Loading (){
  return (
     <main className="min-h-screen bg-white dark:bg-gray-950 p-6">
        <div className="container mx-auto space-y-8 animate-pulse">
          <div className="h-[500px] bg-gray-100 dark:bg-gray-900 rounded-[3rem]" />
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 w-full bg-gray-100 dark:bg-gray-900 rounded-3xl"
              />
            ))}
          </div>
        </div>
      </main>
  )
}