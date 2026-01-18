"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link"; // Правильный импорт для навигации

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 pt-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mt-8 overflow-hidden rounded-[3rem] bg-slate-900 p-8 md:p-20 text-white shadow-2xl"
      >
        {/* Фон с живым градиентом */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-700 opacity-90" />

        <div className="relative z-10 max-w-3xl">
          {/* Плашка с акцентом */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-sm font-bold uppercase tracking-wider mb-8"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            Новая коллекция 2026
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight"
          >
            Твой стиль — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">
              твои правила
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-lg leading-relaxed"
          >
            Откройте для себя эксклюзивные вещи, которые подчеркнут вашу
            индивидуальность. Доставка по всей стране.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/shop"
              className="group bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2 active:scale-95"
            >
              Перейти в каталог
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Декоративные элементы с анимацией покачивания */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" 
        />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]" />
      </motion.div>
    </section>
  );
}