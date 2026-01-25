"use client";

import Link from "next/link";
import { Star, Heart, Eye, Package } from "lucide-react";
import { Product } from "@/type/product";
import { useCart } from "@/context/cartContext";
import { useFavorite } from "@/context/FavoriteContext";
import { toast } from "sonner";
import CartButton from "./cart/CartButton";
import { useState, useCallback, memo } from "react";

interface ProductCardProps {
  product: Product;
}

// Кастомный хук для управления изображениями
function useProductImage(images: string | string[] | undefined) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageArray = Array.isArray(images) 
    ? images 
    : images 
      ? [images]
      : [];

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
    setImageLoaded(false);
    setImageError(false);
  }, [imageArray.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    setImageLoaded(false);
    setImageError(false);
  }, [imageArray.length]);

  return {
    currentImage: imageArray[currentImageIndex] || null,
    currentImageIndex,
    imageArray,
    imageError,
    imageLoaded,
    setImageError,
    setImageLoaded,
    nextImage,
    prevImage,
    hasMultipleImages: imageArray.length > 1
  };
}

// Кастомный хук для действий с товаром
function useProductActions(product: Product) {
  const { addToCart, cartItems } = useCart();
  const { toggleFavorite, isFavorite } = useFavorite();
  const [justAdded, setJustAdded] = useState(false);

  const isInCart = cartItems?.some((item) => item.id === product.id);
  const liked = isFavorite(product.id);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.inStock) {
      addToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
      
      toast.success("Добавлено!", {
        description: `${product.name} теперь в корзине.`,
        duration: 2000,
      });
    }
  }, [product, addToCart]);

  const handleLike = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);

    toast.message(liked ? "Удалено из избранного" : "Добавлено в избранное", {
      icon: liked ? "🗑️" : "❤️",
      duration: 1500,
    });
  }, [product, liked, toggleFavorite]);

  return {
    isInCart,
    liked,
    justAdded,
    handleAddToCart,
    handleLike
  };
}

// Маппинг категорий на иконки
const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    electronics: "📱",
    clothing: "👕",
    home: "🏠",
    beauty: "💄",
    books: "📚",
    sports: "⚽",
    food: "🍕",
    accessories: "🎒",
    default: "🛍️"
  };
  return icons[category.toLowerCase()] || icons.default;
};

// Функция для получения цвета статуса остатка
const getStockColor = (stock: number) => {
  if (stock <= 0) return "text-gray-500 bg-gray-100 dark:bg-gray-800";
  if (stock <= 3) return "text-rose-600 bg-rose-50 dark:bg-rose-900/20";
  if (stock <= 10) return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
  return "text-green-600 bg-green-50 dark:bg-green-900/20";
};

// Функция для получения текста статуса остатка
const getStockText = (stock: number) => {
  if (stock <= 0) return "Нет в наличии";
  if (stock <= 3) return `Осталось ${stock} шт.`;
  if (stock <= 10) return `В наличии: ${stock} шт.`;
  return "В наличии";
};

// Функция для генерации случайного остатка (для демонстрации)
const getRandomStock = (productId: string) => {
  // Генерируем детерминированный остаток на основе ID товара
  const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const stocks = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55];
  return stocks[hash % stocks.length];
};

// Основной компонент карточки товара
const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const {
    currentImage,
    currentImageIndex,
    imageArray,
    imageError,
    imageLoaded,
    setImageError,
    setImageLoaded,
    nextImage,
    prevImage,
    hasMultipleImages
  } = useProductImage(product.images);

  const {
    isInCart,
    liked,
    justAdded,
    handleAddToCart,
    handleLike
  } = useProductActions(product);

  const [showQuickView, setShowQuickView] = useState(false);

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  // Проверка наличия изображения
  const hasImage = currentImage && !imageError;
  
  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  // Получаем остаток товара
  const stock = product.stock !== undefined ? product.stock : getRandomStock(product.id);
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 3;
  const stockColor = getStockColor(stock);
  const stockText = getStockText(stock);

  return (
    <>
      <div 
        className="group relative bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full"
        role="article"
        aria-label={`Товар: ${product.name}, цена: ${formatPrice(product.price)}, ${stockText}`}
      >
        {/* SECTION: IMAGE */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
          <Link
            href={`/product/${product.id}`}
            className="flex items-center justify-center h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out"
          >
            {hasImage ? (
              // Если есть изображение товара
              <div className="relative w-full h-full">
                {/* Основное изображение */}
                <div className={`absolute inset-0 ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                  <img
                    src={currentImage}
                    alt={`${product.name}${hasMultipleImages ? ` - изображение ${currentImageIndex + 1} из ${imageArray.length}` : ''}`}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    loading={currentImageIndex === 0 ? "eager" : "lazy"}
                  />
                </div>
                
                {/* Скелетон загрузки */}
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
                )}
              </div>
            ) : (
              // Фолбэк с иконкой категории
              <div className="text-6xl filter drop-shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                {getCategoryIcon(product.category)}
              </div>
            )}
          </Link>

          {/* FLOATING ACTIONS */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <button
              onClick={handleLike}
              aria-label={liked ? "Удалить из избранного" : "Добавить в избранное"}
              aria-pressed={liked}
              className={`p-3 rounded-2xl shadow-xl backdrop-blur-md transition-all active:scale-90 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                liked
                  ? "bg-rose-500 text-white"
                  : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-rose-500 hover:bg-white dark:hover:bg-gray-800"
              }`}
            >
              <Heart className={`h-5 w-5 transition-transform ${liked ? 'fill-current scale-110' : ''}`} />
            </button>
            <button 
              onClick={handleQuickView}
              className="p-3 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-2xl shadow-xl backdrop-blur-md hover:text-blue-500 hover:bg-white dark:hover:bg-gray-800 transition-all active:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Быстрый просмотр"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>

          {/* BADGES */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.isNew && (
              <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase shadow-lg shadow-blue-500/30 animate-pulse">
                New
              </span>
            )}
            {product.discount && (
              <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase shadow-lg shadow-rose-500/30">
                -{product.discount}%
              </span>
            )}
            {/* Бейдж остатка товара */}
            {isOutOfStock ? (
              <span className="bg-gray-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase shadow-lg shadow-gray-500/30">
                Нет в наличии
              </span>
            ) : isLowStock ? (
              <span className="bg-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase shadow-lg shadow-amber-500/30 animate-pulse">
                Осталось {stock} шт.
              </span>
            ) : null}
          </div>
        </div>

        {/* SECTION: INFO */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              {product.category}
            </span>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <Star className="h-3 w-3 text-amber-500 fill-current" />
              <span className="text-[11px] font-black text-amber-700 dark:text-amber-500">
                {product.rating?.toFixed(1) || '0.0'}
              </span>
            </div>
          </div>

          <Link 
            href={`/product/${product.id}`} 
            className="flex-1 group/title focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded-lg p-1 -m-1"
          >
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-1 group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 leading-relaxed font-medium min-h-[2.8rem]">
              {product.description || "Описание отсутствует"}
            </p>
          </Link>

          {/* Индикатор остатка товара */}
          <div className="mb-4 flex items-center gap-2">
            <Package className={`h-4 w-4 ${stockColor.split(' ')[0]}`} />
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stockColor}`}>
              {stockText}
            </span>
            {isLowStock && !isOutOfStock && (
              <div className="flex-1 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    stock === 1 ? 'w-1/12 bg-rose-500' :
                    stock === 2 ? 'w-2/12 bg-rose-400' :
                    'w-3/12 bg-amber-500'
                  }`}
                />
              </div>
            )}
          </div>

          {/* SECTION: PRICE & ADD TO CART */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col">
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xs text-gray-400 line-through mb-0.5 font-medium">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">
                  Экономия {Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            <CartButton 
              product={product} 
              handleAddToCart={handleAddToCart}    
     
           
            />
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full z-10 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
              {/* Добавьте больше деталей о товаре здесь */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}, (prevProps, nextProps) => {
  // Мемоизация: ререндерим только если изменились важные свойства
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.inStock === nextProps.product.inStock &&
    prevProps.product.rating === nextProps.product.rating &&
    JSON.stringify(prevProps.product.images) === JSON.stringify(nextProps.product.images) &&
    prevProps.product.discount === nextProps.product.discount &&
    prevProps.product.isNew === nextProps.product.isNew
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;

// Компонент Skeleton для загрузки
export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse h-full">
      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700"></div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
          <div className="h-6 w-12 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
          </div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}