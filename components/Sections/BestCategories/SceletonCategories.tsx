export function SceletonCategories() {
  return Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="animate-pulse flex flex-col items-center">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-[2.5rem] h-48 w-full mb-4" />
      <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 rounded-full" />
    </div>
  ));
}
