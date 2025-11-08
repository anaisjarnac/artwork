"use client";

import { get } from "http";
import { useState, useEffect } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean | undefined;
}

function getIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : undefined,
    height: typeof window !== "undefined" ? window.innerHeight : undefined,
    isMobile: getIsMobile(),
  }));

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

// Additional hook for common breakpoint checks
export function useBreakpoint() {
  const { width } = useWindowSize();

  const breakpoints = {
    isMobile: width ? width < 768 : false,
    isTablet: width ? width >= 768 && width < 1024 : false,
    isDesktop: width ? width >= 1024 : false,
    isLarge: width ? width >= 1280 : false,
    isXLarge: width ? width >= 1536 : false,
  };

  return {
    width,
    ...breakpoints,
  };
}

// Hook for debounced window size (useful for expensive operations)
export function useDebouncedWindowSize(delay: number = 250): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : undefined,
    height: typeof window !== "undefined" ? window.innerHeight : undefined,
    isMobile: getIsMobile(),
  }));

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: getIsMobile(),
        });
      }, delay);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return windowSize;
}
