"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useProductDetail } from "./ProductDetailProvider";

type GalleryClientProps = {
  images: string[];
  images_print?: string[];
  images_toile?: string[];
  images_carte?: string[];
  productInfo?: React.ReactNode;
};

export default function GalleryClient({
  images,
  images_print,
  images_toile,
  images_carte,
  productInfo,
}: GalleryClientProps) {
  const [index, setIndex] = useState(0);
  const { selectedFormat } = useProductDetail();

  // Fonction pour obtenir les images selon le format sélectionné
  const getCurrentImages = () => {
    if (selectedFormat === "A4" || selectedFormat === "A3") {
      return images_print || images;
    }
    if (selectedFormat === "toile") {
      return images_toile || images;
    }
    if (selectedFormat === "carte") {
      return images_carte || images;
    }
    return images;
  };

  // Fonction pour obtenir le type d'affichage basé sur le format
  const getDisplayType = () => {
    if (selectedFormat === "A4" || selectedFormat === "A3") {
      return "print";
    }
    if (selectedFormat === "toile") {
      return "toile";
    }
    if (selectedFormat === "carte") {
      return "carte";
    }
    return "all";
  };

  const currentImages = getCurrentImages();

  // S'assurer que l'index est valide pour les images actuelles
  const safeIndex = Math.min(index, Math.max(0, currentImages.length - 1));

  return (
    <div className="w-full max-w-[1300px] flex flex-col md:flex-row items-center md:items-start gap-8">
      {/* Images à gauche sur desktop */}
      <div className="md:w-1/2 flex flex-col md:flex-row items-center md:items-start gap-4 order-1 md:order-1">
        {/* Image principale */}
        <div className="w-full md:flex-1 max-w-[320px] md:max-w-[400px] order-2 md:order-1">
          {currentImages.length > 0 && (
            <Image
              src={currentImages[safeIndex] || currentImages[0] || images[0]}
              alt={`image-${safeIndex}`}
              width={700}
              height={700}
              className="rounded-xl w-full h-auto object-contain"
            />
          )}
        </div>

        {/* Carrousel de miniatures */}
        <div className="flex md:flex-col gap-1 md:gap-2 flex-wrap justify-center md:justify-start max-w-[300px] md:max-w-none order-3 md:order-2">
          {currentImages.map((src, i) => (
            <button
              type="button"
              key={src + i}
              onClick={() => setIndex(i)}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden border flex-shrink-0 ${
                i === safeIndex ? "border-white" : "border-transparent"
              }`}
            >
              <Image
                src={src}
                alt={`thumb-${i}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Informations du produit à droite sur desktop */}
      <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 order-2 md:order-2">
        {productInfo}
      </div>
    </div>
  );
}
