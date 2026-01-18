import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[12rem] font-black text-gray-100 dark:text-gray-900 leading-none">404</h1>
      <div className="relative">
        <h2 className="text-3xl font-black mb-4">Упс! Страница не найдена</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Возможно, этот товар уже раскупили или ссылка устарела. Давайте вернемся на главную.
        </p>
        <Link href="/" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all inline-block">
          На главную
        </Link>
      </div>
    </div>
  );
}