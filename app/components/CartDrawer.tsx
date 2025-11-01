"use client";
import React, { useState } from "react";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { items, isOpen, close, updateQty, removeItem, total, clear } =
    useCart();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert("Erreur: impossible de démarrer le paiement.");
        console.error(data);
      }
    } catch (err) {
      console.error("Checkout error", err);
      alert("Erreur pendant la création de la session de paiement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-4 top-16 z-50 w-80 max-w-full bg-white shadow-lg rounded p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Panier</h3>
        <div className="flex items-center gap-2">
          <button onClick={clear} className="text-sm text-gray-500">
            Vider
          </button>
          <button onClick={close} className="text-sm text-gray-700">
            Fermer
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-h-64 overflow-auto">
        {items.length === 0 && (
          <div className="text-gray-500">Votre panier est vide.</div>
        )}
        {items.map((it, index) => (
          <div
            key={`${it.id}-${it.nom}-${index}`}
            className="flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{it.nom}</div>
              <div className="text-sm text-gray-500">{it.prix} €</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQty(it.id, it.nom, Math.max(1, it.qty - 1))
                }
                className="px-2 bg-gray-200 rounded"
              >
                -
              </button>
              <div>{it.qty}</div>
              <button
                onClick={() => updateQty(it.id, it.nom, it.qty + 1)}
                className="px-2 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeItem(it.id, it.nom)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t pt-3 flex items-center justify-between">
        <div className="font-semibold">Total</div>
        <div className="font-bold">{total} €</div>
      </div>

      <div className="mt-3">
        <button
          onClick={handleCheckout}
          disabled={loading || items.length === 0}
          className={`w-full ${
            loading || items.length === 0
              ? "bg-gray-400"
              : "bg-black hover:bg-gray-800"
          } text-white p-2 rounded`}
        >
          {loading ? "Redirection..." : "Commander"}
        </button>
      </div>
    </div>
  );
}
