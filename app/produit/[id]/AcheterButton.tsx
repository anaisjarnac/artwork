"use client";
import React from "react";
import "./../../../app/globals.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AcheterButton({ produit }: { produit: any }) {
  const handleAcheter = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ name: produit.nom, amount: produit.prix }],
      }),
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleAcheter}
      className="relative bg-pink-600 !bg-pink-600 text-white font-semibold px-10 py-4 
           rounded-full shadow-lg animate-pulse-custom hover:scale-105 active:scale-95 transition-transform duration-300"
    >
      Je le veux !
    </button>
  );
}
