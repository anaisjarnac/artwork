"use client";
import React, { createContext, useContext, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

type FormatType = "A4" | "A3" | "toile" | "carte" | "";

interface ProductDetailContextType {
  selectedFormat: FormatType;
  setSelectedFormat: (format: FormatType) => void;
}

const ProductDetailContext = createContext<
  ProductDetailContextType | undefined
>(undefined);

export function ProductDetailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  const initialFormat = useMemo(() => {
    const formatParam = searchParams.get("format");
    if (formatParam) {
      // Normalisation des formats
      const formatMap: { [key: string]: FormatType } = {
        carte: "carte",
        a4: "A4",
        a3: "A3",
        toile: "toile",
      };

      const normalizedFormat = formatMap[formatParam.toLowerCase()];
      return normalizedFormat || "";
    }
    return "";
  }, [searchParams]);

  const [selectedFormat, setSelectedFormat] =
    useState<FormatType>(initialFormat);

  return (
    <ProductDetailContext.Provider
      value={{ selectedFormat, setSelectedFormat }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
}

export function useProductDetail() {
  const context = useContext(ProductDetailContext);
  if (context === undefined) {
    throw new Error(
      "useProductDetail must be used within a ProductDetailProvider"
    );
  }
  return context;
}
