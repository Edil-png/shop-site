import { Inter } from "next/font/google";
import { ProductsProvider } from "@/context/ProductsContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// Импортируем провайдер для уведомлений (можно использовать react-hot-toast или sonner)
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/cartContext";
import { ThemeProvider } from "@/context/ThemeProvide";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "My Shop | Твой гид в мире покупок",
    template: "%s | My Shop",
  },
  description:
    "Широкий выбор электроники, одежды и товаров для дома с доставкой по всей стране.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          <ProductsProvider>
            <CartProvider>
              {/* Общая обертка приложения */}
              <div className="flex flex-col min-h-screen relative">
                {/* Header закреплен сверху */}
                <Header />

                {/* Основной контент с отступом под Header (если он fixed) и анимацией */}
                <main className="flex-grow pt-16 md:pt-20">
                  {/* Ограничитель ширины для центрирования */}
                  <div className="max-w-[1440px] mx-auto w-full">
                    {children}
                  </div>
                </main>

                {/* Footer */}
                <Footer />

                {/* Вспомогательные компоненты */}
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    className: "dark:bg-gray-800 dark:text-white",
                    duration: 3000,
                  }}
                />
              </div>
            </CartProvider>
          </ProductsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
