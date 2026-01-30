"use client";

import { useAuth } from "@/context/authContext";
import { ShieldCheck } from "lucide-react"; // Заменим User на ShieldCheck, чтобы не путать с профилем
import Link from "next/link";

interface AdminButtonProps {
  isMobile?: boolean;
}

export function AdminButton({ isMobile }: AdminButtonProps) {
  const { user } = useAuth();

  // Если не админ — ничего не рендерим
  if (!user?.isAdmin) {
    return null;
  }

  // Стили для мобильного меню (полноширинная кнопка)
  if (isMobile) {
    return (
      <Link
        href="/admin"
        className="flex items-center justify-between w-full p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 text-amber-700 dark:text-amber-500 transition-all active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5" />
          <span className="font-bold">Панель управления</span>
        </div>
        <span className="text-[10px] bg-amber-200 dark:bg-amber-900/40 px-2 py-0.5 rounded-md uppercase font-black">
          Admin
        </span>
      </Link>
    );
  }

  // Стили для десктопного хедера
  return (
    <Link
      href="/admin"
      className="flex items-center gap-2 p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-500 transition-all group"
      title="Админ-панель"
    >
      <ShieldCheck className="h-5 w-5 group-hover:rotate-12 transition-transform" />
      <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">
        Админ
      </span>
    </Link>
  );
}