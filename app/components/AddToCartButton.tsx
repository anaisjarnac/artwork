"use client";
import React, { useState } from "react";
import { useCart } from "./CartProvider";

type Product = {
  id: number;
  nom: string;
  prix?: number | string;
  prix_print_A4?: number | string;
  prix_print_A3?: number | string;
  prix_carte?: number | string;
};

export default function AddToCartButton({ produit }: { produit: Product }) {
  const { addItem } = useCart();
  const [format, setFormat] = useState<"A4" | "A3" | "toile" | "carte" | "">(
    ""
  );

  const parsePrice = (p?: number | string): number | null => {
    if (typeof p === "number" && Number.isFinite(p)) return p;
    if (typeof p === "string") {
      const n = parseFloat(p.replace(",", "."));
      return Number.isFinite(n) ? n : null;
    }
    return null;
  };

  const getSelectedPrice = (): number | null => {
    if (format === "A4") return parsePrice(produit.prix_print_A4);
    if (format === "A3") return parsePrice(produit.prix_print_A3);
    if (format === "toile") return parsePrice(produit.prix);
    if (format === "carte") return parsePrice(produit.prix_carte);
    // fallback: prefer print A4/A3 if available, else toile
    return (
      parsePrice(produit.prix_print_A4) ??
      parsePrice(produit.prix_print_A3) ??
      parsePrice(produit.prix)
    );
  };

  const handleAdd = () => {
    const prix = getSelectedPrice();
    if (prix == null) {
      alert("Prix non disponible pour ce format.");
      return;
    }

    addItem({
      id: produit.id,
      nom: produit.nom + (format ? ` — ${format}` : ""),
      prix: Number(prix),
      qty: 1,
    });
  };

  return (
    <div className="mt-4 inline-flex items-center gap-3">
      <select
        value={format}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e) => setFormat(e.target.value as any)}
        className="bg-white/90 text-sm px-3 py-2 rounded"
        aria-label="Choisir le format"
      >
        <option value="">Format</option>
        {parsePrice(produit.prix_print_A4) != null && (
          <option value="A4">A4 — {parsePrice(produit.prix_print_A4)}€</option>
        )}
        {parsePrice(produit.prix_print_A3) != null && (
          <option value="A3">A3 — {parsePrice(produit.prix_print_A3)}€</option>
        )}
        {parsePrice(produit.prix) != null && (
          <option value="toile">Toile — {parsePrice(produit.prix)}€</option>
        )}
        {parsePrice(produit.prix_carte) != null && (
          <option value="carte">
            Carte — {parsePrice(produit.prix_carte)}€
          </option>
        )}
      </select>

      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded inline-block"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
