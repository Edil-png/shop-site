"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme(); // Используем resolvedTheme для точности
  const [mounted, setMounted] = useState(false);

  // Ждем монтирования, чтобы избежать конфликтов сервера и клиента
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 hover:ring-2 ring-blue-500/20 transition-shadow overflow-hidden"
      aria-label="Переключить тему"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark" : "light"}
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