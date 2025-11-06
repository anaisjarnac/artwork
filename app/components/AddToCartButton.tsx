"use client";
import React, { useRef, useEffect } from "react";
import { useCart } from "./CartProvider";
import { useProductDetail } from "./ProductDetailProvider";
import JSConfetti from "js-confetti";

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
  const { selectedFormat: format, setSelectedFormat: setFormat } =
    useProductDetail();
  const jsConfettiRef = useRef<JSConfetti | null>(null);

  useEffect(() => {
    jsConfettiRef.current = new JSConfetti();
  }, []);

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
    // Si aucun format n'est sélectionné, retourner null
    return null;
  };

  const handleAdd = () => {
    if (format === "") {
      alert("Veuillez sélectionner un format avant d'ajouter au panier.");
      return;
    }

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

    // Déclencher l'effet confetti
    if (jsConfettiRef.current) {
      jsConfettiRef.current.addConfetti({
        confettiColors: [
          "#ff6b6b",
          "#4ecdc4",
          "#45b7d1",
          "#96ceb4",
          "#feca57",
          "#ff9ff3",
          "#54a0ff",
        ],
        confettiRadius: 6,
        confettiNumber: 80,
      });
    }
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
        className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
