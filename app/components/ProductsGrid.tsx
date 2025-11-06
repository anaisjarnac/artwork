"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductsGrid({ produits }: { produits: any[] }) {
  const [query] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return produits;
    return produits.filter((p) => p.nom.toLowerCase().includes(q));
  }, [produits, query]);

  return (
    <div className="w-full max-w-[1300px] md:cursor-none">
      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-600">Aucun résultat</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full md:cursor-none">
          {filtered.map((produit) => (
            <Link
              key={produit.id}
              href={`/produit/${produit.id}`}
              className="group flex flex-col items-center text-center w-full no-underline text-inherit md:cursor-none"
            >
              <div
                className={clsx([
                  "relative w-full max-w-[300px] mx-auto overflow-hidden",
                  "rounded-xl border-2 border-gray-300",
                  "bg-gradient-to-b from-gray-50 to-gray-100",
                  "shadow-[0_6px_0_0_#d1d5db,0_8px_12px_0_rgba(0,0,0,0.15)]",
                  "transition-all duration-150 ease-out",
                  "hover:shadow-[0_2px_0_0_#d1d5db,0_4px_8px_0_rgba(0,0,0,0.2)]",
                  "hover:translate-y-[4px]",
                  "active:shadow-[0_0px_0_0_#d1d5db,0_2px_4px_0_rgba(0,0,0,0.25)]",
                  "active:translate-y-[6px]",
                  "hover:from-gray-100 hover:to-gray-200",
                ])}
              >
                <Image
                  src={produit.images?.[0] ?? ""}
                  alt={produit.nom}
                  width={300}
                  height={300}
                  // className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-185"
                  className="w-full h-auto object-contain transition-transform duration-300"
                  priority
                />
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {produit.nom}
                </h2>
                <p className="text-lg font-medium text-gray-700">
                  À partir de {produit.prix_print_A4} €
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
