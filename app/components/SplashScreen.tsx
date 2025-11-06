"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Vérifier si c'est mobile/tablette (iPad inclus) et si on n'a pas déjà vu le splash
    const isMobileOrTablet = window.innerWidth < 1024;
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    console.log('SplashScreen - isMobileOrTablet:', isMobileOrTablet);
    console.log('SplashScreen - window.innerWidth:', window.innerWidth);
    console.log('SplashScreen - hasSeenSplash:', hasSeenSplash);
    
    if (!isMobileOrTablet) {
      console.log('Splash screen ignoré (pas mobile/tablette)');
      return;
    }
    
    // TEMPORAIRE: Ignorer hasSeenSplash pour les tests
    // if (hasSeenSplash) {
    //   console.log('Splash screen ignoré (déjà vu)');
    //   return;
    // }

    // Afficher le splash screen avec un micro-délai pour éviter le setState synchrone
    const showSplash = setTimeout(() => {
      setIsVisible(true);
      console.log('Splash screen démarré - durée 2 secondes');
    }, 10);

    // Démarrer l'animation après un court délai
    const startAnimation = setTimeout(() => {
      setIsAnimating(true);
      console.log('Animation démarrée');
    }, 500);

    // Commencer à masquer le splash screen après 1.5 secondes
    const startHiding = setTimeout(() => {
      setIsHiding(true);
      console.log('Début du fondu de sortie');
    }, 1500);

    // Masquer complètement après 2 secondes
    const hideSplash = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasSeenSplash', 'true');
      console.log('Splash screen masqué');
    }, 2000);

    return () => {
      clearTimeout(showSplash);
      clearTimeout(startAnimation);
      clearTimeout(startHiding);
      clearTimeout(hideSplash);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[10000] bg-[#4b5ae4] flex items-center justify-center transition-opacity duration-500 ${
        isHiding ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className={`transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-90' : 'scale-100 opacity-100'}`}>
        <Image
          src="/images/anais2.png"
          alt="Anaïs"
          width={300}
          height={300}
          className="w-[150px] h-[150px] object-contain animate-pulse"
          priority
        />
      </div>
    </div>
  );
}