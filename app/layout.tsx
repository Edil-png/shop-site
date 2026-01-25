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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Shop | Marketplace",
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
        <ProductsProvider>
          <AuthProvider>
            <FavoriteProvider>
              <CartProvider>
                <Header products={[]} />
                {children}
                <Footer />
                <Toaster position="top-center" />
              </CartProvider>
            </FavoriteProvider>
          </AuthProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
