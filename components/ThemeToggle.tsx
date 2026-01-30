"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/themeContext"; // Твой кастомный контекст

export default function ThemeToggle() {
  // Забираем mode и функцию переключения из твоего контекста
  const { mode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ждем монтирования (hydration), чтобы избежать ошибки несоответствия серверного и клиентского HTML
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = mode === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme} // Используем функцию из контекста
      className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-zinc-800 hover:ring-2 ring-blue-500/20 transition-all overflow-hidden border border-transparent dark:border-zinc-700"
      aria-label="Переключить тему"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode} // Ключ меняется — срабатывает анимация
          initial={{ y: 20, opacity: 0, rotate: 45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: -45 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-amber-400 fill-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-blue-600 fill-blue-600" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}