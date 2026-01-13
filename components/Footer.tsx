import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Информация */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">SimpleShop</span>
            </div>
            <p className="text-gray-400 mb-4">
              Простой интернет-магазин с быстрой доставкой и качественным
              сервисом.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Категории */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Категории</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/electronics"
                  className="text-gray-400 hover:text-white"
                >
                  Электроника
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/clothing"
                  className="text-gray-400 hover:text-white"
                >
                  Одежда
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/home"
                  className="text-gray-400 hover:text-white"
                >
                  Для дома
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/beauty"
                  className="text-gray-400 hover:text-white"
                >
                  Красота
                </Link>
              </li>
            </ul>
          </div>

          {/* Полезные ссылки */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Полезные ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-gray-400 hover:text-white"
                >
                  Доставка
                </Link>
              </li>
              <li>
                <Link
                  href="/payment"
                  className="text-gray-400 hover:text-white"
                >
                  Оплата
                </Link>
              </li>
              <li>
                <Link
                  href="/guarantee"
                  className="text-gray-400 hover:text-white"
                >
                  Гарантия
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-gray-400 hover:text-white"
                >
                  Контакты
                </Link>
              </li>

            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">+7 (999) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">info@simpleshop.ru</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">Москва, ул. Примерная, 1</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© 2024 SimpleShop. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
