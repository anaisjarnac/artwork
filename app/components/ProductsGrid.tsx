"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { monoTrust, poppins } from "../fonts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductsGrid({ produits }: { produits: any[] }) {
  const [query] = useState("");

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {filtered.map((produit, index) => (
            <Link
              key={produit.id}
              href={`/produit/${produit.id}`}
              className="group flex flex-col items-center text-center w-full no-underline text-inherit"
            >
              <div
                className={clsx([
                  "relative w-full mx-auto overflow-hidden",
                  "rounded-xl border-2 border-gray-300",
                  "bg-gradient-to-b from-gray-50 to-gray-100",
                  "shadow-[0_6px_0_0_#d1d5db,0_8px_12px_0_rgba(0,0,0,0.15)]",
                  "transition-all duration-300 ease-out",
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
                  height={400}
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority={index < 6}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Overlay avec informations au hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div className="text-white text-left w-full">
                    <div
                      className={`${poppins.className} text-xs sm:text-sm font-medium space-y-1`}
                    >
                      {produit.prix_carte && (
                        <div>Carte postale: {produit.prix_carte}€</div>
                      )}
                      <div>Print A4: {produit.prix_print_A4}€</div>
                      <div>Print A3: {produit.prix_print_A3}€</div>
                      {produit.prix && (
                        <div className="font-bold text-white mt-1">
                          Toile originale: {produit.prix}€
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h2
                  className={`${monoTrust.className} text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 tracking-tight`}
                >
                  {produit.nom}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
