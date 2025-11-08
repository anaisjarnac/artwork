"use client";
import React from "react";
import { useProductDetail } from "../ProductDetailProvider";

type Product = {
  id: number;
  nom: string;
  prix?: number | string;
  prix_print_A4?: number | string;
  prix_print_A3?: number | string;
  prix_carte?: number | string;
};

interface PriceCardsProps {
  produit: Product;
}

export default function PriceCards({ produit }: PriceCardsProps) {
  const { selectedFormat, setSelectedFormat } = useProductDetail();

  const parsePrice = (p?: number | string): number | null => {
    if (typeof p === "number" && Number.isFinite(p)) return p;
    if (typeof p === "string") {
      const n = parseFloat(p.replace(",", "."));
      return Number.isFinite(n) ? n : null;
    }
    return null;
  };

  const formats = [
    {
      id: "A4",
      name: "Print A4",
      price: parsePrice(produit.prix_print_A4),
      icon: "📄",
    },
    {
      id: "A3",
      name: "Print A3",
      price: parsePrice(produit.prix_print_A3),
      icon: "📋",
    },
    {
      id: "toile",
      name: "Toile originale",
      price: parsePrice(produit.prix),
      icon: "🎨",
    },
    {
      id: "carte",
      name: "Carte postale",
      price: parsePrice(produit.prix_carte),
      icon: "💌",
    },
  ].filter((format) => format.price !== null);

  if (formats.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {formats.map((format) => (
          <div
            key={format.id}
            onClick={() =>
              setSelectedFormat(format.id as "A4" | "A3" | "toile" | "carte")
            }
            className={`
              relative cursor-pointer transition-all duration-300 rounded-lg p-3 border-2 group
              hover:scale-[1.02] hover:shadow-lg
              ${
                selectedFormat === format.id
                  ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-white shadow-lg shadow-purple-500/20"
                  : "bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50"
              }
            `}
          >
            {/* Badge de sélection */}
            {selectedFormat === format.id && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg animate-bounce">
                ✓
              </div>
            )}

            <div className="text-center space-y-1">
              <div className="text-2xl mb-1">{format.icon}</div>
              <h4 className="text-white font-medium text-sm">{format.name}</h4>
              <div className="text-lg font-bold text-yellow-400">
                {format.price}€
              </div>
            </div>

            {/* Effet de hover */}
            <div
              className={`
              absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300
              bg-gradient-to-br from-white/5 to-transparent
            `}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
