import { Zap, Mail } from "lucide-react";

export function CtaBanner() {
  return (
    <div className="container mx-auto px-4 mb-24">
      <div className="group relative overflow-hidden rounded-[3rem] bg-[#0A0C10] p-8 md:p-16 text-center shadow-2xl">
        
        {/* Декоративные фоновые элементы */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[80%] bg-blue-600/20 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[80%] bg-purple-600/20 blur-[120px] rounded-full" />
        </div>

        {/* Сетка (Pattern) */}
        <div className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-[grid-white_20px]" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M2 12h20\'/%3E%3Cpath d=\'M12 2v20\'/%3E%3C/svg%3E")' }} 
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Маленький бейдж */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Эксклюзивное предложение
          </div>

          <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Скидка <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">15%</span> на первый заказ
          </h3>
          
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Присоединяйтесь к нашему комьюнити. Подпишитесь на рассылку и получите секретный промокод в течение 5 минут.
          </p>

          <div className="w-full max-w-md">
            <form className="relative group/form" onSubmit={(e) => e.preventDefault()}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover/form:opacity-50 transition duration-1000"></div>
              
              <div className="relative flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input 
                    type="email" 
                    placeholder="Ваш e-mail"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>
                
                <button className="bg-white text-black hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn">
                  Получить код
                  <Zap className="h-5 w-5 fill-black group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </form>
            <p className="mt-4 text-xs text-gray-500">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </div>

        {/* Анимированный блик при наведении на весь баннер */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </div>
  );
}