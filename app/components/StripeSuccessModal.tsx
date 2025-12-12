"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "./page-produit/CartProvider";

export default function StripeSuccessModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clear } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const handledRef = useRef(false);

  useEffect(() => {
    if (searchParams.get("stripe") === "success" && !handledRef.current) {
      handledRef.current = true;
      clear();
      // Use setTimeout to avoid "setState during render" warning/error
      setTimeout(() => setIsOpen(true), 0);
    }
  }, [searchParams, clear]);

  const handleClose = () => {
    setIsOpen(false);
    // Remove the query param without refreshing the page
    const newUrl = window.location.pathname;
    window.history.replaceState({}, "", newUrl);
    router.refresh();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white/80 backdrop-blur-md border border-white/50 p-8 max-w-md w-full relative rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Paiement réussi !
          </h2>
          <p className="text-gray-600">
            Merci pour votre commande. Vous recevrez bientôt un email de
            confirmation.
          </p>

          <button
            onClick={handleClose}
            className="mt-6 w-full bg-black text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Continuer mes achats
          </button>
        </div>
      </div>
    </div>
  );
}
