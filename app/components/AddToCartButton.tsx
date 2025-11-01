"use client";
import React from "react";
import { useCart } from "./CartProvider";

type Product = { id: number; nom: string; prix: number };

export default function AddToCartButton({ produit }: { produit: Product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id: produit.id, nom: produit.nom, prix: produit.prix });
  };

  return (
    <button
      onClick={handleAdd}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded inline-block"
    >
      Ajouter au panier
    </button>
  );
}
