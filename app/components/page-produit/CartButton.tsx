"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const { count, toggle } = useCart();

  // // ✅ Indique quand le composant est monté côté client
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  return (
    <button
      onClick={toggle}
      aria-label="Ouvrir le panier"
      className="inline-flex items-center gap-1 py-2 px-3 rounded-full bg-white shadow pointer-events-auto hover:shadow-md transition-shadow"
    >
      <ShoppingCart className="w-5 h-5 text-gray-800" />
      {/* ✅ On affiche 0 côté serveur, et la vraie valeur côté client */}
      <span className="ml-2 text-sm font-medium">{count}</span>
    </button>
  );
}
