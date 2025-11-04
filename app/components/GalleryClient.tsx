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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [firstImageDimensions, setFirstImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

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

  // Créer une clé unique pour forcer le rechargement quand le format change
  const imageKey = `${selectedFormat}-${currentImages[0] || "default"}`;

  // Distance minimale pour déclencher un swipe
  const minSwipeDistance = 50;

  // Gestionnaires de swipe avec effet de glissement
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    setTouchEnd(currentTouch);
    setDragOffset(diff);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && safeIndex < currentImages.length - 1) {
      setIndex(safeIndex + 1);
    }
    if (isRightSwipe && safeIndex > 0) {
      setIndex(safeIndex - 1);
    }

    // Reset drag state
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div className="w-full max-w-[1300px] flex flex-col md:flex-row items-center md:items-start gap-8">
      {/* Images à gauche sur desktop */}
      <div className="md:w-1/2 flex flex-col md:flex-row items-center md:items-start gap-4 order-1 md:order-1">
        {/* Carrousel principal avec effet de slide */}
        <div className="w-full md:flex-1 max-w-[320px] md:max-w-[400px] order-2 md:order-1">
          <div
            className="relative overflow-hidden rounded-xl bg-white/10 shadow-lg touch-pan-y md:touch-auto"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={`flex transition-transform duration-300 ease-out ${
                isDragging ? "transition-none" : ""
              }`}
              style={{
                transform: `translateX(calc(-${safeIndex * 100}% + ${
                  isDragging ? dragOffset : 0
                }px))`,
              }}
            >
              {currentImages.map((src, i) => (
                <div
                  key={`${imageKey}-${i}`}
                  className="w-full flex-shrink-0"
                  style={{
                    aspectRatio: firstImageDimensions
                      ? `${firstImageDimensions.width} / ${firstImageDimensions.height}`
                      : undefined,
                  }}
                >
                  <Image
                    src={src}
                    alt={`image-${i}`}
                    width={700}
                    height={700}
                    className="w-full h-full object-contain select-none"
                    onLoad={(e) => {
                      if (!firstImageDimensions && i === 0) {
                        const img = e.target as HTMLImageElement;
                        setFirstImageDimensions({
                          width: img.naturalWidth,
                          height: img.naturalHeight,
                        });
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs de swipe sur mobile */}
          {currentImages.length > 1 && (
            <div className="flex justify-center mt-2 gap-2 md:hidden">
              {currentImages.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    i === safeIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
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
