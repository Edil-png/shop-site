import { Zap } from "lucide-react";

export function CtaBanner() {
  return (
    <div className="container mx-auto px-4 mb-24">
      <div className="group relative overflow-hidden rounded-[2.5rem] bg-gray-900 p-12 text-center flex flex-col items-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="relative z-10">
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
            Скидка 15% на первый заказ
          </h3>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Подпишитесь на нашу рассылку и получите промокод прямо сейчас.
            Будьте в курсе всех новинок.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2">
              Получить скидку <Zap className="h-5 w-5 fill-current" />
            </button>
          </div>
        </div>
        {/* Фоновое свечение при наведении */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </div>
  );
}
