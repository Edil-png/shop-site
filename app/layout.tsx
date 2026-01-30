import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProductsProvider } from "@/context/ProductsContext";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from "sonner"; // Установите: npm install sonner
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { FavoriteProvider } from "@/context/FavoriteContext";
import { AuthProvider } from "@/context/authContext";
import { ThemeProvider } from "@/context/themeContext";
import { StatsProvider } from "@/context/statsContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: "/fuvicon.svg",
  title: "EL-SHOP",
  description: "Лучшие товары по лучшим ценам",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <StatsProvider>
            <ProductsProvider>
              <AuthProvider>
                <FavoriteProvider>
                  <CartProvider>
                    <Header />
                    {children}
                    <Footer />
                    <Toaster position="top-center" />
                  </CartProvider>
                </FavoriteProvider>
              </AuthProvider>
            </ProductsProvider>
          </StatsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
