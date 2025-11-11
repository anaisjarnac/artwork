"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { monoTrust, poppins } from "../fonts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductsGrid({ produits }: { produits: any[] }) {
  const [query] = useState("");
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return produits;
    return produits.filter((p) => p.nom.toLowerCase().includes(q));
  }, [produits, query]);

  const handleFormatClick = (
    e: React.MouseEvent,
    produitId: string,
    format: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/produit/${produitId}?format=${format}`);
  };

  return (
    <div className="w-full max-w-[1300px]">
      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-600">Aucun résultat</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-12 md:gap-y-15 w-full">
          {filtered.map((produit, index) => (
            <Link
              key={produit.id}
              href={`/produit/${produit.id}`}
              className="group flex flex-col items-center text-center w-full no-underline text-inherit animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
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
              </div>

              <div className="mt-4">
                <h2
                  className={`${monoTrust.className} text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 tracking-tight`}
                >
                  {produit.nom}
                </h2>
                {/* <p
                  className={`${poppins.className} text-lg font-medium text-gray-700`}
                >
                  À partir de {produit.prix_carte} €
                </p> */}

                {/* Pastilles de formats disponibles */}
                <div
                  className={`${poppins.className} flex items-center justify-center gap-1 mt-2`}
                >
                  {produit.prix_carte && (
                    <span
                      onClick={(e) => handleFormatClick(e, produit.id, "carte")}
                      className="bg-rose-200 text-rose-400 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:bg-rose-300 hover:text-rose-600 hover:scale-110 hover:shadow-md cursor-pointer"
                    >
                      Carte
                    </span>
                  )}
                  {produit.prix_print_A4 && (
                    <span
                      onClick={(e) => handleFormatClick(e, produit.id, "a4")}
                      className="bg-indigo-200 text-indigo-400 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:bg-indigo-300 hover:text-indigo-600 hover:scale-110 hover:shadow-md cursor-pointer"
                    >
                      A4
                    </span>
                  )}
                  {produit.prix_print_A3 && (
                    <span
                      onClick={(e) => handleFormatClick(e, produit.id, "a3")}
                      className="bg-indigo-200 text-indigo-400 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:bg-indigo-300 hover:text-indigo-600 hover:scale-110 hover:shadow-md cursor-pointer"
                    >
                      A3
                    </span>
                  )}
                  {produit.prix && (
                    <span
                      onClick={(e) => handleFormatClick(e, produit.id, "toile")}
                      className="bg-purple-200 text-purple-400 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:bg-purple-300 hover:text-purple-600 hover:scale-110 hover:shadow-md cursor-pointer"
                    >
                      Toile
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
