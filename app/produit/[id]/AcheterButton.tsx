"use client";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AcheterButton({ produit }: { produit: any }) {
  const [format, setFormat] = useState("");
  const [prix, setPrix] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Lorsqu'on change le format
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setFormat(selected);

    switch (selected) {
      case "A4":
        setPrix(produit.prix_print_A4);
        break;
      case "A3":
        setPrix(produit.prix_print_A3);
        break;
      case "toile":
        setPrix(produit.prix);
        break;
      default:
        setPrix(null);
    }
  };

  // Quand on clique sur "Acheter"
  const handleAcheter = async () => {
    if (!prix) {
      alert("Sélectionnez un format avant d’acheter !");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produitId: produit.id,
          format,
          amount: prix, // montant dynamique selon le format choisi
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // redirection vers Stripe
      } else {
        alert("Erreur : impossible de rediriger vers le paiement.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur pendant le paiement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <select
        value={format}
        onChange={handleSelectChange}
        className="p-2 rounded bg-white text-black font-medium focus:outline-none"
      >
        <option value="">Choisir un format</option>
        <option value="A4">Print A4 — {produit.prix_print_A4} €</option>
        <option value="A3">Print A3 — {produit.prix_print_A3} €</option>
        <option value="toile">Toile — {produit.prix} €</option>
      </select>

      <button
        onClick={handleAcheter}
        disabled={loading || !format}
        className={`p-3 rounded font-semibold text-white ${
          format
            ? "bg-black hover:bg-gray-800"
            : "bg-gray-500 cursor-not-allowed"
        }`}
      >
        {loading ? "Redirection vers Stripe..." : "Acheter"}
      </button>
    </div>
  );
}
