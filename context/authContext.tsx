"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useMemo,
} from "react";

// Типы оставляем ваши (можно вынести в отдельный файл types/auth.ts)
type payment = {
  expiry: string;
  id: string;
  isDefault: boolean;
  last4: string;
  name: string;
  provider: string;
  type: string;
};

type UserType = {
  isAdmin: boolean;
  id: string;
  name: string;
  email: string;
  avatar?: string;
  token?: string; // Токен для API
  paymentMethods: payment[];
  drawing: any[];
};

type AuthContextType = {
  user: UserType | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (userData: UserType, remember: boolean) => void; // Добавили аргумент remember
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Проверяем оба хранилища при загрузке
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Ошибка парсинга данных пользователя", error);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: UserType, remember: boolean) => {
    setUser(userData);
    
    // Сохраняем и в хранилище, и токен отдельно (если ваш axios берет токен из хранилища)
    const storage = remember ? localStorage : sessionStorage;
    
    storage.setItem("user", JSON.stringify(userData));
    if (userData.token) {
      storage.setItem("token", userData.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};