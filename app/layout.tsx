"use client";

import "./globals.css";
import HeartCursor from "./components/HeartCursor";
import SplashScreen from "./components/SplashScreen";
import { useEffect } from "react";
import { CartProvider } from "./components/page-produit/CartProvider";
import CartDrawer from "./components/page-produit/CartDrawer";
import { Analytics } from "@vercel/analytics/next";

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
        <SplashScreen />
        <HeartCursor />
        <CartProvider>
          <CartDrawer />
          {children}
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
