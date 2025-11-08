"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useProductDetail } from "./ProductDetailProvider";
import { Expand, X } from "lucide-react";

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

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

  const openFullscreen = (imageIndex: number) => {
    setFullscreenIndex(imageIndex);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <div className="w-full max-w-[1300px] flex flex-col md:flex-row items-center md:items-start gap-8">
      {/* Images à gauche sur desktop */}
      <div className="md:w-1/2 flex flex-col md:flex-row items-center md:items-start gap-4 order-1 md:order-1">
        {/* Carrousel principal avec effet de slide */}
        <div className="w-full md:flex-1 max-w-[320px] md:max-w-[400px] order-2 md:order-1">
          <div
            className="relative overflow-hidden rounded-xl bg-white/10 shadow-lg touch-pan-y md:touch-auto group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Bouton de zoom */}
            <button
              onClick={() => openFullscreen(safeIndex)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              aria-label="Agrandir l'image"
            >
              <Expand size={20} />
            </button>
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
                    // preload={true}
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

      {/* Modal Fullscreen */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-10"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>

          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={currentImages[fullscreenIndex]}
              alt={`Image ${fullscreenIndex + 1} en grand`}
              width={1200}
              height={1200}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation dans le fullscreen */}
            {currentImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 rounded-full p-2">
                {currentImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFullscreenIndex(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === fullscreenIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
