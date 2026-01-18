'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/type/product';

type FavoriteContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string | number) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Загрузка из localStorage при старте
  useEffect(() => {
    const saved = localStorage.getItem('favorites_cache');
    if (saved) {
      try { setFavorites(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    setIsInitialized(true);
  }, []);

  // Сохранение в localStorage при изменениях
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favorites_cache', JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.find(item => String(item.id) === String(product.id));
      if (exists) {
        return prev.filter(item => String(item.id) !== String(product.id));
      }
      return [...prev, product];
    });
  };

  const isFavorite = (id: string | number) => 
    favorites.some(item => String(item.id) === String(id));

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) throw new Error('useFavorite must be used within FavoriteProvider');
  return context;
};