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
    <div className="mt-6 flex flex-col items-center">
      {/* Sélecteur caché - les cartes gèrent maintenant la sélection */}
      <select
        value={format}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e) => setFormat(e.target.value as any)}
        className="hidden"
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

      {/* Bouton d'achat modernisé */}
      <div className="w-full max-w-sm">
        {format ? (
          <button
            onClick={handleAdd}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <span>🛒</span>
            Ajouter au panier
            <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
              {getSelectedPrice()}€
            </span>
          </button>
        ) : (
          <div className="w-full bg-white/10 backdrop-blur-sm rounded-full py-4 px-8 border-2 border-dashed border-white/30 text-center">
            <p className="text-white/70 font-medium">
              👆 Choisissez un format ci-dessus pour continuer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
