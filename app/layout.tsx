"use client";

import "./globals.css";
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
      <body className="flex flex-col min-h-screen">
        <SplashScreen />
        <CartProvider>
          <CartDrawer />

          {/* Main content grows to push footer to the bottom */}
          <main className="flex-1">{children}</main>

          <Analytics />

          {/* Footer is transparent so the page background shows through */}
          <footer
            className="w-full py-6 px-4 text-center text-xs text-white"
            style={{ backgroundColor: "#667eea" }}
          >
            <p className="mb-2">© 2025 Anaïs Jarnac</p>
            <p className="mb-1">
              Éditrice du site : Anaïs Jarnac
              <br />
              Contact :{" "}
              <a
                href="mailto:ajarnac@gmail.com"
                className="hover:text-gray-900 transition-colors"
              >
                ajarnac@gmail.com
              </a>
              <br />
              Hébergement : Vercel Inc. (
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                vercel.com
              </a>
              )
            </p>
            <p className="mt-2 italic">
              Les œuvres présentées sont protégées par le droit d&apos;auteur.
            </p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
