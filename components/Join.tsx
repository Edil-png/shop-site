export function Join (){
  return (
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Присоединяйтесь к нашей рассылке
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Получайте первыми информацию о новых поступлениях, акциях и
            специальных предложениях.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Подписаться
            </button>
          </form>
        </div>
      </section>
  )
}