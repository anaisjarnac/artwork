"use client";
import React from "react";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const { count, toggle } = useCart();
  return (
    <button
      onClick={toggle}
      aria-label="Ouvrir le panier"
      className="inline-flex items-center p-2 rounded-full bg-white shadow"
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
      <span className="ml-2 text-sm font-medium">{count}</span>
    </button>
  );
}
