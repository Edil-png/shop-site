import { CartProvider } from "@/context/cartContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning обязателен для next-themes на теге html
    <html lang="ru" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={` antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange // Рекомендуется, чтобы избежать мигания при смене темы
        >
          <ProductsProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </ProductsProvider>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
