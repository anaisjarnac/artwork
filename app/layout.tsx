"use client";

import "./globals.css";
import HeartCursor from "./components/HeartCursor";
import { useEffect } from "react";
import CartProvider from "./components/CartProvider";
import CartButton from "./components/CartButton";
import CartDrawer from "./components/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 🔒 Bloque le clic droit partout sur le site
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);
    return () =>
      document.removeEventListener("contextmenu", disableContextMenu);
  }, []);

  return (
    <html lang="fr">
      <body>
        <HeartCursor />
        <CartProvider>
          <header className="w-full flex items-center justify-end px-6 py-4">
            <CartButton />
          </header>
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
