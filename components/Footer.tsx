import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  Truck,
  CreditCard
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 border-t border-gray-800">
      <div className="container mx-auto px-4">
        
        {/* ВЕРХНЯЯ ЧАСТЬ: Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-gray-800/50">
          <div className="flex items-center gap-4 group">
            <div className="p-4 bg-gray-800/50 rounded-2xl group-hover:bg-blue-600 transition-colors duration-500">
              <Truck className="h-6 w-6 text-blue-500 group-hover:text-white" />
            </div>
            <div>
              <h4 className="font-bold">Быстрая доставка</h4>
              <p className="text-sm text-gray-500">Бесплатно от 5000 ₽</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="p-4 bg-gray-800/50 rounded-2xl group-hover:bg-green-600 transition-colors duration-500">
              <ShieldCheck className="h-6 w-6 text-green-500 group-hover:text-white" />
            </div>
            <div>
              <h4 className="font-bold">Гарантия качества</h4>
              <p className="text-sm text-gray-500">100% подлинные товары</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="p-4 bg-gray-800/50 rounded-2xl group-hover:bg-purple-600 transition-colors duration-500">
              <CreditCard className="h-6 w-6 text-purple-500 group-hover:text-white" />
            </div>
            <div>
              <h4 className="font-bold">Безопасная оплата</h4>
              <p className="text-sm text-gray-500">Защита платежей SSL</p>
            </div>
          </div>
        </div>

        {/* СРЕДНЯЯ ЧАСТЬ: Навигация и Подписка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
          
          {/* Бренд и описание */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="font-black text-xl">S</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">EL-SHOP</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Ваш премиальный выбор в мире электроники и стиля. Мы создаем лучший опыт покупок с 2024 года.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="p-3 bg-gray-800/50 rounded-xl hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Ссылки */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Категории</h3>
              <ul className="space-y-4">
                <li><Link href="/categories/electronics" className="text-gray-400 hover:text-blue-500 transition-colors">Электроника</Link></li>
                <li><Link href="/categories/clothing" className="text-gray-400 hover:text-blue-500 transition-colors">Одежда</Link></li>
                <li><Link href="/categories/home" className="text-gray-400 hover:text-blue-500 transition-colors">Для дома</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Компания</h3>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-gray-400 hover:text-blue-500 transition-colors">О нас</Link></li>
                <li><Link href="/contacts" className="text-gray-400 hover:text-blue-500 transition-colors">Контакты</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-blue-500 transition-colors">Вопросы</Link></li>
              </ul>
            </div>
          </div>

          {/* Рассылка */}
          <div className="lg:col-span-4">
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Подписка на скидки</h3>
            <p className="text-sm text-gray-400 mb-6">Получайте уведомления о закрытых распродажах и новых поступлениях.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* НИЖНЯЯ ЧАСТЬ: Копирайт и Оплата */}
        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm font-medium">
            © 2026 <span className="text-gray-300">EL-SHOP</span>. Created with ❤️ for your style.
          </div>
          
          <div className="flex items-center gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.svg" alt="Mir" className="h-4" />
          </div>

          <div className="flex gap-6 text-xs font-bold text-gray-500 uppercase tracking-tighter">
            <Link href="/terms" className="hover:text-white transition-colors">Оферта</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Приватность</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}