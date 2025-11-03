// types/Product.ts
export interface Product {
  id: number;
  nom: string;
  prix?: number; // optionnel car certains produits n'ont pas de prix
  prix_print_A4?: number;
  prix_print_A3?: number;
  prix_carte?: number;
  images: string[];
  description: string;
}
