"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const { count, toggle } = useCart();
  const [mounted, setMounted] = useState(false);

  // ✅ Indique quand le composant est monté côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label="Ouvrir le panier"
      className="inline-flex items-center p-2 rounded-full bg-white shadow pointer-events-auto hover:shadow-md transition-shadow"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4"
        />
      </svg>
      {/* ✅ On affiche 0 côté serveur, et la vraie valeur côté client */}
      <span className="ml-2 text-sm font-medium">{mounted ? count : 0}</span>
    </button>
  );
}
