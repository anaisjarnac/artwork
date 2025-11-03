"use client";

import "./globals.css";
import HeartCursor from "./components/HeartCursor";
import { useEffect } from "react";
import { CartProvider } from "./components/CartProvider";
import CartDrawer from "./components/CartDrawer";
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
