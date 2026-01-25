"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useMemo,
} from "react";

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
  id: string;
  name: string;
  email: string;
  avatar?: string;
  token?: string;
  paymentMethods: payment[] | undefined;
};

type AuthContextType = {
  user: UserType | null;
  isLoggedIn: boolean;
  isLoading: boolean; // Добавляем состояние загрузки
  login: (userData: UserType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Инициализация данных пользователя при монтировании
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data", error);
        sessionStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: UserType) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  // Мемоизируем значение контекста для предотвращения лишних ререндеров
  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
