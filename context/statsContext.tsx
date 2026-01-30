"use client";

import { Stats } from "@/type/stats";
import api from "@/utils/axios";
import { createContext, useContext, useEffect, useState, useMemo } from "react";

// Добавим состояние загрузки и ошибок в интерфейс контекста
interface StatsContextType {
  stats: Stats[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refreshStats: () => Promise<void>;
}

const statsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState<Stats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response =  await api.get<Stats[]>("api/stats");
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []); // Пустой массив — запрос только при монтировании

  // Мемоизируем значение, чтобы избежать лишних рендеров
  const value = useMemo(
    () => ({
      stats,
      isLoading,
      error,
      refreshStats: fetchStats,
    }),
    [stats, isLoading, error],
  );

  return (
    <statsContext.Provider value={value}>{children}</statsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(statsContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
