"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SearchButton({ produits }: { produits: any[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return produits.slice(0, 8);
    return produits.filter((p) => p.nom.toLowerCase().includes(q));
  }, [produits, query]);

  return (
    <div ref={ref} className="relative ml-4">
      <button
        type="button"
        aria-label="Ouvrir la recherche"
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center justify-center p-3 rounded-full bg-white shadow hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35"
          />
          <circle
            cx="11"
            cy="11"
            r="6"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 p-3">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Chercher par nom..."
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="mt-3 max-h-64 overflow-auto">
            {filtered.length === 0 ? (
              <div className="text-sm text-gray-500">Aucun résultat</div>
            ) : (
              filtered.map((p) => (
                <Link
                  key={p.id}
                  href={`/produit/${p.id}`}
                  className="flex items-center gap-3 py-2 px-1 hover:bg-gray-50 rounded"
                >
                  <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={p.images?.[0] ?? ""}
                      alt={p.nom}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{p.nom}</div>
                    <div className="text-sm text-gray-500">
                      {typeof p.prix === "number" ? p.prix + " €" : p.prix}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
