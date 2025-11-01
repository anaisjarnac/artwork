"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductsGrid({ produits }: { produits: any[] }) {
  const [query, _setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return produits;
    return produits.filter((p) => p.nom.toLowerCase().includes(q));
  }, [produits, query]);

  return (
    <div className="w-full max-w-[1300px]">
      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-600">Aucun résultat</div>
      ) : (
        <div className="grid grid-cols-3 gap-12 w-full">
          {filtered.map((produit) => (
            <Link
              key={produit.id}
              href={`/produit/${produit.id}`}
              className="group flex flex-col items-center text-center w-full no-underline text-inherit"
            >
              <div className="relative w-full max-w-[520px] aspect-square mx-auto overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={produit.images?.[0] ?? ""}
                  alt={produit.nom}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {produit.nom}
                </h2>
                <p className="text-lg font-medium text-gray-700">
                  {produit.prix} €
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
