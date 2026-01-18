'use client';
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/type/product";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  results: Product[];
  searchRef: React.RefObject<HTMLDivElement>;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  isFocused,
  setIsFocused,
  results,
  searchRef,
}: SearchBarProps) {
  return (
    <div className="hidden md:flex flex-1 max-w-xl relative" ref={searchRef}>
      <div className="relative w-full z-[160]">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
            isFocused ? "text-blue-600" : "text-gray-500" // Сделали иконку чуть ярче
          }`}
        />
        <input
          type="text"
          placeholder="Найти в каталоге..."
          value={searchQuery}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          // ОБНОВЛЕННЫЕ КЛАССЫ: добавили более яркий цвет текста и плейсхолдера
          className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 transition-all font-semibold text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>

      {isFocused && searchQuery.length > 1 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-[160]">
          <div className="max-h-[400px] overflow-y-auto p-2">
            {results.length > 0 ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => setIsFocused(false)}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-colors group"
                >
                  <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {product.category === "electronics" ? "📱" : "👕"}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-bold"> {/* Яркость цены */}
                      {product.price.toLocaleString()} ₽
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-gray-600 dark:text-gray-300 font-black"> {/* Яркость текста ошибки */}
                Ничего не нашли 😔
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}