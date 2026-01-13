export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Простые покупки,
            <span className="text-blue-600 dark:text-blue-400">
              {" "}
              отличные цены
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Всё, что вам нужно, в одном месте. Быстрая доставка, гарантия
            качества и лучшие цены на рынке.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#products" className="btn-primary text-center">
              Смотреть товары
            </a>
            <button className="btn-secondary">Узнать больше</button>
          </div>
        </div>
      </div>
    </section>
  );
}
