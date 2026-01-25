import { Category } from "@/type/product";
import { ArrowRight, Smartphone, Monitor, Headphones, Camera, Gamepad2 } from "lucide-react"; // Добавлены иконки
import Link from "next/link";
import Image from "next/image"; // Используем Image из Next.js для оптимизации

interface CategoriesCardProps {
  category: Category;
  theme: string | React.ReactNode; // Позволяем передавать и строку и компонент
}

// Функция для получения иконки по названию темы
const getThemeIcon = (theme: string) => {
  const themeLower = theme.toLowerCase();
  
  if (themeLower.includes('мобильн') || themeLower.includes('телефон') || themeLower.includes('смартфон')) {
    return <Smartphone className="w-10 h-10 text-blue-600" />;
  }
  if (themeLower.includes('компьютер') || themeLower.includes('ноутбук') || themeLower.includes('монитор')) {
    return <Monitor className="w-10 h-10 text-blue-600" />;
  }
  if (themeLower.includes('наушник') || themeLower.includes('аудио') || themeLower.includes('звук')) {
    return <Headphones className="w-10 h-10 text-blue-600" />;
  }
  if (themeLower.includes('камер') || themeLower.includes('фото')) {
    return <Camera className="w-10 h-10 text-blue-600" />;
  }
  if (themeLower.includes('игр') || themeLower.includes('консоль')) {
    return <Gamepad2 className="w-10 h-10 text-blue-600" />;
  }
  
  return <Smartphone className="w-10 h-10 text-blue-600" />; // Иконка по умолчанию
};

export function CategoriesCard({ category, theme }: CategoriesCardProps) {
  // Определяем, является ли theme URL-адресом изображения
  const isImageUrl = typeof theme === 'string' && 
    (theme.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) || theme.startsWith('data:image'));

  return (
    <Link
      href={`/category/?category=${category.id}`}
      className="group relative p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 text-center flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`Перейти к категории ${category.name}`}
    >
      {/* Icon Box */}
      <div
        className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner bg-white/50 dark:bg-gray-800/50`}
      >
        {typeof theme === 'string' && isImageUrl ? (
          // Если это URL изображения
          <div className="relative w-10 h-10">
            <Image
              src={theme}
              alt={category.name || "Иконка категории"}
              className="object-contain"
              fill
              sizes="40px"
              loading="lazy"
            />
          </div>
        ) : typeof theme === 'string' ? (
          // Если это строка (название темы), используем иконку
          getThemeIcon(theme)
        ) : (
          // Если передали React компонент напрямую
          theme
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col items-center">
        <h3 className="font-black text-gray-900 dark:text-white text-sm mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">
          {category.name}
        </h3>

        {category.about && (
          <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 mb-4 px-2 line-clamp-2 min-h-[2.4rem]">
            {category.about}
          </p>
        )}
      </div>

      {/* Счетчик товаров */}
      <div className="inline-block px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-[10px] font-black text-blue-600/60 dark:text-blue-400 border border-gray-100 dark:border-gray-700 uppercase tracking-tighter transition-all group-hover:border-blue-200 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
        {category.count || 0} товар{category.count !== 1 ? (category.count % 10 >= 2 && category.count % 10 <= 4 && (category.count % 100 < 10 || category.count % 100 >= 20) ? 'а' : 'ов') : ''}
      </div>

      {/* Hover Arrow overlay */}
      <div 
        className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300"
        aria-hidden="true"
      >
        <ArrowRight className="h-5 w-5 text-blue-500" />
      </div>
    </Link>
  );
}