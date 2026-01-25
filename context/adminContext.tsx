"use client";

import { Stats } from "@/type/stats";
import api from "@/utils/axios";
import { createContext, useContext, useEffect, useState, useMemo } from "react";

// Добавим состояние загрузки и ошибок в интерфейс контекста
interface AdminContextType {
  stats: Stats | undefined;
  isLoading: boolean;
  error: Error | null;
  refreshStats: () => Promise<void>;
}

const adminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState<Stats>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<Stats>("api/statist");
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error("Failed to fetch stats:", err);
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
    <adminContext.Provider value={value}>{children}</adminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(adminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
