"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 pt-6 pb-12">
      {/* Используем чистые CSS-градиенты вместо тяжелых фильтров */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-20 text-white shadow-xl">
        
        {/* Статичный фон: один слой градиента легче, чем 5 слоев со смешиванием */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black pointer-events-none" />
        
        {/* Декоративный элемент: обычный круг с прозрачностью БЕЗ blur */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 rounded-full translate-x-1/3 -translate-y-1/2" />

        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest mb-6 text-blue-300"
          >
            <Sparkles className="h-3 w-3" />
            Коллекция 2026
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Твой стиль — <br />
            <span className="text-blue-400">твои правила</span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 mb-10 max-w-lg">
            Эксклюзивные вещи, подчеркивающие индивидуальность. 
            Быстрая доставка и гарантия качества.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              В каталог
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link
              href="/new"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-colors"
            >
              Новинки
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}