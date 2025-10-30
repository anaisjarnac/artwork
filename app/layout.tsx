"use client";

import "./globals.css";
import HeartCursor from "./components/HeartCursor";
import { useEffect } from "react";

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
        {children}
      </body>
    </html>
  );
}
