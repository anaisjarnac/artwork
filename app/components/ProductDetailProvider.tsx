"use client";
import React, { createContext, useContext, useState } from "react";

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
  const [selectedFormat, setSelectedFormat] = useState<FormatType>("");

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
