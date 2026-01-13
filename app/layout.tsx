import { ProductsProvider } from "@/context/ProductsContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ProductsProvider>{children}</ProductsProvider>
      </body>
    </html>
  );
}
