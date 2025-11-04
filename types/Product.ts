// types/Product.ts
export interface Product {
  id: number;
  nom: string;
  prix?: number;
  prix_print_A4?: number;
  prix_print_A3?: number;
  prix_carte?: number;
  images: string[];
  images_print?: string[];
  images_toile?: string[];
  images_carte?: string[];
  description: string;
}
