import { Category } from "@/type/product";
import { ArrowRight } from "lucide-react";
import Link from "next/link";



interface CategoriesCardProps {
  category: Category;
  theme: string
}

export function CategoriesCard({ category, theme }: CategoriesCardProps) {

  return (
    <Link
      href={`/category/?category${category.id}`}
      className="group relative p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 text-center flex flex-col items-center"
    >
      {/* Icon Box */}
      <div
        className={`w-20 h-20  rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner`}
      >
       <img src={theme} alt="Нет фото" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col items-center">
        <h3 className="font-black text-gray-900 dark:text-white text-sm mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
          {category.name}
        </h3>

        {/* Добавленное описание Category About */}
        {category.about && (
          <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 mb-4 px-2 line-clamp-2 min-h-[2.4rem]">
            {category.about}
          </p>
        )}
      </div>

      {/* Счетчик товаров */}
      <div className="inline-block px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-[10px] font-black text-blue-600/60 dark:text-blue-400 border border-gray-100 dark:border-gray-700 uppercase tracking-tighter transition-all group-hover:border-blue-200 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
        {category.count || 0} товаров
      </div>

      {/* Hover Arrow overlay */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
        <ArrowRight className="h-5 w-5 text-blue-500" />
      </div>
    </Link>
  );
}