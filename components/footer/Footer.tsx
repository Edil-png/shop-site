"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Send,
  ShieldCheck,
  Truck,
  CreditCard,
  Youtube,
  LucideIcon
} from "lucide-react";
import Link from "next/link";
import { FormEvent } from "react";

export default function Footer() {
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    alert("Спасибо за подписку!");
  };

  const socialLinks = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white pt-20 border-t border-gray-200 dark:border-gray-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        
      

        {/* СРЕДНЯЯ ЧАСТЬ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-20">
          
          {/* Бренд */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-500">
                <span className="font-black text-2xl text-white">S</span>
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase dark:text-white text-gray-900">
                El-Shop
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm text-lg font-medium">
              Ваш премиальный выбор в мире электроники. Мы создаем лучший опыт покупок с фокусом на качество и сервис.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a 
                  key={label} 
                  href={href} 
                  aria-label={label}
                  className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl hover:bg-blue-600 hover:text-white dark:hover:text-white text-gray-600 dark:text-gray-400 hover:-translate-y-2 transition-all duration-500 border border-transparent dark:border-white/5 hover:border-blue-400 shadow-sm"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <nav>
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500 mb-8">Магазин</h3>
              <ul className="space-y-4">
                <FooterLink href="/categories/electronics">Электроника</FooterLink>
                <FooterLink href="/categories/clothing">Одежда</FooterLink>
                <FooterLink href="/categories/home">Для дома</FooterLink>
                <FooterLink href="/new">Новинки</FooterLink>
              </ul>
            </nav>
            <nav>
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500 mb-8">Инфо</h3>
              <ul className="space-y-4">
                <FooterLink href="/about">О нас</FooterLink>
                <FooterLink href="/contacts">Контакты</FooterLink>
                <FooterLink href="/faq">Вопросы</FooterLink>
                <FooterLink href="/blog">Блог</FooterLink>
              </ul>
            </nav>
          </div>

          {/* Рассылка */}
          <div className="lg:col-span-4">
            <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/5 relative overflow-hidden group shadow-inner">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-colors" />
              <h3 className="font-bold text-xl mb-3 dark:text-white text-gray-900 leading-tight">
                Будьте в курсе
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed font-medium">
                Подпишитесь и получите скидку 10% на первый заказ.
              </p>
              <form onSubmit={handleSubscribe} className="relative">
                <input 
                  required
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white shadow-sm"
                />
                <button 
                  type="submit"
                  aria-label="Подписаться"
                  className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* НИЖНЯЯ ЧАСТЬ */}
        <div className="border-t border-gray-100 dark:border-white/5 py-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-semibold order-2 md:order-1">
            © 2026 <span className="text-gray-900 dark:text-white">EL-SHOP</span>. Все права защищены.
          </div>
          
          <div className="flex items-center gap-8 order-1 md:order-2 opacity-60 dark:opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.svg" alt="Mir" className="h-3 dark:invert-0 invert" />
          </div>

          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 order-3">
            <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Оферта</Link>
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Приватность</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface BenefitProps {
  Icon: LucideIcon;
  title: string;
  desc: string;
  hoverBg: string;
  iconColor: string;
}

function BenefitItem({ Icon, title, desc, hoverBg, iconColor }: BenefitProps) {
  return (
    <div className="flex items-center gap-5 group cursor-default">
      <div className={`p-5 bg-gray-100 dark:bg-white/5 rounded-[2rem] ${hoverBg} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
        <Icon className={`h-7 w-7 ${iconColor} group-hover:text-white transition-colors duration-300`} />
      </div>
      <div>
        <h4 className="font-bold text-lg text-gray-800 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{desc}</p>
      </div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white flex items-center gap-2 group transition-all font-semibold">
        <span className="h-px w-0 bg-blue-600 group-hover:w-3 transition-all duration-300" />
        {children}
      </Link>
    </li>
  );
}