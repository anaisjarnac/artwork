import { produits } from "../../../data/produits";
import Image from "next/image";
import Link from "next/link";
import GalleryClient from "../../components/GalleryClient";
import AddToCartButton from "../../components/AddToCartButton";
import CartButton from "../../components/CartButton";
import { ProductDetailProvider } from "../../components/ProductDetailProvider";
import type { Product } from "../../../types/Product";

export default async function ProduitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produit = produits.find((p) => p.id === Number(id)) as
    | Product
    | undefined;

  if (!produit) return <div>Produit introuvable</div>;

  const isSoldToile = typeof produit.prix !== "number";
  const hasA4 = typeof produit.prix_print_A4 === "number";
  const hasA3 = typeof produit.prix_print_A3 === "number";
  const hasCarte = typeof produit.prix_carte === "number";
  const isSold = isSoldToile && !hasA4 && !hasA3 && !hasCarte;

  return (
    <ProductDetailProvider>
      <main className="min-h-screen bg-[#4b5ae4] pt-2 px-4 pb-4 md:pt-3 md:px-6 md:pb-6 flex flex-col items-center">
        <div className="w-full max-w-[1300px] relative mb-2 pointer-events-none">
          {/* Mobile: cart button on top right */}
          <div className="flex items-center md:hidden w-full justify-end mb-4">
            <CartButton />
          </div>

          <Link
            href="/"
            aria-label="Retour à l'accueil"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-0 pointer-events-auto hidden md:block"
          >
            <Image
              src="/images/arrow.png"
              alt="back"
              width={40}
              height={40}
              className="h-auto w-auto"
            />
          </Link>

          {/* Desktop: Cart button on top right */}
          <div className="hidden md:flex md:absolute right-0 top-1/2 transform -translate-y-1/2 z-0 pointer-events-auto">
            <CartButton />
          </div>

          <div className="flex justify-center">
            <Link
              href="/"
              aria-label="Retour à l'accueil"
              className="relative z-50 inline-block pointer-events-auto"
            >
              <Image
                src="/images/anais2.png"
                alt="Anaïs"
                width={700}
                height={700}
                className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] object-contain"
              />
            </Link>
          </div>
        </div>

        <GalleryClient
          images={produit.images}
          images_print={produit.images_print}
          images_toile={produit.images_toile}
          images_carte={produit.images_carte}
          productInfo={
            <div className="w-full">
              <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">
                {produit.nom}
              </h1>
              <p className="text-white text-lg mb-6 max-w-lg">
                {produit.description}
              </p>

              {isSold ? (
                <p className="text-xl text-red-400 font-semibold">Vendu 🖤</p>
              ) : (
                <AddToCartButton
                  produit={{ ...produit, prix: produit.prix! }}
                />
              )}
            </div>
          }
        />
      </main>
    </ProductDetailProvider>
  );
}
